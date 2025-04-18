
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ScheduleConsultationForm from "@/components/ScheduleConsultationForm";

interface ConsultationSectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConsultationSection: React.FC<ConsultationSectionProps> = ({ isOpen, onOpenChange }) => {
  return (
    <div className="text-center mt-8">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Consultation</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-6">
        Want to discuss your retirement planning options in detail? Schedule a free 30-minute consultation with one of our Solo 401(k) specialists.
      </p>
      <Button 
        variant="outline" 
        size="lg" 
        className="bg-white"
        onClick={() => onOpenChange(true)}
      >
        Book a Free Consultation
      </Button>
      
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] md:max-w-[800px] p-6 z-50">
          <DialogHeader>
            <DialogTitle>Schedule a Free Consultation</DialogTitle>
            <DialogDescription>
              Select a date and time that works for you. Our specialist will call you at the scheduled time.
            </DialogDescription>
          </DialogHeader>
          <ScheduleConsultationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConsultationSection;
