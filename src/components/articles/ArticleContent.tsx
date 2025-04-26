
import { Badge } from "@/components/ui/badge";
import WhyChooseSection from "@/components/solo401k/WhyChooseSection";

interface ArticleContentProps {
  excerpt: string;
  content: string;
  tags: string[];
  showWhyChooseSection?: boolean;
  cardBenefits?: string[];
  cardTitle?: string;
  cardSubtitle?: string;
}

const ArticleContent = ({ 
  excerpt, 
  content, 
  tags, 
  showWhyChooseSection = false,
  cardBenefits = [],
  cardTitle,
  cardSubtitle
}: ArticleContentProps) => {
  return (
    <>
      {showWhyChooseSection ? (
        <WhyChooseSection 
          title={cardTitle || "Key Benefits"}
          subtitle={cardSubtitle || excerpt}
          benefits={cardBenefits}
          maxCards={6}
        />
      ) : (
        <div className="prose prose-lg max-w-none mb-8">
          {excerpt && (
            <p className="text-lg text-gray-600 mb-6 font-medium">{excerpt}</p>
          )}
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )}

      {tags.length > 0 && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-lg font-semibold mb-3">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={`${tag}-${index}`} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleContent;
