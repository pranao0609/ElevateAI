import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CareerRoadmapModal from "./CareerRoadmapModal";
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
  Award,
  Map
} from "lucide-react";

interface CareerPath {
  title: string;
  description: string;
  icon: string;
  match: number;
  salary: string;
  growth: string;
  demand: string;
  skills: string[];
  companies: string[];
  gradient: string;
}

const CareerPaths = () => {
  const [careerPaths, setCareerPaths] = useState<CareerPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCareer, setSelectedCareer] = useState<CareerPath | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [loadingRoadmap, setLoadingRoadmap] = useState(false);

  // Icon mapping
  const iconMap = {
    Code: <Code className="h-8 w-8 text-primary" />,
    Palette: <Palette className="h-8 w-8 text-success" />,
    BarChart3: <BarChart3 className="h-8 w-8 text-warning" />,
    Shield: <Shield className="h-8 w-8 text-destructive" />,
    Smartphone: <Smartphone className="h-8 w-8 text-primary" />,
    Database: <Database className="h-8 w-8 text-success" />,
    Brain: <Brain className="h-8 w-8 text-purple-500" />
  };

  useEffect(() => {
    fetchCareerPaths();
  }, []);

  const fetchCareerPaths = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/career-paths');
      const data = await response.json();
      setCareerPaths(data.career_paths || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching career paths:', error);
      setLoading(false);
    }
  };

  const generateRoadmap = async (career: CareerPath) => {
    setLoadingRoadmap(true);
    setSelectedCareer(career);
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-career-roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: "Test User", // You can make this dynamic
          career_goal: career.title,
          experience_level: "Fresher"
        })
      });
      
      const data = await response.json();
      setRoadmapData(data);
      setShowRoadmap(true);
      setLoadingRoadmap(false);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setLoadingRoadmap(false);
    }
  };

  const getMatchColor = (match: number) => {
    if (match >= 85) return "text-success";
    if (match >= 70) return "text-warning";
    return "text-destructive";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading career paths...</p>
        </div>
      </div>
    );
  }

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
                Click "Get AI Roadmap" to see a detailed learning plan generated by our ML model.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {careerPaths.map((career, index) => (
                <Card key={index} className="group hover:shadow-xl transition-smooth border-border/50 hover:border-primary/20">
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-16 h-16 rounded-xl ${career.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                        {iconMap[career.icon] || <Code className="h-8 w-8 text-primary" />}
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
                      <Button 
                        className="flex-1 gradient-primary group"
                        onClick={() => generateRoadmap(career)}
                        disabled={loadingRoadmap}
                      >
                        {loadingRoadmap && selectedCareer?.title === career.title ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Map className="mr-2 h-4 w-4" />
                            Get AI Roadmap
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="icon">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Career Roadmap Modal */}
      {showRoadmap && roadmapData && (
        <CareerRoadmapModal 
          isOpen={showRoadmap}
          onClose={() => setShowRoadmap(false)}
          roadmapData={roadmapData}
          careerTitle={selectedCareer?.title || ""}
        />
      )}
    </div>
  );
};

export default CareerPaths;
