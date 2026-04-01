'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import RadioButton from '@/app/components/ui/radioButton';
import { ApplicationForm, employmentOptions } from '@/app/lib/types';
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';


type EmploymentForm = Pick<ApplicationForm, 'employmentType' | 'employerName' | 'employmentRatio' | 'companyName'>;

const EmploymentDetails = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<EmploymentForm>();
  
  const onSubmit: SubmitHandler<EmploymentForm> = (data) => {
    console.log(data);
  };
  
  const selectedEmploymentType = watch('employmentType');
  let extraFields = null;

  if (selectedEmploymentType === "Employed") {
    extraFields = (
      <div>
        <Input
          label="Employer Name"
          placeholder="Employer Name"
          error={errors.employerName?.message}
          {...register('employerName')}
        />
        <Input
          label="Employement Ratio"
          placeholder="Employement Ratio"
          error={errors.employmentRatio?.message}
          type='number'
          {...register('employmentRatio')}
        />
      </div>
    )
  } else if (selectedEmploymentType === "Self-employed") {
    extraFields = (
      <Input
        label="Company Name"
        placeholder="Company Name"
        error={errors.companyName?.message}
        {...register('companyName')}
      />
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RadioButton 
        radioInfos={employmentOptions}
        error={errors.employmentType?.message}
        {...register('employmentType')}
      />
      {extraFields}
      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Proceed"} />
    </form>
  );
};

export default EmploymentDetails;