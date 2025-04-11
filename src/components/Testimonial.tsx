
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  school?: string;
  rating: number;
  image?: string;
}

export const Testimonial = ({ 
  quote, 
  author, 
  role, 
  school, 
  rating, 
  image 
}: TestimonialProps) => {
  return (
    <div className="glass-card rounded-xl p-6 shadow-sm overflow-hidden relative">
      {/* Quote marks decoration */}
      <div className="absolute -right-4 -top-4 text-6xl font-serif text-tech-100 select-none">
        "
      </div>
      
      <div className="flex flex-col h-full">
        <div className="mb-4 flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={`${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
            />
          ))}
        </div>
        
        <blockquote className="flex-grow mb-6">
          <p className="text-gray-700">{quote}</p>
        </blockquote>
        
        <div className="flex items-center">
          {image ? (
            <div className="mr-4 h-12 w-12 overflow-hidden rounded-full border-2 border-white shadow-sm">
              <img 
                src={image} 
                alt={author} 
                className="h-full w-full object-cover" 
              />
            </div>
          ) : (
            <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-tech-100 text-tech-700 text-lg font-medium">
              {author.charAt(0)}
            </div>
          )}
          
          <div>
            <div className="font-medium text-gray-900">{author}</div>
            <div className="text-sm text-gray-500">
              {role}
              {school && `, ${school}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
