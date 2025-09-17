import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const JoinCommunityButton = () => {
  return (
    <Link to="/community">
      <Button 
        className="fixed bottom-6 right-6 z-50 rounded-full h-14 px-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground"
        size="lg"
      >
        <Users className="h-5 w-5 mr-2" />
        Join Community
      </Button>
    </Link>
  );
};

export default JoinCommunityButton;