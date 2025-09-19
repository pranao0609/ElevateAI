import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  Calendar,
  Clock,
  Award,
  Users,
  FileText,
  ArrowRight,
  Plus,
  Brain,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  User,
  Briefcase
} from "lucide-react";
import React, { useState, useEffect } from 'react';

// Career Recommendation Parser (unchanged)
const parseCareerRecommendation = (response: string) => {
  const sections = response.split('------------------------------');
  const recommendation = sections[1]?.trim();
  
  if (!recommendation) return null;

  // Extract different parts using regex
  const explanationMatch = recommendation.match(/- Explanation: (.*?)(?=- Skill Gaps:|$)/s);
  const skillGapsMatch = recommendation.match(/- Skill Gaps: (.*?)$/s);

  const explanation = explanationMatch?.[1]?.trim() || '';
  const skillGaps = skillGapsMatch?.[1]?.trim() || 'None';

  // Parse the explanation for structured data
  const careerSuggestionMatch = explanation.match(/\*Career Suggestion\*: (.*?)(?=\*|$)/s);
  const reasoningMatch = explanation.match(/\*Reasoning\*: (.*?)(?=\*|$)/s);
  const initialStepsMatch = explanation.match(/\*Initial Steps\*:(.*?)$/s);

  const careerSuggestion = careerSuggestionMatch?.[1]?.trim() || '';
  const reasoning = reasoningMatch?.[1]?.trim() || '';
  
  // Parse initial steps
  let initialSteps: string[] = [];
  if (initialStepsMatch) {
    const stepsText = initialStepsMatch[1];
    const steps = stepsText.match(/\d+\.\s*\*(.*?)\*:(.*?)(?=\d+\.|$)/gs);
    if (steps) {
      initialSteps = steps.map(step => {
        const stepMatch = step.match(/\d+\.\s*\*(.*?)\*:(.*)/s);
        if (stepMatch) {
          return `${stepMatch[1].trim()}: ${stepMatch[2].trim()}`;
        }
        return step.trim();
      });
    }
  }

  return {
    careerSuggestion,
    reasoning,
    initialSteps,
    skillGaps
  };
};

