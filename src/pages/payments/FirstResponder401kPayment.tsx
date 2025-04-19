
import React from 'react';
import { PaymentPage } from '@/components/payment/PaymentPage';

const FirstResponder401kPayment = () => {
  const paymentDetails = {
    title: "First Responder Solo 401k",
    description: "Solo 401k Setup for First Responders",
    amount: 1095,
    paymentType: "First Responder Solo 401k Package",
    features: [
      "Pension Complement Strategy",
      "High Contribution Limits",
      "Tax-Advantaged Savings",
      "Priority Processing",
      "First Responder Benefits Package",
      "Dedicated Support"
    ],
    paymentLink: "https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=First%20Responder%20401k%20Package&amount=1095&v_currency=USD"
  };

  return <PaymentPage {...paymentDetails} />;
};

export default FirstResponder401kPayment;
