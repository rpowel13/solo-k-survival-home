
import React from 'react';
import ServiceLayout from '@/components/ServiceLayout';

const New401kForm = () => {
  return (
    <ServiceLayout
      title="New 401k Application Form"
      description="Complete your 401k application online using our secure form"
      callToAction={{ text: "Need Help?", link: "/contact" }}
    >
      <div className="w-full overflow-x-hidden">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <iframe 
            src="https://survival401k.coffeecup.com/Survival401k%20Application/" 
            name="myiFrame" 
            scrolling="no" 
            className="w-full h-[2400px] border-0"
            title="401k Application Form"
          />
        </div>
      </div>
    </ServiceLayout>
  );
};

export default New401kForm;
