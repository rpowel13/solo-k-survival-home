
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Article } from "@/types/article";

interface ArticleCardProps {
  article: Article;
}

// Set default image path that's guaranteed to exist
const DEFAULT_COVER_IMAGE = "https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=2070";

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });
  
  return (
    <Link to={`/articles/${article.slug}`} className="block h-full transition-transform hover:translate-y-[-4px]">
      <Card className="h-full overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.coverImage || DEFAULT_COVER_IMAGE} 
            alt={article.title}
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              console.error(`Failed to load image: ${target.src}`);
              target.src = DEFAULT_COVER_IMAGE;
              target.onerror = null; // Prevent infinite loop
            }}
          />
        </div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <h3 className="text-xl font-bold line-clamp-2 mb-2">{article.title}</h3>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <p className="text-gray-600 line-clamp-3">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="p-4 flex flex-wrap gap-2 border-t">
          {article.tags.slice(0, 3).map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="outline" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
