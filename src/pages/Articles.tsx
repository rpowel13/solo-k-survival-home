
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import WhyChooseSection from "@/components/solo401k/WhyChooseSection";
import ArticleBenefitsEditor from "@/components/articles/ArticleBenefitsEditor";
import AdminAuth from "@/components/admin/AdminAuth";
import { useAdminAuth } from "@/components/admin/AdminAuth";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Default benefits to display
const defaultArticleBenefits = [
  "Benefit 1: Easy to understand financial concepts",
  "Benefit 2: Step-by-step guides for implementation",
  "Benefit 3: Tax-saving strategies for small businesses",
  "Benefit 4: Retirement planning made simple",
  "Benefit 5: Investment options comparison",
  "Benefit 6: How to maximize your retirement contributions"
];

const Articles = () => {
  const [benefits, setBenefits] = useState(defaultArticleBenefits);
  const { toast } = useToast();
  const { isAuthenticated } = useAdminAuth();

  const handleSaveBenefits = (values: { title: string; subtitle: string; benefits: string[] }) => {
    setBenefits(values.benefits);
    toast({
      title: "Benefits updated",
      description: "The benefits cards have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Resource Library</h1>
              <p className="text-gray-200">
                Insights, guides, and strategies for entrepreneurs and first responders
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {isAuthenticated && (
            <div className="mb-6">
              <Link to="/admin">
                <Button variant="outline" size="sm" className="flex items-center">
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Admin Dashboard
                </Button>
              </Link>
            </div>
          )}
          
          <div className="space-y-12">
            <WhyChooseSection 
              title="Financial Resource Highlights"
              subtitle="Explore our key resources designed to help you navigate personal and business finances"
              benefits={benefits}
              maxCards={6}
            />
            
            {isAuthenticated && (
              <AdminAuth>
                <div className="max-w-4xl mx-auto">
                  <ArticleBenefitsEditor
                    initialTitle="Financial Resource Highlights"
                    initialSubtitle="Explore our key resources designed to help you navigate personal and business finances"
                    initialBenefits={benefits}
                    onSave={handleSaveBenefits}
                  />
                </div>
              </AdminAuth>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
