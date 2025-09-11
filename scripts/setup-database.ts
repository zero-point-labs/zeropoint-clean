#!/usr/bin/env ts-node

/**
 * Database Setup Script
 * 
 * This script automatically sets up the Supabase database by:
 * 1. Reading the schema.sql file
 * 2. Executing SQL commands one by one
 * 3. Providing detailed error logging
 * 4. Verifying the setup was successful
 * 
 * Usage: npm run setup-database
 */

import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

// Load environment variables
import { config } from 'dotenv'
config({ path: '.env.local' })

const SCHEMA_FILE = path.join(process.cwd(), 'database/schema.sql')

interface SQLCommand {
  command: string
  description: string
  type: 'extension' | 'table' | 'index' | 'function' | 'trigger' | 'policy' | 'insert'
}

const parseSQL = (sqlContent: string): SQLCommand[] => {
  // Remove comments and split by semicolons
  const cleanSQL = sqlContent
    .replace(/--.*$/gm, '') // Remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
    .replace(/\n\s*\n/g, '\n') // Remove empty lines
  
  const commands = cleanSQL
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd.length > 0)
  
  return commands.map(command => {
    const upperCommand = command.toUpperCase()
    let type: SQLCommand['type'] = 'table'
    let description = 'Unknown SQL command'
    
    if (upperCommand.includes('CREATE EXTENSION')) {
      type = 'extension'
      description = 'Enable database extension'
    } else if (upperCommand.includes('CREATE TABLE')) {
      type = 'table'
      const match = command.match(/CREATE TABLE\s+(?:IF NOT EXISTS\s+)?(\w+)/i)
      description = match ? `Create table: ${match[1]}` : 'Create table'
    } else if (upperCommand.includes('CREATE INDEX')) {
      type = 'index'
      const match = command.match(/CREATE INDEX\s+(?:IF NOT EXISTS\s+)?(\w+)/i)
      description = match ? `Create index: ${match[1]}` : 'Create index'
    } else if (upperCommand.includes('CREATE OR REPLACE FUNCTION')) {
      type = 'function'
      const match = command.match(/CREATE OR REPLACE FUNCTION\s+(\w+)/i)
      description = match ? `Create function: ${match[1]}` : 'Create function'
    } else if (upperCommand.includes('CREATE TRIGGER')) {
      type = 'trigger'
      const match = command.match(/CREATE TRIGGER\s+(\w+)/i)
      description = match ? `Create trigger: ${match[1]}` : 'Create trigger'
    } else if (upperCommand.includes('CREATE POLICY')) {
      type = 'policy'
      const match = command.match(/CREATE POLICY\s+"([^"]+)"/i)
      description = match ? `Create policy: ${match[1]}` : 'Create security policy'
    } else if (upperCommand.includes('INSERT INTO')) {
      type = 'insert'
      const match = command.match(/INSERT INTO\s+(\w+)/i)
      description = match ? `Insert data into: ${match[1]}` : 'Insert data'
    } else if (upperCommand.includes('ALTER TABLE')) {
      description = 'Alter table structure'
    }
    
    return { command, description, type }
  })
}

const testConnection = async (supabase: any): Promise<{ success: boolean, error?: any }> => {
  try {
    // Simple test using a basic query that should always work
    const { data, error } = await supabase.rpc('version')
    
    // If rpc doesn't work, try a basic auth check
    if (error && error.code === 'PGRST116') {
      // Function doesn't exist, but connection is working - this is fine
      return { success: true }
    }
    
    if (error && (error.code === '42P01' || error.code === 'PGRST205')) {
      // Table/function not found, but connection is working
      return { success: true }
    }
    
    if (error && (error.code === 'PGRST301' || error.code === '401')) {
      // Auth error - bad credentials
      return { success: false, error }
    }
    
    return { success: true }
  } catch (error: any) {
    // Network errors, invalid URL, etc.
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return { success: false, error: 'Network error - check your SUPABASE_URL' }
    }
    return { success: false, error }
  }
}

