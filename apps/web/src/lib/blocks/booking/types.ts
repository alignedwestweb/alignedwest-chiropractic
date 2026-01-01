import type { PatientType } from "./constants"

export interface BookingDialogProps {
  isOpen: boolean
  onClose: () => void
  preselectedService?: ServiceSelection | undefined
}

export type Treatment = {
  value: ServiceSelection
  label: string
  duration: number
  price: string
}

// Jotform-facing service identifiers (match your appointment field names)
export type ServiceKey =
  | "adjustment"
  | "adjustment-new"
  | "naet"
  | "naet-new"
  | "soul"
  | "soul-new"

// (Optional) Human-readable labels (not used directly by the form state)
export type PatientTypeLabel = "New Patient" | "Returning Patient"

// UI selection values (your internal service picker values)
export type ServiceSelection = "adjustments" | "naet" | "soul"

export interface FormData {
  service: ServiceSelection
  date: Date | undefined
  time: string

  // Personal Information
  firstName: string
  lastName: string
  dateOfBirth: string
  gender: string
  phone: string
  email: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string

  // Insurance Information
  insuranceProvider: string
  policyNumber: string
  groupNumber: string

  // Chief Complaint
  chiefComplaint: string
  painLevel: string
  painLocation: string[]
  whenDidPainStart: string
  painDescription: string

  // Medical History
  previousChiropracticCare: string
  currentMedications: string
  allergies: string
  surgeries: string
  medicalConditions: string[]

  // Lifestyle
  occupation: string
  exerciseFrequency: string
  sleepQuality: string
  stressLevel: string

  // Consent
  hipaaConsent: boolean
  treatmentConsent: boolean
  privacyPolicy: boolean

  // Appointment
  patientType: PatientType | ""
}