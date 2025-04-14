
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-survival-800">Survival<span className="text-finance-600">401k</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Benefits</a>
            <a href="#features" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Features</a>
            <a href="#comparison" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Comparison</a>
            <a href="#faq" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">FAQ</a>
            <Link to="/contact" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Contact</Link>
            <Button className="bg-survival-600 hover:bg-survival-700 text-white">Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-survival-700 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in">
            <a href="#benefits" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Benefits</a>
            <a href="#features" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Features</a>
            <a href="#comparison" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Comparison</a>
            <a href="#faq" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">FAQ</a>
            <Link to="/contact" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Contact</Link>
            <Button className="w-full bg-survival-600 hover:bg-survival-700 text-white">Get Started</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
