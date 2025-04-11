import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'your-project-id', // You'll get this from your Sanity project
  dataset: 'production',
  apiVersion: '2023-05-03', // Use today's date or the latest version
  useCdn: true // `false` if you want to ensure fresh data
}) 