
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Building, BarChart, DollarSign } from "lucide-react";
import SectionHeading from "@/components/common/SectionHeading";

const services = [
  {
    icon: <ShieldCheck className="w-10 h-10 text-survival-600" />,
    title: "Solo 401(k)",
    description: "Retirement plans designed specifically for the self-employed and small business owners.",
    link: "/services/solo-401k",
    color: "from-survival-600 to-survival-800"
  },
  {
    icon: <Building className="w-10 h-10 text-finance-600" />,
    title: "LLC Creation",
    description: "Create your business entity with our step-by-step LLC formation service.",
    link: "/services/llc-creation",
    color: "from-finance-600 to-finance-800"
  },
  {
    icon: <BarChart className="w-10 h-10 text-survival-700" />,
    title: "First Responder Package",
    description: "Specialized LLC and Solo 401k package for First Responders.",
    link: "/services/first-responder-package",
    color: "from-survival-700 to-survival-500"
  },
  {
    icon: <DollarSign className="w-10 h-10 text-finance-700" />,
    title: "Alternative Investments",
    description: "Discover investment options beyond traditional stocks and bonds.",
    link: "/services/alternative-investments",
    color: "from-finance-700 to-finance-500"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
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
            <Card 
              key={index} 
              className="border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <CardHeader className="pb-4">
                <div className="mb-4 p-3 rounded-full bg-white w-fit shadow-sm border border-gray-100">
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
