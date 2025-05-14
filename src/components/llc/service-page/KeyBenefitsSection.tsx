
import React from 'react';
import SectionHeading from '@/components/common/SectionHeading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, PieChart, Briefcase, Landmark, Wallet, Users
} from 'lucide-react';

const KeyBenefitsSection = () => {
  return (
    <section>
      <SectionHeading className="text-3xl font-bold mb-8 text-survival-800 border-b border-gray-200 pb-2">
        Key Benefits of an LLC
      </SectionHeading>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-finance-600" />
                Asset Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Shield your personal assets from business debts, lawsuits, and other liabilities from your business operations.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-finance-600" />
                Tax Flexibility
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Choose how your LLC is taxed—as a sole proprietorship, partnership, S-Corporation, or C-Corporation.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-finance-600" />
                Enhanced Credibility
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Establish credibility with clients, vendors, and partners by operating as a formal business entity.</p>
            </CardContent>
          </Card>

          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-finance-600" />
                Legal Entity Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Operate as a recognized legal entity with the ability to enter contracts, own property, and establish business credit.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5 text-finance-600" />
                Pass-Through Taxation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Avoid double taxation with pass-through taxation, where business profits are only taxed once on your personal tax return.</p>
            </CardContent>
          </Card>
          
          <Card className="border border-gray-200 hover:shadow-md transition-all duration-300 h-full">
            <CardHeader className="bg-gradient-to-r from-white to-survival-50 border-b border-gray-100">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-finance-600" />
                Ownership Flexibility
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Enjoy flexible ownership structures with multiple members and various profit distribution options.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default KeyBenefitsSection;

