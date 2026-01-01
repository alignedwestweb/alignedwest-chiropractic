import { useEffect, useMemo, useRef } from "react"
import type { FormData, ServiceSelection } from "./types"
import { getServiceType, APPOINTMENT_ID, type PatientType } from "./constants"

declare global {
  interface Window {
    jotformEmbedHandler?: (selector: string, base: string) => void
  }
}

// These IDs come from the form source HTML:
// New Patient - Adjustments: id_13
// Returning - Adjustments: id_15
// New Patient - NAET: id_16
// Returning - NAET: id_17
// New Patient - Soul: id_18
// Returning - Soul: id_19
// Use canonical appointment anchor mapping from constants (APPOINTMENT_ID)

const JOTFORM_ID = "253575912608161"
const JOTFORM_BASE = "https://form.jotform.com/"
const JOTFORM_EMBED_HANDLER_SRC = "https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"

export function useJotformEmbed(isOpen: boolean, step: number, formData: FormData) {
  const jotformIframeId = `JotFormIFrame-${JOTFORM_ID}`
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (scriptLoadedRef.current) return

    if (document.querySelector(`script[src='${JOTFORM_EMBED_HANDLER_SRC}']`)) {
      scriptLoadedRef.current = true
      return
    }

    const s = document.createElement("script")
    s.src = JOTFORM_EMBED_HANDLER_SRC
    s.async = true
    s.onload = () => {
      scriptLoadedRef.current = true
    }
    document.body.appendChild(s)
  }, [])

  const jotformSrc = useMemo(() => {
    const params = new URLSearchParams()

    const service = formData.service
    const patientType = formData.patientType

    // Field 20 (serviceType) drives Jotform conditions.
    // When it is prefilled to e.g. "Returning - Soul", the form reveals the right calendar.
    const serviceTypeValue =
      service && patientType
        ? getServiceType(patientType as PatientType, service as ServiceSelection)
        : ""

    const appointmentAnchorId = serviceTypeValue ? APPOINTMENT_ID[serviceTypeValue] ?? "" : ""

    if (serviceTypeValue) {
      // Set both the human-friendly field name and the legacy q-prefill key.
      // This covers both possible form configurations.
      params.set("serviceType", serviceTypeValue)
      params.set("q20_serviceType", serviceTypeValue)
    }

    const qs = params.toString()
    const baseUrl = qs ? `${JOTFORM_BASE}${JOTFORM_ID}?${qs}` : `${JOTFORM_BASE}${JOTFORM_ID}`

    // Only deep-link to the appointment calendar when we're on the date/time step.
    // Otherwise keep the URL clean so we don't yank the user around.
    if (step === 3 && appointmentAnchorId) {
      return `${baseUrl}#${appointmentAnchorId}`
    }

    return baseUrl
  }, [step, formData.service, formData.patientType])

  useEffect(() => {
    if (!isOpen || step !== 3) return

    const selector = `iframe[id='${jotformIframeId}']`
    const t = window.setInterval(() => {
      if (window.jotformEmbedHandler && document.querySelector(selector)) {
        window.jotformEmbedHandler(selector, JOTFORM_BASE)
        window.clearInterval(t)
      }
    }, 50)

    return () => window.clearInterval(t)
  }, [isOpen, step, jotformIframeId])

  return { jotformIframeId, jotformSrc }
}
