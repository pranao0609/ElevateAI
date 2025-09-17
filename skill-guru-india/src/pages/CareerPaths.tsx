import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
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

  // Google Material Icon mapping
  const iconMap = {
    Code: "code",
    Palette: "palette",
    BarChart3: "analytics",
    Shield: "security",
    Smartphone: "smartphone",
    Database: "storage",
    Brain: "psychology"
  };

  // Google color gradients for career paths
  const gradientMap = {
    Code: "from-blue-500 to-blue-600",
    Palette: "from-purple-500 to-pink-500",
    BarChart3: "from-green-500 to-emerald-500",
    Shield: "from-red-500 to-red-600",
    Smartphone: "from-indigo-500 to-blue-500",
    Database: "from-yellow-500 to-orange-500",
    Brain: "from-violet-500 to-purple-600"
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
          name: "Test User",
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
    if (match >= 85) return "text-green-600";
    if (match >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getMatchBadgeColor = (match: number) => {
    if (match >= 85) return "bg-green-100 text-green-700 border-green-200";
    if (match >= 70) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  if (loading) {
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
        
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.15s' }}></div>
            </div>
            <div>
              <h3 
                className="text-xl font-medium text-gray-900 mb-2"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Analyzing Career Paths
              </h3>
              <p 
                className="text-gray-600"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Our AI is finding the perfect matches for you...
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

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

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white">
        <Header />
        
        <main className="pt-8">
          {/* Google Material Hero Section */}
          <section className="py-20 lg:py-28 relative overflow-hidden">
            {/* Google-style Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
              <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/8 blur-3xl" />
              
              {/* Google-style geometric pattern */}
              <div className="absolute top-20 right-1/3 opacity-5">
                <div className="grid grid-cols-4 gap-4">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i % 4 === 0 ? 'bg-blue-500' :
                        i % 4 === 1 ? 'bg-green-500' :
                        i % 4 === 2 ? 'bg-red-500' : 'bg-yellow-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="container px-6 lg:px-8 relative z-10">
              <div className="text-center space-y-8 max-w-4xl mx-auto">
                {/* Google-style Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                  <span className="material-icons text-base">psychology</span>
                  <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    AI-Powered Career Matching
                  </span>
                </div>

                <h1 
                  className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Discover Your Perfect
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium mt-2">
                    Career Path
                  </span>
                </h1>

                <p 
                  className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Our AI analyzes your skills, interests, and market trends to recommend 
                  the most suitable career paths with <span className="font-medium text-blue-600">growth potential</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Google Material Career Paths Grid */}
          <section className="py-20 bg-white relative">
            <div className="container px-6 lg:px-8">
              <div className="text-center space-y-6 mb-16">
                <h2 
                  className="text-4xl lg:text-5xl font-normal text-gray-900"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Recommended Career Paths
                </h2>
                <p 
                  className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Click <span className="font-medium text-blue-600">"Get AI Roadmap"</span> to see a detailed learning plan 
                  generated by our machine learning model.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {careerPaths.map((career, index) => (
                  <Card 
                    key={index} 
                    className="group border-0 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                  >
                    <CardHeader className="p-8 space-y-6">
                      <div className="flex items-start justify-between">
                        {/* Google Material Icon Container */}
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientMap[career.icon] || gradientMap.Code} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                          <span 
                            className="material-icons text-2xl text-white"
                            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                          >
                            {iconMap[career.icon] || "code"}
                          </span>
                          
                          {/* Google-style glow effect */}
                          <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientMap[career.icon] || gradientMap.Code} opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300`} />
                        </div>
                        
                        {/* Match Score with Google styling */}
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${getMatchColor(career.match)} mb-1`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                            {career.match}%
                          </div>
                          <Badge className={`${getMatchBadgeColor(career.match)} text-xs font-medium rounded-full px-3 py-1 border`}>
                            Match Score
                          </Badge>
                        </div>
                      </div>
                      
                      <div>
                        <CardTitle 
                          className="text-2xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {career.title}
                        </CardTitle>
                        <CardDescription 
                          className="text-gray-600 text-base leading-relaxed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {career.description}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="p-8 pt-0 space-y-8">
                      {/* Google Material Progress Bar */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span 
                            className="font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            Career Match
                          </span>
                          <div className="flex items-center gap-2">
                            <span className={`text-lg font-bold ${getMatchColor(career.match)}`}>
                              {career.match}%
                            </span>
                            {career.match >= 85 && (
                              <span className="material-icons text-green-500 text-lg">trending_up</span>
                            )}
                          </div>
                        </div>
                        
                        {/* Custom Google-style progress bar */}
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className={`bg-gradient-to-r ${gradientMap[career.icon] || gradientMap.Code} h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
                              style={{ width: `${career.match}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Google Material Key Metrics */}
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          { label: "Salary Range", value: career.salary, icon: "payments", color: "text-green-600" },
                          { label: "Growth", value: career.growth, icon: "trending_up", color: "text-blue-600" },
                          { label: "Demand", value: career.demand, icon: "public", color: "text-purple-600" }
                        ].map((metric, metricIndex) => (
                          <div key={metricIndex} className="text-center p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center justify-center mb-2">
                              <span className={`material-icons text-lg ${metric.color}`}>
                                {metric.icon}
                              </span>
                            </div>
                            <div 
                              className="text-sm font-semibold text-gray-900 mb-1"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {metric.value}
                            </div>
                            <div 
                              className="text-xs text-gray-600"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skills Required with Google Material styling */}
                      <div className="space-y-4">
                        <h4 
                          className="text-lg font-medium flex items-center text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2 text-blue-600">psychology</span>
                          Key Skills Required
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              variant="secondary" 
                              className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-blue-100 transition-colors duration-200"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Top Companies with Google Material styling */}
                      <div className="space-y-4">
                        <h4 
                          className="text-lg font-medium flex items-center text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2 text-green-600">apartment</span>
                          Top Hiring Companies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {career.companies.slice(0, 3).map((company, companyIndex) => (
                            <Badge 
                              key={companyIndex} 
                              variant="outline" 
                              className="bg-white border-gray-300 text-gray-700 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-50 transition-colors duration-200"
                            >
                              {company}
                            </Badge>
                          ))}
                          {career.companies.length > 3 && (
                            <Badge 
                              variant="outline" 
                              className="bg-gray-50 border-gray-300 text-gray-500 rounded-full px-3 py-1 text-xs font-medium"
                            >
                              +{career.companies.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Google Material Action Buttons */}
                      <div className="flex space-x-4 pt-6">
                        <Button 
                          className={`flex-1 h-12 bg-gradient-to-r ${gradientMap[career.icon] || gradientMap.Code} hover:shadow-lg text-white rounded-full shadow-md transition-all duration-300 group`}
                          onClick={() => generateRoadmap(career)}
                          disabled={loadingRoadmap}
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {loadingRoadmap && selectedCareer?.title === career.title ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                              Generating...
                            </>
                          ) : (
                            <>
                              <span className="material-icons mr-3">route</span>
                              Get AI Roadmap
                              <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="h-12 w-12 rounded-full border-2 border-gray-300 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600 transition-all duration-300"
                        >
                          <span className="material-icons">star_border</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </main>

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
    </>
  );
};

export default CareerPaths;
