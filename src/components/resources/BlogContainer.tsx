
import React from "react";

interface BlogContainerProps {
  isLoading: boolean;
}

const BlogContainer = ({ isLoading }: BlogContainerProps) => {
  return (
    <div 
      id="dib-posts" 
      className="w-full max-w-full overflow-hidden bg-white rounded-lg p-4 shadow-sm"
      style={{ minHeight: '400px', display: isLoading ? 'none' : 'block' }}
    ></div>
  );
};

export default BlogContainer;
