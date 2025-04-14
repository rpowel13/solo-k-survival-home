
import { PaymentPage } from '@/components/payment/PaymentPage';

const ReinstatementFeePayment = () => {
  const features = [
    "Full reinstatement of your Solo 401k plan",
    "Updating all necessary documentation",
    "Review of plan status with IRS",
    "Confirmation of compliance",
    "Personalized guidance through the reinstatement process"
  ];

  return (
    <PaymentPage
      title="Solo 401k Plan Reinstatement"
      description="Reinstate your Solo 401k plan and bring it back into good standing with this one-time payment."
      amount={250}
      paymentType="Reinstatement Fee"
      features={features}
      paymentLink="https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=Plan%20Reinstatement%20Fee&amount=250&v_currency=USD"
    />
  );
};

export default ReinstatementFeePayment;
