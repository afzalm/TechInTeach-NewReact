
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  slug: string;
  imageUrl?: string;
}

export const BlogCard = ({
  title,
  excerpt,
  date,
  author,
  category,
  slug,
  imageUrl = '/placeholder.svg',
}: BlogCardProps) => {
  return (
    <div className="group overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="pill bg-violet-600 text-white">
            {category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
          <span>{date}</span>
          <span>•</span>
          <span>By {author}</span>
        </div>
        <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-violet-700">
          {title}
        </h3>
        <p className="mb-4 text-gray-600">
          {excerpt}
        </p>
        <Link 
          to={`/blog/${slug}`} 
          className="inline-flex items-center gap-1 font-medium text-violet-700 transition-colors hover:text-violet-900"
        >
          Read more
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
