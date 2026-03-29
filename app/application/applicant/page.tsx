'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '@/app/components/ui/input';
import { ApplicationForm } from '@/app/lib/types';
import Button from '@/app/components/ui/button';

const ApplicationInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<ApplicationForm>();

  const onSubmit: SubmitHandler<ApplicationForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Full name"
        placeholder="Full name"
        error={errors.applicant?.fullName?.message}
        {...register('applicant.fullName')}
      />

      <Input
        label="Kennitala"
        placeholder="Kennitala"
        error={errors.applicant?.kennitala?.message}
        {...register('applicant.kennitala')}
      />

      <Input
        label="Address"
        placeholder="Address"
        error={errors.applicant?.address?.message}
        {...register('applicant.address')}
      />

      <Input
        label="Email"
        placeholder="Email"
        error={errors.applicant?.email?.message}
        {...register('applicant.email')}
      />

      <Input
        label="Phone number"
        placeholder="Phone number"
        error={errors.applicant?.phoneNumber?.message}
        {...register('applicant.phoneNumber')}
      />

      <Button variant='primary' label={isSubmitting ? 'Submitting...' : 'Next Step'} />
    </form>
  );
};

export default ApplicationInformation;