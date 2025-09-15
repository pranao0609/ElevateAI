import { Button } from "@/components/ui/button";
import { Menu, User, Bell, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to = "/" >
        <div className="flex items-center space-x-2">
          
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-primary-foreground">AI</span>
          </div>
          <span className="text-lg font-bold text-foreground">CareerAdvisor</span>

        </div>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/dashboard" className="text-sm font-medium transition-smooth hover:text-primary">
            Dashboard
          </a>
          <a href="/career-paths" className="text-sm font-medium transition-smooth hover:text-primary">
            Career Paths
          </a>
          <a href="/skills-analysis" className="text-sm font-medium transition-smooth hover:text-primary">
            Skills Analysis
          </a>
          <a href="/resume-builder" className="text-sm font-medium transition-smooth hover:text-primary">
            Resume Builder
          </a>
          <a href="/mentorship" className="text-sm font-medium transition-smooth hover:text-primary">
            Mentorship
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Link to="/profile">
            <User className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" className="hidden md:flex" asChild>
            <a href="/sign-in">Sign In</a>
          </Button>
          <Button className="hidden md:flex gradient-primary" asChild>
            <a href="/sign-up">Get Started</a>
          </Button>
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-3 p-4">
            <a href="/dashboard" className="text-sm font-medium transition-smooth hover:text-primary">
              Dashboard
            </a>
            <a href="/career-paths" className="text-sm font-medium transition-smooth hover:text-primary">
              Career Paths
            </a>
            <a href="/skills-analysis" className="text-sm font-medium transition-smooth hover:text-primary">
              Skills Analysis
            </a>
            <a href="/resume-builder" className="text-sm font-medium transition-smooth hover:text-primary">
              Resume Builder
            </a>
            <a href="/mentorship" className="text-sm font-medium transition-smooth hover:text-primary">
              Mentorship
            </a>
            <div className="flex space-x-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <a href="/sign-in">Sign In</a>
              </Button>
              <Button size="sm" className="flex-1 gradient-primary" asChild>
                <a href="/sign-up">Get Started</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;