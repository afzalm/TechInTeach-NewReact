/**
 * Articles Component
 * 
 * Presents a list of articles with search, filtering, and pagination functionality
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
import { fetchArticlesData } from '@/components/articlesData';

const Articles = () => {
  // State management
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
    const loadData = async () => {
      setLoading(true);
      try {
        const { posts, categories } = await fetchArticlesData();
        setPosts(posts);
        setCategories(categories);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Filter posts based on search, category, and month
  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesMonth = !selectedMonth || 
      `${new Date(post.date).toLocaleString('default', { month: 'long' })} ${new Date(post.date).getFullYear()}` === selectedMonth;
    return matchesSearch && matchesCategory && matchesMonth;
  });

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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

  // Generate monthly archive counts
  const getMonthlyCounts = () => {
    const counts = {};
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