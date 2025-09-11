// Database Types
export interface Database {
  public: {
    Tables: {
      knowledge_base: {
        Row: {
          id: string
          content: string
          embedding: number[]
          metadata: Json
          category: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          content: string
          embedding: number[]
          metadata?: Json
          category?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          content?: string
          embedding?: number[]
          metadata?: Json
          category?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          user_id: string | null
          messages: Json
          lead_status: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          messages?: Json
          lead_status?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          messages?: Json
          lead_status?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      leads: {
        Row: {
          id: string
          conversation_id: string | null
          contact_info: Json
          project_details: Json
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id?: string | null
          contact_info?: Json
          project_details?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string | null
          contact_info?: Json
          project_details?: Json
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      bot_settings: {
        Row: {
          id: string
          personality: string
          response_length: string
          auto_collect_contact: boolean
          knowledge_base_version: string | null
          custom_prompts: Json
          updated_at: string
        }
        Insert: {
          id?: string
          personality?: string
          response_length?: string
          auto_collect_contact?: boolean
          knowledge_base_version?: string | null
          custom_prompts?: Json
          updated_at?: string
        }
        Update: {
          id?: string
          personality?: string
          response_length?: string
          auto_collect_contact?: boolean
          knowledge_base_version?: string | null
          custom_prompts?: Json
          updated_at?: string
        }
      }
    }
    Functions: {
      match_knowledge: {
        Args: {
          query_embedding: number[]
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          content: string
          metadata: Json
          similarity: number
        }[]
      }
    }
  }
}

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// Chat Types
export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  functionCall?: FunctionCall
  metadata?: {
    tokens?: number
    model?: string
    temperature?: number
  }
}

export interface FunctionCall {
  name: string
  arguments: Record<string, any>
  result?: any
}

// Bot Configuration Types
export interface BotSettings {
  personality: 'professional' | 'friendly' | 'technical' | 'casual'
  responseLength: 'short' | 'medium' | 'long'
  temperature: number
  maxTokens: number
  autoCollectContact: boolean
  knowledgeBaseVersion: string
  customPrompts: {
    systemPrompt?: string
    greetingPrompt?: string
    farewellPrompt?: string
  }
}

// Lead and Project Types
export interface ContactInfo {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
}

export interface ProjectRequirements {
  type: 'website' | 'web_app' | 'ecommerce' | 'real_estate' | 'automotive' | 'consulting'
  budget?: string
  timeline?: string
  features: string[]
  complexity: 'simple' | 'moderate' | 'complex' | 'enterprise'
  description?: string
}

export interface Lead {
  id: string
  conversationId: string
  contactInfo: ContactInfo
  projectDetails: ProjectRequirements
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  createdAt: Date
  updatedAt: Date
}

// Conversation Types
export interface Conversation {
  id: string
  userId?: string
  messages: ChatMessage[]
  leadStatus: string
  status: 'active' | 'qualified' | 'converted' | 'lost'
  createdAt: Date
  updatedAt: Date
}

// Knowledge Base Types
export interface KnowledgeItem {
  id: string
  content: string
  embedding: number[]
  metadata: {
    source: string
    category: string
    title?: string
    section?: string
    lastUpdated?: string
  }
  category: string
  similarity?: number
}

// RAG Types
export interface RAGContext {
  query: string
  relevantKnowledge: KnowledgeItem[]
  conversationHistory: ChatMessage[]
  userProfile?: {
    interests: string[]
    projectType?: string
    previousConversations?: number
  }
}
