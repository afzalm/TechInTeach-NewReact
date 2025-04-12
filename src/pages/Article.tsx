/**
 * Article Component
 * 
 * This component displays a single article fetched from the WordPress API.
 * Features include:
 * - Full article content display
 * - Social sharing functionality
 * - Related articles section
 * - Responsive design
 * - HTML entity decoding
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ArrowLeft, Share2, Bookmark } from 'lucide-react';
import '@/styles/Article.css';

/**
 * Utility function to decode HTML entities in text
 * Creates a temporary textarea element to handle the decoding
 * @param text - The text containing HTML entities to decode
 * @returns The decoded text
 */
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Interface for Article data structure
 */
interface Article {
  id: number;
  title: string;
  content: string;
  date: string;
  author: number;
  category: number;
  imageUrl: string;
  excerpt: string;
}

/**
 * Interface for Related Article data structure
 */
interface RelatedArticle {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  slug: string;
}

const Article = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<RelatedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const CACHE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // 1. Read the cache file
        let cachedData = null;
        try {
          const cacheResponse = await fetch('/src/data/articlesCache.json');
          if (cacheResponse.ok) {
            cachedData = await cacheResponse.json();
          } else {
            console.warn('Cache file not found or error reading it.');
          }
        } catch (error) {
          console.error('Error reading cache file:', error);
        }

        // 2. Check if the article exists in the cache and is valid
        let articleFromCache = null;
        if (cachedData && cachedData.articles) {
          const cachedArticle = cachedData.articles.find((a: any) => a.slug === slug);
          if (cachedArticle && cachedData.timestamp && (Date.now() - cachedData.timestamp < CACHE_EXPIRY)) {
            articleFromCache = cachedArticle;
            console.log('Using cached article:', slug);
          }
        }

        if (articleFromCache) {            
            setArticle(articleFromCache);
          setLoading(false);
          return;
        }

        // 3. If not in cache or invalid, fetch from API
        console.log('Fetching article from API:', slug);
        const response = await fetch(`https://techinteach.com/en/wp-json/wp/v2/posts?slug=${slug}`, {
          method: 'GET',
          headers: { 'Accept': 'application/json' },
        });

        if (!response.ok) {
          const text = await response.text();
          console.error('Article fetch failed:', response.status, response.statusText, 'Response:', text.slice(0, 200));
          throw new Error(`Article fetch failed: ${response.status}`);
        }

        const articles = await response.json();
        if (!Array.isArray(articles) || articles.length === 0) {
          console.error('No article found with slug:', slug);
          setLoading(false);
          return;
        }

        const articleData = articles[0];

        let imageUrl = '';
        if (articleData.featured_media) {
          try {
            const mediaResponse = await fetch(`https://techinteach.com/en/wp-json/wp/v2/media/${articleData.featured_media}`);
            if (mediaResponse.ok) {
              const mediaData = await mediaResponse.json();
              imageUrl = mediaData.source_url;
            } else {
              console.warn('Error fetching media. Using placeholder.');
              imageUrl = 'https://techinteach.com/images/default-article.jpg?v=300';
            }
          } catch (error) {
            console.error('Error fetching media:', error);
            imageUrl = 'https://techinteach.com/images/default-article.jpg?v=300';
          }
        } else {
          imageUrl = 'https://techinteach.com/images/default-article.jpg?v=300';
        }

        const formattedArticle = {
          id: articleData.id,
          title: decodeHtmlEntities(articleData.title.rendered),
          content: decodeHtmlEntities(articleData.content.rendered),
          date: new Date(articleData.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          author: articleData.author,
          category: articleData.categories[0],
          imageUrl,
          excerpt: decodeHtmlEntities(articleData.excerpt.rendered.replace(/<[^>]+>/g, '')),
          slug: articleData.slug, // Add slug to the formatted article
        };

        setArticle(formattedArticle);

        // 4. Update the cache
        if (cachedData) {
          // Update existing cache
          const existingIndex = cachedData.articles.findIndex((a: any) => a.slug === slug);
          if (existingIndex !== -1) {
            cachedData.articles[existingIndex] = formattedArticle;
          } else {
            cachedData.articles.push(formattedArticle);
          }
          cachedData.timestamp = Date.now();
        } else {
          // Create new cache
          cachedData = {
            articles: [formattedArticle],
            timestamp: Date.now(),
          };
        }

        // Write the updated cache to file
        try {
          await fetch('/src/data/articlesCache.json', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(cachedData),
          });
          console.log('Article data cached successfully:', slug);
        } catch (error) {
          console.error('Error writing to cache file:', error);
        }

        // Related articles logic (simplified, add back if needed)
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading article. Please wait...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
            <p className="text-gray-600 text-lg mb-6">The article you're looking for doesn't exist or couldn't be loaded.</p>
            <Link to="/articles" className="text-blue-600 hover:text-blue-700 font-medium text-lg transition-colors">
              Return to Articles
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />

      {/* Hero Section */}
      <article className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-20 max-w-5xl">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 text-base font-medium transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Articles
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Category</span>
              <span>{article.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-3">
                <span className="font-medium">Share:</span>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${article.title} - ${window.location.href}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Bookmark size={18} />
                <span className="font-medium">Copy Link</span>
              </button>
            </div>
          </header>

          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-[400px] md:h-[370px] object-cover rounded-lg mb-10 shadow-lg"
          />

          <div
            className="entry-content text-gray-700 leading-relaxed text-lg max-w-4xl mx-auto"
            dangerouslySetInnerHTML={{ __html: article.content }}
          >
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-10">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                    <img
                      src={relatedArticle.imageUrl}
                      alt={relatedArticle.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{relatedArticle.date}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">{relatedArticle.excerpt}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Article;