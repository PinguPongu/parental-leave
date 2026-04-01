'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicantForm } from '@/app/lib/types';
import { applicantSchema } from '@/app/lib/schemas';
import { useRouter } from 'next/navigation';
import Input from '@/app/components/ui/input';
import Button from '@/app/components/ui/button';


const ApplicationInformation = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useFormContext<ApplicantForm>();

  const onSubmit: SubmitHandler<ApplicantForm> = (data) => {
    clearErrors();
    const result = applicantSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          field === 'fullName' ||
          field === 'kennitala' ||
          field === 'address' ||
          field === 'email' ||
          field === 'phoneNumber'
        ) {
          setError(field, { message: issue.message });
        }
      });
      return;
    }

    console.log('valid applicant step', result.data);
    router.push('/application/employment')
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-5 text-2xl font-semibold text-slate-700">Step 1</div>
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-700">
          Enter the applicant details exactly as they appear in official records.
        </p>
      </div>

      <Input
        label="Full name"
        placeholder="Full name"
        error={errors.fullName?.message}
        {...register('fullName')}
      />

      <Input
        label="Kennitala"
        placeholder="Kennitala"
        error={errors.kennitala?.message}
        {...register('kennitala')}
      />

      <Input
        label="Address"
        placeholder="Address"
        error={errors.address?.message}
        {...register('address')}
      />

      <Input
        label="Email"
        placeholder="Email"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Phone number"
        placeholder="Phone number"
        error={errors.phoneNumber?.message}
        {...register('phoneNumber')}
      />

      <Button variant='primary' label={isSubmitting ? 'Submitting...' : 'Next Step'} />
    </form>
  );
};

export default ApplicationInformation;
