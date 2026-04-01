'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import RadioButton from '@/app/components/ui/radioButton';
import { ApplicationForm, employmentOptions } from '@/app/lib/types';
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import { employmentStepSchema } from '@/app/lib/schemas';
import { useRouter } from 'next/navigation';


type EmploymentForm = Pick<ApplicationForm, 'employmentType' | 'employerName' | 'employmentRatio' | 'companyName'>;

const EmploymentDetails = () => {
  const router = useRouter();
  const {
    register,
    watch,
    setError,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<EmploymentForm>();
  
  const onSubmit: SubmitHandler<EmploymentForm> = (data) => {
    clearErrors();
    const result = employmentStepSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          field === 'employmentType' ||
          field === 'employerName' ||
          field === 'employmentRatio' ||
          field === 'companyName'
        ) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    router.push('/application/partner');
    console.log(result.data);
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
          {...register('employmentRatio', { valueAsNumber: true })}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-5 text-2xl font-semibold text-slate-700">Step 2</div>
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-700">
          Select the current employment status. Only relevant fields are required.
        </p>
      </div>

      <RadioButton 
        radioInfos={employmentOptions}
        title='Employment Status'
        error={errors.employmentType?.message}
        {...register('employmentType')}
      />
      <div className="space-y-5">{extraFields}</div>
      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Proceed"} />
    </form>
  );
};

export default EmploymentDetails;
