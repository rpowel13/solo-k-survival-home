
const BlogLoadingSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-6"></div>
      <div className="h-8 bg-gray-200 rounded animate-pulse mb-4 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded animate-pulse mb-6 w-1/3"></div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        ))}
      </div>
    </div>
  );
};

export default BlogLoadingSkeleton;
