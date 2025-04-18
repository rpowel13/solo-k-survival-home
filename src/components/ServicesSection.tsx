
import React from 'react';
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Building, BarChart, DollarSign } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const services = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-survival-600" />,
    title: "Solo 401(k)",
    description: "Retirement plans designed specifically for the self-employed and small business owners.",
    link: "/services/solo-401k",
    color: "from-survival-600 to-survival-800",
    hoverDescription: "Take control of your retirement with a self-directed Solo 401(k). Enjoy higher contribution limits and investment flexibility."
  },
  {
    icon: <Building className="w-10 h-10 text-finance-600" />,
    title: "LLC Creation",
    description: "Create your business entity with our step-by-step LLC formation service.",
    link: "/services/llc-creation",
    color: "from-finance-600 to-finance-800",
    hoverDescription: "Protect your assets and establish your business identity with our comprehensive LLC formation service."
  },
  {
    icon: <BarChart className="w-10 h-10 text-survival-700" />,
    title: "First Responder Package",
    description: "Specialized LLC and Solo 401k package for First Responders.",
    link: "/services/first-responder-package",
    color: "from-survival-700 to-survival-500",
    hoverDescription: "Exclusive financial solutions designed specifically for First Responders, combining LLC protection with retirement planning."
  },
  {
    icon: <DollarSign className="w-10 h-10 text-finance-700" />,
    title: "Alternative Investments",
    description: "Discover investment options beyond traditional stocks and bonds.",
    link: "/services/alternative-investments",
    color: "from-finance-700 to-finance-500",
    hoverDescription: "Diversify your portfolio with alternative investments including real estate, precious metals, and more."
  }
];

interface ServicesSectionProps {
  className?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
  return (
    <section className={`py-16 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionHeading className="text-3xl md:text-4xl font-bold mb-4">
            Our Comprehensive Services
          </SectionHeading>
          <p className="text-gray-600 text-lg">
            Tailored financial solutions for entrepreneurs, First Responders, and small business owners
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <HoverCard key={index}>
              <HoverCardTrigger asChild>
                <Card 
                  className="border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col"
                >
                  <CardHeader className="pb-4">
                    <div className="mb-4 p-3 rounded-full bg-white w-fit shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-110">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-600 text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link to={service.link} className="w-full">
                      <Button 
                        className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity`}
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {service.hoverDescription}
                </p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

