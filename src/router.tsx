import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom';
import Index from './pages/Index';
import Programs from './pages/Programs';
import ProgramDetail from './pages/ProgramDetail';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Articles from './pages/Articles';
import Article from './pages/Article';
import AITools from './pages/AITools';
import AIToolDetail from './pages/AIToolDetail';
import Mentoring from './pages/Mentoring';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Index />} />
      <Route path="/programs" element={<Programs />} />
      <Route path="/programs/:slug" element={<ProgramDetail />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:slug" element={<Article />} />
      {/* Temporarily disabled AI tools routes
      <Route path="/ai-tools" element={<AITools />} />
      <Route path="/ai-tools/:slug" element={<AIToolDetail />} />
      */}
      <Route path="/mentoring" element={<Mentoring />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </>
  ),
  {
    future: {
      v7_startTransition: true,
    },
  }
);

export default router;