import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, CheckCircle, Globe, Cpu, BadgeCheck } from 'lucide-react';

export const Hero = () => {
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const elements = elementsRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      elements.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const certifications = [
    "Google Certified Trainer",
    "Microsoft Educator",
    "Apple Teacher",
    "Adobe Creative Educator"
  ];

  return (
    <div className="relative pt-24 overflow-hidden">
      {/* Background Elements - Updated with more subtle colors */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full bg-blue-100/50 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] rounded-full bg-purple-100/50 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div 
            ref={(el) => (elementsRef.current[0] = el)} 
            className="text-center opacity-0"
          >
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 mb-6 border border-blue-100">
              <BadgeCheck size={16} className="mr-2" />
              CPD Accredited Training Provider
            </div>
            
            <h1 className="heading-1 text-gray-900 mb-6">
              Teacher Training for the Digital Age
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg text-gray-600 mb-8">
              Specialized training programs for educators worldwide, designed to transform teaching methods with cutting-edge techniques and technology integration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link
                to="/booking"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-tech-600 px-8 py-3 font-medium text-white transition-all hover:shadow-lg hover:shadow-blue-200"
              >
                Book a Training Session
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/programs"
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-medium text-blue-700 transition-all hover:bg-gray-50 border border-blue-200"
              >
                Explore Programs
              </Link>
            </div>

            {/* Featured AI Course Banner */}
            <div className="mt-6 mb-8 p-4 bg-gradient-to-r from-blue-50 to-tech-50 rounded-xl border border-blue-100 inline-block max-w-xl">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-tech-600 rounded-full p-2 text-white">
                  <Cpu size={20} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Featured Program</span>
                  <h3 className="text-sm md:text-base font-semibold text-gray-900">Teaching Strategies with AI</h3>
                </div>
                <Link to="/programs/ai-teaching" className="text-blue-600 text-sm font-medium ml-auto">
                  Learn More
                </Link>
              </div>
            </div>
          </div>

          {/* Credentials */}
          <div 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="flex flex-wrap justify-center items-center gap-4 mb-8 opacity-0"
            style={{ animationDelay: '0.2s' }}
          >
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm border border-blue-100"
              >
                <CheckCircle size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-gray-800">{cert}</span>
              </div>
            ))}
          </div>

        
        </div>
      </div>
    </div>
  );
};
