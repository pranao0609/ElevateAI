import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
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
      popularity: "Most Popular",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      id: 2,
      name: "Modern Tech",
      description: "Contemporary design ideal for tech and startup positions",
      thumbnail: "bg-gradient-to-br from-blue-100 to-indigo-200",
      atsScore: 92,
      category: "Technology",
      popularity: "Trending",
      gradient: "from-green-500 to-green-600"
    },
    {
      id: 3,
      name: "Creative Designer",
      description: "Stylish template for creative and design professionals",
      thumbnail: "bg-gradient-to-br from-purple-100 to-pink-200",
      atsScore: 88,
      category: "Creative",
      popularity: "New",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Executive Premium",
      description: "Sophisticated layout for senior management roles",
      thumbnail: "bg-gradient-to-br from-yellow-100 to-orange-200",
      atsScore: 97,
      category: "Executive",
      popularity: "Premium",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const aiSuggestions = [
    {
      section: "Professional Summary",
      suggestion: "Add quantifiable achievements to make your summary more impactful",
      impact: "High",
      example: "Increased team productivity by 35% through process optimization",
      icon: "psychology"
    },
    {
      section: "Skills Section",
      suggestion: "Include trending technologies relevant to your target role",
      impact: "Medium",
      example: "Add React, TypeScript, and AWS to match job requirements",
      icon: "code"
    },
    {
      section: "Work Experience",
      suggestion: "Use action verbs and include specific metrics for each role",
      impact: "High",
      example: "Led cross-functional team of 8 developers, delivering 12 features on time",
      icon: "work"
    },
    {
      section: "Education",
      suggestion: "Highlight relevant coursework and academic projects",
      impact: "Medium",
      example: "Include Machine Learning specialization and final year project details",
      icon: "school"
    }
  ];

  const resumeStats = {
    atsScore: 87,
    completeness: 78,
    keywordMatch: 92,
    readabilityScore: 89
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-700 border-green-200";
    if (score >= 70) return "bg-blue-100 text-blue-700 border-blue-200";
    if (score >= 50) return "bg-yellow-100 text-yellow-700 border-yellow-200";
    return "bg-red-100 text-red-700 border-red-200";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
                  <span className="material-icons text-base">auto_awesome</span>
                  <span style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    AI-Powered Resume Builder
                  </span>
                </div>

                <h1 
                  className="text-5xl lg:text-7xl font-normal text-gray-900 leading-tight"
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  Create Professional
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent font-medium mt-2">
                    ATS-Optimized Resumes
                  </span>
                </h1>

                <p 
                  className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                  style={{ fontFamily: 'Roboto, sans-serif' }}
                >
                  Build stunning resumes with AI-powered content suggestions, 
                  ATS optimization, and professional templates tailored for the 
                  <span className="font-medium text-blue-600"> Indian job market</span>.
                </p>
              </div>
            </div>
          </section>

          {/* Resume Builder Interface */}
          <section className="py-20 bg-white">
            <div className="container px-6 lg:px-8">
              <Tabs defaultValue="builder" className="space-y-8">
                <div className="text-center">
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-gray-100 p-1 rounded-full">
                    <TabsTrigger 
                      value="builder"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <span className="material-icons mr-2 text-base">build</span>
                      Builder
                    </TabsTrigger>
                    <TabsTrigger 
                      value="templates"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <span className="material-icons mr-2 text-base">dashboard</span>
                      Templates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analysis"
                      className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <span className="material-icons mr-2 text-base">analytics</span>
                      Analysis
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Builder Tab */}
                <TabsContent value="builder" className="space-y-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Panel - Resume Content */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Current Resume Stats */}
                      <Card className="border-0 rounded-3xl shadow-lg bg-white">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                              <span className="material-icons text-white text-xl">gps_fixed</span>
                            </div>
                            <span>Resume Performance</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                              { label: "ATS Score", value: resumeStats.atsScore, icon: "radar" },
                              { label: "Complete", value: resumeStats.completeness, icon: "check_circle" },
                              { label: "Keywords", value: resumeStats.keywordMatch, icon: "key" },
                              { label: "Readability", value: resumeStats.readabilityScore, icon: "visibility" }
                            ].map((stat, index) => (
                              <div key={index} className="text-center p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-200">
                                <div className="flex items-center justify-center mb-2">
                                  <span className={`material-icons text-lg ${getScoreColor(stat.value)}`}>
                                    {stat.icon}
                                  </span>
                                </div>
                                <div 
                                  className={`text-3xl font-bold mb-1 ${getScoreColor(stat.value)}`}
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {stat.value}%
                                </div>
                                <div 
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                  {stat.label}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* AI Suggestions */}
                      <Card className="border-0 rounded-3xl shadow-lg bg-white">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                              <span className="material-icons text-white text-xl">auto_awesome</span>
                            </div>
                            <span>AI Suggestions</span>
                          </CardTitle>
                          <CardDescription 
                            className="text-lg text-gray-600 mt-2"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Personalized recommendations to improve your resume
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                          <div className="space-y-6">
                            {aiSuggestions.map((suggestion, index) => (
                              <div key={index} className="group flex items-start space-x-4 p-6 rounded-2xl border border-gray-100 bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${
                                  suggestion.impact === 'High' ? 'from-red-500 to-red-600' :
                                  suggestion.impact === 'Medium' ? 'from-yellow-500 to-orange-500' :
                                  'from-green-500 to-green-600'
                                } shadow-md group-hover:shadow-lg transition-all duration-300`}>
                                  <span className="material-icons text-white">
                                    {suggestion.icon}
                                  </span>
                                </div>
                                
                                <div className="flex-1 space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <h4 
                                      className="font-medium text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300"
                                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                                    >
                                      {suggestion.section}
                                    </h4>
                                    <Badge className={`rounded-full px-3 py-1 font-medium border ${getImpactColor(suggestion.impact)}`}>
                                      {suggestion.impact} Impact
                                    </Badge>
                                  </div>
                                  
                                  <p 
                                    className="text-gray-600 leading-relaxed"
                                    style={{ fontFamily: 'Roboto, sans-serif' }}
                                  >
                                    {suggestion.suggestion}
                                  </p>
                                  
                                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
                                    <div className="flex items-start space-x-2">
                                      <span className="material-icons text-blue-600 text-lg">lightbulb</span>
                                      <span 
                                        className="text-blue-700 text-sm leading-relaxed"
                                        style={{ fontFamily: 'Roboto, sans-serif' }}
                                      >
                                        {suggestion.example}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                
                                <Button 
                                  size="sm" 
                                  className="h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  <span className="material-icons mr-2 text-sm">auto_fix_high</span>
                                  Apply AI Fix
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Resume Sections */}
                      <div className="space-y-4">
                        {[
                          { name: "Personal Information", status: "complete", icon: "person", color: "text-green-600" },
                          { name: "Professional Summary", status: "needs-work", icon: "psychology", color: "text-yellow-600" },
                          { name: "Work Experience", status: "complete", icon: "work", color: "text-green-600" },
                          { name: "Skills", status: "needs-work", icon: "code", color: "text-yellow-600" },
                          { name: "Education", status: "complete", icon: "school", color: "text-green-600" },
                          { name: "Projects", status: "missing", icon: "folder", color: "text-gray-500" },
                          { name: "Certifications", status: "missing", icon: "verified", color: "text-gray-500" }
                        ].map((section, index) => (
                          <Card key={index} className="border border-gray-200 rounded-2xl hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                            <CardContent className="flex items-center justify-between p-6">
                              <div className="flex items-center space-x-4">
                                <span className={`material-icons text-xl ${section.color}`}>
                                  {section.icon}
                                </span>
                                <div>
                                  <span 
                                    className="font-medium text-gray-900 text-lg"
                                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                                  >
                                    {section.name}
                                  </span>
                                  {section.status === 'needs-work' && (
                                    <Badge className="ml-3 bg-yellow-100 text-yellow-700 border-yellow-200 rounded-full px-3 py-1 text-xs font-medium">
                                      Needs Improvement
                                    </Badge>
                                  )}
                                  {section.status === 'missing' && (
                                    <Badge className="ml-3 bg-gray-100 text-gray-700 border-gray-200 rounded-full px-3 py-1 text-xs font-medium">
                                      Not Added
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                className="h-10 w-10 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                              >
                                <span className="material-icons">edit</span>
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Right Panel - Resume Preview */}
                    <div className="space-y-6">
                      <Card className="sticky top-24 border-0 rounded-3xl shadow-lg bg-white">
                        <CardHeader className="p-8">
                          <CardTitle 
                            className="text-xl font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            Resume Preview
                          </CardTitle>
                          <CardDescription 
                            className="text-gray-600"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Professional Classic Template
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 p-8 pt-0">
                          {/* Mock Resume Preview */}
                          <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
                            <div className="text-center space-y-3">
                              <div className="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center">
                                <span className="material-icons text-blue-600 text-2xl">description</span>
                              </div>
                              <div>
                                <p 
                                  className="font-medium text-gray-700 text-lg"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  Resume Preview
                                </p>
                                <p 
                                  className="text-sm text-gray-500 mt-1"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                  Real-time updates as you edit
                                </p>
                              </div>
                            </div>
                            
                            {/* Decorative elements */}
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-200/30" />
                            <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-green-200/30" />
                          </div>

                          {/* Action Buttons */}
                          <div className="space-y-3">
                            <Button 
                              className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              <span className="material-icons mr-3">download</span>
                              Download PDF
                            </Button>
                            <div className="grid grid-cols-2 gap-3">
                              <Button 
                                variant="outline" 
                                className="h-10 rounded-full border-2 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                <span className="material-icons mr-2 text-base">visibility</span>
                                Preview
                              </Button>
                              <Button 
                                variant="outline" 
                                className="h-10 rounded-full border-2 border-gray-300 hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-300"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                <span className="material-icons mr-2 text-base">share</span>
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
                  <div className="text-center space-y-6 mb-16">
                    <h2 
                      className="text-4xl lg:text-5xl font-normal text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Professional Resume Templates
                    </h2>
                    <p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Choose from our collection of <span className="font-medium text-blue-600">ATS-optimized templates</span> designed 
                      specifically for the Indian job market.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {resumeTemplates.map((template) => (
                      <Card key={template.id} className="group border-0 rounded-3xl shadow-lg bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                        <CardHeader className="space-y-6 p-8">
                          <div className={`aspect-[8.5/11] rounded-2xl ${template.thumbnail} border border-gray-200 flex items-end p-6 relative overflow-hidden`}>
                            <div className="w-full relative z-10">
                              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 text-center shadow-sm">
                                <div 
                                  className="text-sm font-medium text-gray-900"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {template.name}
                                </div>
                              </div>
                            </div>
                            {/* Decorative gradient overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${template.gradient} opacity-10`} />
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h3 
                                className="font-medium text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {template.name}
                              </h3>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 rounded-full px-3 py-1 text-xs font-medium">
                                {template.popularity}
                              </Badge>
                            </div>
                            <p 
                              className="text-gray-600 leading-relaxed"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {template.description}
                            </p>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-6 p-8 pt-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="material-icons text-green-600">trending_up</span>
                              <span 
                                className="text-sm font-medium text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                ATS: {template.atsScore}%
                              </span>
                            </div>
                            <Badge className="bg-gray-100 text-gray-700 border-gray-200 rounded-full px-3 py-1 text-xs font-medium">
                              {template.category}
                            </Badge>
                          </div>

                          <div className="flex space-x-3">
                            <Button 
                              className={`flex-1 h-12 bg-gradient-to-r ${template.gradient} hover:shadow-lg text-white rounded-full shadow-md transition-all duration-300 group`}
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              Use Template
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </Button>
                            <Button 
                              variant="outline" 
                              className="h-12 w-12 rounded-full border-2 border-gray-300 hover:bg-gray-50 transition-all duration-300"
                            >
                              <span className="material-icons">visibility</span>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                {/* Analysis Tab */}
                <TabsContent value="analysis" className="space-y-8">
                  <div className="text-center space-y-6 mb-16">
                    <h2 
                      className="text-4xl lg:text-5xl font-normal text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Resume Analysis & Optimization
                    </h2>
                    <p 
                      className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Get detailed insights and recommendations to make your resume stand out to 
                      <span className="font-medium text-blue-600"> recruiters and ATS systems</span>.
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* ATS Analysis */}
                    <Card className="border-0 rounded-3xl shadow-lg bg-white">
                      <CardHeader className="p-8">
                        <CardTitle 
                          className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                            <span className="material-icons text-white text-xl">gps_fixed</span>
                          </div>
                          <span>ATS Compatibility</span>
                        </CardTitle>
                        <CardDescription 
                          className="text-lg text-gray-600 mt-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          How well your resume performs with Applicant Tracking Systems
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8 p-8 pt-0">
                        <div className="text-center">
                          <div 
                            className="text-5xl font-bold text-green-600 mb-3"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            87%
                          </div>
                          <div 
                            className="text-gray-500"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            ATS Compatibility Score
                          </div>
                        </div>

                        <div className="space-y-6">
                          {[
                            { metric: "Format Compatibility", score: 95, status: "excellent" },
                            { metric: "Keyword Optimization", score: 85, status: "good" },
                            { metric: "Section Structure", score: 90, status: "excellent" },
                            { metric: "Content Density", score: 75, status: "needs-work" }
                          ].map((item, index) => (
                            <div key={index} className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span 
                                  className="font-medium text-gray-900"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {item.metric}
                                </span>
                                <span className={`font-bold ${getScoreColor(item.score)}`}>
                                  {item.score}%
                                </span>
                              </div>
                              <div className="relative">
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                  <div 
                                    className={`h-3 rounded-full transition-all duration-500 ${
                                      item.score >= 90 ? 'bg-green-500' :
                                      item.score >= 70 ? 'bg-blue-500' : 'bg-yellow-500'
                                    }`}
                                    style={{ width: `${item.score}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Keywords Analysis */}
                    <Card className="border-0 rounded-3xl shadow-lg bg-white">
                      <CardHeader className="p-8">
                        <CardTitle 
                          className="flex items-center space-x-3 text-2xl font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                            <span className="material-icons text-white text-xl">key</span>
                          </div>
                          <span>Keyword Analysis</span>
                        </CardTitle>
                        <CardDescription 
                          className="text-lg text-gray-600 mt-2"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          Keywords matching your target role: <span className="font-medium text-blue-600">Full Stack Developer</span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-8 p-8 pt-0">
                        <div className="text-center">
                          <div 
                            className="text-5xl font-bold text-blue-600 mb-3"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            12/15
                          </div>
                          <div 
                            className="text-gray-500"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Keywords Found
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div>
                            <h4 
                              className="text-lg font-medium mb-4 text-green-600 flex items-center"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              <span className="material-icons mr-2">check_circle</span>
                              Present Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {["JavaScript", "React", "Node.js", "MongoDB", "Git", "REST API", "HTML", "CSS"].map((keyword, index) => (
                                <Badge key={index} className="bg-green-100 text-green-700 border-green-200 rounded-full px-3 py-1 text-sm font-medium">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 
                              className="text-lg font-medium mb-4 text-red-600 flex items-center"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              <span className="material-icons mr-2">cancel</span>
                              Missing Keywords
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {["TypeScript", "AWS", "Docker"].map((keyword, index) => (
                                <Badge key={index} className="bg-red-100 text-red-700 border-red-200 rounded-full px-3 py-1 text-sm font-medium">
                                  {keyword}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <Button 
                          className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-3">auto_fix_high</span>
                          Auto-Add Missing Keywords
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bottom CTA */}
                  <div className="text-center space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 border border-blue-100">
                    <h3 
                      className="text-3xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Ready to Optimize Your Resume?
                    </h3>
                    <p 
                      className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-lg"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
                      Let our AI help you create a resume that gets noticed by both 
                      <span className="font-medium text-blue-600"> recruiters and ATS systems</span>.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        size="lg" 
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons mr-3">auto_fix_high</span>
                        Optimize with AI
                      </Button>
                      <Button 
                        size="lg" 
                        variant="outline"
                        className="h-12 px-8 border-2 border-gray-300 hover:bg-white hover:border-blue-300 hover:text-blue-600 rounded-full transition-all duration-300"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons mr-3">content_copy</span>
                        Create New Resume
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

export default ResumeBuilder;
