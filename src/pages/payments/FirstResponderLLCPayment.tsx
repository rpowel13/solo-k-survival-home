
import React from 'react';
import { PaymentPage } from '@/components/payment/PaymentPage';
import { firstResponderLLCConfig } from '@/utils/paymentConfigs';

const FirstResponderLLCPayment = () => {
  return <PaymentPage {...firstResponderLLCConfig} />;
};

export default FirstResponderLLCPayment;

