
import React from "react";

interface BlogContainerProps {
  isLoading: boolean;
}

const BlogContainer = ({ isLoading }: BlogContainerProps) => {
  return (
    <div 
      className={`w-full max-w-full overflow-hidden bg-white rounded-lg p-4 shadow-sm ${isLoading ? 'hidden' : 'block'}`}
      style={{ minHeight: '400px' }}
    >
      <div id="dib-posts"></div>
    </div>
  );
};

export default BlogContainer;
