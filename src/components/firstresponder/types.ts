
import { z } from 'zod';
import { formSchema as llcFormSchema } from '@/components/llc/FormSchema';
import { formSchema as solo401kFormSchema } from '@/components/solo401k/FormSchema';
import { useForm } from 'react-hook-form';

export type Step = 'llc' | '401k';

// Form props interfaces
export interface LLCFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof llcFormSchema>>>;
}

export interface Solo401kFormProps {
  form: ReturnType<typeof useForm<z.infer<typeof solo401kFormSchema>>>;
}
