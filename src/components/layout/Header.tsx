import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-gradient-soft border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container max-w-md mx-auto px-4 py-3">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
          <div className="bg-gradient-primary p-2 rounded-full shadow-soft">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">언어친구</h1>
            <p className="text-xs text-muted-foreground">Language Exchange</p>
          </div>
        </Link>
      </div>
    </header>
  );
};