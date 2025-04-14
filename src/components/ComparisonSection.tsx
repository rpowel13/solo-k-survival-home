
import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  const comparisonData = [
    {
      feature: "2024 Contribution Limit",
      solo401k: "$69,000",
      sepIra: "$66,000",
      simpleIra: "$30,500",
      traditionalIra: "$7,000",
      highlight: true
    },
    {
      feature: "Catch-up Contributions (Age 50+)",
      solo401k: "$7,500",
      sepIra: "$0",
      simpleIra: "$3,500",
      traditionalIra: "$1,000",
      highlight: false
    },
    {
      feature: "Roth Option Available",
      solo401k: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      sepIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      simpleIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      traditionalIra: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      highlight: true
    },
    {
      feature: "Loan Provisions",
      solo401k: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      sepIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      simpleIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      traditionalIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      highlight: false
    },
    {
      feature: "Employer Contribution Allowed",
      solo401k: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      sepIra: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      simpleIra: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      traditionalIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      highlight: false
    },
    {
      feature: "Employee Contribution Allowed",
      solo401k: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      sepIra: <X className="h-5 w-5 text-red-500 mx-auto" />,
      simpleIra: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      traditionalIra: <Check className="h-5 w-5 text-green-600 mx-auto" />,
      highlight: false
    },
    {
      feature: "Asset Protection Level",
      solo401k: "Excellent",
      sepIra: "Good",
      simpleIra: "Good",
      traditionalIra: "Limited",
      highlight: true
    }
  ];

  return (
    <section id="comparison" className="bg-white section-padding">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="section-title">How Does a Solo 401(k) Compare?</h2>
          <p className="text-gray-600 text-lg">
            See how our Solo 401(k) plans stack up against other retirement options for self-employed individuals.
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 border-b-2 border-gray-200">Features</th>
                <th className="p-4 bg-survival-50 text-survival-900 border-b-2 border-survival-200 text-center">
                  Solo 401(k)
                  <div className="text-xs font-normal text-survival-700">Survival 401k</div>
                </th>
                <th className="p-4 bg-gray-50 border-b-2 border-gray-200 text-center">SEP IRA</th>
                <th className="p-4 bg-gray-50 border-b-2 border-gray-200 text-center">SIMPLE IRA</th>
                <th className="p-4 bg-gray-50 border-b-2 border-gray-200 text-center">Traditional IRA</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index} className={row.highlight ? "bg-survival-50" : ""}>
                  <td className="text-left p-4 border-b border-gray-200 font-medium">{row.feature}</td>
                  <td className={`text-center p-4 border-b border-gray-200 ${row.highlight ? "font-semibold text-survival-900" : ""}`}>
                    {row.solo401k}
                  </td>
                  <td className="text-center p-4 border-b border-gray-200">{row.sepIra}</td>
                  <td className="text-center p-4 border-b border-gray-200">{row.simpleIra}</td>
                  <td className="text-center p-4 border-b border-gray-200">{row.traditionalIra}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          * Contribution limits shown are for 2024 and subject to change based on IRS guidelines.
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
