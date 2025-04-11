import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Brain, 
  Laptop, 
  BookOpen, 
  Award, 
  School, 
  Globe, 
  Users,
  Calendar,
  CheckCircle,
  Cpu,
  BadgeCheck
} from 'lucide-react';

import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ProgramCard } from '@/components/ProgramCard';
import { Testimonial } from '@/components/Testimonial';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { InteractiveBackground } from '@/components/InteractiveBackground';

const Index = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  
  useEffect(() => {
    const sections = sectionsRef.current;
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

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Training programs data
  const trainingPrograms = [
    {
      title: "Design Thinking for Educators",
      description: "Master the design thinking process to create innovative solutions for classroom challenges.",
      icon: <Brain size={24} />,
      slug: "design-thinking"
    },
    {
      title: "Creating Engaging Classrooms",
      description: "Transform your classroom with modern technology integration and engagement techniques.",
      icon: <Laptop size={24} />,
      slug: "engaging-classrooms"
    },
    {
      title: "Teaching Strategies with AI",
      description: "Learn how to leverage AI tools to enhance learning outcomes and streamline tasks.",
      icon: <Cpu size={24} />,
      slug: "ai-teaching",
      featured: true
    },
    {
      title: "School Innovation Ambassador",
      description: "Get guided preparation for the MoEd Government of India's School Innovation Ambassador program.",
      icon: <Award size={24} />,
      slug: "innovation-ambassador"
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "The Design Thinking workshop transformed our teaching approach. Now our lessons are more student-centered and creative.",
      author: "Priya Sharma",
      role: "Vice Principal",
      school: "Delhi Public School",
      rating: 5
    },
    {
      quote: "The AI training session was eye-opening. Our teachers are now confidently integrating AI tools to enhance student learning.",
      author: "Rajesh Kumar",
      role: "Technology Coordinator",
      school: "Kendriya Vidyalaya",
      rating: 5
    },
    {
      quote: "Thanks to TechinTeach, I'm now a Google Certified Educator. The training was comprehensive and extremely practical.",
      author: "Ananya Patel",
      role: "English Teacher",
      school: "St. Mary's High School",
      rating: 4
    }
  ];

  return (
    <div className="relative min-h-screen">
      <InteractiveBackground />
      <Navbar />
      <Hero />
      
      {/* Programs Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="section-padding bg-gray-50 opacity-0"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="mb-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                <BadgeCheck size={16} />
                CPD Accredited Programs
              </span>
            </div>
            <h2 className="heading-2 mb-4 text-gray-900">
              Specialized Training Programs for Modern Educators
            </h2>
            <p className="text-lg text-gray-600">
              Our training sessions are designed to equip educators with the skills and knowledge needed to excel in today's evolving educational landscape.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 staggered-animation">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="opacity-0 animate-zoom-in">
                <ProgramCard {...program} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              View all training programs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* AI Focus Section - Updated with more subtle gradient */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="section-padding bg-gradient-to-r from-blue-600 via-tech-600 to-tech-500 text-white opacity-0"
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-4 rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                AI for Educators
              </span>
              <h2 className="heading-2 mb-6">
                Transform Your Teaching with Artificial Intelligence
              </h2>
              <ul className="space-y-4">
                {[
                  "Learn to use AI tools for personalized learning experiences",
                  "Create engaging content using AI-powered platforms",
                  "Save time with automated grading and assessment tools",
                  "Design interactive activities that leverage AI capabilities",
                  "Stay ahead with the latest AI trends in education"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/programs/ai-teaching"
                  className="rounded-full bg-white px-6 py-3 text-blue-700 font-medium transition-all hover:shadow-lg inline-flex items-center gap-2"
                >
                  Explore AI Courses
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="rounded-xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
              <div className="mb-6 flex items-center gap-4">
                <div className="rounded-full bg-white p-3">
                  <Cpu className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold">
                  Teaching Strategies with AI
                </h3>
              </div>
              <p className="mb-6 text-white/80">
                Our flagship AI course helps educators harness the power of artificial intelligence to create innovative learning experiences, automate routine tasks, and prepare students for a future where AI is integral to every industry.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Course Duration</span>
                  <span className="font-medium">12 Hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Difficulty Level</span>
                  <span className="font-medium">Beginner to Advanced</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Certification</span>
                  <span className="font-medium">CPD Accredited</span>
                </div>
              </div>
              <Link
                to="/booking?program=ai-teaching"
                className="block w-full rounded-lg bg-white/20 py-3 text-center font-medium backdrop-blur-sm transition-all hover:bg-white/30"
              >
                Book this Training
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Updated with subtle blue gradient */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)} 
        className="section-padding"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-2 mb-4 text-gray-900">
              What Educators Say About Us
            </h2>
            <p className="text-lg text-gray-600">
              Hear from teachers and school administrators who have experienced our training programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 staggered-animation">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="opacity-0 animate-slide-in-right">
                <Testimonial {...testimonial} />
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Read more testimonials
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Certifications Section */}
      <section 
        ref={(el) => (sectionsRef.current[5] = el)} 
        className="section-padding bg-white opacity-0"
      >
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="heading-2 mb-4 text-gray-900">
              Get Globally Recognized Certifications
            </h2>
            <p className="text-lg text-gray-600">
              Our preparation programs help educators achieve prestigious educational certifications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6 flex items-center gap-4 transition-all hover:shadow-md">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Google Certified Educator</h3>
                <p className="text-sm text-gray-600">
                  Comprehensive training for Level 1 & Level 2 Google Educator certification exams.
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 flex items-center gap-4 transition-all hover:shadow-md">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Microsoft Educator</h3>
                <p className="text-sm text-gray-600">
                  Expert guidance for Microsoft Certified Educator program and Microsoft Innovative Educator.
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 flex items-center gap-4 transition-all hover:shadow-md">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Apple Teacher</h3>
                <p className="text-sm text-gray-600">
                  Specialized training to help educators integrate Apple technology in the classroom.
                </p>
              </div>
            </div>
            
            <div className="glass-card rounded-xl p-6 flex items-center gap-4 transition-all hover:shadow-md">
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 flex-shrink-0">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1">Adobe Creative Educator</h3>
                <p className="text-sm text-gray-600">
                  Learn to integrate digital creativity into your teaching with Adobe's educational tools.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              to="/programs/certifications"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Learn more about certification programs
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
