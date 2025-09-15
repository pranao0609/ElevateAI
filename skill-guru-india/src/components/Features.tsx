import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  FileText, 
  Users, 
  TrendingUp, 
  Bell,
  ArrowRight,
  Sparkles,
  BookOpen,
  MessageSquare
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-primary" />,
      title: "AI Career Matching",
      description: "Get personalized career recommendations based on your skills, interests, and market trends using advanced AI algorithms.",
      gradient: "gradient-primary",
    },
    {
      icon: <Target className="h-8 w-8 text-success" />,
      title: "Skills Gap Analysis",
      description: "Identify skill gaps and get targeted learning recommendations to bridge the gap between your current abilities and dream job.",
      gradient: "gradient-success",
    },
    {
      icon: <FileText className="h-8 w-8 text-warning" />,
      title: "Smart Resume Builder",
      description: "Create ATS-optimized resumes with AI-powered content suggestions tailored for specific job roles and industries.",
      gradient: "bg-gradient-to-br from-warning to-orange-400",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Expert Mentorship",
      description: "Connect with industry professionals and mentors for personalized guidance and career advice through 1:1 sessions.",
      gradient: "gradient-primary",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      title: "Job Market Insights",
      description: "Stay updated with real-time job market trends, salary insights, and demand forecasting for different career paths.",
      gradient: "gradient-success",
    },
    {
      icon: <Bell className="h-8 w-8 text-warning" />,
      title: "Smart Job Alerts",
      description: "Receive personalized job notifications from top platforms like Naukri, LinkedIn, and Indeed based on your profile.",
      gradient: "bg-gradient-to-br from-warning to-orange-400",
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
            Everything You Need to
            <span className="block text-primary">Accelerate Your Career</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From career discovery to landing your dream job, our comprehensive platform 
            provides all the tools and guidance you need for career success.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-smooth border-border/50 hover:border-primary/20">
              <CardHeader className="space-y-4">
                <div className={`w-16 h-16 rounded-xl ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                  {feature.icon}
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold group-hover:text-primary transition-smooth">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6 bg-gradient-card rounded-2xl p-8 border">
          <h3 className="text-2xl font-bold text-foreground">
            Ready to Transform Your Career Journey?
          </h3>
          <p className="text-muted-foreground">
            Join thousands of students and professionals who are already using AI to accelerate their careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gradient-primary group">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;