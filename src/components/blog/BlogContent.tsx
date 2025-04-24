
import { Badge } from "@/components/ui/badge";

interface BlogContentProps {
  excerpt: string;
  content: string;
  tags: string[];
}

const BlogContent = ({ excerpt, content, tags }: BlogContentProps) => {
  return (
    <>
      <div className="prose prose-lg max-w-none mb-8">
        <p className="text-lg text-gray-600 mb-6 font-medium">{excerpt}</p>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>

      <div className="mt-8 pt-6 border-t">
        <h3 className="text-lg font-semibold mb-3">Topics</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogContent;
