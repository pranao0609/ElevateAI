import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Layout } from "./Layout";
import { ProgressIndicator } from "./ProgressIndicator";
import { ArrowRight, User, Mail, Phone, MapPin, Calendar, Users } from "lucide-react";

interface PersonalInfoFormProps {
  onNext: () => void;
  onBack: () => void;
}

export const PersonalInfoForm = ({ onNext, onBack }: PersonalInfoFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    dateOfBirth: "",
    gender: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  return (
    <Layout 
      showProgress 
      currentStep={1} 
      totalSteps={4}
      stepLabels={["Personal Info", "Career Info", "Documents", "Dashboard"]}
    >
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator 
          currentStep={1} 
          totalSteps={3} 
          stepLabels={["Personal Info", "Career Info", "Documents"]}
        />

        <Card className="material-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary-container rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-primary-container-foreground" />
            </div>
            <CardTitle className="text-2xl font-semibold">Personal Information</CardTitle>
            <CardDescription className="text-muted-foreground">
              Let's get to know you better. Please fill in your personal details.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 h-12"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="pl-10 h-12"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="pl-10 h-12"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-sm font-medium">City *</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="city"
                      type="text"
                      placeholder="New York, NY"
                      className="pl-10 h-12"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium">Date of Birth *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="dateOfBirth"
                      type="date"
                      className="pl-10 h-12"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-sm font-medium">Gender *</Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                    <Select onValueChange={(value) => handleInputChange("gender", value)} required>
                      <SelectTrigger className="pl-10 h-12">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
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