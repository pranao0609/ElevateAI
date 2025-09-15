import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail, ArrowLeft } from "lucide-react";

interface ForgotPasswordDialogProps {
  children: React.ReactNode;
}

const ForgotPasswordDialog = ({ children }: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Password reset failed:", error);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
    setEmail("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isSubmitted ? (
              <>
                <Mail className="h-5 w-5 text-primary" />
                Check Your Email
              </>
            ) : (
              "Reset Password"
            )}
          </DialogTitle>
          <DialogDescription>
            {isSubmitted ? (
              "We've sent password reset instructions to your email address."
            ) : (
              "Enter your email address and we'll send you a link to reset your password."
            )}
          </DialogDescription>
        </DialogHeader>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-start">
              <Button type="submit" className="w-full gradient-primary">
                Send Reset Link
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <DialogFooter className="sm:justify-start">
            <Button 
              onClick={handleClose}
              variant="outline" 
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign In
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordDialog;