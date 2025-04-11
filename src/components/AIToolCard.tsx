
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AIToolCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  slug: string;
}

export const AIToolCard = ({
  id,
  title,
  description,
  imageUrl,
  category,
  slug,
}: AIToolCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="pill bg-tech-600 text-white">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-tech-700">
          {title}
        </h3>
        <p className="mb-4 text-gray-600">
          {description}
        </p>
        <Link 
          to={`/ai-tools/${slug}`} 
          className="inline-flex items-center gap-1 font-medium text-tech-700 transition-colors hover:text-tech-900"
        >
          Try this tool
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
