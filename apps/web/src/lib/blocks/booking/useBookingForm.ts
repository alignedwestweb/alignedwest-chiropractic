import { useMemo, useState } from "react"
import type { FormData, ServiceSelection } from "./types"
import { treatments } from "./constants"
import { generateTimeSlots } from "./timeSlots"

export function useBookingForm(initialService?: ServiceSelection) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: (initialService || "") as FormData["service"],
    date: undefined,
    time: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
    insuranceProvider: "",
    policyNumber: "",
    groupNumber: "",
    chiefComplaint: "",
    painLevel: "",
    painLocation: [],
    whenDidPainStart: "",
    painDescription: "",
    previousChiropracticCare: "",
    currentMedications: "",
    allergies: "",
    surgeries: "",
    medicalConditions: [],
    occupation: "",
    exerciseFrequency: "",
    sleepQuality: "",
    stressLevel: "",
    hipaaConsent: false,
    treatmentConsent: false,
    privacyPolicy: false,
    patientType: "",
  })

  const selectedTreatment = treatments.find(t => t.value === formData.service)

  const availableTimeSlots = useMemo(() => {
    if (!formData.date || !selectedTreatment) return []
    const dateString = formData.date.toISOString().split('T')[0]
    return generateTimeSlots(selectedTreatment.duration, dateString)
  }, [formData.date, selectedTreatment])

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  return {
    step,
    setStep,
    formData,
    setFormData,
    updateField,
    selectedTreatment,
    availableTimeSlots,
  }
}
