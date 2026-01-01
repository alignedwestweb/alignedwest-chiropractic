import { CalendarIcon, Sparkles } from "lucide-react"

import type { FormData } from "../types"

type Step3DateTimeProps = {
  formData: FormData
  jotformSrc: string
  jotformIframeId: string
  selectedTreatmentLabel?: string
  selectedTreatmentDuration?: number
  selectedTreatmentPrice?: string
}

export function Step3DateTime({
  formData,
  jotformSrc,
  jotformIframeId,
  selectedTreatmentLabel,
  selectedTreatmentDuration,
  selectedTreatmentPrice,
}: Step3DateTimeProps) {
  const canShowCalendar = Boolean(jotformSrc)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <CalendarIcon className="w-5 h-5 text-amber-600" />
          <h3 className="text-xl text-primary">Choose Your Availability</h3>
        </div>
        <p className="text-muted-foreground">
          Select an available date and time for your {selectedTreatmentLabel}
        </p>
      </div>

      <div className="bg-amber-50/50 rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Selected Treatment</p>
          <Sparkles className="w-4 h-4 text-amber-600" />
        </div>
        <p className="text-lg text-primary">{selectedTreatmentLabel}</p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground pb-3 border-b border-amber-200/50">
          <span>{selectedTreatmentDuration} min</span>
          <span className="text-amber-700">{selectedTreatmentPrice}</span>
        </div>
        <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
            <div>
              <p className="text-sm text-muted-foreground">Patient Type</p>
              <p className="text-lg text-primary mt-1 capitalize">
                {formData.patientType}
              </p>
            </div>
            <CalendarIcon className="w-5 h-5 text-amber-600" />
          </div>
      </div>

      {!canShowCalendar ? (
        <div className="bg-white rounded-2xl border-2 border-amber-200/50 p-6 text-center">
          <p className="text-primary">Almost there.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Please choose a service and whether you’re a new or returning patient.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl border-2 border-amber-200/50 overflow-hidden">
            <iframe
              id={jotformIframeId}
              title="Appointment Calendar"
              allow="geolocation; microphone; camera; fullscreen; payment"
              src={jotformSrc}
              frameBorder={0}
              style={{ width: "100%", height: "720px", border: "none", padding: 0, margin: 0 }}
              scrolling="no"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Appointment availability is managed securely in our HIPAA-compliant booking system.
          </p>
        </div>
      )}
    </div>
  )
}