// AI Recommendation Component (unchanged)
const AICareerRecommendation: React.FC<{ recommendation: any }> = ({ recommendation }) => {
  if (!recommendation) {
    return (
      <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
        <CardHeader className="p-8 pb-6">
          <CardTitle 
            className="flex items-center space-x-3 text-xl font-medium text-gray-900"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
              <Brain className="text-white h-6 w-6" />
            </div>
            <span>AI Career Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600" style={{ fontFamily: 'Roboto, sans-serif' }}>
              Loading your personalized career recommendations...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-8 pb-6">
        <CardTitle 
          className="flex items-center space-x-3 text-xl font-medium text-gray-900"
          style={{ fontFamily: 'Google Sans, sans-serif' }}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
            <Brain className="text-white h-6 w-6" />
          </div>
          <span>AI Career Insights</span>
        </CardTitle>
        <CardDescription 
          className="text-gray-600 text-lg mt-2"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        >
          Personalized recommendations based on your profile analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0 space-y-8">
        
        {/* Career Suggestion */}
        {recommendation.careerSuggestion && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <Briefcase className="text-white h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 
                  className="font-semibold text-lg text-gray-900 mb-2"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Recommended Career Path
                </h4>
                <p 
                  className="text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {recommendation.careerSuggestion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Reasoning */}
        {recommendation.reasoning && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-100">
            <div className="flex items-start space-x-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-blue-600 shadow-md">
                <Target className="text-white h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 
                  className="font-semibold text-lg text-gray-900 mb-2"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Why This Path Suits You
                </h4>
                <p 
                  className="text-gray-700 leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  {recommendation.reasoning}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Initial Steps */}
        {recommendation.initialSteps && recommendation.initialSteps.length > 0 && (
          <div>
            <h4 
              className="flex items-center text-lg font-semibold text-gray-900 mb-4"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 shadow-md mr-3">
                <CheckCircle className="text-white h-4 w-4" />
              </div>
              Next Action Steps
            </h4>
            <div className="space-y-3">
              {recommendation.initialSteps.map((step: string, index: number) => {
                const [title, description] = step.split(': ');
                return (
                  <div 
                    key={index} 
                    className="group flex items-start space-x-4 p-4 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-all duration-300">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <h5 
                        className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        {title}
                      </h5>
                      {description && (
                        <p 
                          className="text-gray-600 text-sm leading-relaxed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {description}
                        </p>
                      )}
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Skill Gaps */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gray-500 to-gray-600 shadow-md">
              {recommendation.skillGaps === 'None' ? 
                <CheckCircle className="text-white h-4 w-4" /> : 
                <AlertTriangle className="text-white h-4 w-4" />
              }
            </div>
            <div>
              <h5 
                className="font-medium text-gray-900"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Skill Gaps Analysis
              </h5>
              <p 
                className="text-sm text-gray-600"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                {recommendation.skillGaps === 'None' ? 
                  'Great! No major skill gaps identified.' : 
                  recommendation.skillGaps
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const [careerRecommendation, setCareerRecommendation] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Sample AI response - replace this with actual API call
  const sampleAIResponse = `Career Recommendations 
------------------------------
1. General Career Suggestion 
   - Explanation: Hello Shreyash! It's great to hear about your impressive skills in backend development with FastAPI, C++, algorithms, and game development. That's a fantastic combination of technical expertise!
Here's a career suggestion that I believe would be a fantastic fit for you:
*Career Suggestion*: Software Engineer (with a focus on Game Development or Backend Systems)
*Reasoning*: Your proficiency in backend technologies like FastAPI, coupled with your strong C++ and algorithms knowledge, makes you a highly valuable candidate for building robust and efficient software systems. The addition of game development skills indicates a strong aptitude for complex problem-solving, performance optimization, and creative application development. These skills are directly transferable to either specializing in the backend infrastructure for online games or working on complex backend systems for other industries that require high performance and scalability.
*Initial Steps*:
    1. *Build a Portfolio*: Showcase your game development projects and any backend applications you've built using FastAPI. This will visually demonstrate your abilities to potential employers.
    2. *Network within Game Development Communities*: Connect with other game developers online (forums, Discord, LinkedIn) and attend local or virtual game development meetups. Networking can open doors to exciting opportunities.
    3. *Explore Backend Roles in Gaming Companies*: Look for entry-level or junior backend engineer positions at gaming studios. Highlight how your FastAPI and C++ skills can contribute to their game servers, matchmaking systems, or other backend services.
You have a strong foundation, Shreyash, and I'm excited to see where your talents take you!
   - Skill Gaps: None
------------------------------`;

  // Fetch career recommendation from backend
  const fetchCareerRecommendation = async () => {
    try {
      setLoading(true);
      
      // Replace this with your actual API call
      // const response = await fetch('/api/career-recommendation', {
      //   method: 'GET',
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const data = await response.json();
      
      // For demo purposes, using sample data
      setTimeout(() => {
        const parsedRecommendation = parseCareerRecommendation(sampleAIResponse);
        setCareerRecommendation(parsedRecommendation);
        setLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Error fetching career recommendation:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareerRecommendation();
  }, []);

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

      <Header/>
      
      <section id="dashboard" className="py-12 bg-gradient-to-br from-gray-50 via-blue-50 to-white relative overflow-hidden">
        {/* Google-style Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/8 to-purple-400/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400/6 to-yellow-400/6 blur-3xl" />
          
          {/* Google-style geometric elements */}
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
          {/* Google Material Header - MATCHED SIZES */}
          <div className="text-center space-y-6 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm">
              <span className="material-icons text-base">dashboard</span>
              <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                AI-Powered Dashboard
              </span>
            </div>

            <h2 
              className="text-4xl lg:text-5xl font-normal text-gray-900 leading-tight"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Your Personalized
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium mt-2">
                Career Dashboard
              </span>
            </h2>

            <p 
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Track your progress, discover opportunities, and manage your career journey 
              with <span className="font-medium text-blue-600">Google AI insights</span>.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* 🔄 SWAPPED ORDER: AI Career Recommendation comes FIRST */}
              <AICareerRecommendation recommendation={loading ? null : careerRecommendation} />

              {/* 🔄 SWAPPED ORDER: Career Progress comes SECOND */}
              <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-8 pb-6">
                  <CardTitle 
                    className="flex items-center space-x-3 text-xl font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                      <span className="material-icons text-white text-xl">trending_up</span>
                    </div>
                    <span>Career Progress</span>
                  </CardTitle>
                  <CardDescription 
                    className="text-gray-600 text-lg mt-2"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Your journey towards becoming a <span className="font-medium text-blue-600">Full Stack Developer</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                  {/* Main Progress with Google Material Design styling */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span 
                        className="font-medium text-gray-900 text-lg"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Overall Progress
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-blue-600">68%</span>
                        <span className="material-icons text-green-500">trending_up</span>
                      </div>
                    </div>
                    {/* Custom Google-style progress bar */}
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                          style={{ width: '68%' }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Skill Breakdown */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { name: "Technical Skills", value: 75, color: "from-blue-500 to-blue-600", icon: "code" },
                      { name: "Experience", value: 45, color: "from-green-500 to-green-600", icon: "work" },
                      { name: "Portfolio", value: 85, color: "from-purple-500 to-purple-600", icon: "folder" }
                    ].map((skill, index) => (
                      <div key={index} className="space-y-3 p-4 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <span className={`material-icons text-lg bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                            {skill.icon}
                          </span>
                          <div 
                            className="text-sm font-medium text-gray-900"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {skill.name}
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-gradient-to-r ${skill.color} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${skill.value}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">{skill.value}%</span>
                          <span className="material-icons text-xs text-green-500">check_circle</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Stats & Actions - MATCHED SIZES */}
            <div className="space-y-8">
              {/* Quick Stats - Google Material Card */}
              <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle 
                    className="text-lg font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-6">
                  {[
                    { label: "Skills Acquired", value: "24", icon: "military_tech", color: "text-blue-600" },
                    { label: "Projects Completed", value: "8", icon: "task_alt", color: "text-green-600" },
                    { label: "Mentor Sessions", value: "12", icon: "people", color: "text-purple-600" },
                    { label: "Job Applications", value: "45", icon: "send", color: "text-red-600" }
                  ].map((stat, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex items-center space-x-3">
                        <span className={`material-icons ${stat.color}`}>
                          {stat.icon}
                        </span>
                        <span 
                          className="text-gray-700 font-medium"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {stat.label}
                        </span>
                      </div>
                      <span 
                        className="font-bold text-xl text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events - Google Material Card */}
              <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle 
                    className="flex items-center justify-between text-lg font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span>Upcoming Events</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-4">
                  {[
                    {
                      title: "Mentor Session",
                      time: "Today, 3:00 PM",
                      type: "Meeting",
                      color: "bg-blue-100 text-blue-700",
                      icon: "people",
                      dotColor: "bg-blue-500"
                    },
                    {
                      title: "React Workshop",
                      time: "Tomorrow, 10:00 AM",
                      type: "Learning",
                      color: "bg-green-100 text-green-700",
                      icon: "school",
                      dotColor: "bg-green-500"
                    },
                    {
                      title: "Job Interview",
                      time: "Friday, 2:00 PM",
                      type: "Interview",
                      color: "bg-yellow-100 text-yellow-700",
                      icon: "work",
                      dotColor: "bg-yellow-500"
                    }
                  ].map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200">
                      <div className={`w-3 h-3 rounded-full ${event.dotColor}`}></div>
                      <div className="flex-1">
                        <div 
                          className="font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {event.title}
                        </div>
                        <div 
                          className="text-sm text-gray-500 flex items-center gap-1 mt-1"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          <span className="material-icons text-xs">schedule</span>
                          {event.time}
                        </div>
                      </div>
                      <Badge variant="outline" className={`text-xs rounded-full ${event.color} border-0`}>
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions - Google Material Card */}
              <Card className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-6">
                  <CardTitle 
                    className="text-lg font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                  {[
                    { label: "Start Learning Path", icon: "menu_book", color: "hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200" },
                    { label: "Book Mentor Session", icon: "people", color: "hover:bg-green-50 hover:text-green-600 hover:border-green-200" },
                    { label: "Take Skills Assessment", icon: "quiz", color: "hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200" }
                  ].map((action, index) => (
                    <Button 
                      key={index}
                      className={`w-full justify-start h-12 rounded-xl border border-gray-200 text-gray-700 bg-white transition-all duration-200 ${action.color}`} 
                      variant="outline"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      <span className="material-icons mr-3">
                        {action.icon}
                      </span>
                      {action.label}
                    </Button>
                  ))}
                  
                  <Button 
                    className="w-full justify-start h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-3">calendar_today</span>
                    View All Activities
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
