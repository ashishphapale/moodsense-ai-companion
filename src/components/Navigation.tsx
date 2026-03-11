import { Menu, User, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationProps {
  onMenuClick: () => void;
}

export const Navigation = ({ onMenuClick }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        
        {/* Left - Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="hover:bg-primary/10 transition-all duration-300"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Center - Brand */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            MoodSense
          </h1>
        </div>

        {/* Right - Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-primary/10 transition-all duration-300"
          >
            <User className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-primary/10 transition-all duration-300"
          >
            <LogIn className="h-4 w-4 mr-2" />
            Sign In / Register
          </Button>
        </div>
        const [loading, setLoading] = useState(false);
        <Button disabled={loading}>
  {loading ? "Loading..." : "Sign In"}
</Button>

           <nav
  role="navigation"
  className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
></nav>

      </div>
    </nav>
  );
};