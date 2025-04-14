
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { SoloFormValues } from './FormSchema';
import TrusteeFields from './TrusteeFields';
import ParticipantFields from './ParticipantFields';
import AdditionalInfoFields from './AdditionalInfoFields';

interface PlanInfoFieldsProps {
  form: UseFormReturn<SoloFormValues>;
}

const PlanInfoFields = ({ form }: PlanInfoFieldsProps) => {
  return (
    <>
      <TrusteeFields form={form} />
      <ParticipantFields form={form} />
      <AdditionalInfoFields form={form} />
      {/* Removed duplicate AgreementSection */}
    </>
  );
};

export default PlanInfoFields;

