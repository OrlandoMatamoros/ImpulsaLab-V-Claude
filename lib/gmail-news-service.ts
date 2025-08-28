import { google } from 'googleapis'

interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  sourceUrl: string
  source: string
  date: string
  category: string
  tags: string[]
  readTime: number
  imageUrl: string
  isTrending: boolean
  isFeatured: boolean
}

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
  
  extractRealUrl(googleUrl: string): string {
    // Los links vienen como: https://www.google.com/alerts/feedback?ffu=URL_REAL
    const match = googleUrl.match(/ffu=([^&]+)/)
    if (match) {
      return decodeURIComponent(match[1])
    }
    return googleUrl
  }
  
  extractSource(url: string): string {
    try {
      const hostname = new URL(url).hostname
      return hostname.replace('www.', '').split('.')[0]
    } catch {
      return 'News Source'
    }
  }
  
  categorizeNews(title: string): string {
    const text = title.toLowerCase()
    if (text.includes('launch') || text.includes('lanza')) return 'product-launches'
    if (text.includes('research') || text.includes('estudio')) return 'research'
    if (text.includes('business') || text.includes('negocio') || text.includes('empresa')) return 'business-ai'
    if (text.includes('regulation') || text.includes('ley')) return 'regulations'
    return 'market-trends'
  }
  
  async fetchAndStoreNews(): Promise<NewsItem[]> {
    try {
      console.log('Fetching Google Alerts emails...')
      
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: 'from:googlealerts-noreply@google.com',
        maxResults: 10
      })
      
      if (!response.data.messages) {
        console.log('No messages found')
        return []
      }
      
      console.log(`Found ${response.data.messages.length} messages`)
      const allNews: NewsItem[] = []
      let globalIndex = 0
      
      for (const message of response.data.messages.slice(0, 5)) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        })
        
        const headers = email.data.payload.headers
        const dateHeader = headers.find((h: any) => h.name === 'Date')
        const subjectHeader = headers.find((h: any) => h.name === 'Subject')
        const emailDate = dateHeader ? new Date(dateHeader.value).toISOString() : new Date().toISOString()
        const alertTopic = subjectHeader ? subjectHeader.value.replace('Alerta de Google:', '').trim() : 'AI News'
        
        let htmlBody = ''
        const extractBody = (parts: any[]) => {
          for (const part of parts || []) {
            if (part.mimeType === 'text/html' && part.body?.data) {
              htmlBody = Buffer.from(part.body.data, 'base64').toString()
            }
            if (part.parts) extractBody(part.parts)
          }
        }
        
        if (email.data.payload) {
          extractBody([email.data.payload])
        }
        
        // Buscar los títulos de noticias y sus URLs
        // Google Alerts usa un patrón donde el título viene antes del link de feedback
        const sections = htmlBody.split('Marcar como no importante')
        
        for (let i = 0; i < sections.length - 1; i++) {
          const section = sections[i]
          
          // Buscar el link de feedback que contiene la URL real
          const feedbackMatch = section.match(/href="([^"]*google\.com\/alerts\/feedback[^"]*ffu=([^"&]+)[^"]*)"/i)
          if (!feedbackMatch) continue
          
          const realUrl = decodeURIComponent(feedbackMatch[2])
          
          // Buscar el título (suele estar en un tag con estilo específico)
          const titleMatch = section.match(/>([^<]{20,200})<\/a>/gi)
          let title = alertTopic // Usar el tema del alert como fallback
          
          if (titleMatch && titleMatch.length > 0) {
            // Limpiar y obtener el último match que suele ser el título
            const lastMatch = titleMatch[titleMatch.length - 1]
            title = lastMatch.replace(/<[^>]*>/g, '').replace(/>/g, '').replace(/</g, '').trim()
          }
          
          // Si no encontramos un buen título, intentar extraerlo del URL
          if (title === alertTopic || title.length < 10) {
            const urlParts = realUrl.split('/')
            title = urlParts[urlParts.length - 1]
              .replace(/-/g, ' ')
              .replace(/_/g, ' ')
              .substring(0, 100)
          }
          
          allNews.push({
            id: `news-${Date.now()}-${globalIndex}`,
            title: title.substring(0, 200),
            summary: `${title.substring(0, 150)}... - ${alertTopic}`,
            content: '',
            sourceUrl: realUrl,
            source: this.extractSource(realUrl),
            date: emailDate,
            category: this.categorizeNews(title),
            tags: this.extractTags(title + ' ' + alertTopic),
            readTime: Math.floor(Math.random() * 3) + 3,
            imageUrl: this.getImageForIndex(globalIndex),
            isTrending: globalIndex < 3,
            isFeatured: globalIndex === 0
          })
          
          globalIndex++
          if (globalIndex >= 20) break // Limitar a 20 noticias totales
        }
        
        if (globalIndex >= 20) break
      }
      
      console.log(`Total news extracted: ${allNews.length}`)
      return allNews
      
    } catch (error: any) {
      console.error('Error in GmailNewsService:', error)
      return []
    }
  }
  
  extractTags(text: string): string[] {
    const keywords = [
      'AI', 'Inteligencia Artificial', 'Machine Learning', 'GPT', 
      'Robot', 'Automation', 'Data', 'Algorithm', 'Deep Learning',
      'Negocios', 'Empresa', 'Tecnología', 'Digital', 'Innovación'
    ]
    const tags = []
    const textLower = text.toLowerCase()
    
    for (const keyword of keywords) {
      if (textLower.includes(keyword.toLowerCase())) {
        tags.push(keyword)
      }
    }
    
    if (tags.length === 0) tags.push('AI', 'Technology')
    return tags.slice(0, 5)
  }
  
  getImageForIndex(index: number): string {
    const images = [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      'https://images.unsplash.com/photo-1518770660439-4636190af475',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      'https://images.unsplash.com/photo-1560472355-536de3962603',
      'https://images.unsplash.com/photo-1552664730-d307ca884978'
    ]
    return images[index % images.length]
  }
  
  async getLatestNews(): Promise<NewsItem[]> {
    return this.fetchAndStoreNews()
  }
}
