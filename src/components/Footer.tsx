
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, Edit } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Survival 401k</h3>
            <p className="mb-4 text-sm text-gray-400">
              Providing customized Solo 401(k) solutions for self-employed professionals and small business owners since 2014.
            </p>
            <div className="flex justify-center sm:justify-start space-x-4 mb-6">
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
          <div className="text-center sm:text-left">
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
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/retirement-calculator" className="text-gray-400 hover:text-white transition-colors">Retirement Calculator</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tax Guides</a></li>
              <li>
                <Link 
                  to="/services/alternative-investments#top" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Investment Options
                </Link>
              </li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Webinars</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <li className="flex items-start justify-center sm:justify-start">
                <Phone className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span>(833) 224-5517</span>
              </li>
              <li className="flex items-start justify-center sm:justify-start">
                <Mail className="h-5 w-5 mr-3 text-gray-400 mt-0.5" />
                <span>info@survival401k.com</span>
              </li>
              <li className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex flex-col items-center sm:items-start space-y-2">
                  <a 
                    href="https://live.vcita.com/site/izk040b42jnjcf3c/online-scheduling?service=mscylmpg3ioi58ke&staff=sdpi7niilv7t6k07" 
                    target="blank" 
                    data-id="livesite-widget" 
                    className="livesite-schedule text-survival-400 hover:text-survival-300 font-medium cursor-pointer text-center sm:text-left"
                    data-service="mscylmpg3ioi58ke" 
                    data-staff="sdpi7niilv7t6k07"
                  >
                    Schedule a Free Consultation
                  </a>
                  <a 
                    href="https://live.vcita.com/site/izk040b42jnjcf3c/online-scheduling?service=ry5n8z8s16pz3wqj&staff=onp5y3ueog3kdoly" 
                    target="blank" 
                    data-id="livesite-widget" 
                    className="flex items-center justify-center sm:justify-start text-survival-400 hover:text-survival-300 font-medium cursor-pointer"
                    data-service="ry5n8z8s16pz3wqj" 
                    data-staff="onp5y3ueog3kdoly"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Update my Account
                  </a>
                </div>
              </li>
            </div>
          </div>
        </div>

        {/* Bottom Footer with Legal Links */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-4 sm:mb-6 px-2">
            <Link to="/terms-of-service" className="text-gray-300 hover:text-white transition-colors font-medium text-sm sm:text-base">
              Terms of Service
            </Link>
            <Link to="/privacy-policy" className="text-gray-300 hover:text-white transition-colors font-medium text-sm sm:text-base">
              Privacy Policy
            </Link>
            <Link to="/legal-disclosures" className="text-gray-300 hover:text-white transition-colors font-medium text-sm sm:text-base">
              Legal Disclosures
            </Link>
          </div>
          
          <p className="text-xs sm:text-sm text-center text-gray-500 px-2">
            &copy; {new Date().getFullYear()} Survival 401k. All rights reserved.
          </p>
          
          <p className="mt-4 max-w-2xl mx-auto text-xs sm:text-sm text-center text-gray-500 px-4">
            The information provided is for general informational purposes only and should not be considered legal or tax advice. 
            Consult with a qualified professional regarding your specific situation.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
