'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { ApplicationForm } from '../lib/types';

import { zodResolver } from '@hookform/resolvers/zod';



export default function ApplicationLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const form = useForm<ApplicationForm>({
    // mode: "onSubmit",
    // reValidateMode: "onSubmit",
  });
  
  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
}
