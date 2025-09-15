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
  Plus
} from "lucide-react";

const Dashboard = () => {
  return (
    <>
    <Header/>
    
    <section id="dashboard" className="py-8 bg-muted/30">
      <div className="container px-4">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Your Personalized Career Dashboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your progress, discover opportunities, and manage your career journey all in one place.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Career Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  <span>Career Progress</span>
                </CardTitle>
                <CardDescription>
                  Your journey towards becoming a Full Stack Developer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Overall Progress</span>
                    <span className="text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Technical Skills</div>
                    <Progress value={75} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">75%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Experience</div>
                    <Progress value={45} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">45%</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Portfolio</div>
                    <Progress value={85} className="h-1.5" />
                    <div className="text-xs text-muted-foreground">85%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-success" />
                  <span>Recommended Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Complete React Advanced Course",
                      description: "Master advanced React concepts to boost your frontend skills",
                      priority: "High",
                      timeEstimate: "2 weeks",
                      type: "Learning"
                    },
                    {
                      title: "Build a Full Stack Project",
                      description: "Showcase your skills with a complete web application",
                      priority: "Medium",
                      timeEstimate: "3 weeks",
                      type: "Project"
                    },
                    {
                      title: "Update Your Resume",
                      description: "Add your latest projects and optimize for ATS",
                      priority: "High",
                      timeEstimate: "2 hours",
                      type: "Profile"
                    }
                  ].map((action, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-smooth">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{action.title}</h4>
                          <Badge variant={action.priority === "High" ? "destructive" : "secondary"}>
                            {action.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{action.timeEstimate}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {action.type}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-sm">Skills Acquired</span>
                  </div>
                  <span className="font-semibold">24</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-success" />
                    <span className="text-sm">Projects Completed</span>
                  </div>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-warning" />
                    <span className="text-sm">Mentor Sessions</span>
                  </div>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm">Job Applications</span>
                  </div>
                  <span className="font-semibold">45</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Upcoming Events</span>
                  <Button size="sm" variant="ghost">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Mentor Session",
                    time: "Today, 3:00 PM",
                    type: "Meeting",
                    color: "bg-primary/10 text-primary"
                  },
                  {
                    title: "React Workshop",
                    time: "Tomorrow, 10:00 AM",
                    type: "Learning",
                    color: "bg-success/10 text-success"
                  },
                  {
                    title: "Job Interview",
                    time: "Friday, 2:00 PM",
                    type: "Interview",
                    color: "bg-warning/10 text-warning"
                  }
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className={`w-2 h-2 rounded-full ${event.color.split(' ')[0]}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground">{event.time}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {event.type}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Start Learning Path
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Book Mentor Session
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Take Skills Assessment
                </Button>
                <Button className="w-full justify-start gradient-primary">
                  <Calendar className="mr-2 h-4 w-4" />
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