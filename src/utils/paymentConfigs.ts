
interface PaymentConfig {
  title: string;
  description: string;
  amount: number;
  paymentType: string;
  features: string[];
  paymentLink: string;
}

export const generatePaymentLink = (title: string, amount: number): string => {
  const encodedTitle = encodeURIComponent(title);
  return `https://live.vcita.com/site/izk040b42jnjcf3c/make-payment?title=${encodedTitle}&amount=${amount}&v_currency=USD`;
};

export const firstResponderLLCConfig: PaymentConfig = {
  title: "First Responder LLC Formation",
  description: "LLC Formation Package for First Responders",
  amount: 715,
  paymentType: "First Responder LLC Package",
  features: [
    "Professional Liability Protection",
    "Side Business Structuring",
    "Complete Formation Service",
    "Priority Processing",
    "First Responder Benefits Package",
    "Dedicated Support"
  ],
  get paymentLink() {
    return generatePaymentLink(this.paymentType, this.amount);
  }
};

