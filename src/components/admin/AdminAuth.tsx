
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

// In a real application, these would be stored securely, not in the code
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

export const useAdminAuth = () => {
  return {
    isAuthenticated: localStorage.getItem('adminAuthenticated') === 'true'
  };
};

const AdminAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isAuthenticated } = useAdminAuth();

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem('adminAuthenticated', 'true');
      window.location.reload();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
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
            
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminAuth;
