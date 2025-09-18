import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Target, 
  Award, 
  Edit2, 
  Save, 
  X,
  Plus,
  Trash2,
  Camera,
  Star,
  Calendar,
  Code,
  Brain
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Skill {
  name: string;
  level: number;
  category: 'technical' | 'soft';
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  grade: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editSection, setEditSection] = useState<string | null>(null);

  // User profile state
  const [profile, setProfile] = useState({
    personalInfo: {
      name: "Rahul Sharma",
      email: "rahul.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      bio: "Passionate software developer with 3+ years of experience in full-stack development. Looking to transition into AI/ML roles.",
      avatar: "",
      headline: "Full Stack Developer | AI Enthusiast"
    },
    careerInfo: {
      currentRole: "Software Developer",
      experience: "3 years",
      industry: "Technology",
      expectedSalary: "₹8-12 LPA",
      preferredLocation: "Mumbai, Bangalore, Pune"
    },
    skills: [
      { name: "JavaScript", level: 85, category: 'technical' as const },
      { name: "React", level: 80, category: 'technical' as const },
      { name: "Node.js", level: 75, category: 'technical' as const },
      { name: "Python", level: 60, category: 'technical' as const },
      { name: "Communication", level: 90, category: 'soft' as const },
      { name: "Leadership", level: 70, category: 'soft' as const }
    ] as Skill[],
    education: [
      {
        degree: "B.Tech in Computer Science",
        institution: "IIT Mumbai",
        year: "2020",
        grade: "8.5 CGPA"
      }
    ] as Education[],
    achievements: [
      {
        title: "Best Developer Award",
        description: "Recognized for outstanding contribution to the team project",
        date: "2023"
      }
    ] as Achievement[],
    careerGoals: {
      shortTerm: "Transition to AI/ML role within next 6 months",
      longTerm: "Become a Senior AI Engineer and lead innovative projects",
      interests: ["Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"]
    }
  });

  const [newSkill, setNewSkill] = useState<{ name: string; level: number; category: 'technical' | 'soft' }>({ name: "", level: 50, category: 'technical' });
  const [newEducation, setNewEducation] = useState({ degree: "", institution: "", year: "", grade: "" });
  const [newAchievement, setNewAchievement] = useState({ title: "", description: "", date: "" });

  const handleSave = (section: string) => {
    setEditSection(null);
    toast({
      title: "Profile Updated",
      description: `${section} information has been saved successfully.`,
    });
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill }]
      }));
      setNewSkill({ name: "", level: 50, category: 'technical' });
    }
  };

  const removeSkill = (index: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    if (newEducation.degree.trim() && newEducation.institution.trim()) {
      setProfile(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
      setNewEducation({ degree: "", institution: "", year: "", grade: "" });
    }
  };

  const addAchievement = () => {
    if (newAchievement.title.trim()) {
      setProfile(prev => ({
        ...prev,
        achievements: [...prev.achievements, { ...newAchievement }]
      }));
      setNewAchievement({ title: "", description: "", date: "" });
    }
  };

  const EditableField = ({ 
    value, 
    onChange, 
    type = "text", 
    multiline = false,
    placeholder = ""
  }: {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    multiline?: boolean;
    placeholder?: string;
  }) => {
    if (multiline) {
      return (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-20 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white shadow-sm"
          style={{ fontFamily: 'Roboto, sans-serif' }}
        />
      );
    }
    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white shadow-sm"
        style={{ fontFamily: 'Roboto, sans-serif' }}
      />
    );
  };

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-gradient-to-r from-green-500 to-green-600";
    if (level >= 60) return "bg-gradient-to-r from-blue-500 to-blue-600";
    if (level >= 40) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    return "bg-gradient-to-r from-red-500 to-red-600";
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
        
        {/* Google Workspace-inspired Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          </div>
          
          <div className="relative container mx-auto px-8 py-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              {/* Profile Picture & Basic Info */}
              <div className="flex flex-col items-center text-center lg:text-left">
                <div className="relative group mb-6">
                  <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <Avatar className="relative h-40 w-40 ring-4 ring-white/30 shadow-2xl">
                    <AvatarImage src={profile.personalInfo.avatar} />
                    <AvatarFallback 
                      className="text-3xl bg-gradient-to-br from-white to-gray-100 text-blue-600 shadow-lg"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      {profile.personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button 
                      size="icon" 
                      className="absolute -bottom-2 -right-2 h-12 w-12 rounded-full bg-white text-blue-600 hover:bg-blue-50 shadow-lg"
                    >
                      <span className="material-icons">photo_camera</span>
                    </Button>
                  )}
                </div>
                
                <div className="space-y-3 text-white">
                  <h1 
                    className="text-4xl lg:text-5xl font-medium"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {profile.personalInfo.name}
                  </h1>
                  <p 
                    className="text-xl text-blue-100 font-medium"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    {profile.personalInfo.headline}
                  </p>
                  <div className="flex items-center gap-2 text-blue-100 justify-center lg:justify-start">
                    <span className="material-icons text-lg">location_on</span>
                    <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                      {profile.personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Stats Cards */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 shadow-lg">
                  <div 
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {profile.careerInfo.experience}
                  </div>
                  <div 
                    className="text-blue-100"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Experience
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 shadow-lg">
                  <div 
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {profile.skills.length}
                  </div>
                  <div 
                    className="text-blue-100"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Skills
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20 shadow-lg">
                  <div 
                    className="text-4xl font-bold text-white mb-2"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {profile.achievements.length}
                  </div>
                  <div 
                    className="text-blue-100"
                    style={{ fontFamily: 'Roboto, sans-serif' }}
                  >
                    Achievements
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:ml-8">
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  size="lg"
                  className={`h-14 px-8 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 ${
                    isEditing 
                      ? 'bg-white text-blue-600 hover:bg-gray-50' 
                      : 'bg-white text-blue-600 hover:bg-blue-50'
                  }`}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {isEditing ? (
                    <>
                      <span className="material-icons mr-2">close</span>
                      Cancel Editing
                    </>
                  ) : (
                    <>
                      <span className="material-icons mr-2">edit</span>
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-8 py-12">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-gray-100 p-1 rounded-full">
              <TabsTrigger 
                value="overview"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-2 text-base">dashboard</span>
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="skills"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-2 text-base">psychology</span>
                Skills
              </TabsTrigger>
              <TabsTrigger 
                value="experience"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-2 text-base">work</span>
                Experience
              </TabsTrigger>
              <TabsTrigger 
                value="goals"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                <span className="material-icons mr-2 text-base">flag</span>
                Goals
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Personal Information */}
                <Card className="border-0 rounded-3xl shadow-lg bg-white">
                  <CardHeader className="p-8">
                    <CardTitle 
                      className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <span className="material-icons text-white text-xl">person</span>
                      </div>
                      Personal Information
                      {editSection !== "personal" && isEditing && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setEditSection("personal")} 
                          className="ml-auto rounded-full h-10 w-10 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <span className="material-icons">edit</span>
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    {editSection === "personal" ? (
                      <div className="space-y-6">
                        <EditableField
                          value={profile.personalInfo.name}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, name: value } }))}
                          placeholder="Full Name"
                        />
                        <EditableField
                          value={profile.personalInfo.headline}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, headline: value } }))}
                          placeholder="Professional Headline"
                        />
                        <EditableField
                          value={profile.personalInfo.email}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, email: value } }))}
                          type="email"
                          placeholder="Email"
                        />
                        <EditableField
                          value={profile.personalInfo.phone}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, phone: value } }))}
                          type="tel"
                          placeholder="Phone"
                        />
                        <EditableField
                          value={profile.personalInfo.location}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, location: value } }))}
                          placeholder="Location"
                        />
                        <EditableField
                          value={profile.personalInfo.bio}
                          onChange={(value) => setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, bio: value } }))}
                          multiline
                          placeholder="Bio"
                        />
                        <Button 
                          onClick={() => handleSave("Personal")} 
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full shadow-lg"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2">save</span>
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                          <p 
                            className="text-gray-700 leading-relaxed"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            {profile.personalInfo.bio}
                          </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                            <span className="material-icons text-blue-600">email</span>
                            <span 
                              className="text-gray-700"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {profile.personalInfo.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200">
                            <span className="material-icons text-green-600">phone</span>
                            <span 
                              className="text-gray-700"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {profile.personalInfo.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Career Information */}
                <Card className="border-0 rounded-3xl shadow-lg bg-white">
                  <CardHeader className="p-8">
                    <CardTitle 
                      className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                        <span className="material-icons text-white text-xl">work</span>
                      </div>
                      Career Information
                      {editSection !== "career" && isEditing && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setEditSection("career")} 
                          className="ml-auto rounded-full h-10 w-10 hover:bg-green-50 hover:text-green-600"
                        >
                          <span className="material-icons">edit</span>
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    {editSection === "career" ? (
                      <div className="space-y-6">
                        <EditableField
                          value={profile.careerInfo.currentRole}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerInfo: { ...prev.careerInfo, currentRole: value } }))}
                          placeholder="Current Role"
                        />
                        <EditableField
                          value={profile.careerInfo.experience}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerInfo: { ...prev.careerInfo, experience: value } }))}
                          placeholder="Experience"
                        />
                        <EditableField
                          value={profile.careerInfo.industry}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerInfo: { ...prev.careerInfo, industry: value } }))}
                          placeholder="Industry"
                        />
                        <EditableField
                          value={profile.careerInfo.expectedSalary}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerInfo: { ...prev.careerInfo, expectedSalary: value } }))}
                          placeholder="Expected Salary"
                        />
                        <EditableField
                          value={profile.careerInfo.preferredLocation}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerInfo: { ...prev.careerInfo, preferredLocation: value } }))}
                          placeholder="Preferred Location"
                        />
                        <Button 
                          onClick={() => handleSave("Career")} 
                          className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full shadow-lg"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons mr-2">save</span>
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        <div className="p-4 rounded-2xl bg-green-50 border border-green-200">
                          <div 
                            className="text-sm text-gray-600 mb-1"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Current Role
                          </div>
                          <div 
                            className="font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {profile.careerInfo.currentRole}
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                          <div 
                            className="text-sm text-gray-600 mb-1"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Industry
                          </div>
                          <div 
                            className="font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {profile.careerInfo.industry}
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
                          <div 
                            className="text-sm text-gray-600 mb-1"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          >
                            Expected Salary
                          </div>
                          <div 
                            className="font-medium text-gray-900"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            {profile.careerInfo.expectedSalary}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8">
              <Card className="border-0 rounded-3xl shadow-lg bg-white">
                <CardHeader className="p-8">
                  <CardTitle 
                    className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="material-icons text-white text-xl">psychology</span>
                    </div>
                    Skills & Expertise
                    {isEditing && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditSection(editSection === "skills" ? null : "skills")} 
                        className="ml-auto rounded-full h-10 w-10 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <span className="material-icons">edit</span>
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                  {editSection === "skills" && (
                    <div className="p-6 bg-purple-50 rounded-2xl border border-purple-200">
                      <h4 
                        className="font-medium mb-4 text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Add New Skill
                      </h4>
                      <div className="flex gap-3">
                        <Input
                          placeholder="Skill name"
                          value={newSkill.name}
                          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                          className="flex-1 h-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <select
                          value={newSkill.category}
                          onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as 'technical' | 'soft' })}
                          className="px-4 py-3 rounded-2xl border-2 border-gray-200 bg-white focus:border-purple-500 focus:ring-0"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          <option value="technical">Technical</option>
                          <option value="soft">Soft Skill</option>
                        </select>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={newSkill.level}
                          onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
                          className="w-24 h-12 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-0"
                          placeholder="Level"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        />
                        <Button 
                          onClick={addSkill} 
                          className="h-12 w-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-2xl shadow-md hover:shadow-lg"
                        >
                          <span className="material-icons">add</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Technical Skills */}
                    <div>
                      <h3 
                        className="font-medium text-xl mb-6 flex items-center gap-3 text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons text-blue-600 text-xl">code</span>
                        Technical Skills
                      </h3>
                      <div className="space-y-6">
                        {profile.skills.filter(skill => skill.category === 'technical').map((skill, index) => (
                          <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                            <div className="flex items-center justify-between mb-3">
                              <span 
                                className="font-medium text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <span 
                                  className="text-sm font-bold text-blue-600"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {skill.level}%
                                </span>
                                {editSection === "skills" && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => removeSkill(profile.skills.indexOf(skill))} 
                                    className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600"
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${getSkillColor(skill.level)}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Soft Skills */}
                    <div>
                      <h3 
                        className="font-medium text-xl mb-6 flex items-center gap-3 text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons text-green-600 text-xl">emoji_objects</span>
                        Soft Skills
                      </h3>
                      <div className="space-y-6">
                        {profile.skills.filter(skill => skill.category === 'soft').map((skill, index) => (
                          <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200">
                            <div className="flex items-center justify-between mb-3">
                              <span 
                                className="font-medium text-gray-900"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {skill.name}
                              </span>
                              <div className="flex items-center gap-3">
                                <span 
                                  className="text-sm font-bold text-green-600"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {skill.level}%
                                </span>
                                {editSection === "skills" && (
                                  <Button 
                                    size="sm" 
                                    variant="ghost" 
                                    onClick={() => removeSkill(profile.skills.indexOf(skill))} 
                                    className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600"
                                  >
                                    <span className="material-icons text-sm">delete</span>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                              <div 
                                className={`h-full rounded-full transition-all duration-500 ${getSkillColor(skill.level)}`}
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Experience Tab */}
            <TabsContent value="experience" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Education */}
                <Card className="border-0 rounded-3xl shadow-lg bg-white">
                  <CardHeader className="p-8">
                    <CardTitle 
                      className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                        <span className="material-icons text-white text-xl">school</span>
                      </div>
                      Education
                      {isEditing && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setEditSection(editSection === "education" ? null : "education")} 
                          className="ml-auto rounded-full h-10 w-10 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <span className="material-icons">edit</span>
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    {editSection === "education" && (
                      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200">
                        <h4 
                          className="font-medium mb-4 text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Add Education
                        </h4>
                        <div className="space-y-4">
                          <Input
                            placeholder="Degree"
                            value={newEducation.degree}
                            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                            className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <Input
                            placeholder="Institution"
                            value={newEducation.institution}
                            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                            className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <div className="flex gap-3">
                            <Input
                              placeholder="Year"
                              value={newEducation.year}
                              onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                              className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                            <Input
                              placeholder="Grade"
                              value={newEducation.grade}
                              onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                              className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            />
                          </div>
                          <Button 
                            onClick={addEducation} 
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2">add</span>
                            Add Education
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      {profile.education.map((edu, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 
                                className="font-medium text-xl text-gray-900 mb-1"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {edu.degree}
                              </h4>
                              <p 
                                className="text-blue-600 font-medium mb-3"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {edu.institution}
                              </p>
                              <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <span className="material-icons text-sm">event</span>
                                  <span style={{ fontFamily: 'Roboto, sans-serif' }}>{edu.year}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="material-icons text-sm">star</span>
                                  <span style={{ fontFamily: 'Roboto, sans-serif' }}>{edu.grade}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="border-0 rounded-3xl shadow-lg bg-white">
                  <CardHeader className="p-8">
                    <CardTitle 
                      className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <span className="material-icons text-white text-xl">emoji_events</span>
                      </div>
                      Achievements
                      {isEditing && (
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => setEditSection(editSection === "achievements" ? null : "achievements")} 
                          className="ml-auto rounded-full h-10 w-10 hover:bg-yellow-50 hover:text-yellow-600"
                        >
                          <span className="material-icons">edit</span>
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8 pt-0 space-y-6">
                    {editSection === "achievements" && (
                      <div className="p-6 bg-yellow-50 rounded-2xl border border-yellow-200">
                        <h4 
                          className="font-medium mb-4 text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Add Achievement
                        </h4>
                        <div className="space-y-4">
                          <Input
                            placeholder="Achievement Title"
                            value={newAchievement.title}
                            onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                            className="h-12 rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-0"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <Textarea
                            placeholder="Description"
                            value={newAchievement.description}
                            onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                            className="rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-0"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <Input
                            placeholder="Date"
                            value={newAchievement.date}
                            onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                            className="h-12 rounded-2xl border-2 border-gray-200 focus:border-yellow-500 focus:ring-0"
                            style={{ fontFamily: 'Roboto, sans-serif' }}
                          />
                          <Button 
                            onClick={addAchievement} 
                            className="w-full h-12 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-full shadow-lg"
                            style={{ fontFamily: 'Google Sans, sans-serif' }}
                          >
                            <span className="material-icons mr-2">add</span>
                            Add Achievement
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-6">
                      {profile.achievements.map((achievement, index) => (
                        <div key={index} className="p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center shadow-md">
                              <span className="material-icons text-white text-lg">emoji_events</span>
                            </div>
                            <div className="flex-1">
                              <h4 
                                className="font-medium text-lg text-gray-900 mb-2"
                                style={{ fontFamily: 'Google Sans, sans-serif' }}
                              >
                                {achievement.title}
                              </h4>
                              <p 
                                className="text-gray-600 mb-3 leading-relaxed"
                                style={{ fontFamily: 'Roboto, sans-serif' }}
                              >
                                {achievement.description}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="material-icons text-sm">event</span>
                                <span style={{ fontFamily: 'Roboto, sans-serif' }}>{achievement.date}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-8">
              <Card className="border-0 rounded-3xl shadow-lg bg-white">
                <CardHeader className="p-8">
                  <CardTitle 
                    className="flex items-center gap-4 text-2xl font-medium text-gray-900"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                      <span className="material-icons text-white text-xl">flag</span>
                    </div>
                    Career Goals & Aspirations
                    {editSection !== "goals" && isEditing && (
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => setEditSection("goals")} 
                        className="ml-auto rounded-full h-10 w-10 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <span className="material-icons">edit</span>
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-0 space-y-8">
                  {editSection === "goals" ? (
                    <div className="space-y-6">
                      <div>
                        <label 
                          className="text-lg font-medium mb-3 block text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Short-term Goal
                        </label>
                        <EditableField
                          value={profile.careerGoals.shortTerm}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerGoals: { ...prev.careerGoals, shortTerm: value } }))}
                          multiline
                          placeholder="What do you want to achieve in the next 6-12 months?"
                        />
                      </div>
                      <div>
                        <label 
                          className="text-lg font-medium mb-3 block text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Long-term Goal
                        </label>
                        <EditableField
                          value={profile.careerGoals.longTerm}
                          onChange={(value) => setProfile(prev => ({ ...prev, careerGoals: { ...prev.careerGoals, longTerm: value } }))}
                          multiline
                          placeholder="Where do you see yourself in 3-5 years?"
                        />
                      </div>
                      <Button 
                        onClick={() => handleSave("Career Goals")} 
                        className="w-full h-12 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full shadow-lg"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <span className="material-icons mr-2">save</span>
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-8">
                      <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                        <h4 
                          className="font-medium text-xl mb-4 text-gray-900 flex items-center gap-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons text-blue-600">trending_up</span>
                          Short-term Goals
                        </h4>
                        <p 
                          className="text-gray-700 leading-relaxed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {profile.careerGoals.shortTerm}
                        </p>
                      </div>
                      
                      <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                        <h4 
                          className="font-medium text-xl mb-4 text-gray-900 flex items-center gap-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons text-purple-600">visibility</span>
                          Long-term Vision
                        </h4>
                        <p 
                          className="text-gray-700 leading-relaxed"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          {profile.careerGoals.longTerm}
                        </p>
                      </div>
                      
                      <div>
                        <h4 
                          className="font-medium text-xl mb-6 text-gray-900 flex items-center gap-2"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          <span className="material-icons text-green-600">interests</span>
                          Areas of Interest
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {profile.careerGoals.interests.map((interest, index) => (
                            <Badge 
                              key={index} 
                              className="px-4 py-2 text-sm bg-gradient-to-r from-green-100 to-blue-100 text-gray-800 border border-gray-200 rounded-full shadow-sm"
                              style={{ fontFamily: 'Roboto, sans-serif' }}
                            >
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        
      </div>
    </>
  );
};

export default Profile;
