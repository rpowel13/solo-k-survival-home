import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Tagline */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/defe3d28-f928-4eb2-adcf-bfbbd3919d61.png" 
                alt="Survival 401k Logo" 
                className="h-10 mr-2"
              />
              <div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-survival-800">Survival<span className="text-finance-600">401k</span></span>
                </div>
                <p className="text-xs text-gray-500 ml-1">Common Sense Wealth Management</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-survival-700 font-medium transition-colors">Home</Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-medium bg-transparent">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-survival-50 to-survival-100 p-6 no-underline outline-none focus:shadow-md"
                            to="/services/solo-401k"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-survival-800">
                              Solo 401k
                            </div>
                            <p className="text-sm leading-tight text-survival-700">
                              Retirement plans designed specifically for the self-employed and small business owners.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/llc-creation"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">LLC Creation</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Create your business entity with our step-by-step LLC formation service.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/first-responder-package"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">First Responder Package</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Specialized LLC and Solo 401k package for first responders.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/alternative-investments"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Alternative Investments</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover investment options beyond traditional stocks and bonds.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/services/metal-prices"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Gold & Silver Prices</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              View current market prices for precious metals.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-600 hover:text-survival-700 font-medium bg-transparent">
                    Applications
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply/solo-401k"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Solo 401k Application</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Apply for your Solo 401k retirement plan
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply/llc"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">LLC Application</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Start your LLC formation process
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply/first-responder"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">First Responder Package</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Apply for First Responder specialized services
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/apply/alternative-investments"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">Alternative Investments</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Apply for Alternative Investment opportunities
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <a 
              href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-600 hover:text-survival-700 font-medium transition-colors flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Customer Portal
            </a>

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
            <Link to="/" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Home</Link>
            
            <div className="border-b pb-2 mb-2">
              <div className="font-medium mb-2">Services</div>
              <Link to="/services/solo-401k" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Solo 401k</Link>
              <Link to="/services/llc-creation" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">LLC Creation</Link>
              <Link to="/services/first-responder-package" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">First Responder Package</Link>
              <Link to="/services/alternative-investments" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Alternative Investments</Link>
              <Link to="/services/metal-prices" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Gold & Silver Prices</Link>
            </div>

            <div className="border-b pb-2 mb-2">
              <div className="font-medium mb-2">Applications</div>
              <Link to="/apply/solo-401k" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Solo 401k Application</Link>
              <Link to="/apply/llc" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">LLC Application</Link>
              <Link to="/apply/first-responder" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">First Responder Package</Link>
              <Link to="/apply/alternative-investments" className="block text-gray-600 hover:text-survival-700 py-1 pl-4 transition-colors">Alternative Investments</Link>
            </div>

            <a 
              href="https://live.vcita.com/site/izk040b42jnjcf3c/activity/dashboard" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors flex items-center gap-2"
            >
              <User className="h-4 w-4" />
              Customer Portal
            </a>

            <Link to="/contact" className="block text-gray-600 hover:text-survival-700 font-medium py-2 transition-colors">Contact</Link>
            <Button className="w-full bg-survival-600 hover:bg-survival-700 text-white">Get Started</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
