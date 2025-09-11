'use client'

import { BotSettings } from '@/lib/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface SettingsPanelProps {
  settings: Partial<BotSettings>
  onSettingsChange: (settings: Partial<BotSettings>) => void
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  
  const handlePersonalityChange = (personality: BotSettings['personality']) => {
    onSettingsChange({ personality })
  }

  const handleResponseLengthChange = (responseLength: BotSettings['responseLength']) => {
    onSettingsChange({ responseLength })
  }

  const handleTemperatureChange = (temperature: number) => {
    onSettingsChange({ temperature })
  }

  const handleMaxTokensChange = (maxTokens: number) => {
    onSettingsChange({ maxTokens })
  }

  const handleAutoCollectContactChange = (autoCollectContact: boolean) => {
    onSettingsChange({ autoCollectContact })
  }

  const resetToDefaults = () => {
    onSettingsChange({
      personality: 'professional',
      responseLength: 'medium',
      temperature: 0.7,
      maxTokens: 1000,
      autoCollectContact: true,
    })
  }

  return (
    <div className="space-y-6">
      {/* Personality Settings */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Bot Personality
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'professional', label: 'Professional' },
            { value: 'friendly', label: 'Friendly' },
            { value: 'technical', label: 'Technical' },
            { value: 'casual', label: 'Casual' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handlePersonalityChange(value as BotSettings['personality'])}
              className={`p-2 text-sm rounded-md border transition-colors ${
                settings.personality === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Response Length */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Response Length
        </h3>
        <div className="flex gap-2">
          {[
            { value: 'short', label: 'Short' },
            { value: 'medium', label: 'Medium' },
            { value: 'long', label: 'Long' }
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleResponseLengthChange(value as BotSettings['responseLength'])}
              className={`flex-1 p-2 text-sm rounded-md border transition-colors ${
                settings.responseLength === value
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Advanced Settings */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Advanced Settings
        </h3>
        
        {/* Temperature */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Temperature: {settings.temperature?.toFixed(1) || '0.7'}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.temperature || 0.7}
            onChange={(e) => handleTemperatureChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Precise</span>
            <span>Creative</span>
          </div>
        </div>

        {/* Max Tokens */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Max Tokens: {settings.maxTokens || 1000}
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={settings.maxTokens || 1000}
            onChange={(e) => handleMaxTokensChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Behavior Settings */}
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Behavior
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Auto-collect Contact Info
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Automatically ask for contact details during conversations
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoCollectContact !== false}
            onChange={(e) => handleAutoCollectContactChange(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <Separator />

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={resetToDefaults}
          variant="outline"
          className="w-full"
        >
          Reset to Defaults
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Changes apply immediately to new messages
          </p>
        </div>
      </div>
    </div>
  )
}
