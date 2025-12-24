import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem, } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Sparkles, Leaf, Heart, ArrowRight, ArrowLeft, CheckCircle2, Clock, CalendarIcon, Users, CheckCircle } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const treatments = [
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
  }
]

const medicalConditions = [
  'Diabetes', 'High Blood Pressure', 'Heart Disease', 'Arthritis',
  'Osteoporosis', 'Depression/Anxiety', 'Fibromyalgia', 'Migraines',
  'Previous Spinal Surgery', 'Disc Problems', 'Scoliosis', 'Other'
]

const painLocations = [
  'Neck', 'Upper Back', 'Lower Back', 'Shoulders', 'Arms',
  'Hips', 'Legs', 'Headaches', 'Other'
]

// Mock booked appointments by date
const mockBookedSlots: Record<string, string[]> = {
  // Format: "YYYY-MM-DD": ["HH:MM", ...]
  // Today + 1
  [new Date(Date.now() + 86400000).toISOString().split('T')[0]]: ["09:00", "10:30", "14:00"],
  // Today + 2
  [new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]]: ["09:00", "12:00", "15:30"],
  // Today + 5
  [new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30"],
  // Today + 7
  [new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
}

// Closed dates (fully booked or closed)
const closedDates = [
  new Date(Date.now() + 86400000 * 7), // Today + 7 (fully booked)
  new Date(Date.now() + 86400000 * 14), // Today + 14 (closed)
]

// Generate time slots based on treatment duration
const generateTimeSlots = (duration: number, date: string) => {
  const slots: { value: string; label: string; available: boolean, sublabel: string; }[] = []
  const bookedTimes = mockBookedSlots[date] || []

  // Operating hours: 9 AM to 6 PM
  const startHour = 9
  const endHour = 18

  // Convert booked times to minutes for easier calculation
  const bookedMinutes = bookedTimes.map(time => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  })

  // Generate slots every 30 minutes
  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const totalMinutes = hour * 60 + minute
      const endMinutes = totalMinutes + duration

      // Don't create slot if treatment would end after closing
      if (endMinutes > endHour * 60) continue

      // Check if this slot conflicts with any booked appointments
      const isAvailable = !bookedMinutes.some(bookedStart => {
        const bookedEnd = bookedStart + duration // Assume same duration for simplicity
        // Check if slots overlap
        return (totalMinutes < bookedEnd && endMinutes > bookedStart)
      })

      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      const period = hour >= 12 ? 'PM' : 'AM'
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
      const displayMinute = minute.toString().padStart(2, '0')

      const timeLabels = [
        "Morning Serenity",
        "Mid-Morning Peace",
        "Midday Reset",
        "Afternoon Renewal",
        "Late Afternoon Calm",
        "Evening Restoration"
      ]

      const labelIndex = Math.floor((hour - startHour) / 2)
      const sublabel = timeLabels[Math.min(labelIndex, timeLabels.length - 1)]

      slots.push({
        value: timeValue,
        label: `${displayHour}:${displayMinute} ${period}`,
        sublabel,  // ← add this
        available: isAvailable
      })
    }
  }

  return slots
}

interface FormData {
  service: string
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
  isNewPatient: string
}


