
const BlogLoadingSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative h-64 md:h-96 bg-gray-200"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto -mt-32 md:-mt-40 pb-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <div className="h-10 bg-gray-200 rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-md w-48 mb-6"></div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>
          
          <div className="mt-6 space-y-4">
            <div className="h-40 bg-gray-200 rounded-md"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded-md w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogLoadingSkeleton;
