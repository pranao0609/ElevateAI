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
            
            {/* Sign In Button - Google Outlined Style */}
            <Button 
              variant="outline" 
              className="hidden md:flex h-10 px-6 border-gray-300 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 rounded-full"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
              asChild
            >
              <a href="/sign-in">Sign In</a>
            </Button>
            
            {/* Get Started Button - Google Filled Style */}
            <Button 
              className="hidden md:flex h-10 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
              asChild
            >
              <a href="/sign-up">Get Started</a>
            </Button>
            
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
              
              {/* Mobile Action Buttons */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 h-10 border-gray-300 text-blue-600 hover:bg-blue-50 rounded-full"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                  asChild
                >
                  <a href="/sign-in">Sign In</a>
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-sm"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                  asChild
                >
                  <a href="/sign-up">Get Started</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Add Google Material Design CSS Variables */}
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
        }
      `}</style>
    </>
  );
};

export default Header;
