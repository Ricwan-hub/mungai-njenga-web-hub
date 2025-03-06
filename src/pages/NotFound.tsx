
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="text-center max-w-lg animate-fade-in">
        <h1 className="text-6xl md:text-7xl font-serif font-semibold mb-6">404</h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8">
          The page you're looking for cannot be found.
        </p>
        <Link to="/">
          <ButtonCustom size="lg">
            Return Home
          </ButtonCustom>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
