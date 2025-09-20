import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from 'react-router-dom';

import {
  Users,
  Calendar,
  Clock,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Video,
  Phone,
  ArrowRight,
  Filter,
  Search,
  CheckCircle,
  Award,
  TrendingUp,
  Target,
  Lock
} from "lucide-react";

// Authentication Guard Component
const AuthenticationRequired: React.FC = () => {
  const navigate = useNavigate();

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

      <Header />
      
      <section className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-white flex items-center justify-center p-6">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/8 blur-3xl" />
        </div>

        {/* Authentication Required Card */}
        <Card className="w-full max-w-2xl border-0 rounded-3xl shadow-2xl bg-white relative z-10">
          <CardHeader className="text-center space-y-6 p-12">
            {/* Google-style mentorship icon */}
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="material-icons text-white text-3xl">school</span>
            </div>
            
            <div className="space-y-4">
              <CardTitle 
                className="text-3xl font-medium text-gray-900"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Unlock Expert Mentorship
              </CardTitle>
              <CardDescription 
                className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Sign in to connect with industry experts, join mentorship programs, and accelerate your career growth.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-8 p-12 pt-0">
            {/* Mentorship Features */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                  <span className="material-icons text-white text-lg">smart_toy</span>
                </div>
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Gemini AI Mentor
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    24/7 AI-powered career guidance and mentorship
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 shadow-md">
                  <span className="material-icons text-white text-lg">people</span>
                </div>
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Expert Mentors
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Connect with professionals from top companies
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-md">
                  <span className="material-icons text-white text-lg">video_call</span>
                </div>
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    1:1 Sessions
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Personalized video sessions and career coaching
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-md">
                  <span className="material-icons text-white text-lg">school</span>
                </div>
                <div>
                  <h4 
                    className="font-semibold text-gray-900 mb-1"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Structured Programs
                  </h4>
                  <p 
                    className="text-sm text-gray-600"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Join comprehensive career development programs
                  </p>
                </div>
              </div>
            </div>

            {/* Mentor Preview */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <span className="material-icons text-purple-600">preview</span>
                <h4 
                  className="font-semibold text-gray-900"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Featured Mentors from Top Companies:
                </h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { company: "Google", icon: "business", color: "text-blue-600" },
                  { company: "Microsoft", icon: "computer", color: "text-green-600" },
                  { company: "Amazon", icon: "storefront", color: "text-orange-600" },
                  { company: "Flipkart", icon: "shopping_cart", color: "text-purple-600" }
                ].map((company, index) => (
                  <div key={index} className="text-center">
                    <span className={`material-icons text-2xl ${company.color} mb-2 block`}>
                      {company.icon}
                    </span>
                    <span 
                      className="text-sm text-gray-700 font-medium"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {company.company}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Statistics */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-green-600">trending_up</span>
                  <h4 
                    className="font-semibold text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Student Success Stories
                  </h4>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="material-icons text-yellow-500 text-lg">star</span>
                  <span 
                    className="text-sm font-bold text-green-600"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    4.9/5 Rating
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { stat: "5,000+", label: "Students Mentored" },
                  { stat: "89%", label: "Career Advancement" },
                  { stat: "3x", label: "Faster Growth" }
                ].map((item, index) => (
                  <div key={index}>
                    <div 
                      className="text-2xl font-bold text-green-600 mb-1"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      {item.stat}
                    </div>
                    <div 
                      className="text-sm text-gray-600"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate('/sign-in')}
                className="flex-1 h-14 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-base font-medium"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-3">login</span>
                Sign In to Find Mentors
              </Button>

              <Button 
                onClick={() => navigate('/sign-up')}
                variant="outline"
                className="flex-1 h-14 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 rounded-2xl text-base font-medium"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-3">person_add</span>
                Create Account
              </Button>
            </div>

            {/* Additional Info */}
            <div className="text-center pt-4 border-t border-gray-200">
              <p 
                className="text-sm text-gray-500"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Join thousands of professionals who accelerated their careers with expert mentorship
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Google-style Feature Notice */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2 text-sm text-gray-500 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <span className="material-icons text-purple-500 text-sm">school</span>
            <span style={{ fontFamily: 'Roboto, sans-serif' }}>
              Expert mentorship from industry leaders at top companies
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

const Mentorship = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const mentors = [
    {
      id: 1,
      name: "Priya Sharma",
      title: "Senior Full Stack Developer",
      company: "Google India",
      experience: "8 years",
      rating: 4.9,
      reviews: 127,
      location: "Bangalore",
      expertise: ["React", "Node.js", "System Design", "Career Growth"],
      hourlyRate: "₹2,500",
      avatar: "/api/placeholder/150/150",
      bio: "Experienced full-stack developer helping students transition into tech careers.",
      availability: "Available",
      sessions: 340,
      successStories: 89,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Rohit Patel",
      title: "Data Science Manager",
      company: "Microsoft",
      experience: "10 years",
      rating: 4.8,
      reviews: 95,
      location: "Hyderabad",
      expertise: ["Machine Learning", "Python", "Data Analysis", "Leadership"],
      hourlyRate: "₹3,000",
      avatar: "/api/placeholder/150/150",
      bio: "Data science leader passionate about mentoring the next generation of data professionals.",
      availability: "Available",
      sessions: 225,
      successStories: 67,
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Anjali Gupta",
      title: "Product Manager",
      company: "Flipkart",
      experience: "6 years",
      rating: 4.9,
      reviews: 143,
      location: "Mumbai",
      expertise: ["Product Strategy", "User Research", "Market Analysis", "Team Management"],
      hourlyRate: "₹2,800",
      avatar: "/api/placeholder/150/150",
      bio: "Product management expert helping professionals break into product roles.",
      availability: "Busy",
      sessions: 189,
      successStories: 52,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Vikram Singh",
      title: "DevOps Architect",
      company: "Amazon",
      experience: "12 years",
      rating: 4.7,
      reviews: 78,
      location: "Delhi",
      expertise: ["AWS", "Kubernetes", "CI/CD", "Cloud Architecture"],
      hourlyRate: "₹3,500",
      avatar: "/api/placeholder/150/150",
      bio: "Cloud and DevOps expert with extensive experience in scaling applications.",
      availability: "Available",
      sessions: 156,
      successStories: 43,
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const upcomingSessions = [
    {
      mentor: "Priya Sharma",
      topic: "System Design Interview Prep",
      date: "Today, 3:00 PM",
      duration: "60 minutes",
      type: "Video Call",
      status: "Confirmed",
      meetLink: "meet.google.com/abc-defg-hij"
    },
    {
      mentor: "Rohit Patel",
      topic: "Machine Learning Career Path",
      date: "Tomorrow, 10:00 AM",
      duration: "45 minutes",
      type: "Phone Call",
      status: "Pending",
      meetLink: null
    },
    {
      mentor: "Anjali Gupta",
      topic: "Product Management Fundamentals",
      date: "Friday, 2:00 PM",
      duration: "90 minutes",
      type: "Video Call",
      status: "Confirmed",
      meetLink: "meet.google.com/xyz-uvwx-rst"
    }
  ];

  const mentorshipPrograms = [
    {
      title: "Full Stack Development Bootcamp",
      description: "12-week intensive program with industry mentors",
      duration: "12 weeks",
      mentors: 8,
      students: 24,
      price: "₹45,000",
      features: ["Weekly 1:1 sessions", "Group projects", "Job placement support", "Industry networking"],
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Data Science Career Track",
      description: "Comprehensive program covering ML, analytics, and career guidance",
      duration: "16 weeks",
      mentors: 6,
      students: 18,
      price: "₹55,000",
      features: ["Real-world projects", "Portfolio building", "Interview preparation", "Industry connections"],
      gradient: "from-green-500 to-green-600"
    },
    {
      title: "Product Management Masterclass",
      description: "Strategic program for aspiring and current product managers",
      duration: "10 weeks",
      mentors: 5,
      students: 15,
      price: "₹40,000",
      features: ["Case study analysis", "Product strategy workshops", "Leadership training", "Network building"],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-white">
          <div className="text-center">
            <div className="google-loading-spinner mb-4"></div>
            <p 
              className="text-gray-600"
              style={{ fontFamily: 'Roboto, sans-serif' }}
            >
              Loading mentorship platform...
            </p>
          </div>
        </div>
        
        <style>{`
          .google-loading-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #e0e0e0;
            border-top: 3px solid #4285f4;
            border-radius: 50%;
            animation: google-spin 1s linear infinite;
            margin: 0 auto;
          }

          @keyframes google-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </>
    );
  }

  // Show authentication required screen if user is not authenticated
  if (!isAuthenticated) {
    return <AuthenticationRequired />;
  }

  // Show mentorship platform if user is authenticated
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
        
        {/* Google-style Hero Section with personalized welcome */}
        <section className="relative overflow-hidden pt-20 pb-32">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-green-400/8 to-yellow-400/8 blur-3xl" />
          </div>

          <div className="relative container mx-auto px-6 lg:px-8">
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-blue-200 rounded-full text-sm font-medium text-blue-700 shadow-sm">
                <span className="material-icons text-base">school</span>
                <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Welcome back, {user?.firstName || user?.name?.split(' ')[0] || 'User'}! Professional Mentorship Platform
                </span>
              </div>

              <h1 
                className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Accelerate Your Career with
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Expert Mentorship
                </span>
              </h1>

              <p 
                className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Get personalized guidance from experienced professionals at top companies. 
                Accelerate your career with <span className="font-medium text-blue-600">1:1 mentorship</span> and structured programs.
              </p>
            </div>
          </div>
        </section>

        {/* Mentorship Platform */}
        <section className="py-20 bg-white">
          <div className="container px-6 lg:px-8">
            <Tabs defaultValue="gemini-mentor" className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-gray-100 p-1 rounded-full">
                  <TabsTrigger 
                    value="gemini-mentor"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-base">smart_toy</span>
                    Gemini Mentor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="mentors"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-base">person</span>
                    Find Mentors
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sessions"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-base">event</span>
                    My Sessions
                  </TabsTrigger>
                  <TabsTrigger 
                    value="programs"
                    className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2 text-base">school</span>
                    Programs
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Gemini Mentor Tab - NOW FIRST */}
              <TabsContent value="gemini-mentor" className="space-y-8">
                <div className="text-center space-y-6 mb-16">
                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="material-icons text-white text-sm">auto_awesome</span>
                    </div>
                    <span 
                      className="text-sm font-medium text-blue-700"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Powered by Google Gemini AI
                    </span>
                  </div>

                  <h2 
                    className="text-4xl lg:text-5xl font-normal text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    AI-Powered Career Mentorship for {user?.firstName || 'You'}
                  </h2>
                  <p 
                    className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Get instant, personalized career guidance from Google's advanced AI. 
                    Available 24/7 to help you <span className="font-medium text-purple-600">accelerate your growth</span>.
                  </p>
                </div>

                {/* Gemini AI Interface */}
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Chat Interface */}
                  <div className="lg:col-span-2">
                    <Card className="border-0 rounded-3xl shadow-2xl bg-white h-[600px] flex flex-col">
                      <CardHeader className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-3xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="material-icons text-white text-xl">psychology</span>
                          </div>
                          <div>
                            <CardTitle 
                              className="text-xl font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Gemini Career Mentor
                            </CardTitle>
                            <p 
                              className="text-sm text-gray-600"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Your AI-powered career advisor
                            </p>
                          </div>
                          <div className="ml-auto flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span 
                              className="text-sm text-green-600 font-medium"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Online
                            </span>
                          </div>
                        </div>
                      </CardHeader>

                      {/* Chat Messages Area */}
                      <CardContent className="flex-1 p-6 overflow-y-auto space-y-6">
                        {/* Welcome Message */}
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="material-icons text-white text-sm">smart_toy</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl rounded-tl-sm p-4 border border-blue-200">
                              <p 
                                className="text-gray-800 leading-relaxed"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                👋 Hi {user?.firstName || user?.name?.split(' ')[0] || 'there'}! I'm your Gemini Career Mentor. I'm here to help you with:
                              </p>
                              <ul 
                                className="mt-3 space-y-1 text-sm text-gray-700"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                <li className="flex items-center gap-2">
                                  <span className="material-icons text-green-500 text-sm">check_circle</span>
                                  Career path planning & transitions
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="material-icons text-green-500 text-sm">check_circle</span>
                                  Resume and interview preparation
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="material-icons text-green-500 text-sm">check_circle</span>
                                  Skill development recommendations
                                </li>
                                <li className="flex items-center gap-2">
                                  <span className="material-icons text-green-500 text-sm">check_circle</span>
                                  Industry insights and trends
                                </li>
                              </ul>
                              <p 
                                className="mt-3 text-sm text-blue-600 font-medium"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                What would you like to know about your career journey?
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Sample User Message */}
                        <div className="flex gap-3 justify-end">
                          <div className="max-w-[70%]">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl rounded-tr-sm p-4 text-white">
                              <p style={{ fontFamily: 'Roboto, sans-serif' }}>
                                I'm a computer science student interested in AI/ML careers. What skills should I focus on?
                              </p>
                            </div>
                          </div>
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="material-icons text-white text-sm">person</span>
                          </div>
                        </div>

                        {/* Sample AI Response */}
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                            <span className="material-icons text-white text-sm">smart_toy</span>
                          </div>
                          <div className="flex-1">
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl rounded-tl-sm p-4 border border-blue-200">
                              <p 
                                className="text-gray-800 leading-relaxed mb-3"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Great choice! AI/ML is a rapidly growing field. Here's my personalized roadmap for you:
                              </p>
                              
                              <div className="space-y-3">
                                <div className="bg-white rounded-xl p-3 border border-gray-200">
                                  <h4 
                                    className="font-medium text-blue-600 mb-2 flex items-center gap-2"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    <span className="material-icons text-sm">code</span>
                                    Technical Skills (Priority 1)
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {["Python", "TensorFlow", "PyTorch", "SQL", "Statistics"].map((skill, idx) => (
                                      <Badge key={idx} className="bg-blue-100 text-blue-700 border border-blue-200">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                <div className="bg-white rounded-xl p-3 border border-gray-200">
                                  <h4 
                                    className="font-medium text-green-600 mb-2 flex items-center gap-2"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    <span className="material-icons text-sm">build</span>
                                    Next Steps
                                  </h4>
                                  <ul 
                                    className="text-sm text-gray-700 space-y-1"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    <li>• Build 2-3 ML projects for your portfolio</li>
                                    <li>• Consider Google's Machine Learning Course</li>
                                    <li>• Join AI/ML communities and competitions</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>

                      {/* Chat Input */}
                      <div className="border-t border-gray-100 p-6">
                        <div className="flex gap-3">
                          <div className="flex-1 relative">
                            <input
                              type="text"
                              placeholder="Ask me anything about your career..."
                              className="w-full pl-4 pr-12 py-3 rounded-full border-2 border-gray-200 bg-white focus:outline-none focus:ring-0 focus:border-blue-500 transition-all duration-200"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white p-0">
                              <span className="material-icons text-sm">send</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* AI Features Sidebar */}
                  <div className="space-y-6">
                    {/* Quick Actions */}
                    <Card className="border-0 rounded-3xl shadow-lg">
                      <CardHeader className="p-6">
                        <CardTitle 
                          className="text-lg font-medium text-gray-900 flex items-center gap-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons text-blue-600">flash_on</span>
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-3">
                        {[
                          { icon: "description", text: "Resume Review", color: "blue", to: "/resume-builder" },
                          { icon: "school", text: "Skill Assessment", color: "green", to: "/skills-analysis" },
                          { icon: "trending_up", text: "Career Path", color: "purple", to: "/career-paths" }
                        ].map((action, idx) => (
                          <Button
                            key={idx}
                            asChild
                            variant="outline"
                            className="w-full justify-start h-12 rounded-2xl border-2 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <Link to={action.to}>
                              <span className={`material-icons mr-3 text-${action.color}-600`}>{action.icon}</span>
                              {action.text}
                            </Link>
                          </Button>
                        ))}
                      </CardContent>
                    </Card>

                    {/* AI Insights */}
                    <Card className="border-0 rounded-3xl shadow-lg">
                      <CardHeader className="p-6">
                        <CardTitle 
                          className="text-lg font-medium text-gray-900 flex items-center gap-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons text-purple-600">insights</span>
                          AI Insights for {user?.firstName || 'You'}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-6 pt-0 space-y-4">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-blue-600 text-lg">trending_up</span>
                            <h4 
                              className="font-medium text-blue-700"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Market Trend
                            </h4>
                          </div>
                          <p 
                            className="text-sm text-blue-800"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            AI/ML roles are growing 35% faster than average in India
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-green-600 text-lg">lightbulb</span>
                            <h4 
                              className="font-medium text-green-700"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Personalized Tip
                            </h4>
                          </div>
                          <p 
                            className="text-sm text-green-800"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Based on your profile, consider Google's AI certification
                          </p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-4 border border-purple-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="material-icons text-purple-600 text-lg">schedule</span>
                            <h4 
                              className="font-medium text-purple-700"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Weekly Goal
                            </h4>
                          </div>
                          <p 
                            className="text-sm text-purple-800"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Complete 2 coding challenges this week
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Session Stats */}
                    <Card className="border-0 rounded-3xl shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
                      <CardContent className="p-6">
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                            <span className="material-icons text-white text-2xl">auto_awesome</span>
                          </div>
                          <div>
                            <h3 
                              className="text-2xl font-bold text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              24/7 Available
                            </h3>
                            <p 
                              className="text-gray-600"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Always here to help
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="text-center">
                              <div 
                                className="text-lg font-bold text-blue-600"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                1.2M+
                              </div>
                              <div 
                                className="text-xs text-gray-600"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Students Helped
                              </div>
                            </div>
                            <div className="text-center">
                              <div 
                                className="text-lg font-bold text-green-600"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                95%
                              </div>
                              <div 
                                className="text-xs text-gray-600"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Success Rate
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* AI Capabilities Section */}
                <div className="mt-16">
                  <div className="text-center mb-12">
                    <h3 
                      className="text-3xl font-normal text-gray-900 mb-4"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      What Gemini Mentor Can Help You With
                    </h3>
                    <p 
                      className="text-lg text-gray-600 max-w-2xl mx-auto"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Powered by Google's most advanced AI, tailored for career success
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      {
                        icon: "psychology",
                        title: "Career Counseling",
                        description: "Get personalized advice on career paths and transitions",
                        gradient: "from-blue-500 to-blue-600"
                      },
                      {
                        icon: "school",
                        title: "Skill Development",
                        description: "Identify skill gaps and get learning recommendations",
                        gradient: "from-green-500 to-green-600"
                      },
                      {
                        icon: "description",
                        title: "Resume Optimization",
                        description: "AI-powered resume reviews and improvement suggestions",
                        gradient: "from-purple-500 to-purple-600"
                      },
                      {
                        icon: "quiz",
                        title: "Interview Practice",
                        description: "Mock interviews with real-time feedback and tips",
                        gradient: "from-orange-500 to-red-500"
                      }
                    ].map((capability, idx) => (
                      <Card key={idx} className="border-0 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                        <CardContent className="p-6 text-center">
                          <div className={`w-16 h-16 bg-gradient-to-br ${capability.gradient} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <span className="material-icons text-white text-2xl">{capability.icon}</span>
                          </div>
                          <h4 
                            className="text-lg font-medium text-gray-900 mb-2"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {capability.title}
                          </h4>
                          <p 
                            className="text-sm text-gray-600 leading-relaxed"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {capability.description}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* CTA Section */}
                <Card className="border-0 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white mt-16">
                  <CardContent className="p-12 text-center">
                    <div className="max-w-3xl mx-auto space-y-6">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto flex items-center justify-center backdrop-blur-sm">
                        <span className="material-icons text-3xl">rocket_launch</span>
                      </div>
                      <h3 
                        className="text-3xl lg:text-4xl font-normal"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Ready to Accelerate Your Career, {user?.firstName || 'User'}?
                      </h3>
                      <p 
                        className="text-xl opacity-90 leading-relaxed"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      >
                        Start your journey with AI-powered mentorship. Get personalized guidance, 
                        skill recommendations, and career insights tailored just for you.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        <Button 
                          className="h-14 px-8 bg-white text-blue-600 hover:bg-gray-100 rounded-2xl shadow-lg text-lg font-medium"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2">chat</span>
                          Start Chatting Now
                        </Button>
                        <Button 
                          variant="outline"
                          className="h-14 px-8 border-2 border-white/30 text-white hover:bg-white/10 rounded-2xl backdrop-blur-sm text-lg font-medium"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2">play_circle</span>
                          Watch Demo
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Find Mentors Tab */}
              <TabsContent value="mentors" className="space-y-8">
                <div className="text-center space-y-6 mb-16">
                  <h2 
                    className="text-4xl lg:text-5xl font-normal text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Connect with Expert Mentors
                  </h2>
                  <p 
                    className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Learn from industry professionals at top tech companies. Get personalized guidance 
                    for your <span className="font-medium text-blue-600">career journey</span>.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8">
                  {mentors.map((mentor, index) => (
                    <Card key={mentor.id} className="group border-0 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <CardHeader className="space-y-6 p-8">
                        <div className="flex items-start gap-6">
                          <div className="relative">
                            <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                              <AvatarImage src={mentor.avatar} alt={mentor.name} />
                              <AvatarFallback 
                                className={`text-2xl text-white bg-gradient-to-br ${mentor.gradient}`}
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {mentor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-2 border-white ${
                              mentor.availability === 'Available' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                          </div>
                          
                          <div className="flex-1 space-y-3">
                            <div>
                              <h3 
                                className="text-2xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {mentor.name}
                              </h3>
                              <p 
                                className="text-blue-600 font-medium"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {mentor.title}
                              </p>
                              <p 
                                className="text-gray-500 text-sm"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {mentor.company} • {mentor.experience}
                              </p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <span className="material-icons text-yellow-400 text-base">star</span>
                                <span 
                                  className="font-medium text-gray-900"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {mentor.rating}
                                </span>
                                <span 
                                  className="text-gray-500 text-sm"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                  ({mentor.reviews} reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6 p-8 pt-0">
                        <p 
                          className="text-gray-600 leading-relaxed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {mentor.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {mentor.expertise.map((skill, skillIndex) => (
                            <Badge 
                              key={skillIndex} 
                              className="bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200 transition-colors duration-200"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-sm">location_on</span>
                              <span style={{ fontFamily: 'Roboto, sans-serif' }}>{mentor.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-icons text-sm">schedule</span>
                              <span style={{ fontFamily: 'Roboto, sans-serif' }}>{mentor.hourlyRate}/hour</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                          <Button 
                            className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg transition-all duration-300"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2">video_call</span>
                            Book Session
                          </Button>
                          <Button 
                            variant="outline"
                            className="h-12 px-4 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                          >
                            <span className="material-icons">chat</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Sessions Tab */}
              <TabsContent value="sessions" className="space-y-8">
                <div className="text-center space-y-6 mb-16">
                  <h2 
                    className="text-4xl lg:text-5xl font-normal text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {user?.firstName || 'Your'} Mentorship Sessions
                  </h2>
                  <p 
                    className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Track your progress and manage your upcoming sessions with 
                    <span className="font-medium text-blue-600"> expert mentors</span>.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Upcoming Sessions */}
                  <div className="lg:col-span-2 space-y-6">
                    <h3 
                      className="text-2xl font-medium text-gray-900 mb-6"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Upcoming Sessions
                    </h3>
                    
                    {upcomingSessions.map((session, index) => (
                      <Card key={index} className="border-0 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-8">
                          <div className="flex items-start justify-between mb-6">
                            <div className="space-y-3">
                              <h4 
                                className="text-xl font-medium text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {session.topic}
                              </h4>
                              <p 
                                className="text-blue-600 font-medium"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                with {session.mentor}
                              </p>
                            </div>
                            <Badge 
                              className={`${session.status === 'Confirmed' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'}`}
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {session.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="material-icons text-sm">schedule</span>
                              <span 
                                className="text-sm"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {session.date}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="material-icons text-sm">timer</span>
                              <span 
                                className="text-sm"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {session.duration}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <span className="material-icons text-sm">
                                {session.type === 'Video Call' ? 'video_call' : 'phone'}
                              </span>
                              <span 
                                className="text-sm"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {session.type}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-3">
                            {session.meetLink && (
                              <Button 
                                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-lg transition-all duration-300"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                <span className="material-icons mr-2">videocam</span>
                                Join Meeting
                              </Button>
                            )}
                            <Button 
                              variant="outline"
                              className="rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              <span className="material-icons mr-2">edit</span>
                              Reschedule
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Progress Overview */}
                    <Card className="border-0 rounded-3xl shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
                      <CardContent className="p-8 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                          <span className="material-icons text-white text-2xl">trending_up</span>
                        </div>
                        <h3 
                          className="text-2xl font-bold text-blue-700 mb-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          12 Sessions
                        </h3>
                        <p 
                          className="text-blue-600"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          Completed this month
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-blue-200">
                          <div className="text-center">
                            <div 
                              className="text-lg font-bold text-blue-700"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              4.8
                            </div>
                            <div 
                              className="text-xs text-blue-600"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Avg Rating
                            </div>
                          </div>
                          <div className="text-center">
                            <div 
                              className="text-lg font-bold text-blue-700"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              18h
                            </div>
                            <div 
                              className="text-xs text-blue-600"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Total Time
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card className="border-0 rounded-3xl shadow-lg">
                      <CardHeader className="p-8">
                        <CardTitle 
                          className="text-xl font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Quick Actions
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 p-8 pt-0">
                        <Button 
                          className="w-full justify-start h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg transition-all duration-300"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-3">person_add</span>
                          Find New Mentor
                        </Button>
                        <Button 
                          className="w-full justify-start h-12 rounded-full border-2 border-gray-300 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300"
                          variant="outline"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-3">event</span>
                          Schedule Session
                        </Button>
                        <Button 
                          className="w-full justify-start h-12 rounded-full border-2 border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-300"
                          variant="outline"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-3">flag</span>
                          Update Goals
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs" className="space-y-8">
                <div className="text-center space-y-6 mb-16">
                  <h2 
                    className="text-4xl lg:text-5xl font-normal text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    Structured Mentorship Programs
                  </h2>
                  <p 
                    className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Comprehensive programs designed to fast-track your career with
                    <span className="font-medium text-blue-600"> structured learning</span> and mentorship.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {mentorshipPrograms.map((program, index) => (
                    <Card key={index} className="group border-0 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      <CardHeader className="space-y-6 p-8">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${program.gradient} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                          <span className="material-icons text-white text-2xl">school</span>
                        </div>

                        <div>
                          <CardTitle 
                            className="text-2xl font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-3"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {program.title}
                          </CardTitle>
                          <CardDescription 
                            className="text-gray-600 leading-relaxed"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {program.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-8 p-8 pt-0">
                        {/* Program Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <div 
                              className="text-2xl font-bold text-blue-600 mb-1"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {program.duration}
                            </div>
                            <div 
                              className="text-sm text-gray-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Duration
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <div 
                              className="text-2xl font-bold text-green-600 mb-1"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {program.mentors}
                            </div>
                            <div 
                              className="text-sm text-gray-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Mentors
                            </div>
                          </div>
                          <div className="p-4 bg-gray-50 rounded-2xl">
                            <div 
                              className="text-2xl font-bold text-purple-600 mb-1"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {program.students}
                            </div>
                            <div 
                              className="text-sm text-gray-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Students
                            </div>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3">
                          {program.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <span className="material-icons text-green-600 text-sm">check</span>
                              </div>
                              <span 
                                className="text-gray-700"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Price and CTA */}
                        <div className="pt-4 border-t border-gray-100">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <span 
                                className="text-3xl font-bold text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {program.price}
                              </span>
                              <span 
                                className="text-gray-500 ml-2"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                total
                              </span>
                            </div>
                          </div>
                          <Button 
                            className={`w-full h-12 bg-gradient-to-r ${program.gradient} hover:scale-105 text-white rounded-full shadow-lg transition-all duration-300`}
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2">arrow_forward</span>
                            Enroll Now
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </div>
    </>
  );
};

export default Mentorship;
