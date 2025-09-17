import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

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
  Target
} from "lucide-react";

const Mentorship = () => {
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
                  <span className="material-icons text-base">people</span>
                  <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    Expert Mentorship
                  </span>
                </div>

                <h1 
                  className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Learn from Industry
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium mt-2">
                    Experts & Mentors
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
              <Tabs defaultValue="mentors" className="space-y-8">
                <div className="text-center">
                  <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 bg-gray-100 p-1 rounded-full">
                    <TabsTrigger 
                      value="mentors"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <span className="material-icons mr-2 text-base">person_search</span>
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

                {/* Find Mentors Tab */}
                <TabsContent value="mentors" className="space-y-8">
                  <div className="text-center space-y-6 mb-16">
                    <h2 
                      className="text-4xl lg:text-5xl font-normal text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Connect with Industry Experts
                    </h2>
                    <p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Browse our network of experienced mentors from top companies and book 
                      <span className="font-medium text-blue-600"> personalized sessions</span>.
                    </p>
                  </div>

                  {/* Google-style Search and Filters */}
                  <Card className="border-0 rounded-3xl shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex flex-col md:flex-row gap-6 items-center">
                        <div className="flex-1 relative">
                          <span className="material-icons absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">search</span>
                          <input
                            type="text"
                            placeholder="Search by expertise, company, or name..."
                            className="w-full pl-12 pr-6 py-4 rounded-full border-2 border-gray-200 bg-white focus:outline-none focus:ring-0 focus:border-blue-500 text-base transition-all duration-200"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            variant="outline" 
                            className="h-12 px-6 rounded-full border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2 text-base">tune</span>
                            Filters
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-12 px-6 rounded-full border-2 border-gray-300 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-200"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2 text-base">location_on</span>
                            Location
                          </Button>
                          <Button 
                            variant="outline" 
                            className="h-12 px-6 rounded-full border-2 border-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-all duration-200"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2 text-base">schedule</span>
                            Availability
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mentors Grid */}
                  <div className="grid lg:grid-cols-2 gap-8">
                    {mentors.map((mentor) => (
                      <Card key={mentor.id} className="group border-0 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <CardHeader className="space-y-6 p-8">
                          <div className="flex items-start space-x-4">
                            <div className="relative">
                              <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                                <AvatarFallback className={`bg-gradient-to-br ${mentor.gradient} text-white font-medium text-xl`}>
                                  {mentor.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              {/* Online status indicator */}
                              {mentor.availability === "Available" && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                              )}
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 
                                    className="font-medium text-xl text-gray-900 group-hover:text-blue-600 transition-colors duration-300 mb-1"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {mentor.name}
                                  </h3>
                                  <p 
                                    className="text-gray-600 mb-1"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    {mentor.title}
                                  </p>
                                  <p 
                                    className="font-medium text-blue-600"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {mentor.company}
                                  </p>
                                </div>
                                <Badge 
                                  className={`rounded-full px-3 py-1 font-medium ${
                                    mentor.availability === "Available" 
                                      ? "bg-green-100 text-green-700 border-green-200" 
                                      : "bg-gray-100 text-gray-700 border-gray-200"
                                  }`}
                                >
                                  {mentor.availability}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center space-x-6 mt-3 text-sm text-gray-500">
                                <div className="flex items-center space-x-1">
                                  <span className="material-icons text-yellow-500 text-base">star</span>
                                  <span className="font-medium">{mentor.rating}</span>
                                  <span>({mentor.reviews})</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="material-icons text-gray-400 text-base">location_on</span>
                                  <span>{mentor.location}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <span className="material-icons text-gray-400 text-base">work</span>
                                  <span>{mentor.experience}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-8 p-8 pt-0">
                          <p 
                            className="text-gray-600 leading-relaxed"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {mentor.bio}
                          </p>

                          {/* Expertise */}
                          <div className="space-y-3">
                            <h4 
                              className="font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Expertise
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {mentor.expertise.map((skill, index) => (
                                <Badge 
                                  key={index} 
                                  className="bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 text-sm font-medium"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-gray-100">
                            <div className="text-center">
                              <div 
                                className="text-2xl font-bold text-blue-600 mb-1"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {mentor.sessions}
                              </div>
                              <div 
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Sessions
                              </div>
                            </div>
                            <div className="text-center">
                              <div 
                                className="text-2xl font-bold text-green-600 mb-1"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {mentor.successStories}
                              </div>
                              <div 
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Success Stories
                              </div>
                            </div>
                            <div className="text-center">
                              <div 
                                className="text-2xl font-bold text-gray-900 mb-1"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {mentor.hourlyRate}
                              </div>
                              <div 
                                className="text-sm text-gray-500"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Per hour
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-4">
                            <Button 
                              className={`flex-1 h-12 bg-gradient-to-r ${mentor.gradient} hover:shadow-lg text-white rounded-full shadow-md transition-all duration-300 group`}
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Book Session
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                            <Button 
                              variant="outline" 
                              className="h-12 w-12 rounded-full border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                            >
                              <span className="material-icons">chat</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* My Sessions Tab */}
                <TabsContent value="sessions" className="space-y-8">
                  <div className="text-center space-y-6 mb-16">
                    <h2 
                      className="text-4xl lg:text-5xl font-normal text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Your Mentorship Sessions
                    </h2>
                    <p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Manage your upcoming sessions and track your 
                      <span className="font-medium text-blue-600"> mentorship journey</span>.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Upcoming Sessions */}
                    <div className="lg:col-span-2 space-y-8">
                      <Card className="border-0 rounded-3xl shadow-lg">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                              <span className="material-icons text-white text-xl">event</span>
                            </div>
                            <span>Upcoming Sessions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                          <div className="space-y-6">
                            {upcomingSessions.map((session, index) => (
                              <div key={index} className="group flex items-center space-x-4 p-6 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-3">
                                    <h4 
                                      className="font-medium text-lg text-gray-900 group-hover:text-blue-600 transition-colors duration-300"
                                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                                    >
                                      {session.topic}
                                    </h4>
                                    <Badge 
                                      className={`rounded-full px-3 py-1 font-medium ${
                                        session.status === "Confirmed" 
                                          ? "bg-green-100 text-green-700 border-green-200" 
                                          : "bg-yellow-100 text-yellow-700 border-yellow-200"
                                      }`}
                                    >
                                      {session.status}
                                    </Badge>
                                  </div>
                                  <p 
                                    className="text-gray-600 mb-3"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    with {session.mentor}
                                  </p>
                                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                                    <div className="flex items-center space-x-2">
                                      <span className="material-icons text-base">schedule</span>
                                      <span>{session.date}</span>
                                    </div>
                                    <span>{session.duration}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="material-icons text-base">
                                        {session.type === "Video Call" ? "videocam" : "phone"}
                                      </span>
                                      <span>{session.type}</span>
                                    </div>
                                  </div>
                                  {session.meetLink && (
                                    <div className="mt-3 text-xs text-blue-600 bg-blue-50 px-3 py-2 rounded-full inline-block">
                                      <span className="material-icons mr-1 text-sm">link</span>
                                      {session.meetLink}
                                    </div>
                                  )}
                                </div>
                                <Button 
                                  className="h-10 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  <span className="material-icons mr-2">videocam</span>
                                  Join
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Session History */}
                      <Card className="border-0 rounded-3xl shadow-lg">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                              <span className="material-icons text-white text-xl">check_circle</span>
                            </div>
                            <span>Completed Sessions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                          <div className="space-y-4">
                            {[
                              { mentor: "Priya Sharma", topic: "React Best Practices", date: "2 days ago", rating: 5 },
                              { mentor: "Rohit Patel", topic: "Data Science Career Path", date: "1 week ago", rating: 5 },
                              { mentor: "Anjali Gupta", topic: "Product Interview Prep", date: "2 weeks ago", rating: 4 }
                            ].map((session, index) => (
                              <div key={index} className="flex items-center justify-between p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                                <div>
                                  <h4 
                                    className="font-medium text-gray-900 mb-1"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {session.topic}
                                  </h4>
                                  <p 
                                    className="text-sm text-gray-500"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    with {session.mentor} • {session.date}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {[...Array(session.rating)].map((_, i) => (
                                    <span key={i} className="material-icons text-yellow-500 text-lg">star</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Progress Sidebar */}
                    <div className="space-y-8">
                      <Card className="border-0 rounded-3xl shadow-lg">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="text-xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            Your Progress
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8 pt-0">
                          <div className="text-center">
                            <div 
                              className="text-4xl font-bold text-blue-600 mb-2"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              12
                            </div>
                            <div 
                              className="text-gray-500"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              Total Sessions
                            </div>
                          </div>
                          
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span 
                                className="text-gray-700"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Skills Learned
                              </span>
                              <span 
                                className="font-semibold text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                18
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span 
                                className="text-gray-700"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Average Rating
                              </span>
                              <span 
                                className="font-semibold text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                4.8/5
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span 
                                className="text-gray-700"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                Career Goals
                              </span>
                              <span 
                                className="font-semibold text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                75% Complete
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

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

                          {/* Features */}
                          <div className="space-y-4">
                            <h4 
                              className="font-medium text-gray-900"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              What's Included
                            </h4>
                            <div className="space-y-3">
                              {program.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center space-x-3">
                                  <span className="material-icons text-green-500 text-lg">check_circle</span>
                                  <span 
                                    className="text-gray-700"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Price and CTA */}
                          <div className="space-y-6 pt-6 border-t border-gray-100">
                            <div className="text-center">
                              <div 
                                className="text-3xl font-bold text-gray-900 mb-1"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {program.price}
                              </div>
                              <div 
                                className="text-gray-500"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                One-time payment
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full h-12 bg-gradient-to-r ${program.gradient} hover:shadow-lg text-white rounded-full shadow-md transition-all duration-300 group`}
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Enroll Now
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Bottom CTA */}
                  <div className="text-center space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
                    <h3 
                      className="text-3xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Can't Find the Right Program?
                    </h3>
                    <p 
                      className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      We offer custom mentorship programs tailored to your specific career goals and 
                      <span className="font-medium text-blue-600"> learning needs</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="h-12 px-8 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons mr-3">design_services</span>
                        Design Custom Program
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="h-12 px-8 border-2 border-gray-300 hover:bg-white hover:border-blue-300 hover:text-blue-600 rounded-full transition-all duration-300"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons mr-3">support_agent</span>
                        Talk to Advisor
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>

      </div>
    </>
  );
};

export default Mentorship;
