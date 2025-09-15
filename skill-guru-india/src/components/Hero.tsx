import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Target, TrendingUp, Users, Zap } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
      <div className="container relative z-10 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Shape Your
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Dream Career
                </span>
                with AI Guidance
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-xl">
                Discover personalized career paths, bridge skill gaps, and unlock opportunities 
                tailored for Indian students and professionals with our AI-powered platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="group">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-foreground">50K+</div>
                <div className="text-sm text-primary-foreground/80">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-foreground">95%</div>
                <div className="text-sm text-primary-foreground/80">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-primary-foreground">500+</div>
                <div className="text-sm text-primary-foreground/80">Career Paths</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={heroImage}
                alt="AI Career & Skills Advisor Platform"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 bg-background rounded-lg p-4 shadow-lg border animate-pulse">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium">Career Match: 94%</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-success rounded-lg p-4 shadow-lg text-success-foreground">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">Skills Growing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary-glow/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-300/10 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Hero;