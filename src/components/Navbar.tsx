import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import logoWebp from '@/assets/logo.webp';
import logoPng from '@/assets/logo.png';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "Programs", path: "/programs" },
    { title: "Mentoring", path: "/mentoring" },
    { title: "Articles", path: "/articles" },
    { title: "Book a Training", path: "/booking" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo with WebP fallback */}
        <Link to="/" className="flex items-center">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img src={logoPng} alt="TechinTeach" className="h-10 object-contain" />
          </picture>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`subtle-underline px-1 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <Link 
            to="/booking" 
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-md"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - Updated */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-white z-50 overflow-y-auto">
          <div className="container mx-auto px-4 py-4 min-h-[calc(100vh-72px)] flex flex-col">
            <ul className="flex-1 space-y-2">
              {navLinks.map((link) => (
                <li key={link.path} className="list-none">
                  <Link 
                    to={link.path}
                    className={`block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-auto border-t pt-4">
              <Link 
                to="/booking" 
                className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-center text-base font-medium text-white transition-all hover:bg-blue-700"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
