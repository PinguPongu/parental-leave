'use client'

import { FormProvider, useForm } from 'react-hook-form'
import { ApplicationForm } from '../lib/types';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

export const employmentTypeSchema = z.enum([
  "Employed",
  "Self-employed",
  "Unemployed",
]);

export const applicantSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  kennitala: z
    .string()
    .regex(/^\d{10}$/, "Kennitala must be exactly 10 digits"),
  address: z.string().min(1, "Address is required"),
  email: z.email("Invalid email"),
  phoneNumber: z
    .string()
    .regex(/^\d{7}$/, "Phone number must be exactly 7 digits"),
});

export const partnerSchema = z.object({
  fullName: z.string().min(1, "Partner full name is required"),
  kennitala: z
    .string()
    .regex(/^\d{10}$/, "Kennitala must be exactly 10 digits"),
  employmentType: employmentTypeSchema,
});

export const applicationFormSchema = z
  .object({
    applicant: applicantSchema,
    employmentType: employmentTypeSchema,
    bankNumber: z.string().min(1, "Bank number is required"),
    ledger: z.string().min(1, "Ledger is required"),
    accountNumber: z.string().min(1, "Account number is required"),
    companyName: z.string().optional(),
    employerName: z.string().optional(),
    employmentRatio: z.number().min(0).max(100).optional(),
    hasPartner: z.boolean(),
    partner: partnerSchema.optional(),
    leaveStartDate: z.date(),
    leaveEndDate: z.date(),
    leaveRatio: z.number(),
    documents: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    if (data.employmentType === "Employed") {
      if (!data.employerName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["employerName"],
          message: "Employer name is required",
        });
      }
      if (data.employmentRatio == null) {
        ctx.addIssue({
          code: "custom",
          path: ["employmentRatio"],
          message: "Employment ratio is required",
        });
      }
    }

    if (data.employmentType === "Self-employed") {
      if (!data.companyName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Company name is required",
        });
      }
    }
  });;

export default function ApplicationLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const form = useForm<ApplicationForm>({
    // mode: "onSubmit",
    // reValidateMode: "onSubmit",
    resolver: zodResolver(applicationFormSchema)
  });
  
  return (
    <FormProvider {...form}>
      {children}
    </FormProvider>
  );
}
