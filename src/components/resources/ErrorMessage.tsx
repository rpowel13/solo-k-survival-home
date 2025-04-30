
import React from "react";

const ErrorMessage = () => {
  return (
    <div className="text-center text-gray-600 mt-8 p-6 bg-gray-100 rounded-lg">
      <p className="mb-2">Unable to load resources. Please try refreshing the page.</p>
      <button 
        onClick={() => window.location.reload()} 
        className="text-survival-600 hover:text-survival-700 font-medium"
      >
        Refresh Page
      </button>
    </div>
  );
};

export default ErrorMessage;
