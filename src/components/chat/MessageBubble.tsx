'use client'

import { ChatMessage } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'

interface MessageBubbleProps {
  message: ChatMessage
  showDebug?: boolean
}

export function MessageBubble({ message, showDebug = false }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'

  if (isSystem && !showDebug) {
    return null
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : isSystem
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        {/* Message Content */}
        <div className="whitespace-pre-wrap">{message.content}</div>

        {/* Function Call Debug Info */}
        {showDebug && message.functionCall && (
          <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded text-xs">
            <div className="font-semibold text-yellow-800 dark:text-yellow-200">
              Function Call: {message.functionCall.name}
            </div>
            <div className="mt-1 text-yellow-700 dark:text-yellow-300">
              Arguments: {JSON.stringify(message.functionCall.arguments, null, 2)}
            </div>
            {message.functionCall.result && (
              <div className="mt-1 text-yellow-700 dark:text-yellow-300">
                Result: {JSON.stringify(message.functionCall.result, null, 2)}
              </div>
            )}
          </div>
        )}

        {/* Metadata Debug Info */}
        {showDebug && message.metadata && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs">
            <div className="text-blue-800 dark:text-blue-200">
              {message.metadata.model && <div>Model: {message.metadata.model}</div>}
              {message.metadata.tokens && <div>Tokens: {message.metadata.tokens}</div>}
              {message.metadata.temperature && <div>Temperature: {message.metadata.temperature}</div>}
            </div>
          </div>
        )}

        {/* Timestamp */}
        <div 
          className={`text-xs mt-1 ${
            isUser 
              ? 'text-blue-100' 
              : isSystem 
              ? 'text-gray-400 dark:text-gray-500'
              : 'text-gray-500 dark:text-gray-400'
          }`}
        >
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
    </div>
  )
}
