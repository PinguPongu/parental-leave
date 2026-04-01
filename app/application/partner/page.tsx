'use client';

import { SubmitHandler, useFormContext } from 'react-hook-form';
import { ApplicationForm, employmentOptions } from '@/app/lib/types';
import { partnerStepSchema } from '@/app/lib/schemas';
import Button from '@/app/components/ui/button';
import Input from '@/app/components/ui/input';
import Checkbox from '@/app/components/ui/checkbox';
import RadioButton from '@/app/components/ui/radioButton';
import { useRouter } from 'next/navigation';


type PartnerForm = Pick<ApplicationForm, 'hasPartner' | 'partner'>;

const PartnerDetails = () => {
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useFormContext<PartnerForm>();

  const onSubmit: SubmitHandler<PartnerForm> = (data) => {
    clearErrors();

    const result = partnerStepSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');

        if (path === 'hasPartner') {
          setError('hasPartner', { message: issue.message });
        }

        if (path === 'partner') {
          setError('partner', { message: issue.message });
        }

        if (path === 'partner.fullName') {
          setError('partner.fullName', { message: issue.message });
        }

        if (path === 'partner.kennitala') {
          setError('partner.kennitala', { message: issue.message });
        }

        if (path === 'partner.employmentType') {
          setError('partner.employmentType', { message: issue.message });
        }
      });
      return;
    }

    console.log(result.data);
    router.push('/application/leave')
  };

  const checked = !!watch('hasPartner');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="mb-5 text-2xl font-semibold text-slate-700">Step 3</div>
      <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-700">
          Declare partner information only if the applicant has a registered partner.
        </p>
      </div>

      <Checkbox
        label="I have a partner"
        error={errors.hasPartner?.message}
        {...register('hasPartner')}
      />

      {checked && (
        <div className="space-y-5 rounded-md border border-slate-200 bg-slate-50 p-4">
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
            title='Partner Employment'
            error={errors.partner?.employmentType?.message}
            {...register('partner.employmentType')}
          />
        </div>
      )}

      <Button variant="primary" label={isSubmitting ? 'Submitting...' : 'Proceed'} />
    </form>
  );
};

export default PartnerDetails;
