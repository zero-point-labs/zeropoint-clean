import { createClient } from '@supabase/supabase-js'
import type { Database } from './types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Client for browser/client-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations with full access
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceRoleKey
)

// Utility functions
export const createEmbedding = async (text: string): Promise<number[]> => {
  // Import OpenAI client directly to avoid server-side fetch issues
  const OpenAI = (await import('openai')).default
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })
  
  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-large',
      input: text,
    })
    
    return response.data[0].embedding
  } catch (error) {
    console.error('Embedding creation error:', error)
    throw error
  }
}

export const searchKnowledge = async (
  query: string,
  matchThreshold: number = 0.8,
  matchCount: number = 5
): Promise<any[]> => {
  const embedding = await createEmbedding(query)
  
  const { data, error } = await supabase
    .rpc('match_knowledge', {
      query_embedding: embedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
    })
  
  if (error) {
    console.error('Error searching knowledge base:', error)
    return []
  }
  
  return data || []
}
