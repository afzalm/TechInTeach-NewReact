
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Laptop, DollarSign } from 'lucide-react';

type ProgramHeroProps = {
  title: string;
  description: string;
  duration: string;
  mode: string[];
  fee: string;
  image: string;
}

export const ProgramHero = ({ 
  title, 
  description, 
  duration, 
  mode, 
  fee, 
  image 
}: ProgramHeroProps) => {
  return (
    <section 
      className="pt-28 pb-16 md:pt-32 md:pb-20 bg-gradient-to-b from-blue-50 to-white"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(239, 246, 255, 0.6), rgba(255, 255, 255, 0.99)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container mx-auto px-4">
        <Link to="/programs" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft size={18} />
          <span>Back to All Programs</span>
        </Link>
        
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-4 md:gap-6 mt-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={20} className="text-blue-600" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Laptop size={20} className="text-blue-600" />
              <span className="hidden md:inline">{mode.join(", ")}</span>
              <span className="md:hidden">{mode.length > 1 ? `${mode[0]} +${mode.length - 1}` : mode[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <DollarSign size={20} className="text-blue-600" />
              <span>{fee}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
