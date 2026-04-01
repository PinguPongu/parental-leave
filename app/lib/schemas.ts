import { z } from "zod";


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
    leaveStartDate: z.string().min(1, "Start date is required"),
    leaveEndDate: z.string().min(1, "End date is required"),
    leaveRatio: z.enum(["25", "50", "75", "100"]),
    documents: z.array(z.string()),
  })
  .superRefine((data, ctx) => {
    // date validations
    const start = new Date(data.leaveStartDate)
    const end = new Date(data.leaveEndDate)
    
    // end date cant be before start
    if (end <= start) {
        ctx.addIssue({
        code: "custom",
        path: ["leaveEndDate"],
        message: "End date must be after start date",
      });
    }

    // max 12 month durations
    const maxLeave = new Date(start);
    maxLeave.setMonth(maxLeave.getMonth() + 12);

    if (end > maxLeave){
        ctx.addIssue({
        code: "custom",
        path: ["leaveEndDate"],
        message: "Max leave can't exceed 12 months.",
      });
    }
  });

export const employmentStepSchema = z
  .object({
    employmentType: employmentTypeSchema,
    employerName: z.string().optional(),
    employmentRatio: z.number().min(1).max(100).optional(),
    companyName: z.string().optional()
  })
  .superRefine((data, ctx) => {
    // make the employed fields necessary
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

    // make self employed field necessary 
    if (data.employmentType === "Self-employed") {
      if (!data.companyName?.trim()) {
        ctx.addIssue({
          code: "custom",
          path: ["companyName"],
          message: "Company name is required",
        });
      }
    }
  });

export const partnerStepSchema = z
  .object({
    hasPartner: z.boolean(),
    partner: partnerSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.hasPartner && !data.partner) {
      ctx.addIssue({
        code: "custom",
        path: ["partner"],
        message: "Partner details are required",
      });
      return;
    }

    if (data.hasPartner && data.partner) {
      const parsed = partnerSchema.safeParse(data.partner);
      if (!parsed.success) {
        parsed.error.issues.forEach((issue) => {
          ctx.addIssue({
            code: "custom",
            path: ["partner", ...issue.path],
            message: issue.message,
          });
        });
      }
    }
  });

export const dateStepSchema = z
  .object({
    leaveStartDate: z.string().min(1, "Start date is required"),
    leaveEndDate: z.string().min(1, "End date is required"),
    leaveRatio: z.enum(["25", "50", "75", "100"]),
  })
  .superRefine((data, ctx) => {
    // date validations
    const start = new Date(data.leaveStartDate)
    const end = new Date(data.leaveEndDate)
    
    // end date cant be before start
    console.log(end >= start);
    if (end <= start) {
        ctx.addIssue({
        code: "custom",
        path: ["leaveEndDate"],
        message: "End date must be after start date",
      });
    }

    // max 12 month durations
    const maxLeave = new Date(start);
    maxLeave.setMonth(maxLeave.getMonth() + 12);

    if (end > maxLeave){
        ctx.addIssue({
        code: "custom",
        path: ["leaveEndDate"],
        message: "Max leave can't exceed 12 months.",
      });
    }
  })