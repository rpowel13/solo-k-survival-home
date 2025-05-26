
import React from "react";
import { Phone, Mail, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const ContactMethods = () => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-left">Reach Out to Us</CardTitle>
        <CardDescription className="text-left">We're available to assist you</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-start justify-start text-left">
            <Phone className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium text-left">Phone</h3>
              <p className="text-gray-600 text-left">210-639-7227</p>
              <p className="text-sm text-gray-500 mt-1 text-left">Monday-Friday, 9am-6pm CT</p>
            </div>
          </div>
          
          <div className="flex items-start justify-start text-left">
            <Mail className="h-5 w-5 mr-3 text-survival-600 mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium text-left">Email</h3>
              <p className="text-gray-600 text-left">info@survival401k.com</p>
              <p className="text-sm text-gray-500 mt-1 text-left">We'll respond within 24 hours</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm text-left">
            <div className="flex items-center justify-start text-left">
              <Calendar className="h-5 w-5 mr-3 text-survival-600" />
              <div className="text-left">
                <h3 className="font-medium text-left">Schedule a Consultation</h3>
                <a 
                  href="https://live.vcita.com/site/izk040b42jnjcf3c/online-scheduling?service=mscylmpg3ioi58ke&staff=sdpi7niilv7t6k07" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  data-id="livesite-widget" 
                  data-service="mscylmpg3ioi58ke" 
                  data-staff="sdpi7niilv7t6k07"
                  className="text-survival-600 font-medium hover:underline text-left"
                >
                  Book your appointment online
                </a>
                <p className="text-sm text-gray-500 mt-1 text-left">Get personalized guidance for your retirement needs</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactMethods;

