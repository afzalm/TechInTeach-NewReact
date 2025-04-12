
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube, Award } from 'lucide-react';
import logoWebp from '@/assets/logo.webp';
import logoPng from '@/assets/logo.png';
import contactInfo from '@/data/contactInfo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
    return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
          <Link to="/" className="flex items-center justify-center py-3">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logoPng} alt="TechinTeach" className="h-10 w-auto" />
          </picture>
        </Link>
            <p className="mb-6 text-gray-600">
              Global teacher training programs designed to empower educators with innovative techniques and technology integration.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <Award size={18} className="text-violet-600" />
              <p className="text-sm font-semibold text-gray-700">
                CPD Accredited Worldwide
              </p>
            </div>
            <div className="flex space-x-4">
              <a href={`${contactInfo.social.facebook}`} className="text-gray-500 hover:text-violet-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href={`${contactInfo.social.x}`} className="text-gray-500 hover:text-violet-600 transition-colors">
                <Twitter size={20} />
              </a>
              <a href={`${contactInfo.social.instagram}`} className="text-gray-500 hover:text-violet-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href={`${contactInfo.social.linkedin}`} className="text-gray-500 hover:text-violet-600 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href={`${contactInfo.social.youtube}`} className="text-gray-500 hover:text-violet-600 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Training Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/programs/design-thinking" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Design Thinking for Educators
                </Link>
              </li>
              <li>
                <Link to="/programs/engaging-classrooms" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Creating Engaging Classrooms
                </Link>
              </li>
              <li>
                <Link to="/programs/ai-teaching" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Teaching Strategies with AI
                </Link>
              </li>
              <li>
                <Link to="/programs/innovation-ambassador" className="text-gray-600 hover:text-violet-600 transition-colors">
                  School Innovation Ambassador
                </Link>
              </li>
              <li>
                <Link to="/programs/certifications" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Certification Programs
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-violet-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Book a Training
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-violet-600 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="mt-0.5 text-violet-600 flex-shrink-0" />
                                <div>
                                    <a href={`mailto:${contactInfo.email.general}`} className="text-gray-600 hover:text-violet-600 transition-colors block">
                                        {contactInfo.email.general}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="mt-0.5 text-violet-600 flex-shrink-0" />
                                <a href={`tel:${contactInfo.call.main}`} className="text-gray-600 hover:text-violet-600 transition-colors block">
                                    {contactInfo.call.main}
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 text-violet-600 flex-shrink-0" />
                <span className="text-gray-600">
                  {contactInfo.address.simple}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-600">
            &copy; {currentYear} TechinTeach. All rights reserved. | CPD Accredited Training Provider
          </p>
        </div>
      </div>
    </footer>
  );
};
