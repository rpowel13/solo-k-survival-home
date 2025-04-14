
import React from "react";
import { Mail, Phone } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto section-padding">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-12">
              Have questions about Solo 401(k) plans? Our retirement specialists are here to help.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-2xl font-semibold mb-6">Reach Out to Us</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-600">(800) 401-5010</p>
                      <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-5pm ET</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-600">info@survival401k.com</p>
                      <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                <iframe 
                  src="https://www.vcita.com/widgets/contact_form/izk040b42jnjcf3c?frontage_iframe=true" 
                  width="100%" 
                  height="500" 
                  scrolling="no" 
                  frameBorder="0"
                  title="Contact Form for Survival 401k"
                  className="border-0 shadow-sm rounded-md"
                >
                  <p>Please contact me via my contact form at vcita:</p>
                  <a href='https://www.vcita.com/v/izk040b42jnjcf3c/contact?frontage_iframe=true&invite=vr_cf_pb-izk040b42jnjcf3c'>
                    Contact Form for Survival 401k, LLC
                  </a>
                </iframe>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
