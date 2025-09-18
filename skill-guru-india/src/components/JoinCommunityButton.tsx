import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const JoinCommunityButton = () => {
  return (
    <>
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

      <Link to="/community">
        <div className="fixed bottom-8 right-8 z-50 group">
          {/* Main Button */}
          <Button 
            className="rounded-3xl h-14 px-6 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:bg-gray-50 text-gray-800 border-2 border-gray-200 hover:border-blue-300 group-hover:scale-105"
            size="lg"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            <span className="material-icons text-blue-600 text-xl mr-3">
              groups
            </span>
            <span className="font-medium">Join Community</span>
          </Button>

          {/* Activity Indicator */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-full border-2 border-white shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1 animate-pulse" />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-xl shadow-lg whitespace-nowrap">
              <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                Connect with students
              </span>
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default JoinCommunityButton;
