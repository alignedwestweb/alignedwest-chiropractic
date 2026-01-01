
// Mock booked appointments by date
export const mockBookedSlots: Record<string, string[]> = {
  [new Date(Date.now() + 86400000).toISOString().split('T')[0]]: ["09:00", "10:30", "14:00"],
  [new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]]: ["09:00", "12:00", "15:30"],
  [new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30"],
  [new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]]: ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"],
}

export const closedDates = [
  new Date(Date.now() + 86400000 * 7),
  new Date(Date.now() + 86400000 * 14),
]

export type TimeSlot = {
  value: string
  label: string
  sublabel: string
  available: boolean
}

export function generateTimeSlots(duration: number, date: string): TimeSlot[] {
  const slots: TimeSlot[] = []
  const bookedTimes = mockBookedSlots[date] || []

  const startHour = 9
  const endHour = 18

  const bookedMinutes = bookedTimes.map(time => {
    const [h, m] = time.split(':').map(Number)
    return h * 60 + m
  })

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const totalMinutes = hour * 60 + minute
      const endMinutes = totalMinutes + duration
      if (endMinutes > endHour * 60) continue

      const isAvailable = !bookedMinutes.some(bookedStart => {
        const bookedEnd = bookedStart + duration
        return totalMinutes < bookedEnd && endMinutes > bookedStart
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
        "Evening Restoration",
      ]

      const labelIndex = Math.floor((hour - startHour) / 2)
      const sublabel = timeLabels[Math.min(labelIndex, timeLabels.length - 1)]

      slots.push({
        value: timeValue,
        label: `${displayHour}:${displayMinute} ${period}`,
        sublabel,
        available: isAvailable,
      })
    }
  }

  return slots
}

export function isDateDisabled(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date < today) return true

  if (
    closedDates.some(
      closedDate => closedDate.toISOString().split('T')[0] === date.toISOString().split('T')[0]
    )
  ) {
    return true
  }

  return false
}
