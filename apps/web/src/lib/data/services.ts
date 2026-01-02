import img1 from "/assets/images/imgServicesAlign.webp"
import img2 from "/assets/images/imgServicesNAET.jpg"
import img3 from "/assets/images/imgServicesSoul.jpg"

export const services = [
  {
    id: "adjustments",
    iconName: "menu",
    title: "Chiropractic Adjustments",
    description: "Restore alignment and alleviate discomfort with personalized chiropractic adjustments. Using precise techniques, we target misalignments to improve mobility, reduce pain, and support your body's natural healing processes. Experience tailored care designed to optimize your health and well-being.",
    popular: true,
    modality: 'chiropractic',
    durations: "15 min",
    prices: "$50",
    image: img1
  },
  {
    id: "naet",
    iconName: "stars",
    title: "NAET Treatments",
    description: "Address allergies and sensitivities with Nambudripad's Allergy Elimination Techniques (NAET). This holistic approach combines chiropractic principles, acupuncture/acupressure, and nutrition to desensitize and balance your body's reaction to allergens, promoting overall wellness and harmony.",
    popular: false,
    modality: 'energy',
    durations: "30 min",
    prices: "$60",
    image: img2
  },
  {
    id: "soul",
    iconName: "stars",
    title: "Soul Alignment Session",
    description: "A transformative session blending intuitive healing, muscle testing, energy clearing, breathwork, and gentle chiropractic alignment. Designed to release stress, rebalance your energy, and reconnect you with your body’s inner wisdom—helping clear whatever stands in your way.",
    popular: false,
    modality: 'energy',
    durations: "60 min",
    prices: "$130",
    image: img3
  },
]