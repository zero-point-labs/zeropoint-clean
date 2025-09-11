import OpenAI from 'openai'
import type { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const EMBEDDING_MODEL = 'text-embedding-3-large'
export const CHAT_MODEL = process.env.OPENAI_MODEL || 'gpt-4-turbo'

// Function definitions for GPT-5 function calling
export const chatFunctions: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'collect_contact_info',
      description: 'Collect contact information when the user is ready to connect or get a quote',
      parameters: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'User\'s full name' },
          email: { type: 'string', description: 'User\'s email address' },
          phone: { type: 'string', description: 'User\'s phone number (optional)' },
          company: { type: 'string', description: 'User\'s company name (optional)' },
          message: { type: 'string', description: 'Any additional message or requirements' }
        },
        required: ['name', 'email']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'assess_project_requirements',
      description: 'Assess and categorize the user\'s project requirements',
      parameters: {
        type: 'object',
        properties: {
          project_type: { 
            type: 'string', 
            enum: ['website', 'web_app', 'ecommerce', 'real_estate', 'automotive', 'consulting'],
            description: 'Type of project the user needs' 
          },
          budget_indication: { type: 'string', description: 'User\'s budget range or indication' },
          timeline: { type: 'string', description: 'Desired timeline for the project' },
          key_features: { type: 'array', items: { type: 'string' }, description: 'Key features or requirements mentioned' },
          complexity_level: { 
            type: 'string', 
            enum: ['simple', 'moderate', 'complex', 'enterprise'],
            description: 'Assessed complexity level' 
          }
        },
        required: ['project_type']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'schedule_consultation',
      description: 'Help the user schedule a free consultation call',
      parameters: {
        type: 'object',
        properties: {
          preferred_timeframe: { type: 'string', description: 'User\'s preferred timeframe for the call' },
          timezone: { type: 'string', description: 'User\'s timezone' },
          consultation_type: { 
            type: 'string', 
            enum: ['project_discussion', 'technical_consultation', 'pricing_discussion', 'general_inquiry'],
            description: 'Type of consultation needed' 
          },
          preparation_notes: { type: 'string', description: 'Any specific topics to prepare for the call' }
        }
      }
    }
  }
]

export const createChatCompletion = async (
  messages: ChatCompletionMessageParam[],
  options: {
    temperature?: number
    maxTokens?: number
    tools?: ChatCompletionTool[]
    toolChoice?: 'auto' | 'none' | { type: 'function', function: { name: string } }
  } = {}
) => {
  try {
    const requestConfig: any = {
      model: CHAT_MODEL,
      messages,
    }
    
    // Handle model-specific parameters
    if (CHAT_MODEL.includes('gpt-5')) {
      requestConfig.max_completion_tokens = options.maxTokens || 1000
      // GPT-5 uses default temperature (1)
    } else {
      requestConfig.max_tokens = options.maxTokens || 1000
      requestConfig.temperature = options.temperature || 0.7
    }
    
    // Add tools only if provided
    if (options.tools && options.tools.length > 0) {
      requestConfig.tools = options.tools
      requestConfig.tool_choice = options.toolChoice || 'auto'
    }
    
    const response = await openai.chat.completions.create(requestConfig)
    
    return response
  } catch (error) {
    console.error('OpenAI API Error:', error)
    throw error
  }
}

export const createEmbedding = async (text: string): Promise<number[]> => {
  try {
    const response = await openai.embeddings.create({
      model: EMBEDDING_MODEL,
      input: text,
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding creation error:', error)
    throw error
  }
}

export default openai
