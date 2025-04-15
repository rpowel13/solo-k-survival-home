
import { Link } from "react-router-dom";

export const ServiceDropdown = () => {
  // Function to scroll to top when a link is clicked
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Link 
      to="/services" 
      className="text-gray-600 hover:text-survival-700 font-medium transition-colors"
      onClick={scrollToTop}
    >
      Services
    </Link>
  );
};
