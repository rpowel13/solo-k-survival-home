
import React from "react";
import { format, addWeeks, isBefore, isAfter } from "date-fns";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { ScheduleFormValues } from "./types";

interface DateSelectorProps {
  form: UseFormReturn<ScheduleFormValues>;
}

const DateSelector: React.FC<DateSelectorProps> = ({ form }) => {
  const today = new Date();
  const twoWeeksFromNow = addWeeks(today, 2);
  
  // Disable weekend days and past dates
  const disabledDays = (date: Date) => {
    const day = date.getDay();
    return (
      // Disable weekends (0 = Sunday, 6 = Saturday)
      day === 0 || 
      day === 6 || 
      // Disable past dates
      isBefore(date, today) ||
      // Disable dates more than 2 weeks in the future
      isAfter(date, twoWeeksFromNow)
    );
  };

  return (
    <FormField
      control={form.control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarClock className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 z-[100] pointer-events-auto" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={disabledDays}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateSelector;
