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
          className="min-h-20 border-border/50 focus:border-primary/50 transition-colors"
        />
      );
    }
    return (
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="border-border/50 focus:border-primary/50 transition-colors"
      />
    );
  };

  const getSkillColor = (level: number) => {
    if (level >= 80) return "bg-gradient-to-r from-green-500 to-emerald-500";
    if (level >= 60) return "bg-gradient-to-r from-blue-500 to-cyan-500";
    if (level >= 40) return "bg-gradient-to-r from-yellow-500 to-orange-500";
    return "bg-gradient-to-r from-red-500 to-pink-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Hero Section */}
      <Header />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />
        <div className="relative container mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Profile Picture & Basic Info */}
            <div className="flex flex-col items-center text-center lg:text-left">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full opacity-20 group-hover:opacity-30 transition-opacity blur-lg" />
                <Avatar className="relative h-32 w-32 border-4 border-white shadow-2xl">
                  <AvatarImage src={profile.personalInfo.avatar} />
                  <AvatarFallback className="text-2xl font-poppins font-semibold gradient-primary text-white">
                    {profile.personalInfo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" variant="secondary" className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full shadow-lg">
                    <Camera className="h-5 w-5" />
                  </Button>
                )}
              </div>
              <div className="mt-6 space-y-2">
                <h1 className="text-4xl font-poppins font-bold text-foreground">
                  {profile.personalInfo.name}
                </h1>
                <p className="text-xl font-medium text-primary">
                  {profile.personalInfo.headline}
                </p>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.personalInfo.location}</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-primary font-poppins">
                  {profile.careerInfo.experience}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-primary font-poppins">
                  {profile.skills.length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Skills</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
                <div className="text-3xl font-bold text-primary font-poppins">
                  {profile.achievements.length}
                </div>
                <div className="text-sm text-muted-foreground mt-1">Achievements</div>
              </div>
            </div>

            {/* Action Button */}
            <div className="lg:ml-8">
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                size="lg"
                variant={isEditing ? "outline" : "default"}
                className="font-poppins font-medium px-8 py-3 gradient-primary shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isEditing ? <X className="mr-2 h-5 w-5" /> : <Edit2 className="mr-2 h-5 w-5" />}
                {isEditing ? "Cancel Editing" : "Edit Profile"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="overview" className="font-poppins">Overview</TabsTrigger>
            <TabsTrigger value="skills" className="font-poppins">Skills</TabsTrigger>
            <TabsTrigger value="experience" className="font-poppins">Experience</TabsTrigger>
            <TabsTrigger value="goals" className="font-poppins">Goals</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                    <div className="p-2 rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    Personal Information
                    {editSection !== "personal" && isEditing && (
                      <Button size="sm" variant="ghost" onClick={() => setEditSection("personal")} className="ml-auto">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editSection === "personal" ? (
                    <div className="space-y-4">
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
                      <Button onClick={() => handleSave("Personal")} className="w-full gradient-primary font-poppins">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
                        <p className="text-sm text-muted-foreground leading-relaxed">{profile.personalInfo.bio}</p>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                          <Mail className="h-4 w-4 text-primary" />
                          <span className="text-sm">{profile.personalInfo.email}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50">
                          <Phone className="h-4 w-4 text-primary" />
                          <span className="text-sm">{profile.personalInfo.phone}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Career Information */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Briefcase className="h-5 w-5 text-secondary" />
                    </div>
                    Career Information
                    {editSection !== "career" && isEditing && (
                      <Button size="sm" variant="ghost" onClick={() => setEditSection("career")} className="ml-auto">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editSection === "career" ? (
                    <div className="space-y-4">
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
                      <Button onClick={() => handleSave("Career")} className="w-full gradient-primary font-poppins">
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5">
                        <div className="text-xs text-muted-foreground mb-1">Current Role</div>
                        <div className="font-medium">{profile.careerInfo.currentRole}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5">
                        <div className="text-xs text-muted-foreground mb-1">Industry</div>
                        <div className="font-medium">{profile.careerInfo.industry}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-gradient-to-r from-secondary/5 to-primary/5">
                        <div className="text-xs text-muted-foreground mb-1">Expected Salary</div>
                        <div className="font-medium">{profile.careerInfo.expectedSalary}</div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  Skills & Expertise
                  {isEditing && (
                    <Button size="sm" variant="ghost" onClick={() => setEditSection(editSection === "skills" ? null : "skills")} className="ml-auto">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {editSection === "skills" && (
                  <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                    <h4 className="font-poppins font-medium mb-3">Add New Skill</h4>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Skill name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="flex-1"
                      />
                      <select
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value as 'technical' | 'soft' })}
                        className="px-3 py-2 rounded-md border border-border/50 bg-background/50"
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
                        className="w-20"
                        placeholder="Level"
                      />
                      <Button onClick={addSkill} className="gradient-primary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Technical Skills */}
                  <div>
                    <h3 className="font-poppins font-semibold text-lg mb-4 flex items-center gap-2">
                      <Code className="h-5 w-5 text-primary" />
                      Technical Skills
                    </h3>
                    <div className="space-y-4">
                      {profile.skills.filter(skill => skill.category === 'technical').map((skill, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              {editSection === "skills" && (
                                <Button size="icon" variant="ghost" onClick={() => removeSkill(profile.skills.indexOf(skill))} className="h-6 w-6">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
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
                    <h3 className="font-poppins font-semibold text-lg mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-secondary" />
                      Soft Skills
                    </h3>
                    <div className="space-y-4">
                      {profile.skills.filter(skill => skill.category === 'soft').map((skill, index) => (
                        <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border border-white/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{skill.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              {editSection === "skills" && (
                                <Button size="icon" variant="ghost" onClick={() => removeSkill(profile.skills.indexOf(skill))} className="h-6 w-6">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
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
          <TabsContent value="experience" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Education */}
              <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                    <div className="p-2 rounded-full bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    Education
                    {isEditing && (
                      <Button size="sm" variant="ghost" onClick={() => setEditSection(editSection === "education" ? null : "education")} className="ml-auto">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editSection === "education" && (
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                      <h4 className="font-poppins font-medium mb-3">Add Education</h4>
                      <div className="space-y-3">
                        <Input
                          placeholder="Degree"
                          value={newEducation.degree}
                          onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                        />
                        <Input
                          placeholder="Institution"
                          value={newEducation.institution}
                          onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                        />
                        <div className="flex gap-2">
                          <Input
                            placeholder="Year"
                            value={newEducation.year}
                            onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                          />
                          <Input
                            placeholder="Grade"
                            value={newEducation.grade}
                            onChange={(e) => setNewEducation({ ...newEducation, grade: e.target.value })}
                          />
                        </div>
                        <Button onClick={addEducation} className="w-full gradient-primary">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Education
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profile.education.map((edu, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border border-white/20">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-poppins font-semibold text-lg">{edu.degree}</h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {edu.year}
                              </div>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4" />
                                {edu.grade}
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
              <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                    <div className="p-2 rounded-full bg-secondary/10">
                      <Award className="h-5 w-5 text-secondary" />
                    </div>
                    Achievements
                    {isEditing && (
                      <Button size="sm" variant="ghost" onClick={() => setEditSection(editSection === "achievements" ? null : "achievements")} className="ml-auto">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editSection === "achievements" && (
                    <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
                      <h4 className="font-poppins font-medium mb-3">Add Achievement</h4>
                      <div className="space-y-3">
                        <Input
                          placeholder="Achievement Title"
                          value={newAchievement.title}
                          onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                        />
                        <Textarea
                          placeholder="Description"
                          value={newAchievement.description}
                          onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        />
                        <Input
                          placeholder="Date"
                          value={newAchievement.date}
                          onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                        />
                        <Button onClick={addAchievement} className="w-full gradient-primary">
                          <Plus className="mr-2 h-4 w-4" />
                          Add Achievement
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    {profile.achievements.map((achievement, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border border-white/20">
                        <div className="flex items-start gap-3">
                          <div className="p-2 rounded-full bg-secondary/20 mt-1">
                            <Award className="h-4 w-4 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-poppins font-semibold">{achievement.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{achievement.description}</p>
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              {achievement.date}
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
          <TabsContent value="goals" className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm border-white/30 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 font-poppins text-xl">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  Career Goals & Aspirations
                  {editSection !== "goals" && isEditing && (
                    <Button size="sm" variant="ghost" onClick={() => setEditSection("goals")} className="ml-auto">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {editSection === "goals" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-poppins font-medium mb-2 block">Short-term Goal</label>
                      <EditableField
                        value={profile.careerGoals.shortTerm}
                        onChange={(value) => setProfile(prev => ({ ...prev, careerGoals: { ...prev.careerGoals, shortTerm: value } }))}
                        multiline
                        placeholder="What do you want to achieve in the next 6-12 months?"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-poppins font-medium mb-2 block">Long-term Goal</label>
                      <EditableField
                        value={profile.careerGoals.longTerm}
                        onChange={(value) => setProfile(prev => ({ ...prev, careerGoals: { ...prev.careerGoals, longTerm: value } }))}
                        multiline
                        placeholder="Where do you see yourself in 3-5 years?"
                      />
                    </div>
                    <Button onClick={() => handleSave("Career Goals")} className="w-full gradient-primary font-poppins">
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                      <h4 className="font-poppins font-semibold text-lg mb-3">Short-term Goals</h4>
                      <p className="text-muted-foreground leading-relaxed">{profile.careerGoals.shortTerm}</p>
                    </div>
                    <div className="p-6 rounded-xl bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20">
                      <h4 className="font-poppins font-semibold text-lg mb-3">Long-term Vision</h4>
                      <p className="text-muted-foreground leading-relaxed">{profile.careerGoals.longTerm}</p>
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold text-lg mb-4">Areas of Interest</h4>
                      <div className="flex flex-wrap gap-3">
                        {profile.careerGoals.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="px-4 py-2 text-sm font-poppins gradient-primary text-white border-0">
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
  );
};

export default Profile;