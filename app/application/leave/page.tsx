'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicationForm } from '@/app/lib/types';
import Button from '@/app/components/ui/button';
import RadioButton from '@/app/components/ui/radioButton';
import DatePicker from '@/app/components/ui/datePicker';
import { dateStepSchema } from '@/app/lib/schemas';


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


const LeaveDetails = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<LeaveForm>();
  
  const onSubmit: SubmitHandler<LeaveForm> = (data) => {
    clearErrors();

    const result = dateStepSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0];

        if (
          field === 'leaveStartDate' ||
          field === 'leaveEndDate' ||
          field === 'leaveRatio'
        ) {
          setError(field, { message: issue.message });
        }
      });

      return;
    }

    console.log(result.data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-700">
          Enter the requested leave period. End date must be after start date and within 12 months.
        </p>
      </div>

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
            title='Leave Ratio'
            error={errors.leaveRatio?.message}
            {...register('leaveRatio')}
        />
      <Button variant="primary" label={isSubmitting ? "Submitting..." : "Next"} />
    </form>
  );
};

export default LeaveDetails;
