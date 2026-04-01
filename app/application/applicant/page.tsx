'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicantForm } from '@/app/lib/types';
import { applicantSchema } from '@/app/lib/schemas';
import Input from '@/app/components/ui/input';
import Button from '@/app/components/ui/button';

const ApplicationInformation = () => {
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
    // router.push('/application/employment')
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
