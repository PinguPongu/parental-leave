export interface ApplicationForm {
  applicant: ApplicantForm,
  employmentType: "Employed" | "Self-employed" | "Unemployed"
  bankNumber: string,
  ledger: string,
  accountNumber: string,
  companyName?: string,
  employerName?: string,
  employmentRatio?: number,
  hasPartner: boolean,
  partner?: Partner,
  leaveStartDate: string,
  leaveEndDate: string,
  leaveRatio: "25" | "50" | "75" | "100",
  documents: string[]
}

interface Partner {
  fullName: string,
  kennitala: string,
  employmentType: "Employed" | "Self-employed" | "Unemployed"
}

export interface ApplicantForm {
  fullName: string,
  kennitala: string,
  address: string,
  email: string,
  phoneNumber: string,
}

export const employmentOptions = [
  {
    id: 'Employed',
    name: 'employment',
  },
  {
    id: 'Self-employed',
    name: 'employment',
  },
  {
    id: 'Unemployed',
    name: 'employment',
  },
];
