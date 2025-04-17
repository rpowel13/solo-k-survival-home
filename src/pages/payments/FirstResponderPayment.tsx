
import React from 'react';
import { PaymentPage } from '@/components/payment/PaymentPage';

const FirstResponderPayment = () => {
  // Payment details
  const paymentDetails = {
    title: "First Responder Package",
    description: "Complete LLC Creation and Solo 401k Setup for First Responders",
    amount: 1795,
    paymentType: "First Responder Package",
    features: [
      "LLC Formation with State Filing",
      "Solo 401k Plan Documentation",
      "IRS Compliance Review",
      "EIN Application Assistance",
      "Priority Processing",
      "First Responder Benefits Package",
      "Dedicated Support"
    ],
    paymentLink: "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=First%20Responder%20Package&amount=1795&v_currency=USD"
  };

  return <PaymentPage {...paymentDetails} />;
};

export default FirstResponderPayment;
