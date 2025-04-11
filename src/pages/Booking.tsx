import { useRef } from 'react';
import { 
  Calendar, 
  Users, 
  Sparkles, 
  CheckCircle, 
  Clock, 
  MapPin 
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { BookingForm } from '@/components/BookingForm';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/PageBackground';

const Booking = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <PageBackground>
      <Navbar />
      
      {/* Header */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-gray-900">
              Book a Training Session
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Schedule a custom training program for your institution or join one of our upcoming online sessions.
            </p>
          </div>
        </div>
      </section>
      
      {/* Booking Section */}
      <section className="py-12 px-4 md:py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Benefits Sidebar */}
            <div className="order-2 lg:order-1">
              <div className="glass-card rounded-xl p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 text-gray-900">Why Book With Us</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-tech-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Experienced Trainers</h4>
                      <p className="text-sm text-gray-600">
                        Learn from certified professionals with extensive classroom experience.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-tech-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Customized Programs</h4>
                      <p className="text-sm text-gray-600">
                        Training tailored to your specific requirements and objectives.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-tech-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Flexible Scheduling</h4>
                      <p className="text-sm text-gray-600">
                        Choose online, on-site, or hybrid sessions at convenient times.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-tech-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Comprehensive Resources</h4>
                      <p className="text-sm text-gray-600">
                        Receive training materials, guides, and follow-up support.
                      </p>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-tech-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900">Global Reach</h4>
                      <p className="text-sm text-gray-600">
                        We provide training services to educators worldwide.
                      </p>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Clock size={18} className="text-tech-600" />
                    <span>Training sessions typically last 3-6 hours</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users size={18} className="text-tech-600" />
                    <span>Available for individuals and groups of all sizes</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <MapPin size={18} className="text-tech-600" />
                    <span>On-site training available across India</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Sparkles size={18} className="text-tech-600" />
                    <span>Special rates for government schools</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Form */}
            <div className="order-1 lg:order-2 lg:col-span-2">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Request a Training Session</h2>
                <BookingForm />
              </div>
              
              {/* Upcoming Sessions */}
              <div className="mt-8 rounded-xl bg-white p-6 md:p-8 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Upcoming Online Sessions</h3>
                  <Calendar size={22} className="text-tech-600" />
                </div>
                
                <div className="space-y-4">
                  <div className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-tech-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Design Thinking Workshop</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          A comprehensive introduction to design thinking principles for educators.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={14} />
                            June 15, 2023
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={14} />
                            10:00 AM - 1:00 PM IST
                          </span>
                        </div>
                      </div>
                      <div className="pill bg-tech-100 text-tech-700">
                        ₹1,499
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-tech-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">AI in Education Masterclass</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Learn practical ways to integrate AI tools in your classroom.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={14} />
                            June 22, 2023
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={14} />
                            2:00 PM - 5:00 PM IST
                          </span>
                        </div>
                      </div>
                      <div className="pill bg-tech-100 text-tech-700">
                        ₹1,999
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg border border-gray-100 p-4 transition-colors hover:bg-tech-50">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Google Certified Educator Prep</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Intensive preparation course for Google Educator Level 1 certification.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Calendar size={14} />
                            July 8-9, 2023
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={14} />
                            10:00 AM - 1:00 PM IST
                          </span>
                        </div>
                      </div>
                      <div className="pill bg-tech-100 text-tech-700">
                        ₹2,499
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <a
                    href="#"
                    className="text-sm font-medium text-tech-600 hover:text-tech-700"
                  >
                    View all upcoming sessions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageBackground>
  );
};

export default Booking;
