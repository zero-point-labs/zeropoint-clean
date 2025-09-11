'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageList } from './MessageList'
import { MessageInput } from './MessageInput'
import { TypingIndicator } from './TypingIndicator'
import type { ChatMessage, BotSettings } from '@/lib/types'
import { v4 as uuidv4 } from 'uuid'

interface ChatInterfaceProps {
  settings?: Partial<BotSettings>
  onSettingsChange?: (settings: Partial<BotSettings>) => void
  className?: string
  showDebug?: boolean
}

export function ChatInterface({ 
  settings = {}, 
  onSettingsChange,
  className = "",
  showDebug = false 
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: "Hello! I'm the Zero Point Labs AI Assistant. I'm here to help you learn about our web development services and find the perfect solution for your project. What can I help you with today?",
      timestamp: new Date()
    }
  ])
  
  const [isLoading, setIsLoading] = useState(false)
  const [conversationId] = useState(() => uuidv4())
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          conversationId,
          settings
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      if (data.message) {
        setMessages(prev => [...prev, data.message])
      }

    } catch (error) {
      console.error('Chat error:', error)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: "I apologize, but I'm having trouble responding right now. Please try again in a moment, or feel free to contact us directly at hello@zeropointlabs.com.",
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        role: 'assistant',
        content: "Hello! I'm the Zero Point Labs AI Assistant. I'm here to help you learn about our web development services and find the perfect solution for your project. What can I help you with today?",
        timestamp: new Date()
      }
    ])
  }

  const handleExportChat = () => {
    const chatData = {
      conversationId,
      messages: messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp,
        functionCall: msg.functionCall
      })),
      settings,
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `zeropoint-chat-${conversationId.slice(0, 8)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`flex flex-col h-full bg-white dark:bg-gray-900 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">ZP</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              ZeroPoint AI Assistant
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Web Development Expert
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleClearChat}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Clear
          </button>
          <button
            onClick={handleExportChat}
            className="px-3 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Export
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageList 
          messages={messages} 
          showDebug={showDebug}
        />
        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <MessageInput 
          onSendMessage={handleSendMessage}
          disabled={isLoading}
          placeholder="Ask me about Zero Point Labs services, pricing, or your project needs..."
        />
      </div>
    </div>
  )
}
