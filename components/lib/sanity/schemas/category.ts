export default {
  name: 'category',
  title: 'Categorías',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Nombre',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'label',
        maxLength: 96
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icono',
      type: 'string',
      description: 'Nombre del icono de Lucide'
    },
    {
      name: 'order',
      title: 'Orden',
      type: 'number',
      initialValue: 0
    }
  ]
}
