'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicationForm, employmentOptions } from '@/app/lib/types';
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import Checkbox from '@/app/components/ui/checkbox';
import RadioButton from '@/app/components/ui/radioButton';


type PartnerForm = Pick<ApplicationForm, 'hasPartner' | 'partner'>;

const PartnerDetails = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<PartnerForm>();
  
  const onSubmit: SubmitHandler<PartnerForm> = (data) => {
    console.log(data);
  };
  
  const checked: boolean = watch('hasPartner');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Checkbox
        label="I have a partner"
        error={errors.hasPartner?.message}
        {...register('hasPartner')}
      />
      {checked && 
        <div>
          <Input
            label="Partner Full Name"
            placeholder="Partner Full Name"
            error={errors.partner?.fullName?.message}
            {...register('partner.fullName')}
          />
          <Input
            label="Partner Kennitala"
            placeholder="Partner Kennitala"
            error={errors.partner?.kennitala?.message}
            {...register('partner.kennitala')}
          />
          <RadioButton 
            radioInfos={employmentOptions}
            error={errors.partner?.employmentType?.message}
            {...register('partner.employmentType')}
          />
        </div>
      }
      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Proceed"} />
    </form>
  );
};

export default PartnerDetails;

