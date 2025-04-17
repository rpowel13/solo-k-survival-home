
import React, { useState } from 'react';
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const CTASection = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-survival-800 to-survival-900 text-white rounded-3xl p-8 md:p-12 shadow-xl max-w-5xl mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-2">
              Take Action Today
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Secure Your Financial Future?</h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Take control of your retirement with a Solo 401(k) plan designed specifically for self-employed individuals like you.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/apply/solo-401k">
                <Button size="lg" className="bg-white text-survival-800 hover:bg-gray-100">
                  Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                onClick={() => setIsSchedulerOpen(true)}
              >
                Schedule a Consultation
              </Button>
            </div>
            
            <p className="text-sm opacity-80 mt-6">
              No commitment required. Our retirement specialists are ready to answer your questions.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={isSchedulerOpen} onOpenChange={setIsSchedulerOpen}>
        <DialogContent className="sm:max-w-[800px] md:max-w-[900px] p-0 overflow-hidden">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Schedule a Consultation</DialogTitle>
          </DialogHeader>
          <iframe 
            src="https://www.vcita.com/widgets/scheduler/izk040b42jnjcf3c?frontage_iframe=true" 
            width="100%" 
            height="508" 
            frameBorder="0"
          >
            <p>Use my online scheduling page by vcita to schedule an appointment with me:</p>
            <a href='https://www.vcita.com/v/izk040b42jnjcf3c/online_scheduling?frontage_iframe=true&invite=vr_sched_pb-izk040b42jnjcf3c'>
              Online Scheduling with Survival 401k, LLC
            </a>
          </iframe>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CTASection;
