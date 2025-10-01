import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "./Layout";
import { ProgressIndicator } from "./ProgressIndicator";
import { 
  ArrowRight, 
  Upload, 
  FileText, 
  Award, 
  Link as LinkIcon, 
  X, 
  CheckCircle,
  Github,
  Linkedin,
  Globe
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onNext: () => void;
  onBack: () => void;
  userEmail: string; // ✅ Added userEmail prop
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file: File; // ✅ Added actual file object for upload
}

export const DocumentUpload = ({ onNext, onBack, userEmail }: DocumentUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<UploadedFile | null>(null);
  const [certificates, setCertificates] = useState<UploadedFile[]>([]);
  
  // ✅ Added domain fields
  const [formData, setFormData] = useState({
    domain: "", // Professional domain/expertise area
    portfolioUrl: "", // Portfolio website URL
  });
  
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "",
    github: "",
    portfolio: ""
  });
  const [isDragging, setIsDragging] = useState(false);
  
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const certificatesInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, type: "resume" | "certificates") => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, type);
  };

  const handleFiles = (files: File[], type: "resume" | "certificates") => {
    if (type === "resume" && files.length > 0) {
      const file = files[0];
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setResumeFile({
          name: file.name,
          size: file.size,
          type: file.type,
          file: file // ✅ Store actual file
        });
        toast({
          title: "Resume uploaded successfully",
          description: file.name,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or DOC file for your resume.",
          variant: "destructive",
        });
      }
    } else if (type === "certificates") {
      const validFiles = files.filter(file => 
        file.type === "application/pdf" || file.type.includes("document") || file.type.includes("image")
      );
      
      const newCertificates = validFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        file: file // ✅ Store actual file
      }));
      
      setCertificates(prev => [...prev, ...newCertificates]);
      toast({
        title: `${validFiles.length} certificate(s) uploaded`,
        description: "Files uploaded successfully",
      });
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>, type: "resume" | "certificates") => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files, type);
  };

  const removeFile = (type: "resume" | "certificate", index?: number) => {
    if (type === "resume") {
      setResumeFile(null);
    } else if (type === "certificate" && index !== undefined) {
      setCertificates(prev => prev.filter((_, i) => i !== index));
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      toast({
        title: "Form incomplete",
        description: "Please upload your resume and fill in required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("🚀 Starting document upload for:", userEmail);
    setIsLoading(true);

    try {
      // Create FormData for file uploads
      const formDataPayload = new FormData();
      
      // Add text fields
      formDataPayload.append('userEmail', userEmail);
      formDataPayload.append('domain', formData.domain);
      formDataPayload.append('portfolioUrl', formData.portfolioUrl);
      formDataPayload.append('linkedinUrl', socialLinks.linkedin);
      formDataPayload.append('githubUrl', socialLinks.github);
      formDataPayload.append('personalPortfolioUrl', socialLinks.portfolio);
      
      // Add resume file
      if (resumeFile) {
        formDataPayload.append('resume', resumeFile.file);
      }
      
      // Add certificate files
      certificates.forEach((cert, index) => {
        formDataPayload.append(`certificates`, cert.file);
      });

      console.log("📦 Uploading documents...");

      const response = await fetch(
        `http://127.0.0.1:8000/api/documents/upload/${userEmail}`,
        {
          method: "POST",
          body: formDataPayload,
          // Don't set Content-Type - let browser set it for FormData
        }
      );

      console.log("📡 Response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("❌ Server error response:", errorText);
        throw new Error(`Failed to upload documents: ${response.status} ${errorText}`);
      }

      const result = await response.json();
      console.log("✅ Documents uploaded successfully:", result);

      toast({
        title: "Documents uploaded successfully!",
        description: "Your files have been saved securely.",
      });
      
      onNext();
    } catch (error) {
      console.error("❌ Failed to upload documents:", error);
      toast({
        title: "Upload failed",
        description: `Error uploading documents: ${error.message}. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const isFormValid = resumeFile !== null && formData.domain.trim() !== "";

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <ProgressIndicator currentStep={3} totalSteps={3} />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Upload your resume, certificates, and provide additional information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Domain Field - REQUIRED */}
              <div className="space-y-2">
                <Label htmlFor="domain">Professional Domain *</Label>
                <Input
                  id="domain"
                  placeholder="e.g., Software Development, Data Science, UI/UX Design"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  required
                />
              </div>

              {/* Portfolio URL Field */}
              <div className="space-y-2">
                <Label htmlFor="portfolioUrl">Portfolio Website</Label>
                <Input
                  id="portfolioUrl"
                  placeholder="https://your-portfolio.com"
                  value={formData.portfolioUrl}
                  onChange={(e) => handleInputChange("portfolioUrl", e.target.value)}
                />
              </div>

              {/* Resume Upload - REQUIRED */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <Label>Resume/CV *</Label>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragging ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "resume")}
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileInput(e, "resume")}
                    className="hidden"
                  />
                  
                  {resumeFile ? (
                    <div className="flex items-center justify-between bg-green-50 p-3 rounded">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div className="text-left">
                          <p className="font-medium">{resumeFile.name}</p>
                          <p className="text-sm text-gray-600">{formatFileSize(resumeFile.size)}</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile("resume");
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-gray-600">Drag and drop your resume here, or click to browse</p>
                      <p className="text-sm text-gray-400 mt-1">PDF, DOC, or DOCX files only</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificates Upload - OPTIONAL */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <Label>Certificates (Optional)</Label>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragging ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "certificates")}
                  onClick={() => certificatesInputRef.current?.click()}
                >
                  <input
                    ref={certificatesInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileInput(e, "certificates")}
                    className="hidden"
                  />
                  
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Upload your certificates and achievements</p>
                  <p className="text-sm text-gray-400 mt-1">PDF, DOC, or image files (multiple files allowed)</p>
                </div>
                
                {certificates.length > 0 && (
                  <div className="space-y-2">
                    {certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between bg-blue-50 p-3 rounded">
                        <div className="flex items-center gap-3">
                          <Award className="w-4 h-4 text-blue-600" />
                          <div>
                            <p className="font-medium">{cert.name}</p>
                            <p className="text-sm text-gray-600">{formatFileSize(cert.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("certificate", index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Links - OPTIONAL */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  <Label>Social Links (Optional)</Label>
                </div>
                
                <div className="grid md:grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin" className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="github" className="flex items-center gap-2">
                      <Github className="w-4 h-4" />
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      placeholder="https://github.com/yourusername"
                      value={socialLinks.github}
                      onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="personal-portfolio" className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Personal Portfolio
                    </Label>
                    <Input
                      id="personal-portfolio"
                      placeholder="https://yourwebsite.com"
                      value={socialLinks.portfolio}
                      onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button type="button" variant="outline" onClick={onBack}>
                  Back
                </Button>
                <Button 
                  type="submit" 
                  disabled={!isFormValid || isLoading}
                  className="flex items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      Complete Setup
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};