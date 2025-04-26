
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

interface BenefitsFormValues {
  title: string;
  subtitle: string;
  benefits: string[];
}

interface ArticleBenefitsEditorProps {
  initialTitle?: string;
  initialSubtitle?: string;
  initialBenefits?: string[];
  onSave: (values: BenefitsFormValues) => void;
}

const ArticleBenefitsEditor = ({
  initialTitle = "Key Benefits",
  initialSubtitle = "Learn about these important advantages:",
  initialBenefits = Array(6).fill("").map((_, i) => `Benefit ${i + 1}`),
  onSave
}: ArticleBenefitsEditorProps) => {
  const [benefits, setBenefits] = useState<string[]>(initialBenefits.slice(0, 6));
  
  const form = useForm<BenefitsFormValues>({
    defaultValues: {
      title: initialTitle,
      subtitle: initialSubtitle,
      benefits: benefits
    }
  });

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
    form.setValue("benefits", newBenefits);
  };

  const handleSubmit = (data: BenefitsFormValues) => {
    onSave({
      ...data,
      benefits: benefits
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit Article Benefits</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter section title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Section Subtitle</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter section subtitle" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="space-y-2">
            <h3 className="text-md font-medium">Benefits (Maximum 6)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <FormItem key={index}>
                  <FormLabel>Benefit {index + 1}</FormLabel>
                  <FormControl>
                    <Input 
                      value={benefit}
                      onChange={(e) => updateBenefit(index, e.target.value)}
                      placeholder={`Enter benefit ${index + 1}`}
                    />
                  </FormControl>
                </FormItem>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default ArticleBenefitsEditor;
