'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicationForm } from '@/app/lib/types';
import Button from '@/app/components/ui/button';
import RadioButton from '@/app/components/ui/radioButton';
import DatePicker from '@/app/components/ui/datePicker';


type LeaveForm = Pick<ApplicationForm, 'leaveStartDate' | 'leaveEndDate' | 'leaveRatio'>;

const leaveRatioOptions = [
  {
    id: '25',
    label: '25%',
    name: 'leaveRatio',
  },
  {
    id: '50',
    label: '50%',
    name: 'leaveRatio',
  },
  {
    id: '75',
    label: '75%',
    name: 'leaveRatio',
  },
  {
    id: '100',
    label: '100%',
    name: 'leaveRatio',
  },
];


const PartnerDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormContext<LeaveForm>();
  
  const onSubmit: SubmitHandler<LeaveForm> = (data) => {
    console.log(data);
    console.log("wtf");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <DatePicker 
          label='Start Date'
          error={errors.leaveStartDate?.message}
          {...register('leaveStartDate')}
        />
        <DatePicker 
          label='End Date'
          error={errors.leaveEndDate?.message}
          {...register('leaveEndDate')}
        />
        <RadioButton 
            radioInfos={leaveRatioOptions}
            error={errors.leaveRatio?.message}
            {...register('leaveRatio')}
        />
      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Next"} />
    </form>
  );
};

export default PartnerDetails;

