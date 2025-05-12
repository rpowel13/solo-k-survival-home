
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PageSEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <PageSEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Please check the URL or navigate back to our homepage."
        canonicalPath="/404"
        noindex={true} // Ensure 404 pages aren't indexed
      />
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-4">
            <h1 className="text-5xl font-bold mb-4 text-survival-800">404</h1>
            <h2 className="text-2xl text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-500 mb-6">
              Sorry, we couldn't find the page you're looking for. Please check the URL or navigate back to our homepage.
            </p>
            <Link to="/">
              <Button 
                className="inline-flex items-center bg-survival-600 hover:bg-survival-700"
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
