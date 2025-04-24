
import { useState } from 'react';
import { Menu, X } from "lucide-react";
import { Logo } from './header/Logo';
import { DesktopNav } from './header/DesktopNav';
import { MobileNav } from './header/MobileNav';
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and Tagline */}
          <Logo />

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:block">
            <DesktopNav />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-500 hover:text-survival-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-survival-500"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNav isOpen={isMenuOpen} onClose={closeMenu} />
      </div>
    </header>
  );
};

export default Header;