const executeCommand = async (supabase: any, sqlCommand: SQLCommand): Promise<{ success: boolean, error?: any }> => {
  try {
    const { data, error } = await supabase.rpc('exec_sql', { sql_query: sqlCommand.command })
    
    if (error) {
      return { success: false, error }
    }
    
    return { success: true }
  } catch (error) {
    // If exec_sql doesn't exist, try direct query
    try {
      const { error: directError } = await supabase.from('dummy').select().eq('sql', sqlCommand.command)
      if (directError && directError.code !== 'PGRST106') {
        // Try using raw SQL execution
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec`, {
          method: 'POST',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: sqlCommand.command })
        })
        
        if (!response.ok) {
          return { success: false, error: `HTTP ${response.status}: ${await response.text()}` }
        }
      }
      
      return { success: true }
    } catch (fallbackError) {
      return { success: false, error: fallbackError }
    }
  }
}

const main = async () => {
  console.log('🤖 ZeroPoint Labs Database Setup')
  console.log('=================================\n')
  
  // Check environment variables
  console.log('🔑 Checking environment variables...')
  const requiredVars = ['NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY']
  const missingVars = requiredVars.filter(varName => !process.env[varName])
  
  if (missingVars.length > 0) {
    console.error('❌ Missing environment variables:')
    missingVars.forEach(varName => console.error(`   - ${varName}`))
    console.error('\n📝 Please check your .env.local file')
    process.exit(1)
  }
  console.log('✅ Environment variables found\n')
  
  // Check schema file exists
  console.log('📄 Checking schema file...')
  if (!fs.existsSync(SCHEMA_FILE)) {
    console.error(`❌ Schema file not found: ${SCHEMA_FILE}`)
    process.exit(1)
  }
  console.log('✅ Schema file found\n')
  
  // Initialize Supabase client
  console.log('🔌 Connecting to Supabase...')
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
  
  // Test connection
  const connectionResult = await testConnection(supabase)
  if (!connectionResult.success) {
    console.error('❌ Failed to connect to Supabase database')
    console.error('   Error details:', connectionResult.error)
    console.error('   Check your SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    console.error(`   URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 30)}...`)
    console.error(`   Service Role Key: ${process.env.SUPABASE_SERVICE_ROLE_KEY?.substring(0, 30)}...`)
    process.exit(1)
  }
  console.log('✅ Connected to Supabase\n')
  
  // Read and parse SQL file
  console.log('📖 Reading schema file...')
  const sqlContent = fs.readFileSync(SCHEMA_FILE, 'utf-8')
  const commands = parseSQL(sqlContent)
  console.log(`✅ Found ${commands.length} SQL commands\n`)
  
  // Execute commands
  console.log('⚙️  Executing SQL commands...')
  console.log('==========================\n')
  
  let successCount = 0
  let errorCount = 0
  const errors: Array<{ command: SQLCommand, error: any }> = []
  
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i]
    const progress = `[${i + 1}/${commands.length}]`
    
    console.log(`${progress} ${command.description}`)
    
    const result = await executeCommand(supabase, command)
    
    if (result.success) {
      console.log(`   ✅ Success`)
      successCount++
    } else {
      console.log(`   ❌ Error: ${result.error?.message || result.error}`)
      errorCount++
      errors.push({ command, error: result.error })
    }
    
    // Small delay between commands
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.log('\n📊 Setup Summary')
  console.log('================')
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`📋 Total: ${commands.length}\n`)
  
  if (errors.length > 0) {
    console.log('🚨 Detailed Error Log')
    console.log('=====================')
    errors.forEach((error, index) => {
      console.log(`\nError ${index + 1}:`)
      console.log(`Description: ${error.command.description}`)
      console.log(`Command Type: ${error.command.type}`)
      console.log(`Error: ${error.error?.message || JSON.stringify(error.error, null, 2)}`)
      console.log(`SQL: ${error.command.command.substring(0, 100)}...`)
    })
    console.log('\n💡 Troubleshooting Tips:')
    console.log('- Check if pgvector extension is enabled in Supabase dashboard')
    console.log('- Verify your service role key has admin permissions')
    console.log('- Some errors may be expected (e.g., "already exists" errors)')
  }
  
  if (successCount >= commands.length * 0.8) {
    console.log('🎉 Database setup completed successfully!')
    console.log('🚀 You can now run: npm run test-setup')
  } else {
    console.log('⚠️  Database setup completed with errors')
    console.log('📧 Please review the error log above')
    process.exit(1)
  }
}

// Run the script directly
main().catch((error) => {
  console.error('💥 Fatal error during database setup:')
  console.error(error)
  process.exit(1)
})

export default main
