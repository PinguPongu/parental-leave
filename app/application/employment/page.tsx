'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import Input from '@/app/components/ui/input';
import { ApplicationForm } from '@/app/lib/types';
import Button from '@/app/components/ui/button';

const EmploymentDetails = () => {
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
      <input type="radio" name="season" value="winter" id="winter" defaultChecked />
      <label htmlFor="winter">Winter</label>

      <input type="radio" name="season" value="spring" id="spring" />
      <label htmlFor="spring">Spring</label>

      <input type="radio" name="season" value="summer" id="summer" />
      <label htmlFor="summer">Summer</label>

      <input type="radio" name="season" value="autumn" id="autumn" />
      <label htmlFor="autumn">Autumn</label>

      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Next Step"} />
    </form>
  );
};

export default EmploymentDetails;