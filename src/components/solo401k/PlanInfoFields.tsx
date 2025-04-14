
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';
import TrusteeFields from './TrusteeFields';
import ParticipantFields from './ParticipantFields';

interface PlanInfoFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const PlanInfoFields = ({ form }: PlanInfoFieldsProps) => {
  return (
    <>
      <TrusteeFields form={form} />
      <ParticipantFields form={form} />
    </>
  );
};

export default PlanInfoFields;
