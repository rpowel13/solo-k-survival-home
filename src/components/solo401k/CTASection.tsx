
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="text-center">
      <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-survival-800">Ready to Get Started?</h2>
        <p className="text-lg mb-6">
          Take the first step toward financial independence and retirement security with a Solo 401k.
        </p>
        <Link to="/apply/solo-401k">
          <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
            Apply for Your Solo 401k Today
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
