/**
 * Articles Component
 * 
 * This component displays a list of articles fetched from the WordPress API.
 * Features include:
 * - Article listing with featured articles
 * - Search functionality
 * - Category filtering
 * - Monthly archives
 * - Responsive sidebar for mobile
 * - Pagination
 */

import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/PageBackground';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';

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

// Cache configuration for articles data
const CACHE_KEY = 'techinteach_articles_cache';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const Articles = () => {
  // State management for articles and UI
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    /**
     * Fetches articles and categories from the WordPress API
     * Implements caching to reduce API calls
     * Handles image loading and error states
     */
    const fetchData = async () => {
      // Retrieve cached articles data from localStorage, defaulting to empty object if not found
      const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
      const isCacheValid = cachedData.timestamp && (Date.now() - cachedData.timestamp < CACHE_EXPIRY);

      if (isCacheValid && cachedData.posts && cachedData.categories) {
        console.log('Using cached data:', cachedData);
        setPosts(cachedData.posts);
        setCategories(cachedData.categories);
        setLoading(false);
        return;
      }

      try {
        // Fetch posts
        const postsResponse = await fetch('https://techinteach.com/en/wp-json/wp/v2/posts?per_page=100', {
          method: 'GET',
          headers: { 'Accept': 'application/json' }
        });
        if (!postsResponse.ok) {
          const text = await postsResponse.text();
          console.error('Posts fetch failed:', postsResponse.status, postsResponse.statusText, 'Response:', text.slice(0, 300));
          throw new Error(`Posts fetch failed: ${postsResponse.status}`);
        }
        const postsData = await postsResponse.json();
        console.log('Posts fetched successfully:', postsData);

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
        console.log('Categories fetched successfully:', categoriesData);

        // Map posts to desired format with HTML entity decoding
        const formattedPosts = postsData.map(post => ({
          id: post.id,
          title: decodeHtmlEntities(post.title.rendered),
          excerpt: decodeHtmlEntities(post.excerpt.rendered.replace(/<[^>]+>/g, '')),
          date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          author: post.author,
          category: post.categories[0],
          slug: post.slug,
          imageUrl: post.featured_media ? `https://techinteach.com/en/wp-json/wp/v2/media/${post.featured_media}` : 'https://via.placeholder.com/300',
          featured: post.sticky
        }));

        // Fetch featured images with error handling
        const postsWithImages = await Promise.all(
          formattedPosts.map(async (post) => {
            if (post.imageUrl.includes('media')) {
              try {
                const mediaResponse = await fetch(post.imageUrl, {
                  method: 'GET',
                  headers: { 'Accept': 'application/json' }
                });
                if (!mediaResponse.ok) {
                  const text = await mediaResponse.text();
                  console.warn(`Media fetch failed for post ${post.id} (${post.imageUrl}): ${mediaResponse.status} ${mediaResponse.statusText}, Response: ${text.slice(0, 200)}`);
                  return { ...post, imageUrl: 'https://via.placeholder.com/300' };
                }
                const mediaData = await mediaResponse.json();
                console.log(`Media fetched for post ${post.id}:`, mediaData.source_url);
                return { ...post, imageUrl: mediaData.source_url };
              } catch (mediaError) {
                console.warn(`Error fetching media for post ${post.id} (${post.imageUrl}):`, mediaError);
                return { ...post, imageUrl: 'https://via.placeholder.com/300' };
              }
            }
            return post;
          })
        );

        // Map category IDs to names
        const postsWithCategories = postsWithImages.map(post => ({
          ...post,
          category: categoriesData.find(cat => cat.id === post.category)?.name || 'Uncategorized'
        }));

        setPosts(postsWithCategories);
        setCategories(categoriesData.map(cat => ({ id: cat.id, name: cat.name, count: cat.count })));

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          posts: postsWithCategories,
          categories: categoriesData.map(cat => ({ id: cat.id, name: cat.name, count: cat.count })),
          timestamp: Date.now()
        }));
        console.log('Data cached successfully');
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /**
   * Filters posts based on search query, category, and month
   * Applies all filters simultaneously
   */
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesMonth = !selectedMonth || 
      `${new Date(post.date).toLocaleString('default', { month: 'long' })} ${new Date(post.date).getFullYear()}` === selectedMonth;
    return matchesSearch && matchesCategory && matchesMonth;
  });

  /**
   * Pagination logic
   * Calculates current page's posts and total number of pages
   */
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  /**
   * Handles page navigation
   * Scrolls to top when changing pages
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  /**
   * Renders pagination items
   * Creates numbered page buttons based on total pages
   * @returns Array of PaginationItem components
   */
  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink 
            onClick={() => handlePageChange(i)} 
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return items;
  };

  /**
   * Generates monthly archive counts
   * Groups posts by month and year
   */
  const getMonthlyCounts = () => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      const date = new Date(post.date);
      const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`;
      counts[monthYear] = (counts[monthYear] || 0) + 1;
    });
    return counts;
  };

  const monthlyCounts = getMonthlyCounts();

  if (loading) {
    return (
      <PageBackground>
        <Navbar />
        <div className="pt-32 pb-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading articles...</p>
          </div>
        </div>
        <Footer />
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <Navbar />

      {/* Header */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-gray-900">
              Articles & Resources
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Insights, strategies, and inspiration for modern educators worldwide
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent shadow-sm transition-shadow hover:shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Mobile Sidebar Toggle */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden mb-6 inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {isSidebarOpen ? (
              <>
                <X size={20} /> Close Filters
              </>
            ) : (
              <>
                <Menu size={20} /> Show Filters
              </>
            )}
          </button>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className={`lg:w-1/4 space-y-6 ${
              isSidebarOpen 
                ? 'block fixed inset-0 z-40 bg-white p-6 overflow-y-auto lg:static lg:p-0 lg:bg-transparent lg:overflow-visible'
                : 'hidden lg:block'
            }`}>
              {/* Close button for mobile */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedCategory('');
                        setCurrentPage(1);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                        !selectedCategory 
                          ? 'bg-violet-50 text-violet-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-violet-600'
                      }`}
                    >
                      All Categories ({posts.length})
                    </button>
                  </li>
                  {categories.map(category => (
                    <li key={category.id}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setCurrentPage(1);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                          selectedCategory === category.name 
                            ? 'bg-violet-50 text-violet-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-violet-600'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Archives</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setSelectedMonth('');
                        setCurrentPage(1);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                        !selectedMonth 
                          ? 'bg-violet-50 text-violet-600 font-medium' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-violet-600'
                      }`}
                    >
                      All Posts ({posts.length})
                    </button>
                  </li>
                  {Object.entries(monthlyCounts).map(([monthYear, count]) => (
                    <li key={monthYear}>
                      <button
                        onClick={() => {
                          setSelectedMonth(monthYear);
                          setCurrentPage(1);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md transition-colors ${
                          selectedMonth === monthYear 
                            ? 'bg-violet-50 text-violet-600 font-medium' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-violet-600'
                        }`}
                      >
                        {monthYear} ({count})
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            <main className="lg:w-3/4">
              {currentPage === 1 && filteredPosts.some(post => post.featured) && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Article</h2>
                  {filteredPosts
                    .filter(post => post.featured)
                    .slice(0, 1)
                    .map(post => (
                      <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                        <div className="h-64 overflow-hidden">
                          <img 
                            src={post.imageUrl} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span className="text-violet-600 font-medium">{post.category}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            {post.excerpt}
                          </p>
                          <Link 
                            to={`/articles/${post.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition-colors"
                          >
                            Read full article
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              )}
              
              <div className="space-y-8">
                {currentPosts.filter(post => !post.featured || currentPage !== 1).map((post, index) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                      <div className="md:w-1/3 h-64 md:h-auto">
                        <img 
                          src={post.imageUrl} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 md:w-2/3 flex flex-col">
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span className="text-violet-600">{post.category}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-4">
                          {post.excerpt}
                        </p>
                        <Link 
                          to={`/articles/${post.slug}`}
                          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium mt-auto"
                        >
                          Read full article
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No articles found</h3>
                  <p className="text-gray-500">
                    Try adjusting your filters to find what you're looking for
                  </p>
                </div>
              )}
              
              {filteredPosts.length > postsPerPage && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => handlePageChange(currentPage - 1)}
                        />
                      </PaginationItem>
                    )}
                    
                    {renderPaginationItems()}
                    
                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => handlePageChange(currentPage + 1)}
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              )}
            </main>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageBackground>
  );
};

export default Articles;