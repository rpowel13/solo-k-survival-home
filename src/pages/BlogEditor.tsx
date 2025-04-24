
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogAuth from "@/components/blog/BlogAuth";
import BlogForm from "@/components/blog/BlogForm";

const BlogEditor = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem("blogAdminAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("blogAdminAuthenticated");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {!isAuthenticated ? (
        <BlogAuth onAuthSuccess={() => setIsAuthenticated(true)} />
      ) : (
        <BlogForm onLogout={handleLogout} />
      )}
      <Footer />
    </div>
  );
};

export default BlogEditor;
