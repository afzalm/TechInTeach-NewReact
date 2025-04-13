import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PageBackground } from '@/components/PageBackground';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { benefitsLeft, benefitsRight, programDetails } from '@/data/mentoringData';
import { Helmet } from 'react-helmet-async';

const Mentoring = () => {
  return (
    <>
      <Helmet>
        <title>Mentoring | TechInTeach</title>
        <meta name="description" content="Learn about our mentoring programs designed to support and guide educators throughout their careers." />
        <link rel="canonical" href="https://techinteach.com/mentoring" />
      </Helmet>

      <div>
        <Navbar />

        {/* Hero Section */}
        <section className="pt-28 pb-8 md:pt-32 md:pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 mb-6 text-gray-900">Personalized 1:1 Mentoring</h1>
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
                {[benefitsLeft, benefitsRight].map((list, index) => (
                  <div className="space-y-6" key={index}>
                    {list.map((benefit, idx) => (
                      <div className="flex items-start gap-4" key={idx}>
                        <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                          <benefit.icon size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                          <p className="text-gray-600">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
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
                {/* Who It's For */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Who It's For</h3>
                  <ul className="space-y-3">
                    {programDetails.whoItsFor.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-purple-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Structure */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Program Structure</h3>
                  <ul className="space-y-3">
                    {programDetails.structure.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-purple-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Investment */}
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4">Investment</h3>
                  <p className="text-gray-600 mb-4">{programDetails.investmentText}</p>
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
      </div>
    </>
  );
};

export default Mentoring;
