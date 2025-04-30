
import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px]">
      <div className="animate-spin">
        <Loader className="h-12 w-12 text-survival-600" />
      </div>
      <p className="mt-4 text-gray-600">Loading resources...</p>
    </div>
  );
};

export default LoadingSpinner;
