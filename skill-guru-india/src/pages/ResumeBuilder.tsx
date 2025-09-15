import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  FileText,
  Wand2,
  Download,
  Eye,
  Share,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  Plus,
  Edit3,
  Copy,
  Star
} from "lucide-react";

const ResumeBuilder = () => {
  const resumeTemplates = [
    {
      id: 1,
      name: "Professional Classic",
      description: "Clean, traditional layout perfect for corporate roles",
      thumbnail: "bg-gradient-to-br from-slate-100 to-slate-200",
      atsScore: 95,
      category: "Corporate",
      popularity: "Most Popular"
    },
    {
      id: 2,
      name: "Modern Tech",
      description: "Contemporary design ideal for tech and startup positions",
      thumbnail: "bg-gradient-to-br from-blue-100 to-indigo-200",
      atsScore: 92,
      category: "Technology",
      popularity: "Trending"
    },
    {
      id: 3,
      name: "Creative Designer",
      description: "Stylish template for creative and design professionals",
      thumbnail: "bg-gradient-to-br from-purple-100 to-pink-200",
      atsScore: 88,
      category: "Creative",
      popularity: "New"
    },
    {
      id: 4,
      name: "Executive Premium",
      description: "Sophisticated layout for senior management roles",
      thumbnail: "bg-gradient-to-br from-gold-100 to-yellow-200",
      atsScore: 97,
      category: "Executive",
      popularity: "Premium"
    }
  ];

  const aiSuggestions = [
    {
      section: "Professional Summary",
      suggestion: "Add quantifiable achievements to make your summary more impactful",
      impact: "High",
      example: "Increased team productivity by 35% through process optimization"
    },
    {
      section: "Skills Section",
      suggestion: "Include trending technologies relevant to your target role",
      impact: "Medium",
      example: "Add React, TypeScript, and AWS to match job requirements"
    },
    {
      section: "Work Experience",
      suggestion: "Use action verbs and include specific metrics for each role",
      impact: "High",
      example: "Led cross-functional team of 8 developers, delivering 12 features on time"
    },
    {
      section: "Education",
      suggestion: "Highlight relevant coursework and academic projects",
      impact: "Medium",
      example: "Include Machine Learning specialization and final year project details"
    }
  ];

  const resumeStats = {
    atsScore: 87,
    completeness: 78,
    keywordMatch: 92,
    readabilityScore: 89
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-primary";
    if (score >= 50) return "text-warning";
    return "text-destructive";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-destructive";
      case "Medium": return "text-warning";
      case "Low": return "text-success";
      default: return "text-muted-foreground";
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
                <Wand2 className="h-4 w-4" />
                <span>AI-Powered Resume Builder</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Create Professional
                <span className="block gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  ATS-Optimized Resumes
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Build stunning resumes with AI-powered content suggestions, 
                ATS optimization, and professional templates tailored for Indian job market.
              </p>
            </div>
          </div>
        </section>

        {/* Resume Builder Interface */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <Tabs defaultValue="builder" className="space-y-8">
              <div className="text-center">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
                  <TabsTrigger value="builder">Builder</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                  <TabsTrigger value="analysis">Analysis</TabsTrigger>
                </TabsList>
              </div>

              {/* Builder Tab */}
              <TabsContent value="builder" className="space-y-8">
                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Left Panel - Resume Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Current Resume Stats */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-primary" />
                          <span>Resume Performance</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className={`text-2xl font-bold ${getScoreColor(resumeStats.atsScore)}`}>
                              {resumeStats.atsScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">ATS Score</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className={`text-2xl font-bold ${getScoreColor(resumeStats.completeness)}`}>
                              {resumeStats.completeness}%
                            </div>
                            <div className="text-xs text-muted-foreground">Complete</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className={`text-2xl font-bold ${getScoreColor(resumeStats.keywordMatch)}`}>
                              {resumeStats.keywordMatch}%
                            </div>
                            <div className="text-xs text-muted-foreground">Keywords</div>
                          </div>
                          <div className="text-center p-4 rounded-lg bg-muted/50">
                            <div className={`text-2xl font-bold ${getScoreColor(resumeStats.readabilityScore)}`}>
                              {resumeStats.readabilityScore}%
                            </div>
                            <div className="text-xs text-muted-foreground">Readability</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* AI Suggestions */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Sparkles className="h-5 w-5 text-primary" />
                          <span>AI Suggestions</span>
                        </CardTitle>
                        <CardDescription>
                          Personalized recommendations to improve your resume
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {aiSuggestions.map((suggestion, index) => (
                            <div key={index} className="flex items-start space-x-4 p-4 rounded-lg border bg-card/50 hover:bg-card transition-smooth">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center space-x-2">
                                  <h4 className="font-medium">{suggestion.section}</h4>
                                  <Badge variant={suggestion.impact === "High" ? "destructive" : suggestion.impact === "Medium" ? "default" : "secondary"}>
                                    {suggestion.impact} Impact
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{suggestion.suggestion}</p>
                                <div className="text-xs text-primary bg-primary/10 p-2 rounded">
                                  💡 {suggestion.example}
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Wand2 className="h-4 w-4 mr-2" />
                                  Apply AI Fix
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Resume Sections */}
                    <div className="space-y-4">
                      {[
                        { name: "Personal Information", status: "complete", icon: CheckCircle },
                        { name: "Professional Summary", status: "needs-work", icon: AlertCircle },
                        { name: "Work Experience", status: "complete", icon: CheckCircle },
                        { name: "Skills", status: "needs-work", icon: AlertCircle },
                        { name: "Education", status: "complete", icon: CheckCircle },
                        { name: "Projects", status: "missing", icon: Plus },
                        { name: "Certifications", status: "missing", icon: Plus }
                      ].map((section, index) => {
                        const IconComponent = section.icon;
                        return (
                          <Card key={index} className="hover:shadow-md transition-smooth">
                            <CardContent className="flex items-center justify-between p-4">
                              <div className="flex items-center space-x-3">
                                <IconComponent className={`h-5 w-5 ${
                                  section.status === 'complete' ? 'text-success' :
                                  section.status === 'needs-work' ? 'text-warning' : 'text-muted-foreground'
                                }`} />
                                <span className="font-medium">{section.name}</span>
                                {section.status === 'needs-work' && (
                                  <Badge variant="outline" className="text-xs">Needs Improvement</Badge>
                                )}
                                {section.status === 'missing' && (
                                  <Badge variant="outline" className="text-xs">Not Added</Badge>
                                )}
                              </div>
                              <Button size="sm" variant="ghost">
                                <Edit3 className="h-4 w-4" />
                              </Button>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Panel - Resume Preview */}
                  <div className="space-y-6">
                    <Card className="sticky top-24">
                      <CardHeader>
                        <CardTitle className="text-lg">Resume Preview</CardTitle>
                        <CardDescription>Professional Classic Template</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Mock Resume Preview */}
                        <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                          <div className="text-center space-y-2">
                            <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
                            <p className="text-sm text-muted-foreground">Resume Preview</p>
                            <p className="text-xs text-muted-foreground">Real-time updates as you edit</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button className="w-full gradient-primary">
                            <Download className="mr-2 h-4 w-4" />
                            Download PDF
                          </Button>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Templates Tab */}
              <TabsContent value="templates" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Professional Resume Templates
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Choose from our collection of ATS-optimized templates designed specifically for the Indian job market.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {resumeTemplates.map((template) => (
                    <Card key={template.id} className="group hover:shadow-xl transition-smooth">
                      <CardHeader className="space-y-4">
                        <div className={`aspect-[8.5/11] rounded-lg ${template.thumbnail} border flex items-end p-4`}>
                          <div className="w-full">
                            <div className="bg-white/90 backdrop-blur-sm rounded p-2 text-center">
                              <div className="text-xs font-semibold">{template.name}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold group-hover:text-primary transition-smooth">
                              {template.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {template.popularity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">ATS: {template.atsScore}%</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1 gradient-primary group" size="sm">
                            Use Template
                            <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Analysis Tab */}
              <TabsContent value="analysis" className="space-y-8">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                    Resume Analysis & Optimization
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Get detailed insights and recommendations to make your resume stand out to recruiters and ATS systems.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* ATS Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5 text-primary" />
                        <span>ATS Compatibility</span>
                      </CardTitle>
                      <CardDescription>
                        How well your resume performs with Applicant Tracking Systems
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-success mb-2">87%</div>
                        <div className="text-sm text-muted-foreground">ATS Compatibility Score</div>
                      </div>

                      <div className="space-y-4">
                        {[
                          { metric: "Format Compatibility", score: 95, status: "excellent" },
                          { metric: "Keyword Optimization", score: 85, status: "good" },
                          { metric: "Section Structure", score: 90, status: "excellent" },
                          { metric: "Content Density", score: 75, status: "needs-work" }
                        ].map((item, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{item.metric}</span>
                              <span className={getScoreColor(item.score)}>{item.score}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${
                                  item.score >= 90 ? 'bg-success' :
                                  item.score >= 70 ? 'bg-primary' : 'bg-warning'
                                }`}
                                style={{ width: `${item.score}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Keywords Analysis */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Sparkles className="h-5 w-5 text-success" />
                        <span>Keyword Analysis</span>
                      </CardTitle>
                      <CardDescription>
                        Keywords matching your target role: Full Stack Developer
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">12/15</div>
                        <div className="text-sm text-muted-foreground">Keywords Found</div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-success">Present Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST API", "HTML", "CSS"].map((keyword, index) => (
                              <Badge key={index} className="bg-success/10 text-success border-success/20">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-3 text-warning">Missing Keywords</h4>
                          <div className="flex flex-wrap gap-2">
                            {["TypeScript", "AWS", "Docker"].map((keyword, index) => (
                              <Badge key={index} className="bg-warning/10 text-warning border-warning/20">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <Button className="w-full gradient-success">
                        <Wand2 className="mr-2 h-4 w-4" />
                        Auto-Add Missing Keywords
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom CTA */}
                <div className="text-center space-y-6 bg-gradient-card rounded-2xl p-8 border">
                  <h3 className="text-2xl font-bold text-foreground">
                    Ready to Optimize Your Resume?
                  </h3>
                  <p className="text-muted-foreground max-w-xl mx-auto">
                    Let our AI help you create a resume that gets noticed by both recruiters and ATS systems.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gradient-primary">
                      <Wand2 className="mr-2 h-5 w-5" />
                      Optimize with AI
                    </Button>
                    <Button size="lg" variant="outline">
                      <Copy className="mr-2 h-5 w-5" />
                      Create New Resume
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

export default ResumeBuilder;