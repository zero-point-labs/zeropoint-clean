import { NextRequest, NextResponse } from 'next/server'
import { createEmbedding } from '@/lib/openai'

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required and must be a string' },
        { status: 400 }
      )
    }

    if (text.length > 8000) {
      return NextResponse.json(
        { error: 'Text too long. Maximum 8000 characters.' },
        { status: 400 }
      )
    }

    const embedding = await createEmbedding(text)

    return NextResponse.json({
      embedding,
      dimension: embedding.length
    })

  } catch (error) {
    console.error('Embeddings API Error:', error)
    return NextResponse.json(
      { error: 'Failed to create embedding' },
      { status: 500 }
    )
  }
}
