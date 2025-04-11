import { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AIToolCard } from '@/components/AIToolCard';

// Sample AI tools data
const aiTools = [
  {
    id: 1,
    title: "Lesson Plan Generator",
    description: "Create custom lesson plans with specific learning objectives, activities, and assessments in seconds.",
    imageUrl: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&q=80&w=1770",
    category: "Planning",
    slug: "lesson-plan-generator",
  },
  {
    id: 2,
    title: "Differentiation Assistant",
    description: "Adapt your teaching materials for diverse learning needs and abilities with intelligent suggestions.",
    imageUrl: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1770",
    category: "Accessibility",
    slug: "differentiation-assistant",
  },
  {
    id: 3,
    title: "Feedback Formulator",
    description: "Generate constructive, personalized feedback for student assignments with actionable improvement points.",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1770",
    category: "Assessment",
    slug: "feedback-formulator",
  },
  {
    id: 4,
    title: "Quiz Creator",
    description: "Generate customized quizzes with varying difficulty levels based on your curriculum content.",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1770",
    category: "Assessment",
    slug: "quiz-creator",
  },
  {
    id: 5,
    title: "Concept Visualizer",
    description: "Transform complex educational concepts into clear, engaging visual explanations for your students.",
    imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=1773",
    category: "Visualization",
    slug: "concept-visualizer",
  },
  {
    id: 6,
    title: "Rubric Builder",
    description: "Create comprehensive assessment rubrics tailored to specific learning objectives and skill levels.",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1770",
    category: "Assessment",
    slug: "rubric-builder",
  },
  {
    id: 7,
    title: "Discussion Prompt Generator",
    description: "Generate thought-provoking discussion questions that encourage critical thinking and engagement.",
    imageUrl: "https://images.unsplash.com/photo-1520694478166-daaaaec95b69?auto=format&fit=crop&q=80&w=1770",
    category: "Engagement",
    slug: "discussion-prompt-generator",
  },
  {
    id: 8,
    title: "Curriculum Mapper",
    description: "Map your curriculum to standards and identify gaps or opportunities for cross-curricular connections.",
    imageUrl: "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?auto=format&fit=crop&q=80&w=1770",
    category: "Planning",
    slug: "curriculum-mapper",
  },
  {
    id: 9,
    title: "Project Idea Generator",
    description: "Get innovative project ideas that integrate multiple subjects and promote problem-solving skills.",
    imageUrl: "https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?auto=format&fit=crop&q=80&w=1770",
    category: "Projects",
    slug: "project-idea-generator",
  },
];

// Categories for filtering
const categories = ['All', 'Planning', 'Assessment', 'Engagement', 'Visualization', 'Accessibility', 'Projects'];

const AITools = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter AI tools based on search term and category
  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header - Updated with subtle blue gradient */}
      <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-tech-200 pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-gray-900">
              AI Tools for Educators
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Interactive tools powered by AI to enhance your teaching experience - no prompt writing needed
            </p>
          </div>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="py-8 container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          <div className="w-full md:w-auto order-2 md:order-1">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative w-full md:w-64 order-1 md:order-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-600 mb-6">
          Showing {filteredTools.length} of {aiTools.length} AI tools
        </p>
        
        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <AIToolCard key={tool.id} {...tool} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-700 mb-2">No tools found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )}
      </section>
      
      <Footer />
    </div>
  );
};

export default AITools;
