
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Calculator, Printer } from "lucide-react";

interface Payment {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>('100000');
  const [interestRate, setInterestRate] = useState<string>('5');
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [payments, setPayments] = useState<Payment[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate) / 100;
    const monthlyRate = annualRate / 12;
    const termMonths = parseInt(loanTerm) * 12;

    const payment = (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                   (Math.pow(1 + monthlyRate, termMonths) - 1);
    
    setMonthlyPayment(payment);

    let balance = principal;
    const newPayments: Payment[] = [];

    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;

      newPayments.push({
        month,
        payment,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: balance > 0 ? balance : 0
      });
    }

    setPayments(newPayments);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="loanAmount">Loan Amount ($)</Label>
              <Input
                id="loanAmount"
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input
                id="interestRate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input
                id="loanTerm"
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <Button onClick={calculateLoan} className="w-full md:w-auto">
              <Calculator className="mr-2" />
              Calculate
            </Button>
          </div>
        </CardContent>
      </Card>

      {monthlyPayment > 0 && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-center mb-4">Monthly Payment: ${monthlyPayment.toFixed(2)}</h2>
              <div className="flex justify-end print:hidden">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="mr-2" />
                  Print Schedule
                </Button>
              </div>
              <div className="mt-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Principal</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Remaining Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.month}>
                        <TableCell>{payment.month}</TableCell>
                        <TableCell>${payment.payment.toFixed(2)}</TableCell>
                        <TableCell>${payment.principal.toFixed(2)}</TableCell>
                        <TableCell>${payment.interest.toFixed(2)}</TableCell>
                        <TableCell>${payment.remainingBalance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoanCalculator;
