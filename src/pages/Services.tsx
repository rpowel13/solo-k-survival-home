
import React from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, ShieldCheck, Building2, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section className="bg-survival-800 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
              <p className="text-xl text-gray-200">
                Comprehensive retirement planning and asset protection solutions designed specifically for entrepreneurs, First Responders, and small business owners.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Solo 401k Card */}
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-survival-100 rounded-lg flex items-center justify-center mb-4">
                    <ShieldCheck className="h-6 w-6 text-survival-700" />
                  </div>
                  <CardTitle>Solo 401k</CardTitle>
                  <CardDescription>Self-directed retirement plans for entrepreneurs and small business owners</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li>• Higher contribution limits than IRAs</li>
                    <li>• Alternative investment options</li>
                    <li>• Tax-deferred or tax-free growth</li>
                    <li>• Loan provisions available</li>
                    <li>• Simplified administration</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/services/solo-401k" className="w-full">
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* LLC Creation Card */}
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-survival-100 rounded-lg flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-survival-700" />
                  </div>
                  <CardTitle>LLC Creation</CardTitle>
                  <CardDescription>Protect your personal assets with a properly structured business entity</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li>• Limited liability protection</li>
                    <li>• Tax flexibility options</li>
                    <li>• Complete formation documents</li>
                    <li>• Custom operating agreement</li>
                    <li>• EIN obtainment included</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/services/llc-creation" className="w-full">
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* First Responder Package */}
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-survival-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-survival-700" />
                  </div>
                  <CardTitle>First Responder Package</CardTitle>
                  <CardDescription>Specialized retirement and asset protection for First Responders</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li>• Complete LLC formation</li>
                    <li>• Customized Solo 401k plan</li>
                    <li>• Side business optimization</li>
                    <li>• Pension complement strategy</li>
                    <li>• Special preferred pricing</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/services/first-responder-package" className="w-full">
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              {/* Alternative Investments */}
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-survival-100 rounded-lg flex items-center justify-center mb-4">
                    <Building2 className="h-6 w-6 text-survival-700" />
                  </div>
                  <CardTitle>Alternative Investments</CardTitle>
                  <CardDescription>Diversify beyond traditional stocks and bonds</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-sm">
                    <li>• Real estate investments</li>
                    <li>• Precious metals</li>
                    <li>• Private lending opportunities</li>
                    <li>• Private equity placements</li>
                    <li>• Cryptocurrency options</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link to="/services/alternative-investments" className="w-full">
                    <Button className="w-full">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-survival-800 mb-6">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Contact us today for a consultation or to learn more about how our services can help secure your financial future.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/contact">
                  <Button size="lg" className="bg-survival-600 hover:bg-survival-700">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
