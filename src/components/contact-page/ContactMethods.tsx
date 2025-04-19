
import React from "react";
import { Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ContactMethods = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Reach Out to Us</CardTitle>
        <CardDescription>We're available to assist you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start">
            <Phone className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Phone</h3>
              <p className="text-gray-600">(833) 224-5517</p>
              <p className="text-sm text-gray-500 mt-1">Monday-Friday, 9am-6pm CT</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Mail className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Email</h3>
              <p className="text-gray-600">info@survival401k.com</p>
              <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Calendar className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
            <div>
              <h3 className="font-medium">Schedule a Call</h3>
              <p className="text-gray-600">Book a free consultation</p>
              <a 
                href="https://live.vcita.com/site/izk040b42jnjcf3c/online-scheduling?service=mscylmpg3ioi58ke&staff=sdpi7niilv7t6k07" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-survival-600 hover:text-survival-700 transition-colors mt-1"
              >
                Choose a time →
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMethods;
