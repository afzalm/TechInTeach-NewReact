import { useState } from 'react';
import { 
  Users, 
  Clock, 
  Target, 
  BookOpen, 
  CheckCircle, 
  Calendar,
  MessageSquare,
  Award,
  ArrowRight
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/PageBackground';

const Mentoring = () => {
  return (
    <PageBackground>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-28 pb-8 md:pt-32 md:pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 mb-6 text-gray-900">
              Personalized 1:1 Mentoring
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Get personalized attention and guidance to accelerate your professional growth as an educator.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Target size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Personalized Learning Path</h3>
                    <p className="text-gray-600">
                      Your mentor will create a customized learning plan based on your goals, experience level, and specific needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Flexible Scheduling</h3>
                    <p className="text-gray-600">
                      Choose your preferred time slots and frequency of sessions to fit your busy schedule.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <MessageSquare size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Direct Feedback</h3>
                    <p className="text-gray-600">
                      Receive immediate, constructive feedback on your progress and areas for improvement.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Accountability</h3>
                    <p className="text-gray-600">
                      Stay motivated and on track with regular check-ins and progress monitoring.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customized Curriculum</h3>
                    <p className="text-gray-600">
                      Focus on the specific skills and knowledge areas that matter most to your professional development.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-gray-600">
                      Learn from experienced educators who have successfully navigated similar challenges.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Long-term Support</h3>
                    <p className="text-gray-600">
                      Build a lasting professional relationship with your mentor for ongoing guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-16 px-4 bg-purple-50">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Program Details</h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Who It's For</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Educators seeking personalized professional development</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Teachers with specific learning goals or challenges</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>School leaders looking to enhance their skills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Anyone who prefers individual attention over group sessions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Program Structure</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Initial consultation to assess needs and set goals</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Weekly 1-hour mentoring sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Customized learning materials and resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-purple-600" />
                    <span>Progress tracking and regular feedback</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-4">Investment</h3>
                <p className="text-gray-600 mb-4">
                  Our mentoring program is available in flexible packages starting from 4 sessions. Contact us for detailed pricing and to discuss your specific needs.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                >
                  Get in touch for pricing details
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Book a free consultation to discuss your goals and how our mentoring program can help you achieve them.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-3 text-white font-medium hover:bg-purple-700 transition-colors"
            >
              Book a Free Consultation
              <Calendar size={20} />
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </PageBackground>
  );
};

export default Mentoring; 