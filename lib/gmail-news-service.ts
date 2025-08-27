// lib/gmail-news-service.ts
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
  
  // Categorizar basado en contenido
  categorizeNews(title: string, url: string): string {
    const text = title.toLowerCase()
    
    // Palabras clave para cada categoría
    if (text.includes('launch') || text.includes('announces') || text.includes('introduces') || text.includes('unveils')) {
      return 'product-launches'
    }
    if (text.includes('regulation') || text.includes('law') || text.includes('policy') || text.includes('government')) {
      return 'regulations'
    }
    if (text.includes('research') || text.includes('study') || text.includes('paper') || text.includes('scientists')) {
      return 'research'
    }
    if (text.includes('raises') || text.includes('funding') || text.includes('investment') || text.includes('startup')) {
      return 'success-stories'
    }
    if (text.includes('business') || text.includes('enterprise') || text.includes('corporate') || text.includes('company')) {
      return 'business-ai'
    }
    
    return 'market-trends' // Default
  }
  
  // Obtener imagen basada en la fuente
  getImageForSource(url: string, index: number): string {
    const images = [
      'https://images.unsplash.com/photo-1677442136019-21780ecad995',
      'https://images.unsplash.com/photo-1518770660439-4636190af475',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd',
      'https://images.unsplash.com/photo-1559136555-9303baea8ebd',
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3',
      'https://images.unsplash.com/photo-1560472355-536de3962603',
      'https://images.unsplash.com/photo-1552664730-d307ca884978',
      'https://images.unsplash.com/photo-1495020689067-958852a7765e',
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'
    ]
    
    return images[index % images.length]
  }
  
  async fetchAndStoreNews() {
    try {
      const response = await this.gmail.users.messages.list({
        userId: 'me',
        q: 'from:googlealerts-noreply@google.com newer_than:7d', // Última semana
        maxResults: 50 // Obtener más mensajes
      })
      
      if (!response.data.messages) {
        return []
      }
      
      const allNewsItems = []
      let newsIndex = 0
      
      for (const message of response.data.messages) {
        const email = await this.gmail.users.messages.get({
          userId: 'me',
          id: message.id,
          format: 'full'
        })
        
        const newsFromEmail = this.parseGoogleAlert(email.data, newsIndex)
        allNewsItems.push(...newsFromEmail)
        newsIndex += newsFromEmail.length
      }
      
      // Ordenar por fecha más reciente primero
      allNewsItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      
      // Marcar los primeros como destacados/trending
      if (allNewsItems.length > 0) {
        allNewsItems[0].isFeatured = true
        allNewsItems.slice(0, 3).forEach(item => item.isTrending = true)
      }
      
      return allNewsItems
    } catch (error) {
      console.error('Error fetching Gmail:', error)
      return []
    }
  }
  
  parseGoogleAlert(message: any, startIndex: number) {
    type NewsItem = {
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
    const news: NewsItem[] = []
    let htmlBody = ''
    
    // Obtener fecha del email
    const emailDate = this.getEmailDate(message.payload.headers)
    
    const extractBody = (parts: any[]) => {
      for (const part of parts || []) {
        if (part.mimeType === 'text/html' && part.body?.data) {
          htmlBody = Buffer.from(part.body.data, 'base64').toString()
        }
        if (part.parts) extractBody(part.parts)
      }
    }
    
    if (message.payload) extractBody([message.payload])
    
    // Mejorar regex para capturar más información
    const linkRegex = /<a[^>]+href="(https?:\/\/[^"]+)"[^>]*>([^<]+)<\/a>/gi
    let match
    let newsCount = 0
    
    while ((match = linkRegex.exec(htmlBody)) !== null && newsCount < 20) {
      const [_, url, title] = match
      
      // Filtrar solo noticias reales (no links de Google)
      if (!url.includes('google.com') && 
          !url.includes('accounts.google') && 
          title.length > 20) {
        
        const cleanUrl = this.cleanGoogleUrl(url)
        const cleanTitle = this.cleanHTML(title)
        
        news.push({
          id: `news-${Date.now()}-${newsCount}`,
          title: cleanTitle,
          summary: `${cleanTitle.substring(0, 150)}...`, // Generar resumen del título
          content: '',
          sourceUrl: cleanUrl,
          source: this.extractSource(cleanUrl),
          date: emailDate,
          category: this.categorizeNews(cleanTitle, cleanUrl),
          tags: this.extractTags(cleanTitle),
          readTime: Math.floor(Math.random() * 3) + 3, // 3-6 min
          imageUrl: this.getImageForSource(cleanUrl, startIndex + newsCount),
          isTrending: false,
          isFeatured: false
        })
        
        newsCount++
      }
    }
    async (params: any) => {
      news.forEach(item => {
        item.category = this.categorizeNews(item.title, item.sourceUrl)
      })

      // Marcar primeras como destacadas
        if (news.length > 0) {
          news[0].isFeatured = true
          news.slice(0, 3).forEach(n => n.isTrending = true)
        }
    }
    return news
  }
  
  getEmailDate(headers: any[]): string {
    const dateHeader = headers.find(h => h.name === 'Date')
    return dateHeader ? new Date(dateHeader.value).toISOString() : new Date().toISOString()
  }
  
  cleanGoogleUrl(url: string) {
    if (url.includes('url?q=')) {
      const match = url.match(/url\?q=([^&]+)/)
      if (match) return decodeURIComponent(match[1])
    }
    return url
  }
  
  cleanHTML(text: string) {
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&[^;]+;/g, ' ')
      .replace(/<[^>]*>/g, '')
      .trim()
  }
  
  extractSource(url: string) {
    try {
      const hostname = new URL(url).hostname
      const name = hostname.replace('www.', '').split('.')[0]
      return name.charAt(0).toUpperCase() + name.slice(1)
    } catch {
      return 'Tech News'
    }
  }
  
  extractTags(title: string) {
    const keywords = [
      'AI', 'Artificial Intelligence', 'Machine Learning', 'Deep Learning',
      'ChatGPT', 'GPT', 'Claude', 'Gemini', 'OpenAI', 'Google', 'Microsoft',
      'Meta', 'Amazon', 'Apple', 'Nvidia', 'Startup', 'Investment', 'Research',
      'Automation', 'Robotics', 'Neural Network', 'LLM', 'Generative AI'
    ]
    
    const tags = []
    const titleLower = title.toLowerCase()
    
    for (const keyword of keywords) {
      if (titleLower.includes(keyword.toLowerCase())) {
        tags.push(keyword)
        if (tags.length >= 5) break
      }
    }
    
    // Si no hay tags, agregar algunos genéricos
    if (tags.length === 0) {
      tags.push('AI', 'Technology')
    }
    
    return tags
  }
  
  async getLatestNews() {
    return this.fetchAndStoreNews()
  }
}