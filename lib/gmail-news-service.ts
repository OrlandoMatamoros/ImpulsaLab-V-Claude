import { google } from 'googleapis'

export class GmailNewsService {
  private gmail: any
  
  constructor() {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      'http://localhost:8080'
    )
    
    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN
    })
    
    this.gmail = google.gmail({ version: 'v1', auth: oauth2Client })
  }
  
  async fetchAndStoreNews() {
    try {
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: 'from:googlealerts-noreply@google.com',
        maxResults: 10
      })
      
      if (!response.data.messages) {
        return []
      }
      
      const newsItems = []
      for (const message of response.data.messages) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        })
        
        const parsed = this.parseGoogleAlert(email.data)
        newsItems.push(...parsed)
      }
      
      return newsItems
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }
  
  parseGoogleAlert(message: any) {
    const news = []
    let htmlBody = ''
    
    const extractBody = (parts: any[]) => {
      for (const part of parts || []) {
        if (part.mimeType === 'text/html' && part.body?.data) {
          htmlBody = Buffer.from(part.body.data, 'base64').toString()
        }
        if (part.parts) extractBody(part.parts)
      }
    }
    
    if (message.payload) extractBody([message.payload])
    
    const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([^<]+)<\/a>/gi
    let match
    
    while ((match = linkRegex.exec(htmlBody)) !== null) {
      const [_, url, title] = match
      
      if (!url.includes('google.com') && !url.includes('accounts.google')) {
        const cleanUrl = url.includes('url?q=') ? 
          decodeURIComponent(url.match(/url\?q=([^&]+)/)?.[1] || url) : url
        
        news.push({
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          title: title.replace(/&[^;]+;/g, '').trim(),
          summary: 'Noticia de Google Alerts',
          sourceUrl: cleanUrl,
          source: new URL(cleanUrl).hostname.replace('www.', ''),
          date: new Date().toISOString(),
          category: 'market-trends',
          tags: ['AI', 'Tech'],
          readTime: 5,
          imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          isTrending: Math.random() > 0.5,
          isFeatured: Math.random() > 0.8
        })
      }
    }
    
    return news.slice(0, 5) // Limitar a 5 por mensaje
  }
  
  async getLatestNews() {
    return this.fetchAndStoreNews()
  }
}
