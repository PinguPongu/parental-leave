'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { ApplicationForm } from '../lib/types';
import { usePathname } from 'next/navigation';

export default function ApplicationLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  const form = useForm<ApplicationForm>({
    // mode: "onSubmit",
    // reValidateMode: "onSubmit",
  });

  const stepTitles: Record<string, string> = {
    '/application/applicant': 'Applicant Information',
    '/application/employment': 'Employment Details',
    '/application/partner': 'Partner Information',
    '/application/leave': 'Leave Period',
    '/application/payment': 'Payment Details',
    '/application/documents': 'Documents',
    '/application/review': 'Review & Submit',
    '/application/confirmation': 'Confirmation',
  };

  const title = stepTitles[pathname] ?? 'Parental Leave Application';
  
  return (
    <FormProvider {...form}>
      <main className="mx-auto flex min-h-screen w-full max-w-4xl items-start px-4 py-8 sm:px-6 lg:py-12">
        <section className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg shadow-slate-200/60">
          <header className="border-b border-slate-200 bg-[linear-gradient(90deg,var(--gov-navy-950),var(--gov-navy-900))] px-6 py-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">íslenska ríkið kallinn minn</p>
            <h1 className="mt-2 text-2xl font-semibold">{title}</h1>
          </header>
          <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
        </section>
      </main>
    </FormProvider>
  );
}
