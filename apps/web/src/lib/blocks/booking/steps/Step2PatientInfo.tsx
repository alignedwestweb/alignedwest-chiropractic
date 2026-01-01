import { CheckCircle, Heart, Users } from "lucide-react"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import type { FormData } from "../types"
import type { PatientType } from "../constants"

type Step2PatientInfoProps = {
  formData: FormData
  updateField: <K extends keyof FormData>(key: K, value: FormData[K]) => void
}

export function Step2PatientInfo({ formData, updateField }: Step2PatientInfoProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex flex-col items-center justify-center gap-2">
          <Heart className="w-5 h-5 text-amber-600" />
          <h3 className="text-xl text-primary">Patient Type</h3>
        </div>
        <p className="text-muted-foreground">Are you a new or returning patient?</p>
      </div>

      <RadioGroup
        value={formData.patientType}
        onValueChange={(value) => updateField("patientType", value as PatientType)}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem value="new" id="patient-type-new" className="peer sr-only" />
          <Label
            htmlFor="patient-type-new"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
          >
            <Users className="h-8 w-8 mb-2 text-primary" />
            <span>New Patient</span>
            <span className="text-xs text-gray-500 mt-1">First time visiting</span>
          </Label>
        </div>

        <div>
          <RadioGroupItem value="returning" id="patient-type-returning" className="peer sr-only" />
          <Label
            htmlFor="patient-type-returning"
            className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
          >
            <CheckCircle className="h-8 w-8 mb-2 text-primary" />
            <span>Returning</span>
            <span className="text-xs text-gray-500 mt-1">Already a patient</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  )
}