
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminAuth from "@/components/admin/AdminAuth";
import { Settings, FileText, ArrowRight } from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <AdminAuth>
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-gray-600">Manage website content and settings</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <FileText className="h-8 w-8 mr-3 text-survival-600" />
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Article Resources</h2>
                    <p className="text-gray-600 text-sm">Manage article benefit cards and content</p>
                  </div>
                </div>
                <Link to="/articles">
                  <Button className="w-full mt-2">
                    Manage Article Benefits
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <FileText className="h-8 w-8 mr-3 text-survival-600" />
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Blog Editor</h2>
                    <p className="text-gray-600 text-sm">Create and edit blog articles</p>
                  </div>
                </div>
                <Link to="/blog/new">
                  <Button className="w-full mt-2">
                    Manage Blog Content
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start mb-4">
                  <Settings className="h-8 w-8 mr-3 text-survival-600" />
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Zapier Settings</h2>
                    <p className="text-gray-600 text-sm">Configure integration settings</p>
                  </div>
                </div>
                <Link to="/admin/zapier-settings">
                  <Button className="w-full mt-2">
                    Manage Settings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            </div>
          </>
        </AdminAuth>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
