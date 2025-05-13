
import React from 'react';
import { Phone } from "lucide-react";

const PhoneBanner: React.FC = React.memo(() => {
  return (
    <div className="bg-survival-100 py-3 text-center flex items-center justify-center text-survival-800 font-medium">
      <Phone className="h-5 w-5 mr-2 text-survival-600" />
      Sales and Support Line: 
      <a 
        href="tel:+18332245517" 
        className="ml-2 text-survival-600 font-bold hover:underline"
      >
        833-224-5517
      </a>
    </div>
  );
});

PhoneBanner.displayName = 'PhoneBanner';

export default PhoneBanner;
