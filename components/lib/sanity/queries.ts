import { groq } from 'next-sanity'

// Query para obtener todas las noticias
export const allNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) {
    _id,
    "id": _id,
    title,
    summary,
    content,
    "category": category->slug.current,
    source,
    sourceUrl,
    "date": publishedAt,
    readTime,
    "imageUrl": mainImage.asset->url,
    tags,
    isTrending,
    isFeatured
  }
`

// Query para noticias por categoría
export const newsByCategoryQuery = groq`
  *[_type == "news" && category->slug.current == $category] | order(publishedAt desc) {
    _id,
    "id": _id,
    title,
    summary,
    content,
    "category": category->slug.current,
    source,
    sourceUrl,
    "date": publishedAt,
    readTime,
    "imageUrl": mainImage.asset->url,
    tags,
    isTrending,
    isFeatured
  }
`

// Query para categorías
export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    "id": slug.current,
    label,
    icon,
    slug
  }
`

// Query para últimas noticias (para el home)
export const latestNewsQuery = groq`
  *[_type == "news"] | order(publishedAt desc) [0...3] {
    _id,
    "id": _id,
    title,
    summary,
    "category": category->slug.current,
    "date": publishedAt,
    "imageUrl": mainImage.asset->url,
    readTime
  }
`