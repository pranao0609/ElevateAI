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
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

export const DocumentUpload = ({ onNext, onBack }: DocumentUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<UploadedFile | null>(null);
  const [certificates, setCertificates] = useState<UploadedFile[]>([]);
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
          type: file.type
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
        type: file.type
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setIsLoading(false);
      onNext();
    }, 2000);
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [platform]: value }));
  };

  const isFormValid = resumeFile !== null;

  return (
    <Layout 
      showProgress 
      currentStep={3} 
      totalSteps={3}
      stepLabels={["Personal Info", "Career Info", "Documents"]}
    >
      <div className="max-w-2xl mx-auto">
        <ProgressIndicator 
          currentStep={3} 
          totalSteps={3} 
          stepLabels={["Personal Info", "Career Info", "Documents"]}
        />

        <Card className="material-card">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-8 h-8 text-warning" />
            </div>
            <CardTitle className="text-2xl font-semibold">Upload Documents</CardTitle>
            <CardDescription className="text-muted-foreground">
              Upload your resume and any relevant certificates to complete your profile.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Resume Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <Label className="text-sm font-medium">Resume * (PDF or DOC)</Label>
                </div>
                
                {!resumeFile ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer hover:border-primary/50 ${
                      isDragging ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "resume")}
                    onClick={() => resumeInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-sm font-medium text-foreground mb-2">
                      Drag and drop your resume here, or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF and DOC files up to 10MB
                    </p>
                    <input
                      ref={resumeInputRef}
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileInput(e, "resume")}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{resumeFile.name}</p>
                        <p className="text-xs text-muted-foreground">{formatFileSize(resumeFile.size)}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile("resume")}
                      className="text-error hover:text-error"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Certificates Upload */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-success" />
                  <Label className="text-sm font-medium">Certificates (Optional)</Label>
                </div>
                
                <div
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer hover:border-success/50 ${
                    isDragging ? "border-success bg-success/5" : "border-border"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, "certificates")}
                  onClick={() => certificatesInputRef.current?.click()}
                >
                  <Award className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground mb-1">
                    Upload certificates and achievements
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Multiple files supported (PDF, DOC, JPG, PNG)
                  </p>
                  <input
                    ref={certificatesInputRef}
                    type="file"
                    className="hidden"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileInput(e, "certificates")}
                  />
                </div>

                {certificates.length > 0 && (
                  <div className="space-y-2">
                    {certificates.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Award className="w-4 h-4 text-success" />
                          <div>
                            <p className="text-sm font-medium text-foreground">{cert.name}</p>
                            <p className="text-xs text-muted-foreground">{formatFileSize(cert.size)}</p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("certificate", index)}
                          className="text-error hover:text-error"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <LinkIcon className="w-5 h-5 text-google-blue" />
                  <Label className="text-sm font-medium">Professional Links (Optional)</Label>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="linkedin" className="text-xs text-muted-foreground flex items-center">
                      <Linkedin className="w-3 h-3 mr-1" />
                      LinkedIn Profile
                    </Label>
                    <Input
                      id="linkedin"
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={socialLinks.linkedin}
                      onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="github" className="text-xs text-muted-foreground flex items-center">
                      <Github className="w-3 h-3 mr-1" />
                      GitHub Profile
                    </Label>
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={socialLinks.github}
                      onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="portfolio" className="text-xs text-muted-foreground flex items-center">
                      <Globe className="w-3 h-3 mr-1" />
                      Portfolio Website
                    </Label>
                    <Input
                      id="portfolio"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={socialLinks.portfolio}
                      onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                      className="h-10"
                    />
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
                  {isLoading ? "Processing..." : "Complete Setup"}
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