'use client'

import { ChatMessage } from '@/lib/types'
import { MessageBubble } from './MessageBubble'

interface MessageListProps {
  messages: ChatMessage[]
  showDebug?: boolean
}

export function MessageList({ messages, showDebug = false }: MessageListProps) {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <MessageBubble 
          key={message.id} 
          message={message} 
          showDebug={showDebug}
        />
      ))}
    </div>
  )
}
