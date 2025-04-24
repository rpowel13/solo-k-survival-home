
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "password123";

interface BlogAuthProps {
  onAuthSuccess: () => void;
}

const BlogAuth = ({ onAuthSuccess }: BlogAuthProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const authStatus = sessionStorage.getItem("blogAdminAuthenticated");
    if (authStatus === "true") {
      onAuthSuccess();
    }
  }, [onAuthSuccess]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("blogAdminAuthenticated", "true");
      toast({
        title: "Authentication successful",
        description: "You are now authorized to create and edit blog posts",
      });
      onAuthSuccess();
    } else {
      toast({
        title: "Authentication failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Button 
                variant="link" 
                className="text-white p-0 mb-4" 
                onClick={() => navigate("/blog")}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
              <h1 className="text-3xl font-bold">
                Admin Authentication Required
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto border rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-6 bg-amber-50 p-4 rounded border border-amber-200">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
              <p className="text-amber-700 text-sm">
                This area is restricted to administrators only. Please log in to continue.
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              
              <Button type="submit" className="w-full bg-survival-600 hover:bg-survival-700">
                Log In
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogAuth;
