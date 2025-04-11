
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const ProgramNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-24">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <p className="mb-6">The program you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/programs" 
            className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft size={18} />
            <span>Back to All Programs</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