export default function BookingDialog({ isOpen, onClose, preselectedService }: BookingDialogProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    service: preselectedService || "",
    date: undefined as Date | undefined,
    time: "",
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    chiefComplaint: '',
    painLevel: '',
    painLocation: [],
    whenDidPainStart: '',
    painDescription: '',
    previousChiropracticCare: '',
    currentMedications: '',
    allergies: '',
    surgeries: '',
    medicalConditions: [],
    occupation: '',
    exerciseFrequency: '',
    sleepQuality: '',
    stressLevel: '',
    hipaaConsent: false,
    treatmentConsent: false,
    privacyPolicy: false,
    isNewPatient: ''
  })

  const handleConditionChange = (condition: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: checked
        ? [...prev.medicalConditions, condition]
        : prev.medicalConditions.filter(c => c !== condition)
    }))
  }

  const handlePainLocationChange = (location: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      painLocation: checked
        ? [...prev.painLocation, location]
        : prev.painLocation.filter(l => l !== location)
    }))
  }

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({ ...prev, service: preselectedService }))
    }
  }, [preselectedService])

  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData(prev => ({
        ...prev,
        date: undefined,
        time: ""
      }))
    }
  }, [isOpen])

  // Reset time when service or date changes (duration affects available times)
  useEffect(() => {
    setFormData(prev => ({ ...prev, time: "" }))
  }, [formData.service, formData.date])

  const selectedTreatment = treatments.find((t) => t.value === formData.service)

  const availableTimeSlots = useMemo(() => {
    if (!formData.date || !selectedTreatment) return []
    const dateString = formData.date.toISOString().split('T')[0]
    return generateTimeSlots(selectedTreatment.duration, dateString)
  }, [formData.date, selectedTreatment])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    if (step === 1 && !formData.service) {
      toast.error("Please select a treatment")
      return
    }
    if (step === 2 && (!formData.firstName || !formData.email || !formData.phone)) {
      toast.error("Please fill in all required fields")
      return
    }
    if (step === 3 && (!formData.date || !formData.time)) {
      toast.error("Please select both date and time")
      return
    }

    if (step < 4) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    const selectedTime = availableTimeSlots.find(t => t.value === formData.time)

    toast.success("Your wellness journey is confirmed!", {
      description: `We'll see you on ${formData.date?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at ${selectedTime?.label}`,
      duration: 5000,
    })

    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        service: "",
        date: undefined,
        time: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
      }))
      setStep(1)
      onClose()
    }, 2000)
  }

  // Check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (date < today) return true

    // Disable closed dates
    if (closedDates.some(closedDate =>
      closedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    )) return true

    return false
  }

  // Get modifiers for the calendar
  const modifiers = {
    booked: closedDates,
    limited: Object.keys(mockBookedSlots)
      .filter(dateStr => {
        const bookedCount = mockBookedSlots[dateStr].length
        return bookedCount > 0 && bookedCount < 6 // Show as limited if some slots booked
      })
      .map(dateStr => new Date(dateStr))
  }

  const modifiersStyles = {
    booked: {
      backgroundColor: '#fee2e2',
      color: '#991b1b',
      textDecoration: 'line-through'
    },
    limited: {
      backgroundColor: '#fef3c7',
      color: '#92400e',
      fontWeight: 'bold'
    }
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
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${s < step
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
                    className={`w-12 h-0.5 transition-all duration-300 ${s < step ? "bg-secondary" : "bg-amber-200"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl text-primary">Choose Your Healing Journey</h3>
                </div>
                <p className="text-muted-foreground">
                  Select the treatment that resonates with your wellness needs
                </p>
              </div>

              <div className="space-y-3">
                {treatments.map((treatment) => (
                  <button
                    key={treatment.value}
                    onClick={() => handleInputChange("service", treatment.value)}
                    className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${formData.service === treatment.value
                      ? "border-amber-600 bg-amber-50/50 warm-shadow"
                      : "border-amber-200/50 hover:border-amber-400 hover:bg-amber-50/30"
                      }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Leaf className="w-4 h-4 text-amber-600" />
                          <p className="text-primary">{treatment.label}</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {treatment.duration} min
                          </span>
                          <span className="text-amber-700">{treatment.price}</span>
                        </div>
                      </div>
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.service === treatment.value
                          ? "border-amber-600 bg-amber-600"
                          : "border-amber-300"
                          }`}
                      >
                        {formData.service === treatment.value && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Heart className="w-5 h-5 text-amber-600" />
                  <h3 className="text-xl text-primary">Patient Type</h3>
                </div>
                <p className="text-muted-foreground">
                  Are you a new or returning patient?
                </p>
              </div>
              <RadioGroup
                value={formData.isNewPatient}
                onValueChange={(value) => setFormData(prev => ({ ...prev, isNewPatient: value }))}
                className="grid grid-cols-2 gap-4"
              >
                <div>
                  <RadioGroupItem value="yes" id="new-yes" className="peer sr-only" />
                  <Label
                    htmlFor="new-yes"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                  >
                    <Users className="h-8 w-8 mb-2 text-primary" />
                    <span>New Patient</span>
                    <span className="text-xs text-gray-500 mt-1">First time visiting</span>
                  </Label>
                </div>
                <div>
                  <RadioGroupItem value="no" id="new-no" className="peer sr-only" />
                  <Label
                    htmlFor="new-no"
                    className="flex flex-col items-center justify-center rounded-lg border-2 border-gray-200 p-4 hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer"
                  >
                    <CheckCircle className="h-8 w-8 mb-2 text-primary" />
                    <span>Returning Patient</span>
                    <span className="text-xs text-gray-500 mt-1">Existing patient</span>
                  </Label>
                </div>
              </RadioGroup>

              {formData.isNewPatient === 'yes' ? (
                <>
                  {/* Personal Information */}
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <h3 className="text-xl text-primary">Personal Information</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Basic contact and demographic information
                  </p>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          required
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label>Gender *</Label>
                        <Select onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                        />
                      </div>
                    </div>
                  </div>

              {/* Chief Complaint */}
              <div className="flex flex-col items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <h3 className="text-xl text-primary">Chief Complaint</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Tell us about your current condition
                  </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="chiefComplaint">What brings you in today? *</Label>
                    <Textarea
                      id="chiefComplaint"
                      placeholder="Describe your main concern..."
                      required
                      value={formData.chiefComplaint}
                      onChange={(e) => setFormData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Pain Level (0-10) *</Label>
                    <RadioGroup
                      className="flex flex-wrap gap-3 mt-2"
                      onValueChange={(value) => setFormData(prev => ({ ...prev, painLevel: value }))}
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(level => (
                        <div key={level} className="flex items-center">
                          <RadioGroupItem value={level.toString()} id={`pain-${level}`} className="peer sr-only" />
                          <Label
                            htmlFor={`pain-${level}`}
                            className="w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-200 cursor-pointer hover:bg-gray-50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white"
                          >
                            {level}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Pain Location (select all that apply)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
                      {painLocations.map(location => (
                        <div key={location} className="flex items-center space-x-2">
                          <Checkbox
                            id={`location-${location}`}
                            checked={formData.painLocation.includes(location)}
                            onCheckedChange={(checked) => handlePainLocationChange(location, checked as boolean)}
                          />
                          <Label htmlFor={`location-${location}`}>{location}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              {/* Medical History (Simplified) */}
               <div className="flex flex-col items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <h3 className="text-xl text-primary">Medical History</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Brief medical background
                  </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentMedications">Current Medications</Label>
                    <Textarea
                      id="currentMedications"
                      placeholder="List any medications you're taking..."
                      value={formData.currentMedications}
                      onChange={(e) => setFormData(prev => ({ ...prev, currentMedications: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="allergies">Allergies</Label>
                    <Input
                      id="allergies"
                      placeholder="Any allergies?"
                      value={formData.allergies}
                      onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label>Medical Conditions (check all that apply)</Label>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      {medicalConditions.slice(0, 6).map(condition => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            id={`condition-${condition}`}
                            checked={formData.medicalConditions.includes(condition)}
                            onCheckedChange={(checked) => handleConditionChange(condition, checked as boolean)}
                          />
                          <Label htmlFor={`condition-${condition}`} className="text-sm">{condition}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              {/* Consent Forms */}
              <div className="flex flex-col items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <h3 className="text-xl text-primary">Consent & Privacy</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Required agreements
                  </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="hipaaConsent"
                      checked={formData.hipaaConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hipaaConsent: checked as boolean }))}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="hipaaConsent" className="text-sm">
                        HIPAA Privacy Notice *
                      </Label>
                      <p className="text-xs text-gray-500">
                        I acknowledge receipt of the Notice of Privacy Practices
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="treatmentConsent"
                      checked={formData.treatmentConsent}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, treatmentConsent: checked as boolean }))}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="treatmentConsent" className="text-sm">
                        Consent for Treatment *
                      </Label>
                      <p className="text-xs text-gray-500">
                        I consent to chiropractic examination and treatment
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacyPolicy"
                      checked={formData.privacyPolicy}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, privacyPolicy: checked as boolean }))}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="privacyPolicy" className="text-sm">
                        Privacy Policy *
                      </Label>
                      <p className="text-xs text-gray-500">
                        I agree to the privacy policy
                      </p>
                    </div>
                  </div>
                </div>
            </>
          ) :

          formData.isNewPatient === 'no' ? (
            <>
            <div className="flex flex-col items-center justify-center gap-2">
                    <Heart className="w-5 h-5 text-amber-600" />
                    <h3 className="text-xl text-primary">Contact Information</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Verify your contact details
                  </p>
                
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="reasonForVisit">Reason for Visit</Label>
                  <Textarea
                    id="reasonForVisit"
                    placeholder="Brief description of today's visit..."
                    value={formData.chiefComplaint}
                    onChange={(e) => setFormData(prev => ({ ...prev, chiefComplaint: e.target.value }))}
                  />
                </div>
              </div>
              </>
          ) : null}
        </div>
          )}

        {/* Step 3: Select Date & Time */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2">
                <CalendarIcon className="w-5 h-5 text-amber-600" />
                <h3 className="text-xl text-primary">Choose Your Sacred Time</h3>
              </div>
              <p className="text-muted-foreground">
                Select an available date and time for your {selectedTreatment?.label}
              </p>
            </div>

            <div className="bg-amber-50/50 rounded-2xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Selected Treatment</p>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-lg text-primary">{selectedTreatment?.label}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>{selectedTreatment?.duration} min</span>
                <span className="text-amber-700">{selectedTreatment?.price}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-amber-600" />
                  Select Your Date *
                </Label>

                <div className="bg-white rounded-2xl border-2 border-amber-200/50 p-4">
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => handleInputChange("date", date)}
                    disabled={isDateDisabled}
                    modifiers={modifiers}
                    modifiersStyles={modifiersStyles}
                    className="mx-auto"
                  />

                  <div className="mt-4 pt-4 border-t border-amber-200/50 space-y-2">
                    <p className="text-xs text-muted-foreground">Availability Legend:</p>
                    <div className="flex flex-wrap gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-50 border-2 border-amber-600"></div>
                        <span className="text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-amber-100"></div>
                        <span className="text-muted-foreground">Limited</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-red-100 line-through"></div>
                        <span className="text-muted-foreground">Fully Booked</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {formData.date && (
                <div className="space-y-3">
                  <Label className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    Available Times ({availableTimeSlots.filter(s => s.available).length} slots) *
                  </Label>

                  {availableTimeSlots.filter(s => s.available).length === 0 ? (
                    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                      <p className="text-red-800">No available times for this date. Please select another date.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto p-1">
                      {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.value}
                          onClick={() => slot.available && handleInputChange("time", slot.value)}
                          disabled={!slot.available}
                          className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${formData.time === slot.value
                            ? "border-amber-600 bg-amber-50/50 warm-shadow"
                            : slot.available
                              ? "border-amber-200/50 hover:border-amber-400 hover:bg-amber-50/30"
                              : "border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed"
                            }`}
                        >
                          <p className={`text-sm ${slot.available ? 'text-primary' : 'text-gray-400'}`}>
                            {slot.label}
                          </p>
                          {/* Render sublabel */}
                          <p className="text-xs text-muted-foreground">{slot.sublabel}</p>
                          {!slot.available && (
                            <p className="text-xs text-red-600 mt-1">Booked</p>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {step === 4 && (
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
                    <p className="text-lg text-primary mt-1">{selectedTreatment?.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedTreatment?.duration} min • {selectedTreatment?.price}
                    </p>
                  </div>
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>

                <div className="flex items-start justify-between pb-3 border-b border-amber-200/50">
                  <div>
                    <p className="text-sm text-muted-foreground">Date & Time</p>
                    <p className="text-lg text-primary mt-1">
                      {formData.date?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {availableTimeSlots.find(t => t.value === formData.time)?.label}
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
          </div>
        )}
      </div>

      {/* Fixed Footer with Navigation */}
      <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-sm border-t border-amber-200/50 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {step > 1 && step < 4 && (
            <Button
              variant="outline"
              onClick={prevStep}
              className="rounded-full px-6 border-amber-200/50 hover:border-amber-400"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}

          {step === 1 && <div></div>}

          {step < 4 ? (
            <Button
              onClick={nextStep}
              className="bg-linear-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300 ml-auto"
            >
              {step === 3 ? "Review Booking" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="w-full bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-full px-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Confirm My Journey
            </Button>
          )}
        </div>
      </div>
    </DialogContent>
    </Dialog >
  )
}
