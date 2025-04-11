import { client } from './sanity'

// Programs
export async function getPrograms() {
  const query = `*[_type == "program"]{
    _id,
    title,
    description,
    "slug": slug.current,
    category,
    duration,
    mode,
    outcomes,
    whyTake,
    fee,
    institutionalDiscount,
    imageUrl,
    featured
  }`
  return client.fetch(query)
}

export async function getProgramBySlug(slug) {
  const query = `*[_type == "program" && slug.current == $slug][0]{
    _id,
    title,
    description,
    "slug": slug.current,
    category,
    duration,
    mode,
    outcomes,
    whyTake,
    fee,
    institutionalDiscount,
    imageUrl,
    featured
  }`
  return client.fetch(query, { slug })
}

// Articles
export async function getArticles() {
  const query = `*[_type == "article"]{
    _id,
    title,
    content,
    excerpt,
    "slug": slug.current,
    imageUrl,
    "author": author->{
      _id,
      name,
      bio,
      avatarUrl
    },
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    publishedAt
  }`
  return client.fetch(query)
}

export async function getArticleBySlug(slug) {
  const query = `*[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    content,
    excerpt,
    "slug": slug.current,
    imageUrl,
    "author": author->{
      _id,
      name,
      bio,
      avatarUrl
    },
    "category": category->{
      _id,
      name,
      "slug": slug.current
    },
    publishedAt
  }`
  return client.fetch(query, { slug })
}

// Testimonials
export async function getTestimonials() {
  const query = `*[_type == "testimonial"]{
    _id,
    quote,
    authorName,
    role,
    school,
    rating,
    "program": program->{
      _id,
      title,
      "slug": slug.current
    }
  }`
  return client.fetch(query)
}

// AI Tools
export async function getAITools() {
  const query = `*[_type == "aiTool"]{
    _id,
    title,
    description,
    imageUrl,
    category,
    "slug": slug.current
  }`
  return client.fetch(query)
}

export async function getAIToolBySlug(slug) {
  const query = `*[_type == "aiTool" && slug.current == $slug][0]{
    _id,
    title,
    description,
    imageUrl,
    category,
    "slug": slug.current
  }`
  return client.fetch(query, { slug })
} 