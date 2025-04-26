import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/services/solo-401k" className="text-gray-300 hover:text-white">Solo 401(k)</Link></li>
              <li><Link to="/services/llc-creation" className="text-gray-300 hover:text-white">LLC Creation</Link></li>
              <li><Link to="/services/first-responder-package" className="text-gray-300 hover:text-white">First Responder Package</Link></li>
              <li><Link to="/services/alternative-investments" className="text-gray-300 hover:text-white">Alternative Investments</Link></li>
              <li><Link to="/articles" className="text-gray-300 hover:text-white">Articles</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/tools/retirement-calculator" className="text-gray-300 hover:text-white">Retirement Calculator</Link></li>
              <li><Link to="/tools/loan-calculator" className="text-gray-300 hover:text-white">Loan Calculator</Link></li>
              <li><Link to="/tools/rmd-calculator" className="text-gray-300 hover:text-white">RMD Calculator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact & Support</h3>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact Us</Link></li>
              <li>
                <a href="tel:+18332245517" className="text-gray-300 hover:text-white">
                  (833) 224-5517
                </a>
              </li>
              <li>
                <a href="mailto:info@survival401k.com" className="text-gray-300 hover:text-white">
                  info@survival401k.com
                </a>
              </li>
              <li><Link to="/schedule" className="text-blue-500 hover:text-blue-400">Schedule a Free Consultation</Link></li>
              <li><Link to="/account" className="text-blue-500 hover:text-blue-400">Update my Account</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-gray-400 text-center">
          <p>&copy; {currentYear} Survival Retirement. All rights reserved.</p>
        </div>

        <div className="mt-4 text-center space-x-4">
          <Link to="/terms-of-service" className="text-gray-300 hover:text-white">Terms of Service</Link>
          <Link to="/privacy-policy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
          <Link to="/legal-disclosures" className="text-gray-300 hover:text-white">Legal Disclosures</Link>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500 px-4 text-sm">
          <p>The information provided is for general informational purposes only and should not be considered legal or tax advice. Consult with a qualified professional regarding your specific situation.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
