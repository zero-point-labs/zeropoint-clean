#!/usr/bin/env ts-node

/**
 * Knowledge Base Processing Script
 * 
 * This script processes the markdown files in the knowledge-base directory,
 * creates embeddings using OpenAI, and stores them in Supabase with pgvector.
 * 
 * Usage: npm run process-knowledge
 */

import fs from 'fs'
import path from 'path'
import { createEmbedding } from '../src/lib/openai.js'
import { supabaseAdmin } from '../src/lib/supabase.js'
import type { KnowledgeItem } from '../src/lib/types.js'

// Configuration
const KNOWLEDGE_BASE_DIR = path.join(process.cwd(), 'knowledge-base')
const CHUNK_SIZE = 1000 // Characters per chunk
const CHUNK_OVERLAP = 200 // Overlap between chunks

interface ProcessedChunk {
  content: string
  metadata: {
    source: string
    category: string
    title?: string
    section?: string
    chunkIndex: number
    totalChunks: number
  }
}

// Utility functions
const chunkText = (text: string, chunkSize: number = CHUNK_SIZE, overlap: number = CHUNK_OVERLAP): string[] => {
  const chunks: string[] = []
  let start = 0
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length)
    chunks.push(text.slice(start, end))
    
    if (end === text.length) break
    start = end - overlap
  }
  
  return chunks
}

const extractTitleFromMarkdown = (content: string): string | undefined => {
  const titleMatch = content.match(/^#\s+(.+)/m)
  return titleMatch ? titleMatch[1].trim() : undefined
}

const categorizeByFilename = (filename: string): string => {
  const name = path.parse(filename).name.toLowerCase()
  
  if (name.includes('company') || name.includes('info')) return 'company'
  if (name.includes('service')) return 'services'
  if (name.includes('pricing') || name.includes('package')) return 'pricing'
  if (name.includes('process') || name.includes('methodology')) return 'process'
  if (name.includes('faq') || name.includes('question')) return 'faq'
  if (name.includes('personality') || name.includes('bot')) return 'bot_config'
  
  return 'general'
}

const processMarkdownFile = async (filePath: string): Promise<ProcessedChunk[]> => {
  console.log(`📄 Processing: ${path.basename(filePath)}`)
  
  const content = fs.readFileSync(filePath, 'utf-8')
  const filename = path.basename(filePath)
  const title = extractTitleFromMarkdown(content)
  const category = categorizeByFilename(filename)
  
  // Remove markdown headers and excessive whitespace
  const cleanContent = content
    .replace(/^#{1,6}\s+/gm, '') // Remove markdown headers
    .replace(/\n{3,}/g, '\n\n') // Replace multiple newlines with double
    .trim()
  
  if (cleanContent.length < 50) {
    console.log(`⚠️  Skipping ${filename}: Content too short`)
    return []
  }
  
  const chunks = chunkText(cleanContent)
  
  return chunks.map((chunk, index) => ({
    content: chunk.trim(),
    metadata: {
      source: filename,
      category,
      title,
      chunkIndex: index,
      totalChunks: chunks.length
    }
  }))
}

const main = async () => {
  console.log('🤖 ZeroPoint Labs Knowledge Base Processing')
  console.log('===========================================\n')
  
  try {
    // Check if knowledge base directory exists
    if (!fs.existsSync(KNOWLEDGE_BASE_DIR)) {
      console.error(`❌ Knowledge base directory not found: ${KNOWLEDGE_BASE_DIR}`)
      process.exit(1)
    }
    
    // Get all markdown files
    const files = fs.readdirSync(KNOWLEDGE_BASE_DIR)
      .filter(file => file.endsWith('.md') && file !== 'README.md')
      .map(file => path.join(KNOWLEDGE_BASE_DIR, file))
    
    console.log(`📚 Found ${files.length} markdown files to process\n`)
    
    if (files.length === 0) {
      console.log('⚠️  No markdown files found to process')
      return
    }
    
    // Clear existing knowledge base
    console.log('🗑️  Clearing existing knowledge base...')
    const { error: deleteError } = await supabaseAdmin
      .from('knowledge_base')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all records
    
    if (deleteError && deleteError.code !== 'PGRST116') { // PGRST116 = no rows to delete
      console.error('❌ Failed to clear knowledge base:', deleteError)
      process.exit(1)
    }
    
    // Process all files
    const allChunks: ProcessedChunk[] = []
    
    for (const filePath of files) {
      const chunks = await processMarkdownFile(filePath)
      allChunks.push(...chunks)
    }
    
    console.log(`\n📊 Total chunks created: ${allChunks.length}`)
    console.log('🧠 Creating embeddings and storing in database...\n')
    
    // Process chunks in batches to avoid API rate limits
    const BATCH_SIZE = 10
    let processedCount = 0
    let successCount = 0
    
    for (let i = 0; i < allChunks.length; i += BATCH_SIZE) {
      const batch = allChunks.slice(i, i + BATCH_SIZE)
      
      console.log(`Processing batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(allChunks.length / BATCH_SIZE)}`)
      
      const promises = batch.map(async (chunk) => {
        try {
          // Create embedding
          const embedding = await createEmbedding(chunk.content)
          
          // Store in database
          const { error } = await supabaseAdmin
            .from('knowledge_base')
            .insert({
              content: chunk.content,
              embedding: embedding,
              metadata: chunk.metadata,
              category: chunk.metadata.category
            })
          
          if (error) {
            console.error(`❌ Failed to store chunk from ${chunk.metadata.source}:`, error)
            return false
          }
          
          return true
        } catch (error) {
          console.error(`❌ Failed to process chunk from ${chunk.metadata.source}:`, error)
          return false
        }
      })
      
      const results = await Promise.all(promises)
      const batchSuccessCount = results.filter(Boolean).length
      
      processedCount += batch.length
      successCount += batchSuccessCount
      
      console.log(`✅ Batch completed: ${batchSuccessCount}/${batch.length} successful`)
      
      // Small delay to avoid API rate limits
      if (i + BATCH_SIZE < allChunks.length) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    console.log('\n🎉 Knowledge base processing completed!')
    console.log(`📊 Summary:`)
    console.log(`   - Files processed: ${files.length}`)
    console.log(`   - Total chunks: ${allChunks.length}`)
    console.log(`   - Successfully stored: ${successCount}`)
    console.log(`   - Failed: ${processedCount - successCount}`)
    
    if (successCount === allChunks.length) {
      console.log('\n✅ All chunks processed successfully!')
      console.log('🚀 Your AI chatbot is now ready with the complete knowledge base!')
    } else {
      console.log(`\n⚠️  ${processedCount - successCount} chunks failed to process. Check logs above.`)
    }
    
  } catch (error) {
    console.error('❌ Fatal error during processing:', error)
    process.exit(1)
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export default main
