export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
        Relationships: []
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
        Relationships: []
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
        Relationships: [
          {
            foreignKeyName: "leads_conversation_id_fkey"
            columns: ["conversation_id"]
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
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
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
