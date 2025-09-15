import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Brain,
  Target,
  TrendingUp,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Star,
  PlayCircle,
  FileText,
  Users,
  Zap
} from "lucide-react";

const SkillsAnalysis = () => {
  const skillCategories = [
    {
      name: "Technical Skills",
      overall: 75,
      skills: [
        { name: "JavaScript", level: 85, status: "strong", trend: "up" },
        { name: "React", level: 80, status: "strong", trend: "up" },
        { name: "Node.js", level: 70, status: "good", trend: "stable" },
        { name: "Python", level: 45, status: "gap", trend: "down" },
        { name: "TypeScript", level: 35, status: "gap", trend: "down" },
        { name: "AWS", level: 25, status: "critical", trend: "down" }
      ]
    },
    {
      name: "Soft Skills",
      overall: 68,
      skills: [
        { name: "Communication", level: 78, status: "good", trend: "up" },
        { name: "Leadership", level: 65, status: "good", trend: "stable" },
        { name: "Problem Solving", level: 82, status: "strong", trend: "up" },
        { name: "Team Collaboration", level: 70, status: "good", trend: "up" },
        { name: "Time Management", level: 55, status: "gap", trend: "stable" },
        { name: "Presentation", level: 45, status: "gap", trend: "down" }
      ]
    },
    {
      name: "Industry Knowledge",
      overall: 60,
      skills: [
        { name: "Agile Methodology", level: 70, status: "good", trend: "up" },
        { name: "DevOps", level: 40, status: "gap", trend: "stable" },
        { name: "System Design", level: 35, status: "gap", trend: "down" },
        { name: "Database Design", level: 75, status: "strong", trend: "up" },
        { name: "Security Best Practices", level: 30, status: "critical", trend: "down" },
        { name: "Testing", level: 65, status: "good", trend: "stable" }
      ]
    }
  ];

  const learningPaths = [
    {
      title: "Python for Full Stack Development",
      description: "Bridge your Python knowledge gap with hands-on projects",
      priority: "High",
      duration: "4 weeks",
      modules: 8,
      skillsGained: ["Python", "Django", "Flask", "API Development"],
      difficulty: "Intermediate",
      rating: 4.8,
      gradient: "gradient-primary"
    },
    {
      title: "AWS Cloud Fundamentals",
      description: "Learn cloud computing essentials for modern development",
      priority: "High", 
      duration: "6 weeks",
      modules: 12,
      skillsGained: ["AWS", "EC2", "S3", "Lambda", "RDS"],
      difficulty: "Beginner",
      rating: 4.9,
      gradient: "bg-gradient-to-br from-warning to-orange-400"
    },
    {
      title: "Advanced TypeScript",
      description: "Master type-safe JavaScript for better code quality",
      priority: "Medium",
      duration: "3 weeks", 
      modules: 6,
      skillsGained: ["TypeScript", "Advanced Types", "Generics", "Decorators"],
      difficulty: "Advanced",
      rating: 4.7,
      gradient: "gradient-success"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "strong": return "text-success";
      case "good": return "text-primary";
      case "gap": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "strong": return <Badge className="bg-success/10 text-success border-success/20">Strong</Badge>;
      case "good": return <Badge className="bg-primary/10 text-primary border-primary/20">Good</Badge>;
      case "gap": return <Badge className="bg-warning/10 text-warning border-warning/20">Gap</Badge>;
      case "critical": return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Critical</Badge>;
      default: return null;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-4 w-4 text-success" />;
      case "down": return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      case "stable": return <div className="w-4 h-4 rounded-full bg-muted-foreground/50" />;
      default: return null;
    }
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
                <span>AI Skills Assessment</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Analyze & Improve
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Your Skills
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Get detailed insights into your skill levels, identify gaps, and receive 
                personalized learning recommendations to accelerate your career growth.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Analysis */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <Tabs defaultValue="overview" className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed</TabsTrigger>
                  <TabsTrigger value="learning">Learning Paths</TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Your Skills Overview
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Based on your profile, projects, and assessments, here's your comprehensive skills analysis.
                  </p>
                </div>

                {/* Overall Score */}
                <Card className="max-w-2xl mx-auto">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Overall Skills Score</CardTitle>
                    <CardDescription>Your comprehensive skill assessment across all categories</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-6xl font-bold text-primary mb-2">68</div>
                      <div className="text-lg text-muted-foreground">out of 100</div>
                    </div>
                    <Progress value={68} className="h-4" />
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-success">8</div>
                        <div className="text-sm text-muted-foreground">Strong Skills</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-warning">6</div>
                        <div className="text-sm text-muted-foreground">Skill Gaps</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-destructive">4</div>
                        <div className="text-sm text-muted-foreground">Critical Areas</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Overview */}
                <div className="grid md:grid-cols-3 gap-6">
                  {skillCategories.map((category, index) => (
                    <Card key={index} className="hover:shadow-lg transition-smooth">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span>{category.name}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <div className={`text-3xl font-bold ${getStatusColor(category.overall >= 80 ? 'strong' : category.overall >= 60 ? 'good' : 'gap')}`}>
                            {category.overall}%
                          </div>
                        </div>
                        <Progress value={category.overall} className="h-2" />
                        <div className="space-y-2">
                          {category.skills.slice(0, 3).map((skill, skillIndex) => (
                            <div key={skillIndex} className="flex justify-between items-center text-sm">
                              <span>{skill.name}</span>
                              <div className="flex items-center space-x-2">
                                <span className={getStatusColor(skill.status)}>{skill.level}%</span>
                                {getTrendIcon(skill.trend)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Detailed Tab */}
              <TabsContent value="detailed" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Detailed Skills Breakdown
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive analysis of each skill with actionable insights and recommendations.
                  </p>
                </div>

                {skillCategories.map((category, categoryIndex) => (
                  <Card key={categoryIndex}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span>{category.name}</span>
                        </div>
                        <Badge variant="outline">{category.overall}% Overall</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="flex items-center space-x-4 p-4 rounded-lg border bg-card/50">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium">{skill.name}</h4>
                                <div className="flex items-center space-x-2">
                                  {getStatusBadge(skill.status)}
                                  {getTrendIcon(skill.trend)}
                                </div>
                              </div>
                              <Progress value={skill.level} className="h-2 mb-2" />
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>Current Level: {skill.level}%</span>
                                <span>Industry Avg: 75%</span>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <BookOpen className="h-4 w-4 mr-2" />
                              Learn
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              {/* Learning Paths Tab */}
              <TabsContent value="learning" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Personalized Learning Paths
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    AI-curated learning paths designed specifically to address your skill gaps and career goals.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {learningPaths.map((path, index) => (
                    <Card key={index} className="group hover:shadow-xl transition-smooth">
                      <CardHeader className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className={`w-12 h-12 rounded-lg ${path.gradient} flex items-center justify-center group-hover:scale-110 transition-bounce`}>
                            <BookOpen className="h-6 w-6 text-primary-foreground" />
                          </div>
                          <Badge variant={path.priority === "High" ? "destructive" : "secondary"}>
                            {path.priority} Priority
                          </Badge>
                        </div>
                        
                        <div>
                          <CardTitle className="group-hover:text-primary transition-smooth">
                            {path.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            {path.description}
                          </CardDescription>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Course Details */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center space-x-2 text-sm">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{path.duration}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{path.modules} Modules</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            <span>{path.difficulty}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm">
                            <Star className="h-4 w-4 text-warning" />
                            <span>{path.rating}/5.0</span>
                          </div>
                        </div>

                        {/* Skills You'll Gain */}
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold">Skills You'll Gain</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skillsGained.map((skill, skillIndex) => (
                              <Badge key={skillIndex} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button className="flex-1 gradient-primary group">
                            Start Learning
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <PlayCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center space-y-6 bg-gradient-card rounded-2xl p-8 border">
                  <h3 className="text-2xl font-bold text-foreground">
                    Ready to Bridge Your Skill Gaps?
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Take action on your skill development with our personalized learning paths and expert guidance.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gradient-success">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Create Learning Plan
                    </Button>
                    <Button size="lg" variant="outline">
                      <Users className="mr-2 h-5 w-5" />
                      Get Expert Guidance
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

export default SkillsAnalysis;