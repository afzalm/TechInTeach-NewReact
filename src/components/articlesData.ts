/**
 * Articles Data Service
 * 
 * Handles fetching and caching of articles data from WordPress API
 */

const CACHE_FILE_PATH = '/data/articlesCache.json';

/**
 * Utility function to decode HTML entities in text
 */
const decodeHtmlEntities = (text: string): string => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Fetches articles and categories from WordPress API
 */
export const fetchArticlesData = async () => {
  try {
    // Try to read from cache first
    try {
      const response = await fetch(CACHE_FILE_PATH);
      if (response.ok) {
        const cachedData = await response.json();
        if (cachedData.posts && cachedData.categories) {
          console.log('Using cached data');
          return cachedData;
        }
      }
    } catch (error) {
      console.log('No valid cache found, fetching fresh data');
    }

    console.log('Fetching new data from API');

    // Fetch posts
    const postsResponse = await fetch('https://techinteach.com/en/wp-json/wp/v2/posts?per_page=30', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!postsResponse.ok) {
      const text = await postsResponse.text();
      console.error('Posts fetch failed:', postsResponse.status, postsResponse.statusText, 'Response:', text.slice(0, 300));
      throw new Error(`Posts fetch failed: ${postsResponse.status}`);
    }
    const postsData = await postsResponse.json();

    // Fetch categories
    const categoriesResponse = await fetch('https://techinteach.com/en/wp-json/wp/v2/categories', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!categoriesResponse.ok) {
      const text = await categoriesResponse.text();
      console.error('Categories fetch failed:', categoriesResponse.status, categoriesResponse.statusText, 'Response:', text.slice(0, 200));
      throw new Error(`Categories fetch failed: ${categoriesResponse.status}`);
    }
    const categoriesData = await categoriesResponse.json();

    // Format posts
    const formattedPosts = postsData.map(post => ({
      id: post.id,
      title: decodeHtmlEntities(post.title.rendered),
      excerpt: decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
      date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: post.author,
      category: post.categories[0],
      slug: post.slug,
      imageUrl: post.featured_media ? `https://techinteach.com/en/wp-json/wp/v2/media/${post.featured_media}` : 'https://techinteach.com/images/default-article.jpg?v=300',
      featured: post.sticky
    }));

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000;

    // Fetch featured images with retry and fallback
    const postsWithImages = await Promise.all(
      formattedPosts.map(async (post) => {
        let imageUrl = post.imageUrl;
        try {
          const mediaResponse = await fetch(post.imageUrl, {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
          });
          
          if (!mediaResponse.ok) {
            const text = await mediaResponse.text();
            console.warn(`Initial media fetch failed for post ${post.id} (${post.imageUrl}): ${mediaResponse.status} ${mediaResponse.statusText}, Response: ${text.slice(0, 200)}`);

            if (mediaResponse.status === 508) {
              let retryCount = 0;
              while (retryCount < MAX_RETRIES) {
                retryCount++;
                console.log(`Retrying media fetch for post ${post.id} (attempt ${retryCount})`);
                await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
                const retryResponse = await fetch(post.imageUrl);
                if (retryResponse.ok) {
                  const mediaData = await retryResponse.json();
                  imageUrl = mediaData.source_url;
                  break;
                } else {
                  const retryText = await retryResponse.text();
                  console.warn(`Retry ${retryCount} failed for post ${post.id}: ${retryResponse.status} ${retryResponse.statusText}, Response: ${retryText.slice(0, 200)}`);
                }
              }
            }
          }
          
          if (imageUrl === post.imageUrl && mediaResponse.ok) {
            const mediaData = await mediaResponse.json();
            imageUrl = mediaData.source_url;
          }
        } catch (mediaError) {
          console.warn(`Error fetching media for post ${post.id} (${post.imageUrl}):`, mediaError);
        }
        return { ...post, imageUrl: imageUrl === post.imageUrl ? 'https://techinteach.com/images/default-article.jpg?v=300' : imageUrl };
      })
    );

    // Map category IDs to names
    const postsWithCategories = postsWithImages.map(post => ({
      ...post,
      category: categoriesData.find(cat => cat.id === post.category)?.name || 'Uncategorized'
    }));

    // Format categories
    const formattedCategories = categoriesData.map(cat => ({ 
      id: cat.id, 
      name: cat.name, 
      count: cat.count 
    }));

    return {
      posts: postsWithCategories,
      categories: formattedCategories
    };
  } catch (error) {
    console.error('Error fetching blog data:', error);
    throw error;
  }
};