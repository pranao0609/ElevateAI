import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Layout } from "./Layout";
import { ProgressIndicator } from "./ProgressIndicator";
import { ArrowRight, GraduationCap, BookOpen, Briefcase, Heart, X } from "lucide-react";

interface CareerInfoFormProps {
  onNext: () => void;
  onBack: () => void;
}

const interestOptions = [
  "Software Development", "Data Science", "Machine Learning", "UI/UX Design",
  "Product Management", "Marketing", "Finance", "Healthcare", "Education",
  "Research", "Consulting", "Sales", "Operations", "Human Resources",
  "Cybersecurity", "Cloud Computing", "Mobile Development", "DevOps",
  "Artificial Intelligence", "Blockchain", "Digital Marketing", "Content Creation"
];

export const CareerInfoForm = ({ onNext, onBack }: CareerInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    educationLevel: "",
    fieldOfStudy: "",
    yearsOfExperience: "",
    interests: [] as string[]
  });
  const [newInterest, setNewInterest] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addInterest = (interest: string) => {
    if (interest && !formData.interests.includes(interest)) {
      setFormData(prev => ({ 
        ...prev, 
        interests: [...prev.interests, interest] 
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interestToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(interest => interest !== interestToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 1000);
  };

  const isFormValid = formData.educationLevel && formData.fieldOfStudy && 
                     formData.yearsOfExperience && formData.interests.length > 0;

  return (
    <Layout 
      showProgress 
      currentStep={2} 
      totalSteps={4}
      stepLabels={["Personal Info", "Career Info", "Documents", "Dashboard"]}
    >
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator 
          currentStep={2} 
          totalSteps={3} 
          stepLabels={["Personal Info", "Career Info", "Documents"]}
        />

        <Card className="material-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-success" />
            </div>
            <CardTitle className="text-2xl font-semibold">Career Information</CardTitle>
            <CardDescription className="text-muted-foreground">
              Tell us about your educational background and career interests to get personalized recommendations.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="educationLevel" className="text-sm font-medium">Education Level / Grade *</Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select onValueChange={(value) => handleInputChange("educationLevel", value)} required>
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high-school">High School</SelectItem>
                      <SelectItem value="associate">Associate Degree</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy" className="text-sm font-medium">Branch / Field of Study *</Label>
                <div className="relative">
                  <BookOpen className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fieldOfStudy"
                    type="text"
                    placeholder="e.g., Computer Science, Business Administration"
                    className="pl-10 h-12"
                    value={formData.fieldOfStudy}
                    onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience" className="text-sm font-medium">Years of Experience *</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select onValueChange={(value) => handleInputChange("yearsOfExperience", value)} required>
                    <SelectTrigger className="pl-10 h-12">
                      <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Fresh Graduate / No Experience</SelectItem>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center">
                    <Heart className="w-4 h-4 mr-2" />
                    Interests & Career Areas *
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Select or add your areas of interest to help us provide better recommendations.
                  </p>
                </div>

                {/* Interest tags */}
                {formData.interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/30 rounded-lg">
                    {formData.interests.map((interest) => (
                      <Badge key={interest} variant="secondary" className="text-xs">
                        {interest}
                        <button
                          type="button"
                          onClick={() => removeInterest(interest)}
                          className="ml-1 hover:text-error"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Add interest input */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Add an interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addInterest(newInterest);
                      }
                    }}
                    className="flex-1 h-10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addInterest(newInterest)}
                    disabled={!newInterest.trim()}
                    className="h-10"
                  >
                    Add
                  </Button>
                </div>

                {/* Predefined interests */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Popular interests:</Label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions
                      .filter(option => !formData.interests.includes(option))
                      .slice(0, 8)
                      .map((interest) => (
                        <Button
                          key={interest}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addInterest(interest)}
                          className="h-8 text-xs"
                        >
                          + {interest}
                        </Button>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  className="flex-1 h-12"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  className="flex-1 h-12"
                  disabled={!isFormValid || isLoading}
                >
                  {isLoading ? "Saving..." : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};