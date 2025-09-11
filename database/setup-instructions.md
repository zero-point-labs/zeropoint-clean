# 🤖 ZeroPoint Labs AI Chatbot Database Setup

## Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **New Project**: Create a new Supabase project
3. **Environment Variables**: Copy `.env.example` to `.env.local`

## Step-by-Step Setup

### 1. Create Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `zeropoint-ai-chatbot`
   - **Database Password**: Generate a strong password
   - **Region**: Choose closest to your users (e.g., West Europe for Cyprus)
5. Click "Create new project"
6. Wait for project to be created (2-3 minutes)

### 2. Get Your Supabase Keys

After project creation, go to **Settings > API**:

- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: `eyJhbGc...` (starts with eyJ)
- **Service Role Key**: `eyJhbGc...` (starts with eyJ, different from anon key)

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```env
# OpenAI Configuration
OPENAI_API_KEY=sk-proj-your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview

# Supabase Configuration  
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Configuration
ADMIN_PASSWORD=your_secure_admin_password
```

### 4. Run Database Schema

1. Open your Supabase dashboard
2. Go to **SQL Editor** in the left sidebar
3. Click "New Query"
4. Copy the entire contents of `database/schema.sql`
5. Paste into the SQL editor
6. Click "Run" button
7. Verify tables are created in **Table Editor**

### 5. Enable pgvector Extension

The schema includes pgvector extension setup, but verify it's enabled:

1. Go to **Database > Extensions** in Supabase dashboard
2. Search for "vector"
3. Enable **pgvector** extension if not already enabled

### 6. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/ai-testing`
3. Try sending a message to test the chatbot

## Database Tables Created

### 📚 `knowledge_base`
- Stores knowledge articles with vector embeddings
- Enables semantic search using pgvector
- Includes metadata for categorization

### 💬 `conversations`
- Stores complete chat conversations
- Tracks user sessions and lead status
- Contains message history in JSONB format

### 👤 `leads`
- Stores collected contact information
- Links to conversations for context
- Tracks lead qualification status

### ⚙️ `bot_settings`
- Stores bot configuration and personality
- Allows runtime settings adjustment
- Contains custom prompts and behavior settings

## Verification Checklist

- [ ] Supabase project created
- [ ] Environment variables configured
- [ ] Database schema executed successfully
- [ ] pgvector extension enabled
- [ ] All 4 tables created (knowledge_base, conversations, leads, bot_settings)
- [ ] Default bot_settings row inserted
- [ ] AI testing page loads without errors
- [ ] Chat interface responds to messages

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables"**
   - Check `.env.local` file exists and has correct values
   - Restart development server after adding env vars

2. **"Failed to create embedding"**
   - Verify OpenAI API key is correct and active
   - Check API key has sufficient credits

3. **"Error searching knowledge base"**
   - Ensure pgvector extension is enabled
   - Verify `match_knowledge` function was created successfully

4. **Database connection errors**
   - Double-check Supabase URL and keys
   - Verify project is not paused (free tier auto-pauses after 1 week inactivity)

## Next Steps

Once setup is complete, you can:

1. **Populate Knowledge Base**: Run the knowledge base processing script
2. **Test Chat Interface**: Use `/ai-testing` page to verify functionality
3. **Configure Bot Settings**: Adjust personality and behavior
4. **Deploy to Production**: Update environment variables for production

## Support

If you encounter issues:

1. Check Supabase dashboard logs in **Logs > Database**
2. Verify API keys in **Settings > API**
3. Test database connection in **SQL Editor**
4. Review browser console for client-side errors
