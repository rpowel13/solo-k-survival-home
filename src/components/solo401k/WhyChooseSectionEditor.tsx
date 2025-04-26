
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface Benefit {
  text: string;
}

interface WhyChooseSectionEditorProps {
  initialBenefits?: Benefit[];
  onSave: (benefits: Benefit[]) => void;
}

const WhyChooseSectionEditor = ({ initialBenefits = [], onSave }: WhyChooseSectionEditorProps) => {
  const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits);

  const addBenefit = () => {
    setBenefits([...benefits, { text: "" }]);
  };

  const updateBenefit = (index: number, text: string) => {
    const newBenefits = [...benefits];
    newBenefits[index].text = text;
    setBenefits(newBenefits);
  };

  const removeBenefit = (index: number) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validBenefits = benefits.filter(benefit => benefit.text.trim() !== "");
    onSave(validBenefits);
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Edit Benefits</h3>
      <div className="space-y-2">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex gap-2">
            <Input
              value={benefit.text}
              onChange={(e) => updateBenefit(index, e.target.value)}
              placeholder="Enter benefit text..."
              className="flex-1"
            />
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeBenefit(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={addBenefit}>
          Add Benefit
        </Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default WhyChooseSectionEditor;
