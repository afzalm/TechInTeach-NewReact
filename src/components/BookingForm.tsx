import { useState } from 'react';
import { Calendar, Users, School, Globe, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const BookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    program: '',
    participants: '',
    trainingMode: '',
    preferredDate: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (field) => (value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://techinteach.com/admin_login/api/send_email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'booking',
          ...formData
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        toast.success("Training request submitted successfully!", {
          description: "We'll contact you shortly to confirm your booking.",
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          institution: '',
          program: '',
          participants: '',
          trainingMode: '',
          preferredDate: '',
          message: ''
        });
      } else {
        toast.error("Failed to submit request", {
          description: "Please try again later.",
        });
      }
    } catch (error) {
      toast.error("An error occurred", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="john@example.com" 
              required 
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+91 98765 43210" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="institution">Institution Name</Label>
            <Input 
              id="institution"
              value={formData.institution}
              onChange={handleInputChange}
              placeholder="School or Organization" 
              required 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="program">Training Program</Label>
          <Select onValueChange={handleSelectChange('program')} value={formData.program} required>
            <SelectTrigger id="program">
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="design-thinking">Design Thinking for Educators</SelectItem>
              <SelectItem value="engaging-classrooms">Creating Engaging Classrooms with Technology</SelectItem>
              <SelectItem value="ai-teaching">Teaching Strategies with AI</SelectItem>
              <SelectItem value="innovation-ambassador">School Innovation Ambassador Program</SelectItem>
              <SelectItem value="google-certified">Google Certified Educator Training</SelectItem>
              <SelectItem value="microsoft-educator">Microsoft Educator Training</SelectItem>
              <SelectItem value="apple-teacher">Apple Teacher Training</SelectItem>
              <SelectItem value="adobe-creative">Adobe Creative Educator Training</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="participants">Expected Participants</Label>
            <Select onValueChange={handleSelectChange('participants')} value={formData.participants} required>
              <SelectTrigger id="participants">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 participants</SelectItem>
                <SelectItem value="11-25">11-25 participants</SelectItem>
                <SelectItem value="26-50">26-50 participants</SelectItem>
                <SelectItem value="51-100">51-100 participants</SelectItem>
                <SelectItem value="100+">More than 100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="training-mode">Training Mode</Label>
            <Select onValueChange={handleSelectChange('trainingMode')} value={formData.trainingMode} required>
              <SelectTrigger id="training-mode">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="online">Online Session</SelectItem>
                <SelectItem value="on-site">On-site at our Institution</SelectItem>
                <SelectItem value="hybrid">Hybrid (Online + On-site)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="preferred-date">Preferred Date</Label>
          <Input 
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={handleInputChange}
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Additional Requirements</Label>
          <Textarea 
            id="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about any specific training needs or requirements..." 
            rows={4}
          />
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-tech-600 hover:bg-tech-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Request Training Session"}
      </Button>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>We usually respond to training requests within 24-48 hours.</p>
      </div>
    </form>
  );
};