export default {
  name: 'news',
  title: 'Noticias',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'summary',
      title: 'Resumen',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(300)
    },
    {
      name: 'content',
      title: 'Contenido',
      type: 'array',
      of: [
        {
          type: 'block'
        },
        {
          type: 'image',
          options: {
            hotspot: true
          }
        }
      ]
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'source',
      title: 'Fuente',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'sourceUrl',
      title: 'URL de la fuente',
      type: 'url'
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'readTime',
      title: 'Tiempo de lectura (minutos)',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(1)
    },
    {
      name: 'mainImage',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'isTrending',
      title: 'En tendencia',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'isFeatured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false
    }
  ],
  preview: {
    select: {
      title: 'title',
      author: 'source',
      media: 'mainImage'
    },
    prepare(selection: any) {
      const { author } = selection
      return { ...selection, subtitle: author && `por ${author}` }
    }
  }
}