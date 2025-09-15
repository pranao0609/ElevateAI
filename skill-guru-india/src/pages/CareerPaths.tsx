import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Code, 
  Palette, 
  BarChart3, 
  Shield, 
  Smartphone,
  Database,
  Brain,
  TrendingUp,
  Users,
  Clock,
  Star,
  ArrowRight,
  Target,
  Award
} from "lucide-react";

const CareerPaths = () => {
  const careerPaths = [
    {
      title: "Full Stack Developer",
      description: "Build complete web applications from frontend to backend",
      icon: <Code className="h-8 w-8 text-primary" />,
      match: 94,
      salary: "₹6-15 LPA",
      growth: "High",
      demand: "Very High",
      skills: ["React", "Node.js", "JavaScript", "MongoDB", "Python"],
      companies: ["TCS", "Infosys", "Flipkart", "Swiggy", "Zomato"],
      gradient: "gradient-primary"
    },
    {
      title: "UI/UX Designer",
      description: "Create intuitive and beautiful user experiences",
      icon: <Palette className="h-8 w-8 text-success" />,
      match: 87,
      salary: "₹4-12 LPA",
      growth: "High",
      demand: "High",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      companies: ["Byju's", "PhonePe", "Paytm", "Ola", "Myntra"],
      gradient: "gradient-success"
    },
    {
      title: "Data Scientist",
      description: "Extract insights from data to drive business decisions",
      icon: <BarChart3 className="h-8 w-8 text-warning" />,
      match: 78,
      salary: "₹8-20 LPA",
      growth: "Very High",
      demand: "Very High",
      skills: ["Python", "Machine Learning", "SQL", "Statistics", "Tableau"],
      companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Jio"],
      gradient: "bg-gradient-to-br from-warning to-orange-400"
    },
    {
      title: "Cybersecurity Analyst",
      description: "Protect organizations from digital threats and attacks",
      icon: <Shield className="h-8 w-8 text-destructive" />,
      match: 72,
      salary: "₹5-18 LPA",
      growth: "Very High",
      demand: "High",
      skills: ["Network Security", "Ethical Hacking", "Risk Assessment", "CISSP", "Penetration Testing"],
      companies: ["IBM", "Accenture", "Deloitte", "KPMG", "EY"],
      gradient: "bg-gradient-to-br from-destructive to-red-400"
    },
    {
      title: "Mobile App Developer",
      description: "Create mobile applications for iOS and Android platforms",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      match: 85,
      salary: "₹4-14 LPA",
      growth: "High",
      demand: "High",
      skills: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      companies: ["WhatsApp", "Instagram", "Uber", "Ola", "Paytm"],
      gradient: "gradient-primary"
    },
    {
      title: "DevOps Engineer",
      description: "Bridge development and operations for faster deployments",
      icon: <Database className="h-8 w-8 text-success" />,
      match: 81,
      salary: "₹7-16 LPA",
      growth: "Very High",
      demand: "Very High",
      skills: ["Docker", "Kubernetes", "AWS", "Jenkins", "Terraform"],
      companies: ["Amazon", "Microsoft", "Google", "Atlassian", "Red Hat"],
      gradient: "gradient-success"
    }
  ];

  const matchColors = {
    high: "text-success",
    medium: "text-warning", 
    low: "text-destructive"
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return matchColors.high;
    if (match >= 70) return matchColors.medium;
    return matchColors.low;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                <Brain className="h-4 w-4" />
                <span>AI-Powered Career Matching</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Discover Your Perfect
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Career Path
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Our AI analyzes your skills, interests, and market trends to recommend 
                the most suitable career paths with growth potential.
              </p>
            </div>
          </div>
        </section>

        {/* Career Paths Grid */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Recommended Career Paths
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Based on your profile and current market trends, here are the career paths 
                with the highest potential for success and growth.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {careerPaths.map((career, index) => (
                <Card key={index} className="group hover:shadow-xl transition-smooth border-border/50 hover:border-primary/20">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 rounded-xl ${career.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                        {career.icon}
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getMatchColor(career.match)}`}>
                          {career.match}%
                        </div>
                        <div className="text-xs text-muted-foreground">Match Score</div>
                      </div>
                    </div>
                    
                    <div>
                      <CardTitle className="text-xl font-semibold group-hover:text-primary transition-smooth">
                        {career.title}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {career.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Career Match</span>
                        <span className="text-muted-foreground">{career.match}%</span>
                      </div>
                      <Progress value={career.match} className="h-2" />
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm font-semibold text-foreground">{career.salary}</div>
                        <div className="text-xs text-muted-foreground">Salary Range</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm font-semibold text-success">{career.growth}</div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-muted/50">
                        <div className="text-sm font-semibold text-primary">{career.demand}</div>
                        <div className="text-xs text-muted-foreground">Demand</div>
                      </div>
                    </div>

                    {/* Skills Required */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center">
                        <Target className="h-4 w-4 mr-2 text-primary" />
                        Key Skills Required
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Top Companies */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold flex items-center">
                        <Award className="h-4 w-4 mr-2 text-success" />
                        Top Hiring Companies
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {career.companies.slice(0, 3).map((company, companyIndex) => (
                          <Badge key={companyIndex} variant="outline" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                        {career.companies.length > 3 && (
                          <Badge variant="outline" className="text-xs text-muted-foreground">
                            +{career.companies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-3 pt-4">
                      <Button className="flex-1 gradient-primary group">
                        Explore Path
                        <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="text-center mt-16 space-y-6 bg-gradient-card rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold text-foreground">
                Can't Find Your Ideal Career Path?
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Take our comprehensive AI assessment to discover personalized career recommendations 
                based on your unique profile and aspirations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gradient-primary">
                  <Brain className="mr-2 h-5 w-5" />
                  Take AI Career Assessment
                </Button>
                <Button size="lg" variant="outline">
                  <Users className="mr-2 h-5 w-5" />
                  Talk to Career Counselor
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CareerPaths;