-- 🤖 ZeroPoint Labs AI Chatbot Database Schema
-- This file contains the complete database schema for Supabase
-- Run these commands in your Supabase SQL editor

-- Enable the pgvector extension for vector operations
CREATE EXTENSION IF NOT EXISTS vector;

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Knowledge Base Table with Vector Embeddings
CREATE TABLE IF NOT EXISTS knowledge_base (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(1536), -- OpenAI text-embedding-3-large dimension
  metadata JSONB DEFAULT '{}',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for vector similarity search
CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx ON knowledge_base 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Conversations Table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT, -- Anonymous or authenticated user identifier
  messages JSONB NOT NULL DEFAULT '[]',
  lead_status TEXT DEFAULT 'active' CHECK (lead_status IN ('active', 'qualified', 'converted', 'lost')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  contact_info JSONB DEFAULT '{}',
  project_details JSONB DEFAULT '{}',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bot Settings Table
CREATE TABLE IF NOT EXISTS bot_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personality TEXT DEFAULT 'professional' CHECK (personality IN ('professional', 'friendly', 'technical', 'casual')),
  response_length TEXT DEFAULT 'medium' CHECK (response_length IN ('short', 'medium', 'long')),
  auto_collect_contact BOOLEAN DEFAULT true,
  knowledge_base_version TEXT DEFAULT '1.0',
  custom_prompts JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default bot settings
INSERT INTO bot_settings (personality, response_length, auto_collect_contact, custom_prompts) 
VALUES (
  'professional', 
  'medium', 
  true, 
  '{"systemPrompt": "", "greetingPrompt": "Hello! I am the Zero Point Labs AI Assistant. I am here to help you learn about our web development services and find the perfect solution for your project. What can I help you with today?", "farewellPrompt": "Thank you for chatting with me! Do not hesitate to reach out if you have any more questions about Zero Point Labs services. Have a great day!"}'
) ON CONFLICT (id) DO NOTHING;

-- Vector similarity search function
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  match_threshold FLOAT DEFAULT 0.8,
  match_count INT DEFAULT 5
)
RETURNS TABLE (
  content TEXT,
  metadata JSONB,
  similarity FLOAT
) 
LANGUAGE SQL STABLE
AS $$
  SELECT 
    knowledge_base.content,
    knowledge_base.metadata,
    1 - (knowledge_base.embedding <=> query_embedding) AS similarity
  FROM knowledge_base
  WHERE 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_base.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_knowledge_base_updated_at BEFORE UPDATE ON knowledge_base 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bot_settings_updated_at BEFORE UPDATE ON bot_settings 
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS conversations_user_id_idx ON conversations(user_id);
CREATE INDEX IF NOT EXISTS conversations_created_at_idx ON conversations(created_at);
CREATE INDEX IF NOT EXISTS conversations_lead_status_idx ON conversations(lead_status);

CREATE INDEX IF NOT EXISTS leads_conversation_id_idx ON leads(conversation_id);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at);

CREATE INDEX IF NOT EXISTS knowledge_base_category_idx ON knowledge_base(category);
CREATE INDEX IF NOT EXISTS knowledge_base_created_at_idx ON knowledge_base(created_at);

-- Row Level Security (RLS) Policies
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE bot_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to knowledge_base (for RAG queries)
CREATE POLICY "Allow public read access to knowledge_base" ON knowledge_base
  FOR SELECT USING (true);

-- Allow public insert/update access to conversations (for chat functionality)
CREATE POLICY "Allow public access to conversations" ON conversations
  FOR ALL USING (true);

-- Allow public insert access to leads (for lead collection)
CREATE POLICY "Allow public insert access to leads" ON leads
  FOR INSERT WITH CHECK (true);

-- Allow public read access to leads for the conversation owner
CREATE POLICY "Allow public read access to leads" ON leads
  FOR SELECT USING (true);

-- Allow public read access to bot_settings
CREATE POLICY "Allow public read access to bot_settings" ON bot_settings
  FOR SELECT USING (true);

-- Allow service role full access to all tables
CREATE POLICY "Allow service role full access to knowledge_base" ON knowledge_base
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to conversations" ON conversations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to bot_settings" ON bot_settings
  FOR ALL USING (auth.role() = 'service_role');
