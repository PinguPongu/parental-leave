export interface ApplicationForm {
  applicant: Applicant,
  employmentType: "Employed" | "Self-employed" | "Unemployed"
  bankNumber: string,
  ledger: string,
  accountNumber: string,
  companyName?: string,
  employerName?: string,
  employmentRatio?: number,
  hasPartner: boolean,
  partner?: Partner,
  leaveStartDate: Date,
  leaveEndDate: Date,
  leaveRatio: number,
  documents: string[]
}

interface Partner {
  fullName: string,
  kennitala: string,
  employmentStatus: "Employed" | "Self-employed" | "Unemployed"
}

export interface Applicant {
  fullName: string,
  kennitala: string,
  address: string,
  email: string,
  phoneNumber: string,
}