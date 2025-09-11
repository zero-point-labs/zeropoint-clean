import { NextRequest, NextResponse } from 'next/server'
import { createChatCompletion, chatFunctions } from '@/lib/openai'
import { supabaseAdmin, searchKnowledge } from '@/lib/supabase'
import type { ChatMessage, BotSettings } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

// System prompt for ZeroPoint Labs AI Assistant
const getSystemPrompt = (settings: BotSettings, context: string = '') => {
  const basePrompt = `You are the AI Assistant for Zero Point Labs, a premium web development agency based in Cyprus, founded by Andreas Kyriakou in 2024.

COMPANY OVERVIEW:
- Zero Point Labs specializes in modern web development using cutting-edge technologies
- Services: Custom websites, web applications, e-commerce solutions, real estate platforms, automotive websites
- Founded in 2024 by Andreas Kyriakou as a solo developer with contractor network
- Located in Cyprus, serving global clients
- Focus on quality, innovation, and customer satisfaction

YOUR PERSONALITY:
- ${settings.personality === 'professional' ? 'Professional and knowledgeable' : settings.personality === 'friendly' ? 'Friendly and approachable' : settings.personality === 'technical' ? 'Technical and detailed' : 'Casual and conversational'}
- Helpful and consultative approach - help first, sell second
- Always suggest a free consultation for pricing discussions
- Never provide exact prices without consultation (except for basic websites: €800-2000 range)

KEY PRINCIPLES:
1. Help users understand their needs first
2. Provide valuable insights about web development
3. Guide users toward free consultation when they're ready
4. Collect contact information naturally during conversation
5. Focus on building trust and demonstrating expertise

PRICING APPROACH:
- Basic websites: €800-2,000 (depending on complexity)
- Web applications: Require consultation for accurate pricing
- All custom projects: Always recommend free consultation first
- Never provide exact quotes without understanding full requirements

KNOWLEDGE BASE CONTEXT:
${context}

Remember: Your goal is to be genuinely helpful while naturally guiding qualified prospects toward a consultation. Quality conversations over quick sales.`

  if (settings.customPrompts.systemPrompt) {
    return settings.customPrompts.systemPrompt.replace('{basePrompt}', basePrompt)
  }

  return basePrompt
}

export async function POST(request: NextRequest) {
  try {
    const { messages, conversationId, settings = {} }: {
      messages: ChatMessage[]
      conversationId?: string
      settings?: Partial<BotSettings>
    } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages are required' }, { status: 400 })
    }

    // Get bot settings from database or use defaults
    const { data: botSettings } = await supabaseAdmin
      .from('bot_settings')
      .select('*')
      .single()

    const currentSettings: BotSettings = {
      personality: 'professional',
      responseLength: 'medium',
      temperature: 0.7,
      maxTokens: 1000,
      autoCollectContact: true,
      knowledgeBaseVersion: '1.0',
      customPrompts: {},
      ...botSettings,
      ...settings
    }

    // Get the last user message for RAG search
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop()

    let relevantContext = ''
    if (lastUserMessage?.content) {
      try {
        const knowledgeResults = await searchKnowledge(lastUserMessage.content, 0.75, 3)
        relevantContext = knowledgeResults
          .map(item => `${item.content}`)
          .join('\n\n')
      } catch (error) {
        console.error('Knowledge search error:', error)
        // Continue without RAG context if search fails
      }
    }

    // Prepare messages for OpenAI
    const systemPrompt = getSystemPrompt(currentSettings, relevantContext)
    const openAIMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }))
    ]

    // Get AI response
    const completion = await createChatCompletion(
      openAIMessages,
      {
        temperature: currentSettings.temperature,
        maxTokens: currentSettings.maxTokens,
        tools: chatFunctions,
        toolChoice: 'auto'
      }
    )

    const response = completion.choices[0]?.message

    if (!response) {
      return NextResponse.json({ error: 'No response from AI' }, { status: 500 })
    }

    // Create response message
    const responseMessage: ChatMessage = {
      id: uuidv4(),
      role: 'assistant',
      content: response.content || '',
      timestamp: new Date(),
      metadata: {
        tokens: completion.usage?.total_tokens,
        model: completion.model,
        temperature: currentSettings.temperature
      }
    }

    // Handle function calls if present
    if (response.tool_calls && response.tool_calls.length > 0) {
      const toolCall = response.tool_calls[0]
      if (toolCall.type === 'function') {
        responseMessage.functionCall = {
          name: toolCall.function.name,
          arguments: JSON.parse(toolCall.function.arguments || '{}')
        }

        // If there's a function call but no content, provide a default response
        if (!responseMessage.content || responseMessage.content.trim() === '') {
          switch (toolCall.function.name) {
            case 'collect_contact_info':
              responseMessage.content = "Great! I'd love to help you with your project. Could you please share your contact details so we can discuss your requirements in more detail?"
              break
            case 'assess_project_requirements':
              responseMessage.content = "Perfect! I've assessed your project requirements. Let me provide you with some initial insights and next steps."
              break
            case 'schedule_consultation':
              responseMessage.content = "Excellent! I'd be happy to schedule a free consultation for you. Let me help you find the best time for our discussion."
              break
            default:
              responseMessage.content = "I'm processing your request and gathering the information you need. How can I help you further?"
          }
        }

        // Process function calls
        switch (toolCall.function.name) {
          case 'collect_contact_info':
            const contactInfo = JSON.parse(toolCall.function.arguments || '{}')
            if (conversationId && contactInfo.email) {
              // Save lead to database
              await supabaseAdmin.from('leads').insert({
                conversation_id: conversationId,
                contact_info: contactInfo,
                project_details: {},
                status: 'new'
              })
            }
            break
          
          case 'assess_project_requirements':
            const projectDetails = JSON.parse(toolCall.function.arguments || '{}')
            if (conversationId) {
              // Update conversation with project assessment
              await supabaseAdmin
                .from('conversations')
                .update({ 
                  lead_status: 'qualified',
                  updated_at: new Date().toISOString()
                })
                .eq('id', conversationId)
            }
            break
        }
      }
    }

    // Save conversation to database
    if (conversationId) {
      const updatedMessages = [...messages, responseMessage]
      await supabaseAdmin
        .from('conversations')
        .upsert({
          id: conversationId,
          messages: updatedMessages,
          updated_at: new Date().toISOString()
        })
    }

    return NextResponse.json({
      message: responseMessage,
      conversationId: conversationId || uuidv4()
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}
