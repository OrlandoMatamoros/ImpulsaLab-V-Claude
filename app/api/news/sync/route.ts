import { NextResponse } from 'next/server'
import { GmailNewsService } from '@/lib/gmail-news-service'

export async function GET() {
  try {
    const service = new GmailNewsService()
    const news = await service.getLatestNews()
    return NextResponse.json(news)
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}
