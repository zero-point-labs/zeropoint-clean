#!/usr/bin/env ts-node

/**
 * Setup Verification Script
 * 
 * This script tests all components of the AI chatbot setup:
 * - Environment variables
 * - OpenAI API connection
 * - Supabase database connection
 * - Database schema validation
 * - Vector search functionality
 * 
 * Usage: npm run test-setup
 */

import { createEmbedding, createChatCompletion } from '../src/lib/openai'
import { supabase, supabaseAdmin, searchKnowledge } from '../src/lib/supabase'

const testOpenAI = async (): Promise<boolean> => {
  console.log('🤖 Testing OpenAI connection...')
  
  try {
    // Test embedding creation
    console.log('  - Testing embedding creation...')
    const embedding = await createEmbedding('Test embedding for Zero Point Labs')
    if (!Array.isArray(embedding) || embedding.length !== 1536) {
      throw new Error('Invalid embedding response')
    }
    console.log('    ✅ Embedding creation successful')
    
    // Test chat completion
    console.log('  - Testing chat completion...')
    const completion = await createChatCompletion([
      { role: 'user', content: 'Say "Setup test successful" if you can read this.' }
    ], { maxTokens: 50 })
    
    if (!completion.choices[0]?.message?.content) {
      throw new Error('No response from chat completion')
    }
    console.log('    ✅ Chat completion successful')
    
    return true
  } catch (error) {
    console.log('    ❌ OpenAI test failed:', error)
    return false
  }
}

const testSupabase = async (): Promise<boolean> => {
  console.log('🏗️  Testing Supabase connection...')
  
  try {
    // Test basic connection
    console.log('  - Testing database connection...')
    const { data, error } = await supabase.from('bot_settings').select('count').single()
    if (error && error.code !== 'PGRST116') {
      throw new Error(`Database connection failed: ${error.message}`)
    }
    console.log('    ✅ Database connection successful')
    
    return true
  } catch (error) {
    console.log('    ❌ Supabase test failed:', error)
    return false
  }
}

const testDatabaseSchema = async (): Promise<boolean> => {
  console.log('🗄️  Testing database schema...')
  
  const requiredTables = ['knowledge_base', 'conversations', 'leads', 'bot_settings'] as const
  
  try {
    for (const table of requiredTables) {
      console.log(`  - Checking table: ${table}`)
      const { error } = await supabaseAdmin.from(table).select('count')
      if (error) {
        throw new Error(`Table ${table} not found or accessible: ${error.message}`)
      }
      console.log(`    ✅ Table ${table} exists`)
    }
    
    // Test pgvector function
    console.log('  - Testing pgvector function...')
    const testEmbedding = new Array(1536).fill(0.1)
    const { error: funcError } = await supabaseAdmin.rpc('match_knowledge', {
      query_embedding: testEmbedding,
      match_threshold: 0.5,
      match_count: 1
    })
    
    if (funcError) {
      throw new Error(`pgvector function test failed: ${funcError.message}`)
    }
    console.log('    ✅ pgvector function working')
    
    return true
  } catch (error) {
    console.log('    ❌ Schema test failed:', error)
    return false
  }
}

const testKnowledgeBase = async (): Promise<boolean> => {
  console.log('📚 Testing knowledge base...')
  
  try {
    // Check if knowledge base has content
    console.log('  - Checking knowledge base content...')
    const { data, error } = await supabaseAdmin
      .from('knowledge_base')
      .select('count')
    
    if (error) {
      throw new Error(`Failed to query knowledge base: ${error.message}`)
    }
    
    if (!data || data.length === 0) {
      console.log('    ⚠️  Knowledge base is empty - run `npm run process-knowledge` to populate it')
      return true // Not a failure, just needs population
    }
    
    console.log(`    ✅ Knowledge base has content`)
    
    // Test semantic search
    console.log('  - Testing semantic search...')
    const results = await searchKnowledge('Zero Point Labs services', 0.5, 2)
    if (results.length === 0) {
      console.log('    ⚠️  No search results found - knowledge base may need to be populated')
    } else {
      console.log(`    ✅ Semantic search returned ${results.length} results`)
    }
    
    return true
  } catch (error) {
    console.log('    ❌ Knowledge base test failed:', error)
    return false
  }
}

const testEnvironmentVariables = (): boolean => {
  console.log('🔑 Testing environment variables...')
  
  const requiredVars = [
    'OPENAI_API_KEY',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ]
  
  let allPresent = true
  
  for (const varName of requiredVars) {
    const value = process.env[varName]
    if (!value) {
      console.log(`    ❌ Missing: ${varName}`)
      allPresent = false
    } else {
      console.log(`    ✅ Found: ${varName}`)
    }
  }
  
  return allPresent
}

const main = async () => {
  console.log('🤖 ZeroPoint Labs AI Chatbot Setup Verification')
  console.log('===============================================\n')
  
  const results = {
    environment: false,
    openai: false,
    supabase: false,
    schema: false,
    knowledge: false
  }
  
  // Test environment variables
  results.environment = testEnvironmentVariables()
  console.log()
  
  if (!results.environment) {
    console.log('❌ Environment variables missing. Please check your .env.local file.')
    console.log('📝 Copy .env.example to .env.local and fill in your API keys.')
    process.exit(1)
  }
  
  // Test OpenAI
  results.openai = await testOpenAI()
  console.log()
  
  // Test Supabase
  results.supabase = await testSupabase()
  console.log()
  
  // Test database schema
  if (results.supabase) {
    results.schema = await testDatabaseSchema()
    console.log()
  }
  
  // Test knowledge base
  if (results.schema) {
    results.knowledge = await testKnowledgeBase()
    console.log()
  }
  
  // Final summary
  console.log('📊 Setup Verification Summary')
  console.log('============================')
  console.log(`Environment Variables: ${results.environment ? '✅' : '❌'}`)
  console.log(`OpenAI API: ${results.openai ? '✅' : '❌'}`)
  console.log(`Supabase Connection: ${results.supabase ? '✅' : '❌'}`)
  console.log(`Database Schema: ${results.schema ? '✅' : '❌'}`)
  console.log(`Knowledge Base: ${results.knowledge ? '✅' : '❌'}\n`)
  
  const allPassed = Object.values(results).every(Boolean)
  
  if (allPassed) {
    console.log('🎉 All tests passed! Your AI chatbot is ready!')
    console.log('🚀 You can now:')
    console.log('   1. Visit http://localhost:3000/ai-testing to test the chat interface')
    console.log('   2. Run `npm run process-knowledge` if knowledge base is empty')
    console.log('   3. Start integrating the chatbot into your main website')
  } else {
    console.log('❌ Some tests failed. Please address the issues above before proceeding.')
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export default main
