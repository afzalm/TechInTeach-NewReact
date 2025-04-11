
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const AIToolDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 pt-24">
        <Link to="/ai-tools" className="inline-flex items-center gap-2 text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft size={18} />
          <span>Back to AI Tools</span>
        </Link>
        
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="heading-2 mb-6 text-gray-900">{slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'AI Tool'}</h1>
          
          <div className="p-6 bg-gray-100 rounded-lg mb-8">
            <h2 className="text-xl font-medium mb-4">Interact with this AI Tool</h2>
            <p className="text-gray-600 mb-4">
              This is a placeholder for the AI tool interaction interface. In the actual implementation, 
              this would contain a simple interface where teachers can interact with the AI without writing prompts.
            </p>
            
            <div className="p-4 border border-dashed border-gray-300 rounded-lg text-center text-gray-500">
              AI tool interface would appear here
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h3 className="text-xl font-bold mb-3">What this tool does</h3>
            <p>
              This AI-powered tool helps educators simplify their workflow and enhance teaching effectiveness
              without requiring any prompt engineering or technical knowledge.
            </p>
            
            <h3 className="text-xl font-bold mt-6 mb-3">How to use this tool</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Select your preferences from the options provided</li>
              <li>Review the AI-generated content</li>
              <li>Use the customization options to refine the output</li>
              <li>Download or copy the final result</li>
            </ol>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AIToolDetail;
