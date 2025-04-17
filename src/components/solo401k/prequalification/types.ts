
export type Question = {
  id: string;
  text: string;
  helpText?: string;
};

export type Result = 'eligible' | 'not-eligible' | 'maybe-eligible' | null;
