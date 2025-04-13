import { useEffect, useRef, useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import contactInfo from '@/data/contactInfo';
import { Helmet } from 'react-helmet-async';

import { Textarea } from '@/components/ui/textarea';
import { PageBackground } from '@/components/PageBackground';

const Contact = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://techinteach.com/admin_login/api/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact',
          ...formData
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully!", {
          description: "We'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        toast.error("Failed to send message", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TechInTeach</title>
        <meta name="description" content="Get in touch with TechInTeach for professional development training and consultations." />
        <link rel="canonical" href="https://techinteach.com/contact" />
      </Helmet>

      <PageBackground>
        <Navbar />
        
        {/* Header */}
        <section className="pt-28 pb-8 md:pt-32 md:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 mb-6 text-gray-900">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Have questions about our training programs? We're here to help. Reach out to our team.
              </p>
            </div>
          </div>
        </section>
              
        {/* Contact Section */}
        <section className="py-12 px-4 md:py-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div>
                <div className="glass-card rounded-xl p-6 sticky top-24">                
                  <h2 className="text-xl font-bold mb-6 text-gray-900">{contactInfo.heading}</h2>                
                    <div className="space-y-6">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-tech-100 p-3 text-tech-600 flex-shrink-0">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Email Us</h3>
                          <p className="text-sm text-gray-600">
                            For general inquiries:<br />
                            <a href={`mailto:${contactInfo.email.general}`} className="text-tech-600 hover:underline">
                              {contactInfo.email.general}
                            </a><br />
                            For training bookings:<br />
                            <a href={`mailto:${contactInfo.email.booking}`} className="text-tech-600 hover:underline">
                              {contactInfo.email.booking}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-tech-100 p-3 text-tech-600 flex-shrink-0">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Call Us</h3>
                          <p className="text-sm text-gray-600">
                            Main Office:<br />
                            <a href={`tel:${contactInfo.call.main}`} className="text-tech-600 hover:underline">
                              {contactInfo.call.main}
                            </a><br />
                            Training Department:<br />
                            <a href={`tel:${contactInfo.call.training}`} className="text-tech-600 hover:underline">
                              {contactInfo.call.training}
                            </a>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-tech-100 p-3 text-tech-600 flex-shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">Visit Us</h3>
                          <p className="text-sm text-gray-600">{contactInfo.address.lines.map((line, index) => (
                            <span key={index}>{line}<br /></span>
                          ))}</p>
                        </div>
                      </div>
                    </div>
                </div>
                
              </div>
              
              {/* Contact Form */}
              <div>
                <div className="glass-card rounded-xl p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input 
                          id="name" 
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Doe" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="john@example.com" 
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input 
                        id="subject" 
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="How can we help you?" 
                        required 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea 
                        id="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us about your inquiry..." 
                        required
                        rows={6}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-tech-600 hover:bg-tech-700"
                      disabled={isSubmitting}
                    >
                      <Send size={16} className="mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section - For illustration only */}
        <section className="py-12 px-4 md:py-16 bg-gray-50">
          <div className="container mx-auto">
            {/* <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden">
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p>Interactive Map Would Be Displayed Here</p>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="mt-8 rounded-xl bg-white p-6 border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Quick Actions</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a 
                      href="/booking" 
                      className="flex items-center gap-3 rounded-lg border border-tech-200 bg-tech-50 p-4 text-tech-700 hover:bg-tech-100 transition-colors"
                    >
                      <Calendar size={20} />
                      <span className="font-medium">Book a Training</span>
                    </a>
                    
                    <a 
                      href="/programs" 
                      className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <MessageSquare size={20} />
                      <span className="font-medium">Explore Programs</span>
                    </a>
                  </div>
                </div>
          </div>
        </section>
        
        <Footer />
      </PageBackground>
    </>
  );
};

export default Contact;