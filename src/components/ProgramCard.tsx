
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProgramCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  featured?: boolean;
}

export const ProgramCard = ({ title, description, icon, slug, featured = false }: ProgramCardProps) => {
  return (
    <div 
      className={`relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg ${
        featured 
          ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-md hover:shadow-blue-200' 
          : 'bg-white text-gray-900 border border-gray-100 hover:border-blue-200'
      }`}
    >
      {featured && (
        <div className="absolute top-3 right-3">
          <span className="pill bg-white/20 backdrop-blur-sm text-white">
            Featured
          </span>
        </div>
      )}
      
      <div className="p-6">
        <div className={`mb-4 h-12 w-12 flex items-center justify-center rounded-full ${
          featured 
            ? 'bg-white/20 text-white' 
            : 'bg-blue-100 text-blue-600'
        }`}>
          {icon}
        </div>
        
        <h3 className="mb-2 text-xl font-bold">
          {title}
        </h3>
        
        <p className={`mb-4 ${featured ? 'text-white/80' : 'text-gray-600'}`}>
          {description}
        </p>
        
        <Link
          to={`/programs/${slug}`}
          className={`inline-flex items-center gap-1 font-medium ${
            featured 
              ? 'text-white' 
              : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          Learn more
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
