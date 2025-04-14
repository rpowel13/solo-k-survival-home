
import { PaymentPage } from '@/components/payment/PaymentPage';

const AnnualFeePayment = () => {
  const features = [
    "IRS compliance and reporting support",
    "Unlimited customer support",
    "Annual plan review",
    "Documentation updates",
    "Access to educational resources",
    "Priority customer service"
  ];

  return (
    <PaymentPage
      title="Solo 401k Annual Fee"
      description="Pay your annual fee to maintain your Solo 401k plan in good standing with IRS compliance and receive unlimited support."
      amount={200}
      paymentType="Annual Maintenance Fee"
      features={features}
      paymentLink="https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=Annual%20Fee&amount=200&v_currency=U"
    />
  );
};

export default AnnualFeePayment;
