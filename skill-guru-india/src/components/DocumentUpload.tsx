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

      <Layout 
        showProgress 
        currentStep={3} 
        totalSteps={3}
        stepLabels={["Personal Info", "Career Info", "Documents"]}
      >
        <div className="max-w-4xl mx-auto">
          {/* Google Material Progress Indicator */}
          <div className="mb-12">
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {["Personal Info", "Career Info", "Documents"].map((label, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === 3;
                  const isCompleted = stepNumber < 3;

                  return (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg' 
                            : isActive 
                              ? 'bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg ring-4 ring-blue-100' 
                              : 'bg-gray-200 border-2 border-gray-300'
                        }`}>
                          {isCompleted ? (
                            <span className="material-icons text-white text-lg">check</span>
                          ) : (
                            <span className={`font-medium ${
                              isActive ? 'text-white' : 'text-gray-500'
                            }`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
                              {stepNumber}
                            </span>
                          )}
                        </div>
                        <span className={`mt-2 text-sm font-medium ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`} style={{ fontFamily: 'Roboto, sans-serif' }}>
                          {label}
                        </span>
                      </div>
                      {index < 2 && (
                        <div className={`w-20 h-0.5 mx-6 transition-all duration-300 ${
                          stepNumber < 3 ? 'bg-green-400' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Google Drive-inspired Upload Card */}
          <Card className="border-0 rounded-3xl shadow-lg bg-white overflow-hidden">
            <CardHeader className="text-center p-12 bg-gradient-to-br from-green-50 to-blue-50 border-b border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="material-icons text-white text-3xl">cloud_upload</span>
              </div>
              <CardTitle 
                className="text-3xl font-medium text-gray-900 mb-4"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Upload Documents
              </CardTitle>
              <CardDescription 
                className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              >
                Upload your resume and any relevant certificates to complete your profile. 
                <span className="font-medium text-blue-600"> All files are securely stored</span>.
              </CardDescription>
            </CardHeader>

            <CardContent className="p-12">
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Resume Upload - Google Drive Style */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-red-600 text-lg">description</span>
                    </div>
                    <Label 
                      className="text-xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Resume * (PDF or DOC)
                    </Label>
                  </div>
                  
                  {!resumeFile ? (
                    <div
                      className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer group ${
                        isDragging 
                          ? "border-blue-500 bg-blue-50" 
                          : "border-gray-300 hover:border-blue-400 hover:bg-blue-50/50"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, "resume")}
                      onClick={() => resumeInputRef.current?.click()}
                    >
                      {/* Google Drive-style upload animation */}
                      <div className="relative">
                        <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
                          <span className="material-icons text-white text-3xl">cloud_upload</span>
                        </div>
                        
                        {/* Background decoration */}
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
                      </div>

                      <div className="space-y-3">
                        <h3 
                          className="text-xl font-medium text-gray-900"
                          style={{ fontFamily: 'Google Sans, sans-serif' }}
                        >
                          Drag and drop your resume here
                        </h3>
                        <p 
                          className="text-gray-600"
                          style={{ fontFamily: 'Roboto, sans-serif' }}
                        >
                          or <span className="text-blue-600 font-medium">click to browse</span> from your device
                        </p>
                        <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 mt-6">
                          <div className="flex items-center space-x-1">
                            <span className="material-icons text-sm">description</span>
                            <span>PDF, DOC, DOCX</span>
                          </div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="flex items-center space-x-1">
                            <span className="material-icons text-sm">data_usage</span>
                            <span>Max 10MB</span>
                          </div>
                        </div>
                      </div>
                      
                      <input
                        ref={resumeInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileInput(e, "resume")}
                      />
                    </div>
                  ) : (
                    <div className="p-6 bg-green-50 border-2 border-green-200 rounded-2xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                            <span className="material-icons text-white">check_circle</span>
                          </div>
                          <div>
                            <p 
                              className="font-medium text-gray-900 text-lg"
                              style={{ fontFamily: 'Google Sans, sans-serif' }}
                            >
                              {resumeFile.name}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>{formatFileSize(resumeFile.size)}</span>
                              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                              <span className="flex items-center space-x-1">
                                <span className="material-icons text-sm text-green-600">cloud_done</span>
                                <span>Uploaded successfully</span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile("resume")}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-10 w-10"
                        >
                          <span className="material-icons">delete</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Certificates Upload - Google Drive Style */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-yellow-600 text-lg">workspace_premium</span>
                    </div>
                    <Label 
                      className="text-xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Certificates (Optional)
                    </Label>
                  </div>
                  
                  <div
                    className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 cursor-pointer group ${
                      isDragging 
                        ? "border-green-500 bg-green-50" 
                        : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, "certificates")}
                    onClick={() => certificatesInputRef.current?.click()}
                  >
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md transition-all duration-300 ${isDragging ? 'scale-110' : 'group-hover:scale-105'}`}>
                      <span className="material-icons text-white text-xl">workspace_premium</span>
                    </div>
                    <h3 
                      className="text-lg font-medium text-gray-900 mb-2"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Upload certificates and achievements
                    </h3>
                    <p 
                      className="text-gray-600 mb-4"
                      style={{ fontFamily: 'Roboto, sans-serif' }}
                    >
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
                    <div className="space-y-4">
                      <h4 
                        className="text-lg font-medium text-gray-900"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        Uploaded Certificates ({certificates.length})
                      </h4>
                      <div className="grid gap-4">
                        {certificates.map((cert, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="material-icons text-green-600 text-lg">workspace_premium</span>
                              </div>
                              <div>
                                <p 
                                  className="font-medium text-gray-900"
                                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                                >
                                  {cert.name}
                                </p>
                                <p 
                                  className="text-sm text-gray-600"
                                  style={{ fontFamily: 'Roboto, sans-serif' }}
                                >
                                  {formatFileSize(cert.size)}
                                </p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile("certificate", index)}
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full h-8 w-8"
                            >
                              <span className="material-icons text-sm">close</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="material-icons text-blue-600 text-lg">link</span>
                    </div>
                    <Label 
                      className="text-xl font-medium text-gray-900"
                      style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                      Professional Links (Optional)
                    </Label>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label 
                        htmlFor="linkedin" 
                        className="flex items-center text-base font-medium text-gray-700"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <div className="w-6 h-6 bg-blue-700 rounded mr-2 flex items-center justify-center">
                          <span className="material-icons text-white text-sm">work</span>
                        </div>
                        LinkedIn Profile
                      </Label>
                      <Input
                        id="linkedin"
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={socialLinks.linkedin}
                        onChange={(e) => handleSocialLinkChange("linkedin", e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white shadow-sm"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label 
                        htmlFor="github" 
                        className="flex items-center text-base font-medium text-gray-700"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <div className="w-6 h-6 bg-gray-900 rounded mr-2 flex items-center justify-center">
                          <span className="material-icons text-white text-sm">code</span>
                        </div>
                        GitHub Profile
                      </Label>
                      <Input
                        id="github"
                        type="url"
                        placeholder="https://github.com/yourusername"
                        value={socialLinks.github}
                        onChange={(e) => handleSocialLinkChange("github", e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white shadow-sm"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                    </div>

                    <div className="space-y-3">
                      <Label 
                        htmlFor="portfolio" 
                        className="flex items-center text-base font-medium text-gray-700"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                      >
                        <div className="w-6 h-6 bg-green-500 rounded mr-2 flex items-center justify-center">
                          <span className="material-icons text-white text-sm">public</span>
                        </div>
                        Portfolio Website
                      </Label>
                      <Input
                        id="portfolio"
                        type="url"
                        placeholder="https://yourportfolio.com"
                        value={socialLinks.portfolio}
                        onChange={(e) => handleSocialLinkChange("portfolio", e.target.value)}
                        className="h-12 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 bg-white shadow-sm"
                        style={{ fontFamily: 'Roboto, sans-serif' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    className="flex-1 h-14 rounded-2xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 text-lg"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    <span className="material-icons mr-2">arrow_back</span>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 h-14 rounded-2xl bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                    disabled={!isFormValid || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Setup
                        <span className="material-icons ml-2">check_circle</span>
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Google-style Security Notice */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
              <span className="material-icons text-green-500 text-sm">shield</span>
              <span style={{ fontFamily: 'Roboto, sans-serif' }}>
                Your files are securely encrypted and stored following Google's security standards
              </span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
