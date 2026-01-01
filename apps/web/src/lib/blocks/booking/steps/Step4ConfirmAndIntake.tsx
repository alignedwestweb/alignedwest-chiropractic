import { CalendarIcon, CheckCircle2, Heart, Sparkles } from "lucide-react"

import type { FormData } from "../types"
import type { TimeSlot } from "../timeSlots"

type Step4ConfirmAndIntakeProps = {
  formData: FormData
  selectedTreatmentLabel?: string
  selectedTreatmentDuration?: number
  selectedTreatmentPrice?: string
  availableTimeSlots: TimeSlot[]
  jotformIframeId: string
  jotformSrc: string
}

export function Step4ConfirmAndIntake({
  formData,
  selectedTreatmentLabel,
  selectedTreatmentDuration,
  selectedTreatmentPrice,
  availableTimeSlots,
  jotformIframeId,
  jotformSrc,
}: Step4ConfirmAndIntakeProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl text-primary">Your Journey Awaits</h3>
          <p className="text-muted-foreground">
            Please review your appointment details before confirming
          </p>
        </div>
      </div>

      <div className="bg-linear-to-br from-amber-50/50 via-orange-50/30 to-rose-50/40 rounded-2xl p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
            <div>
              <p className="text-sm text-muted-foreground">Treatment</p>
              <p className="text-lg text-primary mt-1">{selectedTreatmentLabel}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedTreatmentDuration} min • {selectedTreatmentPrice}
              </p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-600" />
          </div>

          <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
            <div>
              <p className="text-sm text-muted-foreground">Date & Time</p>
              <p className="text-lg text-primary mt-1">
                {formData.date?.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {availableTimeSlots.find((t) => t.value === formData.time)?.label}
              </p>
            </div>
            <CalendarIcon className="w-5 h-5 text-amber-600" />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Contact Information</p>
              <p className="text-lg text-primary mt-1">{formData.firstName}</p>
              <p className="text-lg text-primary">{formData.lastName}</p>
              <p className="text-sm text-muted-foreground mt-1">{formData.email}</p>
              <p className="text-sm text-muted-foreground">{formData.phone}</p>
            </div>
            <Heart className="w-5 h-5 text-amber-600" />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 rounded-2xl p-4">
        <p className="text-sm text-blue-900">
          <strong>Please note:</strong> A confirmation email will be sent to {formData.email}.
          We'll reach out within 24 hours to finalize your appointment.
        </p>
      </div>

      <div className="mt-2 space-y-3">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Final step: submit your intake form to complete booking.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200/50 overflow-hidden bg-white">
          <iframe
            id={jotformIframeId}
            title="Appointments Backend"
            allow="geolocation; microphone; camera; fullscreen; payment"
            src={jotformSrc}
            frameBorder={0}
            scrolling="no"
            style={{ width: "100%", height: 780, border: "none" }}
          />
        </div>
      </div>
    </div>
  )
}
