
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface BlogActionsProps {
  slug: string;
  onDeleteClick: () => void;
}

const BlogActions = ({ slug, onDeleteClick }: BlogActionsProps) => {
  return (
    <div className="flex justify-end mb-6 space-x-2">
      <Link to={`/blog/edit/${slug}`}>
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </Link>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-red-500 border-red-500 hover:bg-red-50" 
        onClick={onDeleteClick}
      >
        <Trash className="h-4 w-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

export default BlogActions;
