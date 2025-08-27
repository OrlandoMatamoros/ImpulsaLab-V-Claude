import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {defineType, defineField} from 'sanity'

// Schema de categorías
const category = defineType({
  name: 'category',
  title: 'Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Nombre',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'label' }
    })
  ]
})

// Schema de noticias simplificado
const news = defineType({
  name: 'news',
  title: 'Noticias',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen',
      type: 'text',
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}]
    }),
    defineField({
      name: 'source',
      title: 'Fuente',
      type: 'string',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha',
      type: 'datetime',
    }),
    defineField({
      name: 'readTime',
      title: 'Tiempo lectura',
      type: 'number',
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen',
      type: 'image',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'isTrending',
      title: 'Trending',
      type: 'boolean',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Destacado',
      type: 'boolean',
    })
  ]
})

export default defineConfig({
  name: 'default',
  title: 'Noticias IA',
  projectId: 'a52qys3e',
  dataset: 'production',
  plugins: [structureTool()],
  schema: {
    types: [news, category],
  },
})