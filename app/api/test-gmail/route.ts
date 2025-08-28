import { NextResponse } from 'next/server'
import { google } from 'googleapis'

export async function GET() {
  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'http://localhost:8080'
    )
    
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    })
    
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client })
    
    const response = await gmail.users.messages.list({
      userId: 'me',
      q: 'from:googlealerts-noreply@google.com',
      maxResults: 5
    })
    
    if (!response.data.messages) {
      return NextResponse.json({ message: 'No emails found' })
    }
    
    const firstMessage = await gmail.users.messages.get({
      userId: 'me',
      id: response.data.messages[0].id,
      format: 'full'
    })
    
    let htmlBody = ''
    const extractBody = (parts: any[]) => {
      for (const part of parts || []) {
        if (part.mimeType === 'text/html' && part.body?.data) {
          htmlBody = Buffer.from(part.body.data, 'base64').toString()
        }
        if (part.parts) extractBody(part.parts)
      }
    }
    
    if (firstMessage.data.payload) {
      extractBody([firstMessage.data.payload])
    }
    
    // Extraer TODOS los links con su texto
    const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>([^<]*)<\/a>/gi
    const links = []
    let match
    
    while ((match = linkRegex.exec(htmlBody)) !== null && links.length < 10) {
      links.push({
        url: match[1].substring(0, 100), // Primeros 100 caracteres del URL
        text: match[2].substring(0, 50)  // Primeros 50 caracteres del texto
      })
    }
    
    return NextResponse.json({
      message: 'Link analysis',
      totalMessages: response.data.messages.length,
      htmlLength: htmlBody.length,
      first10Links: links
    })
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
