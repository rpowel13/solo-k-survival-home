
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Who is eligible for a Solo 401(k) plan?",
    answer: "Solo 401(k) plans are designed for self-employed individuals with no full-time employees except for a spouse. This includes sole proprietors, independent contractors, freelancers, and small business owners with no employees other than themselves and potentially their spouse."
  },
  {
    question: "How much can I contribute to a Solo 401(k)?",
    answer: "For 2024, you can contribute up to $23,000 as an employee contribution, plus up to 25% of your business compensation as an employer contribution, with a combined maximum of $69,000. If you're 50 or older, you can make an additional catch-up contribution of $7,500, bringing the total potential contribution to $76,500."
  },
  {
    question: "What's the difference between traditional and Roth Solo 401(k) contributions?",
    answer: "Traditional contributions are made pre-tax, reducing your current taxable income, with taxes paid upon withdrawal in retirement. Roth contributions are made with after-tax dollars, with qualified withdrawals in retirement being tax-free. You can choose either or a combination of both up to the contribution limits."
  },
  {
    question: "Can I roll over other retirement accounts into my Solo 401(k)?",
    answer: "Yes, you can generally roll over funds from previous employer 401(k) plans, traditional IRAs, and SEP IRAs into your Solo 401(k). This consolidation can make it easier to manage your retirement assets."
  },
  {
    question: "How do I set up a Solo 401(k) with Survival 401k?",
    answer: "Setting up a Solo 401(k) with Survival 401k is simple. We handle the paperwork and guide you through the process. You'll need to provide basic information about yourself and your business, choose your investment options, and make your initial contribution. The entire setup process typically takes 1-2 weeks."
  },
  {
    question: "What happens if I hire employees in the future?",
    answer: "If you hire full-time employees (working more than 1,000 hours per year) who are eligible for your plan, your Solo 401(k) would need to be converted to a traditional 401(k) plan, which would require additional compliance requirements and potentially higher administration costs. We can help with this transition if needed."
  },
  {
    question: "Can I take a loan from my Solo 401(k)?",
    answer: "Yes, Solo 401(k) plans typically allow participants to borrow up to 50% of the account balance, with a maximum of $50,000. Loans must generally be repaid within five years, with payments made at least quarterly. Interest paid on the loan goes back into your retirement account."
  },
  {
    question: "What are the filing requirements for a Solo 401(k)?",
    answer: "Once your Solo 401(k) plan assets exceed $250,000, you must file Form 5500-EZ annually with the IRS. Before reaching that threshold, there are generally no annual filing requirements. Survival 401k provides assistance with these filings as part of our service."
  }
];

const FAQSection = () => {
  return (
    <section id="faq" className="bg-gray-50 section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg">
            Get answers to common questions about Solo 401(k) plans and how they work.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-medium text-gray-900 py-4">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2 pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
