
// Create more efficient types with readonly properties to help with React memo optimization
export type Question = Readonly<{
  id: string;
  text: string;
  helpText?: string;
}>;

export type Result = 'eligible' | 'not-eligible' | 'maybe-eligible' | null;
