
interface BlogHeaderProps {
  title: string;
  publishedDate: string;
  author: string;
  authorTitle: string;
  coverImage?: string;
}

// Set default image path that's guaranteed to exist
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070";

const BlogHeader = ({ title, publishedDate, author, authorTitle, coverImage }: BlogHeaderProps) => {
  // Ensure we always have a valid image URL
  const headerImage = coverImage || DEFAULT_COVER_IMAGE;
  
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="relative h-64 md:h-96 bg-survival-800 overflow-hidden">
        <img 
          src={headerImage}
          alt={title}
          className="w-full h-full object-cover opacity-50"
          onError={(e) => {
            console.error(`Failed to load header image: ${headerImage}`);
            const target = e.target as HTMLImageElement;
            target.src = DEFAULT_COVER_IMAGE;
            target.onerror = null; // Prevent infinite loop
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/30" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto -mt-32 md:-mt-40 pb-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap items-center text-sm text-gray-500 mb-2">
              <span className="mr-4">Published {publishedDate}</span>
              <span className="mr-2">by</span>
              <span className="font-medium text-survival-600">{author}</span>
              {authorTitle && (
                <span className="ml-2 text-gray-500">({authorTitle})</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
