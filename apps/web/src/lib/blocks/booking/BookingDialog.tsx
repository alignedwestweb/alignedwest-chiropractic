import { useEffect } from "react"
import { toast } from "sonner"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import type { BookingDialogProps } from "./types"
import { useBookingForm } from "./useBookingForm"
import { useJotformEmbed } from "./useJotformEmbed"
import { BottomNav } from "./BottomNav"
import { Step1Service } from "./steps/Step1Service"
import { Step2PatientInfo } from "./steps/Step2PatientInfo"
import { Step3DateTime } from "./steps/Step3DateTime"
import { Step4ConfirmAndIntake } from "./steps/Step4ConfirmAndIntake"
//import { closedDates, mockBookedSlots } from "./timeSlots"

export default function BookingDialog({ isOpen, onClose, preselectedService }: BookingDialogProps) {
  const {
    step,
    setStep,
    formData,
    setFormData,
    updateField,
    selectedTreatment,
    availableTimeSlots,
  } = useBookingForm(preselectedService)

  // Reset when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData((prev) => ({
        ...prev,
        date: undefined,
        time: "",
      }))
    }
  }, [isOpen, setFormData, setStep])

  // Reset time whenever service/date changes
  useEffect(() => {
    setFormData((prev) => ({ ...prev, time: "" }))
  }, [formData.service, formData.date, setFormData])
 
  {/*
  const modifiers = {
    booked: closedDates,
    limited: Object.keys(mockBookedSlots)
      .filter((dateStr) => {
        const bookedCount = mockBookedSlots[dateStr].length
        return bookedCount > 0 && bookedCount < 6
      })
      .map((dateStr) => new Date(dateStr)),
  }
      */}

  const { jotformIframeId, jotformSrc } = useJotformEmbed(isOpen, step, formData)

  const nextStep = () => {
    // Step 1: must choose a service
    if (step === 1 && !formData.service) {
      toast.error("Please select a treatment")
      return
    }

    // Step 2: patient type is required for building the Jotform calendar link.
    // NOTE: per latest request, we do not show a toast here; step UI should guide selection.

    if (step < 4) setStep((s) => s + 1)
  }

  const scrollToIntake = () => {
    const el = document.getElementById(jotformIframeId)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl h-[85vh] p-0 gap-0 rounded-3xl border-0 warm-shadow flex flex-col overflow-hidden">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-amber-200/50 px-6 pt-6 pb-4">
          <div className="w-16 h-16 bg-linear-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-8 h-8 text-amber-700" />
          </div>
          <h2 className="text-3xl text-center text-primary tracking-wide mb-6">
            {step === 4 ? "Journey Confirmed!" : "Reserve Your Appointment"}
          </h2>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    s < step
                      ? "bg-secondary text-white"
                      : s === step
                        ? "bg-linear-to-br from-amber-600 to-amber-700 text-white"
                        : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {s < step ? <CheckCircle2 className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-0.5 transition-all duration-300 ${
                      s < step ? "bg-secondary" : "bg-amber-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {step === 1 && <Step1Service formData={formData} updateField={updateField} />}

          {step === 2 && <Step2PatientInfo formData={formData} updateField={updateField} />}

          {step === 3 && (
            <Step3DateTime
              formData={formData}
              jotformIframeId={jotformIframeId}
              jotformSrc={jotformSrc}
              selectedTreatmentLabel={selectedTreatment?.label}
              selectedTreatmentDuration={selectedTreatment?.duration}
              selectedTreatmentPrice={selectedTreatment?.price}
            />
          )}

          {step === 4 && (
            <Step4ConfirmAndIntake
              formData={formData}
              selectedTreatmentLabel={selectedTreatment?.label}
              selectedTreatmentDuration={selectedTreatment?.duration}
              selectedTreatmentPrice={selectedTreatment?.price}
              availableTimeSlots={availableTimeSlots}
              jotformIframeId={jotformIframeId}
              jotformSrc={jotformSrc}
            />
          )}
        </div>

        <BottomNav
          step={step}
          onBack={() => setStep((s) => Math.max(1, s - 1))}
          onNext={nextStep}
          onScrollToIntake={scrollToIntake}
        />
      </DialogContent>
    </Dialog>
  )
}
