import type { Treatment, ServiceSelection, ServiceKey } from "./types"

export const treatments: Treatment[] = [
  {
    value: "adjustments",
    label: "Chiropractic Adjustments",
    duration: 15,
    price: "$50",
  },
  {
    value: "naet",
    label: "NAET Treatments",
    duration: 30,
    price: "$60",
  },
  {
    value: "soul",
    label: "Soul Alignment Session",
    duration: 60,
    price: "$130",
  },
]

// -----------------------------
// Jotform service + patient mappings
// -----------------------------

// Payment product IDs from Jotform (q28_services[][id])
export const JOTFORM_PRODUCT_ID: Partial<Record<ServiceSelection, string>> = {
  adjustments: "1000",
  naet: "1001",
  soul: "1002",
}

// Human-readable serviceType textbox values (q20_serviceType)
export const SERVICE_TYPE_LABEL: Partial<
  Record<ServiceSelection, { new: string; returning: string }>
> = {
  adjustments: {
    new: "New Patient - Adjustments",
    returning: "Returning - Adjustments",
  },
  naet: {
    new: "New Patient - NAET",
    returning: "Returning - NAET",
  },
  soul: {
    new: "New Patient - Soul",
    returning: "Returning - Soul",
  },
}

// Appointment field names inside Jotform
export const APPOINTMENT_SERVICE_KEY: Partial<
  Record<ServiceSelection, { new: ServiceKey; returning: ServiceKey }>
> = {
  adjustments: {
    new: "adjustment-new",
    returning: "adjustment",
  },
  naet: {
    new: "naet-new",
    returning: "naet",
  },
  soul: {
    new: "soul-new",
    returning: "soul",
  },
}

export type PatientType = "new" | "returning"

export const PATIENT_LABEL: Record<PatientType, string> = {
  new: "New Patient",
  returning: "Returning",
}

export const SERVICE_LABEL: Record<ServiceSelection, string> = {
  adjustments: "Adjustments",
  naet: "NAET",
  soul: "Soul",
}

export const APPOINTMENT_ID: Record<string, string> = {
  "New Patient - Adjustments": "id_13",
  "Returning - Adjustments": "id_15",
  "New Patient - NAET": "id_16",
  "Returning - NAET": "id_17",
  "New Patient - Soul": "id_18",
  "Returning - Soul": "id_19",
}

/**
 * Returns the human-readable serviceType string for a given patient type and service selection.
 */
export function getServiceType(patientType: PatientType, service: ServiceSelection): string {
  return `${PATIENT_LABEL[patientType]} - ${SERVICE_LABEL[service]}`
}

/**
 * Returns the JotForm URL for the provided patient type and service selection.
 */
export function getJotformUrl(patientType: PatientType, service: ServiceSelection): string {
  const serviceType = getServiceType(patientType, service)
  const anchor = APPOINTMENT_ID[serviceType]
  return `https://form.jotform.com/253575912608161?q20_serviceType=${encodeURIComponent(
    serviceType,
  )}#${anchor}`
}


export const medicalConditions = [
  "Diabetes",
  "High Blood Pressure",
  "Heart Disease",
  "Arthritis",
  "Osteoporosis",
  "Depression/Anxiety",
  "Fibromyalgia",
  "Migraines",
  "Previous Spinal Surgery",
  "Disc Problems",
  "Scoliosis",
  "Other",
]

export const painLocations = [
  "Neck",
  "Upper Back",
  "Lower Back",
  "Shoulders",
  "Arms",
  "Hips",
  "Legs",
  "Headaches",
  "Other",
]