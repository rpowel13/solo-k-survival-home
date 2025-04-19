
import React, { useEffect } from 'react';

const New401kApplication = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `document.write(unescape("%3Cscript src='http" +  (document.location.protocol == 'https:' ? 's' : '') + "://www.coffeecup.com/api/sdrive/forms/form.js?name=Survival401k%2520Application%26slug=317490%26width=642%26height=2435%26crossdomains=true%26check_safari=true%26rand=" + Math.floor( Math.random() * 1000000000 ) + "' type='text/javascript'%3E%3C/script%3E"))`;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div id="form-container">
              {/* The form will be injected here by the script */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New401kApplication;
