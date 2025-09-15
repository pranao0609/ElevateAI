import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container px-4">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">AI</span>
              </div>
              <span className="text-xl font-bold">CareerAdvisor</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering Indian students and professionals with AI-driven career guidance, 
              skills development, and job opportunities.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <Button key={index} size="icon" variant="ghost" className="hover:bg-background/10">
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Platform</h3>
            <div className="space-y-3">
              {[
                "Career Paths",
                "Skills Analysis", 
                "Resume Builder",
                "Job Alerts",
                "Mentorship",
                "AI Assessments"
              ].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-sm text-background/80 hover:text-background transition-smooth"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Resources</h3>
            <div className="space-y-3">
              {[
                "Career Guide",
                "Industry Reports",
                "Learning Paths",
                "Success Stories",
                "Blog",
                "Help Center"
              ].map((link, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="block text-sm text-background/80 hover:text-background transition-smooth"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <Mail className="h-4 w-4" />
                <span>support@careeradvisor.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <Phone className="h-4 w-4" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-background/80">
                <MapPin className="h-4 w-4" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h4 className="font-medium">Stay Updated</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 rounded-lg bg-background/10 border border-background/20 text-background placeholder:text-background/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* <div className="text-sm text-background/60">
              © 2024 AI CareerAdvisor. All rights reserved.
            </div> */}
            <div className="flex space-x-6 text-sm text-background/80">
              <a href="#" className="hover:text-background transition-smooth">Privacy Policy</a>
              <a href="#" className="hover:text-background transition-smooth">Terms of Service</a>
              <a href="#" className="hover:text-background transition-smooth">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;