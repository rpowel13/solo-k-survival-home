
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import PrequalificationQuiz from '../solo401k/prequalification/PrequalificationQuiz';
import { Question } from '../solo401k/prequalification/types';

const questions: Question[] = [
  {
    id: 'self_employment_income',
    text: 'Do you have self-employment income?',
    helpText: 'This includes income from your own business, freelancing, consulting, or other self-employed activities.',
  },
  {
    id: 'no_full_time_employees',
    text: 'Does your business have any full-time employees other than yourself or your spouse?',
    helpText: 'Full-time employees are those who work 1,000 hours or more per year (about 20 hours per week).',
  },
  {
    id: 'business_type',
    text: 'Is your business structured as a sole proprietorship, LLC, partnership, or corporation?',
    helpText: 'Most business entities qualify, but the structure may affect contribution options.',
  },
  {
    id: 'earned_income',
    text: 'Will you have earned income this year from your business?',
    helpText: 'You need earned income to make contributions to a Solo 401k.',
  },
];

const HeroContent: React.FC = () => {
  return (
    <div className="pt-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white bg-survival-700 bg-opacity-80 p-4 rounded-lg shadow-lg">
        Retirement Plans for Entrepreneurs & First Responders
      </h1>
      <p className="mt-4 text-xl text-gray-200 bg-survival-900 bg-opacity-50 p-3 rounded-md text-left">
        Smart Money Solutions for Entrepreneurs & First Responders to build wealth, invest wisely, and secure their future.
      </p>
      
      <div className="mt-6 flex flex-col gap-3 items-center md:items-start">
        <Link to="/services/solo-401k">
          <Button className="bg-white text-survival-800 hover:bg-gray-100 shadow-md">
            Get Started Now!
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="link" className="text-gray-200 hover:text-white text-sm">
              Check if you qualify →
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96">
            <PrequalificationQuiz questions={questions} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default HeroContent;
