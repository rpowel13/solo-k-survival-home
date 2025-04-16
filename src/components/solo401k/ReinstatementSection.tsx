
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ReinstatementSection = () => {
  return (
    <section className="bg-gray-50 rounded-lg p-8 shadow-sm">
      <h2 className="text-2xl font-bold mb-4 text-center text-survival-800">Need to Reinstate Your Plan?</h2>
      <p className="text-center text-lg mb-6">
        If your Solo 401k plan needs to be reinstated, we can help you bring it back into good standing.
      </p>
      <div className="flex justify-center">
        <Link to="/payment/reinstatement-fee">
          <Button size="lg" className="bg-survival-600 hover:bg-survival-700 text-white font-medium">
            Pay Reinstatement Fee ($250)
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ReinstatementSection;
