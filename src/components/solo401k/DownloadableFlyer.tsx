
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DownloadableFlyer = () => {
  const { toast } = useToast();

  const handleDownload = () => {
    // Create a link to download a pre-made PDF file instead of generating one on the fly
    const pdfUrl = '/survival-401k-benefits.pdf'; // Replace with your actual PDF path
    
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'survival-401k-benefits.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Download Started",
      description: "Your flyer is being downloaded.",
    });
  };

  return (
    <div className="my-8">
      <Card className="border-2 border-survival-100">
        <CardHeader className="bg-survival-50">
          <CardTitle className="flex items-center gap-2 text-survival-800">
            <FileText className="h-5 w-5" />
            Survival 401k Benefits Overview
          </CardTitle>
        </CardHeader>
        <CardContent id="flyer-content" className="p-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-survival-800 mb-4">Key Benefits</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  • Higher contribution limits - up to $70,000 annually (2025)
                </li>
                <li className="flex items-start gap-2">
                  • Traditional and Roth contribution options
                </li>
                <li className="flex items-start gap-2">
                  • Flexible investment choices including real estate and precious metals
                </li>
                <li className="flex items-start gap-2">
                  • Loan provisions up to $50,000 or 50% of account balance
                </li>
                <li className="flex items-start gap-2">
                  • Checkbook control over your investments
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-survival-800 mb-4">Services Included</h2>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  • Complete plan documentation and IRS compliance
                </li>
                <li className="flex items-start gap-2">
                  • Ongoing support and consultation
                </li>
                <li className="flex items-start gap-2">
                  • Educational resources and investment guidance
                </li>
                <li className="flex items-start gap-2">
                  • Simplified administration and reporting
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-survival-800 mb-4">Pricing</h2>
              <div className="space-y-2">
                <p>• Setup Fee: $1,200</p>
                <p>• Annual Maintenance: $200</p>
                <p className="text-sm text-gray-600 mt-2">
                  Investment in your financial future with expert guidance and support
                </p>
              </div>
            </section>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-survival-800 font-semibold">
                Contact Us Today
              </p>
              <p className="text-center text-gray-600">
                Phone: (833) 224-5517 | Email: info@survival401k.com
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 text-center">
        <Button 
          onClick={handleDownload}
          size="lg"
          className="bg-survival-600 hover:bg-survival-700"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Flyer
        </Button>
        <p className="mt-2 text-sm text-gray-500">
          Note: For complete information on Survival 401k plans, please contact our office.
        </p>
      </div>
    </div>
  );
};

export default DownloadableFlyer;
