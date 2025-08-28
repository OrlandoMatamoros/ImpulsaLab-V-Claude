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
  
  async getLatestNews() {
    try {
      console.log('📧 Buscando emails de Google Alerts...')
      
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: 'from:googlealerts-noreply@google.com',
        maxResults: 10
      })
      
      console.log(`�� Encontrados: ${response.data.messages?.length || 0} mensajes`)
      
      if (!response.data.messages || response.data.messages.length === 0) {
        return []
      }
      
      const news = []
      
      for (const message of response.data.messages.slice(0, 3)) {
        console.log(`📨 Procesando mensaje ID: ${message.id}`)
        
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        })
        
        // Extraer el HTML del email
        let htmlBody = ''
        const extractBody = (parts: any[]) => {
          for (const part of parts || []) {
            if (part.mimeType === 'text/html' && part.body?.data) {
              htmlBody = Buffer.from(part.body.data, 'base64').toString()
            }
            if (part.parts) extractBody(part.parts)
          }
        }
        
        if (email.data.payload) extractBody([email.data.payload])
        
        console.log(`📄 HTML extraído, longitud: ${htmlBody.length}`)
        
        // Buscar links de noticias
        const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([^<]+)<\/a>/gi
        let match
        let count = 0
        
        while ((match = linkRegex.exec(htmlBody)) !== null && count < 5) {
          const [_, url, title] = match
          
          if (!url.includes('google.com') && title.length > 20) {
            count++
            console.log(`✅ Noticia encontrada: ${title.substring(0, 50)}...`)
            
            news.push({
              id: `news-${Date.now()}-${count}`,
              title: title.replace(/&[^;]+;/g, '').trim(),
              summary: 'Noticia desde Google Alerts',
              content: '',
              sourceUrl: url,
              source: 'Google Alerts',
              date: new Date().toISOString(),
              category: 'market-trends',
              tags: ['AI', 'Technology'],
              readTime: 5,
              imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995',
              isTrending: count === 1,
              isFeatured: count === 1
            })
          }
        }
        
        console.log(`📰 Noticias extraídas de este mensaje: ${count}`)
      }
      
      console.log(`✨ Total de noticias procesadas: ${news.length}`)
      return news
      
    } catch (error: any) {
      console.error('❌ Error en GmailNewsService:', error.message)
      throw error
    }
  }
  
  async fetchAndStoreNews() {
    return this.getLatestNews()
  }
}
