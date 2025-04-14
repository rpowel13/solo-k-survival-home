
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true });

  return (
    <Link to={`/blog/${post.slug}`} className="block h-full transition-transform hover:translate-y-[-4px]">
      <Card className="h-full overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-xl font-bold line-clamp-2 mb-2">{post.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 flex flex-wrap gap-2 border-t">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
