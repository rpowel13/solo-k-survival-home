
import React, { useEffect } from 'react';

const New401kFormPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
    const protocol = document.location.protocol;
    const randomNum = Math.floor(Math.random() * 1000000000);
    
    script.src = `${protocol}//www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%20Application&slug=317490&width=642&height=2435&crossdomains=true&check_safari=true&rand=${randomNum}`;
    script.async = true;
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div id="form-container" className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg" />
      </div>
    </div>
  );
};

export default New401kFormPage;
