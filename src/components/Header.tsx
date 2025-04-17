
import { useState, useEffect } from 'react';
import { Menu, X } from "lucide-react";
import { Logo } from './header/Logo';
import { DesktopNav } from './header/DesktopNav';
import { MobileNav } from './header/MobileNav';
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [scrollY, setScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrollingUp(currentScrollY < scrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  // Always fixed at the top regardless of scroll direction
  const headerClasses = "fixed top-0 left-0 right-0 z-50 w-full bg-soft-blue/10 backdrop-blur-sm border-b border-gray-100 shadow-sm transition-transform duration-300";

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Tagline */}
          <Logo />

          {/* Desktop Navigation */}
          <DesktopNav />

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
        <MobileNav isOpen={isMenuOpen} />
      </div>
    </header>
  );
};

export default Header;
