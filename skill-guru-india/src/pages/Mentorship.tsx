import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
      successStories: 89
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
      successStories: 67
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
      successStories: 52
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
      successStories: 43
    }
  ];

  const upcomingSessions = [
    {
      mentor: "Priya Sharma",
      topic: "System Design Interview Prep",
      date: "Today, 3:00 PM",
      duration: "60 minutes",
      type: "Video Call",
      status: "Confirmed"
    },
    {
      mentor: "Rohit Patel", 
      topic: "Machine Learning Career Path",
      date: "Tomorrow, 10:00 AM",
      duration: "45 minutes",
      type: "Phone Call",
      status: "Pending"
    },
    {
      mentor: "Anjali Gupta",
      topic: "Product Management Fundamentals",
      date: "Friday, 2:00 PM", 
      duration: "90 minutes",
      type: "Video Call",
      status: "Confirmed"
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
      gradient: "gradient-primary"
    },
    {
      title: "Data Science Career Track",
      description: "Comprehensive program covering ML, analytics, and career guidance",
      duration: "16 weeks", 
      mentors: 6,
      students: 18,
      price: "₹55,000",
      features: ["Real-world projects", "Portfolio building", "Interview preparation", "Industry connections"],
      gradient: "gradient-success"
    },
    {
      title: "Product Management Masterclass",
      description: "Strategic program for aspiring and current product managers",
      duration: "10 weeks",
      mentors: 5,
      students: 15,
      price: "₹40,000", 
      features: ["Case study analysis", "Product strategy workshops", "Leadership training", "Network building"],
      gradient: "bg-gradient-to-br from-warning to-orange-400"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container px-4">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-primary-foreground/10 text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                <Users className="h-4 w-4" />
                <span>Expert Mentorship</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Learn from Industry
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Experts & Mentors
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Get personalized guidance from experienced professionals at top companies. 
                Accelerate your career with 1:1 mentorship and structured programs.
              </p>
            </div>
          </div>
        </section>

        {/* Mentorship Platform */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <Tabs defaultValue="mentors" className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="mentors">Find Mentors</TabsTrigger>
                  <TabsTrigger value="sessions">My Sessions</TabsTrigger>
                  <TabsTrigger value="programs">Programs</TabsTrigger>
                </TabsList>
              </div>

              {/* Find Mentors Tab */}
              <TabsContent value="mentors" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Connect with Industry Experts
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Browse our network of experienced mentors from top companies and book personalized sessions.
                  </p>
                </div>

                {/* Filters */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search by expertise, company, or name..."
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Filter className="mr-2 h-4 w-4" />
                          Filters
                        </Button>
                        <Button variant="outline" size="sm">
                          <MapPin className="mr-2 h-4 w-4" />
                          Location
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="mr-2 h-4 w-4" />
                          Availability
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mentors Grid */}
                <div className="grid lg:grid-cols-2 gap-6">
                  {mentors.map((mentor) => (
                    <Card key={mentor.id} className="group hover:shadow-xl transition-smooth">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentor.avatar} alt={mentor.name} />
                            <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-smooth">
                                  {mentor.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">{mentor.title}</p>
                                <p className="text-sm font-medium text-primary">{mentor.company}</p>
                              </div>
                              <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                                {mentor.availability}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-warning fill-current" />
                                <span>{mentor.rating}</span>
                                <span>({mentor.reviews})</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{mentor.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Briefcase className="h-4 w-4" />
                                <span>{mentor.experience}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        <p className="text-sm text-muted-foreground">{mentor.bio}</p>

                        {/* Expertise */}
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">Expertise</h4>
                          <div className="flex flex-wrap gap-2">
                            {mentor.expertise.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                          <div className="text-center">
                            <div className="text-lg font-bold text-primary">{mentor.sessions}</div>
                            <div className="text-xs text-muted-foreground">Sessions</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-success">{mentor.successStories}</div>
                            <div className="text-xs text-muted-foreground">Success Stories</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-foreground">{mentor.hourlyRate}</div>
                            <div className="text-xs text-muted-foreground">Per hour</div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button className="flex-1 gradient-primary group">
                            Book Session
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* My Sessions Tab */}
              <TabsContent value="sessions" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Your Mentorship Sessions
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Manage your upcoming sessions and track your mentorship journey.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Upcoming Sessions */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <span>Upcoming Sessions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {upcomingSessions.map((session, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-smooth">
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">{session.topic}</h4>
                                  <Badge variant={session.status === "Confirmed" ? "default" : "secondary"}>
                                    {session.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                  with {session.mentor}
                                </p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{session.date}</span>
                                  </div>
                                  <span>{session.duration}</span>
                                  <div className="flex items-center space-x-1">
                                    {session.type === "Video Call" ? 
                                      <Video className="h-4 w-4" /> : 
                                      <Phone className="h-4 w-4" />
                                    }
                                    <span>{session.type}</span>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                Join
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Session History */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-success" />
                          <span>Completed Sessions</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {[
                            { mentor: "Priya Sharma", topic: "React Best Practices", date: "2 days ago", rating: 5 },
                            { mentor: "Rohit Patel", topic: "Data Science Career Path", date: "1 week ago", rating: 5 },
                            { mentor: "Anjali Gupta", topic: "Product Interview Prep", date: "2 weeks ago", rating: 4 }
                          ].map((session, index) => (
                            <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                              <div>
                                <h4 className="font-medium text-sm">{session.topic}</h4>
                                <p className="text-xs text-muted-foreground">
                                  with {session.mentor} • {session.date}
                                </p>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(session.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-warning fill-current" />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress Sidebar */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Your Progress</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">12</div>
                          <div className="text-sm text-muted-foreground">Total Sessions</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span>Skills Learned</span>
                            <span className="font-semibold">18</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Average Rating</span>
                            <span className="font-semibold">4.8/5</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Career Goals</span>
                            <span className="font-semibold">75% Complete</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Quick Actions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <Button className="w-full justify-start gradient-primary" size="sm">
                          <Users className="mr-2 h-4 w-4" />
                          Find New Mentor
                        </Button>
                        <Button className="w-full justify-start" variant="outline" size="sm">
                          <Calendar className="mr-2 h-4 w-4" />
                          Schedule Session
                        </Button>
                        <Button className="w-full justify-start" variant="outline" size="sm">
                          <Target className="mr-2 h-4 w-4" />
                          Update Goals
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Structured Mentorship Programs
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive programs designed to fast-track your career with structured learning and mentorship.
                  </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {mentorshipPrograms.map((program, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-smooth">
                      <CardHeader className="space-y-4">
                        <div className={`w-12 h-12 rounded-lg ${program.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                          <GraduationCap className="h-6 w-6 text-primary-foreground" />
                        </div>
                        
                        <div>
                          <CardTitle className="group-hover:text-primary transition-smooth">
                            {program.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {program.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Program Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-primary">{program.duration}</div>
                            <div className="text-xs text-muted-foreground">Duration</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-success">{program.mentors}</div>
                            <div className="text-xs text-muted-foreground">Mentors</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-warning">{program.students}</div>
                            <div className="text-xs text-muted-foreground">Students</div>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold">What's Included</h4>
                          <div className="space-y-2">
                            {program.features.map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Price and CTA */}
                        <div className="space-y-4 pt-4 border-t">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">{program.price}</div>
                            <div className="text-sm text-muted-foreground">One-time payment</div>
                          </div>
                          
                          <Button className={`w-full ${program.gradient} group`}>
                            Enroll Now
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center space-y-6 bg-gradient-card rounded-2xl p-8 border">
                  <h3 className="text-2xl font-bold text-foreground">
                    Can't Find the Right Program?
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    We offer custom mentorship programs tailored to your specific career goals and learning needs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gradient-success">
                      <Users className="mr-2 h-5 w-5" />
                      Design Custom Program
                    </Button>
                    <Button size="lg" variant="outline">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Talk to Advisor
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Mentorship;