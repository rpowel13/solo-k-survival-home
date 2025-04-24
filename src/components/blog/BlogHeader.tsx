
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  publishedDate: string;
  author: string;
  authorTitle: string;
}

const BlogHeader = ({ title, publishedDate, author, authorTitle }: BlogHeaderProps) => {
  return (
    <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-white hover:text-gray-200 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center text-gray-200">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{publishedDate}</span>
            </div>
            <div className="flex items-center text-gray-200">
              <Clock className="h-4 w-4 mr-1" />
              <span>5 min read</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-survival-600 flex items-center justify-center">
                {author.charAt(0)}
              </div>
            </div>
            <div>
              <div className="font-medium">{author}</div>
              <div className="text-sm text-gray-300">{authorTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;
