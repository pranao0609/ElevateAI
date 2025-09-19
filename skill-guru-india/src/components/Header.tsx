import { Button } from "@/components/ui/button";
import { Menu, User, Bell, Search, School, LayoutDashboard, TrendingUp, FileText, Users } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Google Fonts Import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link 
        href="https://fonts.googleapis.com/css2?family=Google+Sans:wght@300;400;500;700&family=Roboto:wght@300;400;500;700&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/icon?family=Material+Icons" 
        rel="stylesheet" 
      />

      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Google-style Logo */}
          <Link to="/" className="flex items-center space-x-3 transition-all duration-300 hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
              <School className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-xl font-medium text-gray-800"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Student Advisor Portal
              </span>
              <span 
                className="text-xs text-blue-600 -mt-1"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Powered by AI
              </span>
            </div>
          </Link>

          {/* Google Material Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <a 
              href="/dashboard" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Dashboard</span>
            </a>
            <a 
              href="/career-paths" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <TrendingUp className="h-4 w-4" />
              <span>Career Paths</span>
            </a>
            <a 
              href="/skills-analysis" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <span className="material-icons text-base">psychology</span>
              <span>Skills Analysis</span>
            </a>
            <a 
              href="/resume-builder" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <FileText className="h-4 w-4" />
              <span>Resume Builder</span>
            </a>
            <a 
              href="/mentorship" 
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 rounded-full transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              <Users className="h-4 w-4" />
              <span>Mentorship</span>
            </a>
          </nav>

          {/* Google Material Right Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Button - Google Style */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex h-10 w-10 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </Button>
            
            {/* Notifications - Google Style */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex h-10 w-10 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Profile - Google Style */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden sm:flex h-10 w-10 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
            >
              <Link to="/profile">
                <User className="h-5 w-5 text-gray-600" />
              </Link>
            </Button>
            
            {/* Sign In Button - Gemini Gradient Border Only */}
            <div className="gemini-border-wrapper hidden md:block">
              <Button 
                variant="ghost"
                className="gemini-gradient-border h-10 px-6 bg-white text-gray-700 rounded-full border-0 relative"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
                asChild
              >
                <a href="/sign-in">Sign In</a>
              </Button>
            </div>
            
            {/* Get Started Button - Gemini Gradient Border Only */}
            <div className="gemini-border-wrapper hidden md:block">
              <Button 
                className="gemini-gradient-border h-10 px-6 bg-white text-gray-700 rounded-full border-0 relative"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
                asChild
              >
                <a href="/sign-up">Get Started</a>
              </Button>
            </div>
            
            {/* Mobile menu button - Material Style */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-10 w-10 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Google Material Style */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
            <nav className="flex flex-col p-4 space-y-1">
              <a 
                href="/dashboard" 
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <LayoutDashboard className="h-5 w-5 text-blue-600" />
                <span>Dashboard</span>
              </a>
              <a 
                href="/career-paths" 
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Career Paths</span>
              </a>
              <a 
                href="/skills-analysis" 
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <span className="material-icons text-lg text-red-600">psychology</span>
                <span>Skills Analysis</span>
              </a>
              <a 
                href="/resume-builder" 
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <FileText className="h-5 w-5 text-yellow-600" />
                <span>Resume Builder</span>
              </a>
              <a 
                href="/mentorship" 
                className="flex items-center space-x-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                <Users className="h-5 w-5 text-purple-600" />
                <span>Mentorship</span>
              </a>
              
              {/* Mobile Action Buttons with Gemini Gradient Borders */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4">
                <div className="gemini-border-wrapper flex-1">
                  <Button 
                    variant="ghost"
                    size="sm" 
                    className="gemini-gradient-border w-full h-10 bg-white text-gray-700 rounded-full border-0 relative"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                    asChild
                  >
                    <a href="/sign-in">Sign In</a>
                  </Button>
                </div>
                <div className="gemini-border-wrapper flex-1">
                  <Button 
                    size="sm" 
                    className="gemini-gradient-border w-full h-10 bg-white text-gray-700 rounded-full border-0 relative"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                    asChild
                  >
                    <a href="/sign-up">Get Started</a>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Enhanced Google Material Design CSS Variables + Gemini Gradient Border */}
      <style>{`
        :root {
          --md-sys-color-primary: #1a73e8;
          --md-sys-color-primary-container: #d2e3fc;
          --md-sys-color-secondary: #34a853;
          --md-sys-color-surface: #ffffff;
          --md-sys-color-surface-variant: #f8f9fa;
          --md-sys-color-outline: #dadce0;
          --md-sys-color-on-surface: #202124;
          --md-sys-color-on-surface-variant: #5f6368;
          
          /* Google Gemini Gradient Colors */
          --gemini-orange: #FF8A80;
          --gemini-pink: #FF80AB;
          --gemini-purple: #EA80FC;
          --gemini-blue: #8C9EFF;
          --gemini-cyan: #84FFFF;
          --gemini-green: #B9F6CA;
          --gemini-yellow: #FFFF8D;
        }

        /* Wrapper for the gradient border effect */
        .gemini-border-wrapper {
          position: relative;
          padding: 2px;
          border-radius: 9999px;
          background: linear-gradient(
            45deg,
            var(--gemini-orange) 0%,
            var(--gemini-pink) 14%,
            var(--gemini-purple) 28%,
            var(--gemini-blue) 42%,
            var(--gemini-cyan) 57%,
            var(--gemini-green) 71%,
            var(--gemini-yellow) 85%,
            var(--gemini-orange) 100%
          );
          background-size: 400% 400%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Animated gradient on hover */
        .gemini-border-wrapper:hover {
          animation: gemini-gradient-flow 3s ease-in-out infinite;
        }

        /* Button inside the wrapper - always white background */
        .gemini-gradient-border {
          background: white !important;
          color: #374151 !important;
          border: none !important;
          position: relative;
          z-index: 1;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gemini-gradient-border:hover {
          background: white !important;
          color: #374151 !important;
          transform: translateY(-1px);
          box-shadow: 
            0 8px 25px rgba(0, 0, 0, 0.1),
            0 4px 12px rgba(0, 0, 0, 0.05);
        }

        /* Gradient animation keyframes */
        @keyframes gemini-gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 100% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          75% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Enhanced gradient flow for smoother animation */
        @keyframes gemini-gradient-rotate {
          0% {
            background-position: 0% 50%;
            filter: hue-rotate(0deg);
          }
          50% {
            background-position: 100% 50%;
            filter: hue-rotate(180deg);
          }
          100% {
            background-position: 0% 50%;
            filter: hue-rotate(360deg);
          }
        }

        /* Alternative hover effect with rotation */
        .gemini-border-wrapper:hover {
          animation: gemini-gradient-rotate 4s linear infinite;
        }

        /* Focus states for accessibility */
        .gemini-gradient-border:focus-visible {
          outline: 2px solid #4285F4;
          outline-offset: 2px;
        }

        /* Active state */
        .gemini-gradient-border:active {
          transform: translateY(0px) scale(0.98);
        }

        .gemini-border-wrapper:active {
          transform: scale(0.98);
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .gemini-border-wrapper:hover {
            animation: none;
          }
          
          .gemini-gradient-border:hover {
            transform: none;
          }
        }

        /* Ensure proper contrast and readability */
        .gemini-gradient-border a {
          color: inherit !important;
          text-decoration: none;
        }

        .gemini-gradient-border:hover a {
          color: inherit !important;
        }
      `}</style>
    </>
  );
};

export default Header;
