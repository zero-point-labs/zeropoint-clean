'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { SettingsPanel } from '@/components/admin/SettingsPanel'
import { BotSettings } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function AITestingPage() {
  const [settings, setSettings] = useState<Partial<BotSettings>>({
    personality: 'professional',
    responseLength: 'medium',
    temperature: 0.7,
    maxTokens: 1000,
    autoCollectContact: true,
  })
  
  const [showDebug, setShowDebug] = useState(false)

  const handleSettingsChange = (newSettings: Partial<BotSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            🤖 ZeroPoint Labs AI Chatbot Testing
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Test and configure the AI assistant with real-time settings adjustments
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Chat Interface - Full Width */}
          <Card className="h-[600px]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">Chat Interface</CardTitle>
                <div className="flex items-center space-x-2">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showDebug}
                      onChange={(e) => setShowDebug(e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>Debug Mode</span>
                  </label>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[calc(100%-80px)] p-0">
              <ChatInterface
                settings={settings}
                onSettingsChange={handleSettingsChange}
                className="h-full rounded-none"
                showDebug={showDebug}
              />
            </CardContent>
          </Card>

          {/* Settings Panel - Below Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Bot Settings</CardTitle>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Adjust settings and see changes in real-time
              </p>
            </CardHeader>
            <CardContent>
              <SettingsPanel
                settings={settings}
                onSettingsChange={handleSettingsChange}
              />
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">AI Assistant Online</span>
              </div>
              <div className="text-gray-500 dark:text-gray-500">|</div>
              <span className="text-gray-600 dark:text-gray-400">
                Model: {settings.temperature ? 'GPT-4 Turbo' : 'Loading...'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 dark:text-gray-400">
                Temperature: {settings.temperature || 0.7}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                Mode: {settings.personality || 'professional'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
