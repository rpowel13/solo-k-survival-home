
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { useState } from "react";
import ScheduleConsultationForm from "./ScheduleConsultationForm";

const Footer = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Survival 401k</h3>
            <p className="mb-4 text-sm text-gray-400">
              Providing customized Solo 401(k) solutions for self-employed professionals and small business owners since 2014.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#comparison" className="text-gray-400 hover:text-white transition-colors">Plan Comparison</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/retirement-calculator" className="text-gray-400 hover:text-white transition-colors">Retirement Calculator</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tax Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Investment Options</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span>(833) 224-5517</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span>info@survival401k.com</span>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-700">
                <button 
                  onClick={() => setIsSchedulerOpen(true)}
                  className="text-survival-400 hover:text-survival-300 font-medium cursor-pointer"
                >
                  Schedule a Free Consultation
                </button>
                <Dialog open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
                  <DialogContent className="sm:max-w-[700px] md:max-w-[800px] p-6">
                    <DialogHeader>
                      <DialogTitle>Schedule a Free Consultation</DialogTitle>
                      <DialogDescription>Select a date and time that works for you. Our specialist will call you at the scheduled time.</DialogDescription>
                    </DialogHeader>
                    <ScheduleConsultationForm />
                  </DialogContent>
                </Dialog>
              </li>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Survival 401k. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/terms-of-service" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Legal Disclosures</a>
          </div>
          <p className="mt-4 max-w-2xl mx-auto">
            The information provided is for general informational purposes only and should not be considered legal or tax advice. 
            Consult with a qualified professional regarding your specific situation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
