
import React from 'react';
import { PaymentPage } from '@/components/payment/PaymentPage';

const FirstResponderLLCPayment = () => {
  const paymentDetails = {
    title: "First Responder LLC Formation",
    description: "LLC Formation Package for First Responders",
    amount: 699,
    paymentType: "First Responder LLC Package",
    features: [
      "Professional Liability Protection",
      "Side Business Structuring",
      "Complete Formation Service",
      "Priority Processing",
      "First Responder Benefits Package",
      "Dedicated Support"
    ],
    paymentLink: "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=First%20Responder%20LLC%20Package&amount=699&v_currency=USD"
  };

  return <PaymentPage {...paymentDetails} />;
};

export default FirstResponderLLCPayment;
