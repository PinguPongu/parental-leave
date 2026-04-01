'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '@/app/components/ui/input';
import { ApplicantForm } from '@/app/lib/types';
import Button from '@/app/components/ui/button';

const ApplicationInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<ApplicantForm>();

  const onSubmit: SubmitHandler<ApplicantForm> = (data) => {
    console.log(data);
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