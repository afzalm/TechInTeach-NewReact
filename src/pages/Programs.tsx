import { useState } from 'react';
import { 
  Brain, 
  Laptop, 
  BookOpen, 
  Award, 
  Globe, 
  Users,
  Lightbulb,
  Shield,
  Heart,
  LayoutGrid,
  Smile,
  Code,
  Search,
  ArrowRight,
  Star,
  LineChart,
  FileText,
  BarChart,
  Gamepad2,
  Presentation
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { PageBackground } from '@/components/PageBackground';

// Types
interface Program {
  title: string;
  description: string;
  icon: JSX.Element;
  slug: string;
  category: string;
  featured?: boolean;
}

interface Category {
  name: string;
  value: string;
  icon: JSX.Element;
}

// Data
const trainingPrograms: Program[] = [
  {
    title: "Design Thinking for Educators",
    description: "Master the design thinking process to create innovative solutions for classroom challenges.",
    icon: <Brain size={24} />,
    slug: "design-thinking",
    category: "innovation"
  },
  {
    title: "Creating Engaging Classrooms",
    description: "Transform your classroom with modern technology integration and engagement techniques.",
    icon: <Laptop size={24} />,
    slug: "engaging-classrooms",
    category: "technology",
    featured: true
  },
  {
    title: "Teaching Strategies with AI",
    description: "Learn how to leverage AI tools to enhance learning outcomes and streamline tasks.",
    icon: <BookOpen size={24} />,
    slug: "ai-teaching",
    category: "technology",
    featured: true
  },
  {
    title: "School Innovation Ambassador",
    description: "Get guided preparation for the MoEd Government of India's School Innovation Ambassador program.",
    icon: <Award size={24} />,
    slug: "innovation-ambassador",
    category: "innovation"
  },
  {
    title: "Google Certified Educator",
    description: "Comprehensive preparation for Google's Level 1 and Level 2 Educator certifications.",
    icon: <Globe size={24} />,
    slug: "google-certified",
    category: "certification"
  },
  {
    title: "Microsoft Educator",
    description: "Expert training to help you become a Microsoft Certified Educator.",
    icon: <Laptop size={24} />,
    slug: "microsoft-educator",
    category: "certification"
  },
  {
    title: "Apple Teacher Program",
    description: "Specialized training to help educators integrate Apple technology in the classroom.",
    icon: <Laptop size={24} />,
    slug: "apple-teacher",
    category: "certification"
  },
  {
    title: "Adobe Creative Educator",
    description: "Learn to integrate digital creativity into your teaching with Adobe's educational tools.",
    icon: <Lightbulb size={24} />,
    slug: "adobe-creative",
    category: "innovation"
  },
  {
    title: "Digital Citizenship",
    description: "Equipping teachers to model and teach responsible and safe online behavior.",
    icon: <Shield size={24} />,
    slug: "digital-citizenship",
    category: "technology",
    featured: true
  },
  {
    title: "Inclusive Education",
    description: "Using technology to cater to diverse learning needs and create equitable environments.",
    icon: <Heart size={24} />,
    slug: "inclusive-education",
    category: "development"
  },
  {
    title: "Blended Learning Strategies",
    description: "Effectively combining face-to-face and online learning for enhanced flexibility.",
    icon: <LayoutGrid size={24} />,
    slug: "blended-learning",
    category: "technology"
  },
  {
    title: "Assessment Tools and Techniques",
    description: "Leveraging technology for more efficient and effective assessment.",
    icon: <LineChart size={24} />,
    slug: "assessment-tools",
    category: "technology"
  },
  {
    title: "Creating Engaging Online Content",
    description: "Designing dynamic and interactive digital learning materials.",
    icon: <FileText size={24} />,
    slug: "online-content",
    category: "technology"
  },
  {
    title: "Data-Driven Instruction",
    description: "Using student data to inform teaching practices and track progress.",
    icon: <BarChart size={24} />,
    slug: "data-driven",
    category: "technology"
  },
  {
    title: "Teacher Wellness",
    description: "Managing workload and well-being in a technology-rich environment.",
    icon: <Smile size={24} />,
    slug: "teacher-wellness",
    category: "development"
  },
  {
    title: "Coding for Educators",
    description: "Introducing foundational concepts of coding and computational thinking.",
    icon: <Code size={24} />,
    slug: "computational-thinking",
    category: "technology"
  },
  {
    title: "Gamification in Education",
    description: "Using game elements to increase student motivation and engagement.",
    icon: <Gamepad2 size={24} />,
    slug: "gamification",
    category: "innovation"
  },
  {
    title: "Presentation Skills for Educators",
    description: "Techniques to deliver engaging and memorable presentations.",
    icon: <Presentation size={24} />,
    slug: "presentation-skills",
    category: "development",
    featured: true
  }
];

const categories: Category[] = [
  { name: "All Programs", value: "all", icon: <Star size={16} /> },
  { name: "Innovation", value: "innovation", icon: <Lightbulb size={16} /> },
  { name: "Technology", value: "technology", icon: <Laptop size={16} /> },
  { name: "Certification", value: "certification", icon: <Award size={16} /> },
  { name: "Development", value: "development", icon: <Users size={16} /> },
];

// Components
const SearchBar = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => (
  <div className="max-w-md mx-auto">
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Search programs..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 w-full"
      />
    </div>
  </div>
);

const CategoryFilter = ({ 
  categories, 
  activeCategory, 
  onSelect 
}: { 
  categories: Category[]; 
  activeCategory: string; 
  onSelect: (value: string) => void;
}) => (
  <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
    {categories.map((category) => (
      <button
        key={category.value}
        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          category.value === activeCategory
            ? 'bg-blue-600 text-white'
            : 'bg-white text-gray-700 hover:bg-gray-100'
        }`}
        onClick={() => onSelect(category.value)}
      >
        {category.icon}
        {category.name}
      </button>
    ))}
  </div>
);

const ProgramCard = ({ program }: { program: Program }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-blue-100 p-3 text-blue-600">
        {program.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{program.title}</h3>
        <p className="text-gray-600 mb-4">{program.description}</p>
        <Link
          to={`/programs/${program.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Learn More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

const SpecialOfferCard = ({ 
  title, 
  description, 
  icon, 
  link, 
  gradient 
}: { 
  title: string; 
  description: string; 
  icon: JSX.Element; 
  link: string; 
  gradient: string;
}) => (
  <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 border border-blue-200`}>
    <div className="flex items-start gap-4">
      <div className="rounded-full bg-blue-100 p-3 text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          Learn More
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

// Main Component
const Programs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeCategory === 'all') {
      return matchesSearch;
    }
    
    return matchesSearch && program.category === activeCategory;
  });

  return (
    <PageBackground>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-gray-900">
              Professional Development Programs
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Enhance your teaching skills with our specialized training programs designed for modern educators.
            </p>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Programs</h2>
            <p className="text-gray-600">Our most popular training programs for educators</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {trainingPrograms
              .filter(program => program.featured)
              .map((program, index) => (
                <ProgramCard key={index} program={program} />
              ))}
          </div>
        </div>
      </section>
      
      {/* All Programs Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All Programs</h2>
            <p className="text-gray-600">Browse our complete catalog of training programs</p>
          </div>

          <CategoryFilter 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
          
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl">
              <h3 className="text-xl font-semibold mb-2">No programs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, index) => (
                <ProgramCard key={index} program={program} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SpecialOfferCard
              title="Bundle Discount"
              description="Get a 30% discount when you register for 3 or more programs."
              icon={<Award size={24} />}
              link="/contact"
              gradient="from-blue-50 to-blue-100"
            />
            <SpecialOfferCard
              title="1:1 Mentoring"
              description="Get personalized attention with our exclusive one-to-one mentoring program."
              icon={<Users size={24} />}
              link="/mentoring"
              gradient="from-purple-50 to-purple-100"
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </PageBackground>
  );
};

export default Programs;
