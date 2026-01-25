"use client"

import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Card } from '@/components/ui/card'
import { Check, Calendar, BookOpen, Award, Users, Clock, FileText, GraduationCap, Heart, Target } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import massageHeroImg from '/assets/images/imgServicesAlign.webp'
import towelsImg from '/assets/images/imgServicesAlign.webp'
import massageSessionImg from '/assets/images/imgServicesAlign.webp'

export default function MassageApprenticeship() {
    const [applicationOpen, setApplicationOpen] = useState(false)
    const src = "https://form.jotform.com/253270906369059"
    
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section>
                <div className="flex flex-col w-full items-center">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold font-primary leading-tight tracking-normal text-stone-800 border-b border-primary w-fit text-center mb-8">Massage Therapy Apprenticeship</h1>

                    <div className="relative w-full h-[300px] sm:h-[400px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
                        <Image
                            src={massageHeroImg}
                            alt="Massage therapy hands on back"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Application Deadline */}
                    <div className="text-center w-full mb-12 bg-white shadow-lg border border-primary p-8 rounded-2xl">
                        <div className="inline-flex items-center gap-2 bg-sunset-100 text-sm px-6 py-3 rounded-full mb-6">
                            <Calendar className="h-4 w-4 text-sunset-600" />
                            <h2 className="font-medium text-stone-900">Application Deadline <span className="font-semibold text-rose-600">December 30th, 2025</span></h2>
                        </div>
                        <p className="text-stone-700 max-w-4xl mx-auto mb-6">
                            Thank you for your interest in the Massage Therapy Apprenticeship offered through AlignedWest Chiropractic.<br />
                            Below you'll find a clear overview of the program, expectations, and opportunities available to you as a student apprentice.
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg"
                            onClick={() => setApplicationOpen(true)}
                        >
                            <FileText className="mr-2 h-5 w-5" />
                            Apply Now
                        </Button>
                    </div>
                </div>
            </section>

            {/* Program Overview Cards */}
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="mb-4 font-primary font-medium text-2xl md:text-3xl lg:text-5xl leading-tight tracking-normal text-stone-800">Why Choose Our Program?</h2>
                        <p className="text-lg text-stone-600 max-w-xl mx-auto">
                            Our blended learning approach combines the best of in-person instruction with flexible online coursework.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-8 gap-3 bg-white shadow-lg hover:shadow-xl transition-all border-0 rounded-2xl">
                            <div className="w-10 h-10 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-lg flex items-center justify-center mb-3">
                                <Users className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="mb-1">Small Cohort Learning</h3>
                            <p className="text-stone-600">
                                Personalized attention with a maximum of 4 students per instructor, ensuring quality education and mentorship.
                            </p>
                        </Card>

                        <Card className="p-8 gap-3 bg-white shadow-lg hover:shadow-xl transition-all border-0 rounded-2xl">
                            <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-sage-600 rounded-lg flex items-center justify-center mb-3">
                                <BookOpen className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="mb-1">Comprehensive Curriculum</h3>
                            <p className="text-stone-600">
                                1,000+ hours of total learning covering 15 massage modalities and all required subjects.
                            </p>
                        </Card>

                        <Card className="p-8 gap-3 bg-white shadow-lg hover:shadow-xl transition-all border-0 rounded-2xl">
                            <div className="w-10 h-10 bg-gradient-to-br from-lavender-500 to-lavender-600 rounded-lg flex items-center justify-center mb-3">
                                <Award className="h-4 w-4 text-white" />
                            </div>
                            <h3 className="mb-1">MBLEx Preparation</h3>
                            <p className="text-stone-600">
                                Focused exam prep with weekly quizzes and 3 full practice exams to ensure you're ready to pass.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 52 Week Program */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-stone-100 border-t border-dashed border-primary rounded-b-3xl">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="mb-4 font-primary font-medium text-2xl md:text-3xl lg:text-5xl leading-tight tracking-normal text-stone-800">52 Week Blended Learning Program</h2>
                        <p className="text-stone-700 max-w-2xl mx-auto">
                            This apprenticeship follows a blended educational model that includes:
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8 mb-16">
                        {/* Courses */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-ocean-500 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                                1
                            </div>
                            <Card className="p-8 gap-3 bg-white border-0 rounded-2xl shadow-md h-full pt-10">
                                <BookOpen className="h-8 w-8 text-ocean-600 mb-4" />
                                <h3 className="mb-4">Structured Coursework</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">52 weeks of comprehensive curriculum</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">10-15 hours of learning per week</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-ocean-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">Digital and downloadable materials included</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>

                        {/* Class Hours */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-sage-500 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                                2
                            </div>
                            <Card className="p-8 gap-3 bg-white border-0 rounded-2xl shadow-md h-full pt-10">
                                <Clock className="h-8 w-8 text-sage-600 mb-4" />
                                <h3 className="mb-4">Hands-On Training</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">2 days per week (Tuesday & Friday)</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">6-8 hours of in-person instruction weekly</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-sage-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">Bi-monthly supervised student clinics</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>

                        {/* Exam Prep */}
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-lavender-500 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                                3
                            </div>
                            <Card className="p-8 gap-3 bg-white border-0 rounded-2xl shadow-md h-full pt-10">
                                <GraduationCap className="h-8 w-8 text-lavender-600 mb-4" />
                                <h3 className="mb-4">Exam Preparation</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-lavender-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">Weekly 5-10 minute knowledge checks</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-lavender-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">Focused MBLEx readiness training</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <Check className="h-5 w-5 text-lavender-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-stone-700">3 full MBLEx practice exams</span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center md:items-start mt-28">
                        <div className="order-2 lg:order-1">
                            <div className="inline-flex items-center gap-2 bg-sunset-100 text-amber-700 px-4 py-2 rounded-full mb-6">
                                <Heart className="h-4 w-4" />
                                <span className="text-sm">15 Specialized Modalities</span>
                            </div>
                            <h2 className="mb-3 text-xl md:text-2xl lg:text-4xl leading-tight tracking-normal font-primary font-medium text-stone-800">Master Multiple Massage Techniques</h2>
                            <p className="text-stone-600 mb-8">
                                Gain expertise in a diverse range of massage modalities to serve your future clients' unique needs.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {[
                                    'Swedish Massage',
                                    'Deep Tissue',
                                    'Prenatal Massage',
                                    'Trigger Point Therapy',
                                    'Thai Massage (Intro)',
                                    'Cupping Techniques',
                                    'Athlete Massage',
                                    'Craniosacral Therapy',
                                    'Acupressure',
                                    'Reflexology',
                                    'Foot Zoning (Intro)',
                                    'Chair Massage',
                                    'Hot Stone Massage',
                                    'Aromatherapy',
                                    'Lymphatic Massage (Intro)'
                                ].map((modality, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                        <div className="w-2 h-2 bg-sage-500 rounded-full flex-shrink-0" />
                                        <span className="text-stone-700">{modality}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 relative">
                            <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src={massageSessionImg}
                                    alt="Massage session"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-sage-500/10 rounded-full blur-3xl" />
                            <div className="absolute -top-8 -right-8 w-40 h-40 bg-ocean-500/10 rounded-full blur-3xl" />
                        </div>
                    </div>

                    <div className="text-center mt-28 mb-12">
                        <h2 className="mb-3 text-xl md:text-2xl lg:text-4xl leading-tight tracking-normal font-primary font-medium text-stone-800">Comprehensive Subject Coverage</h2>
                        <p className="text-stone-600 max-w-2xl mx-auto">
                            Our program exceeds state requirements to give you the best possible education.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="p-8 bg-white border-2 border-ocean-100 rounded-2xl hover:border-ocean-300 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="h-6 w-6 text-ocean-600" />
                                <h3>Anatomy & Physiology</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">State requirement:</span>
                                    <span className="font-semibold">125 hours</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">Our program:</span>
                                    <span className="font-semibold text-sage-600">150 hours</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-white border-2 border-sage-100 rounded-2xl hover:border-sage-300 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Heart className="h-6 w-6 text-sage-600" />
                                <h3>Pathology</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">State requirement:</span>
                                    <span className="font-semibold">40 hours</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">Our program:</span>
                                    <span className="font-semibold text-sage-600">40 hours</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-white border-2 border-lavender-100 rounded-2xl hover:border-lavender-300 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <Award className="h-6 w-6 text-lavender-600" />
                                <h3>Massage Theory</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">State requirement:</span>
                                    <span className="font-semibold">125 hours</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-stone-600">Our program:</span>
                                    <span className="font-semibold text-sage-600">165 hours</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-stone-50 to-white border-0 rounded-2xl shadow-lg">
                            <h3 className="mb-3">Sanitation & Safety</h3>
                            <p className="text-stone-600">
                                Comprehensive training in universal precautions and hygiene standards
                            </p>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-stone-50 to-white border-0 rounded-2xl shadow-lg">
                            <h3 className="mb-3">Clinical Practice</h3>
                            <p className="text-stone-600">
                                Extensive hands-on experience with real clients in supervised settings
                            </p>
                        </Card>

                        <Card className="p-8 bg-gradient-to-br from-stone-50 to-white border-0 rounded-2xl shadow-lg">
                            <h3 className="mb-3">Business & Ethics</h3>
                            <p className="text-stone-600">
                                Professional practices, client communication, and massage business fundamentals
                            </p>
                        </Card>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center md:items-start mt-28">
            <div className="relative h-[350px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={towelsImg} 
                alt="Spa environment" 
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="mb-3 text-xl md:text-2xl lg:text-4xl leading-tight tracking-normal font-primary font-medium text-stone-800">Begin Your Journey</h2>
              <p className="text-stone-600 mb-6">
                Join a supportive learning environment where you'll develop the skills, 
                knowledge, and confidence to launch a successful massage therapy career.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-sage-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 mb-1">All Materials Included</div>
                    <div className="text-stone-600">Study materials, exam prep, and digital resources</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-sage-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 mb-1">Flexible Schedule</div>
                    <div className="text-stone-600">Balance learning with your existing commitments</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-sage-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-4 w-4 text-sage-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 mb-1">Expert Instructors</div>
                    <div className="text-stone-600">Learn from experienced, licensed massage therapists</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

                </div>
            </section>




            

            {/* Final CTA */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-100 rounded-3xl mt-24">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="mb-4 text-stone-900 font-primary font-semibold text-2xl">Ready to Start Your Journey?</h2>
                    <p className="text-default mb-8 text-lg">
                        Join our next cohort and begin your career as a certified massage therapist.<br />
                        Application deadline is December 30th, 2025.
                    </p>
                    <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-stone-100 px-8 py-6 text-lg"
                        onClick={() => setApplicationOpen(true)}
                    >
                        <FileText className="mr-2 h-5 w-5" />
                        Apply Today
                    </Button>
                </div>
            </section>

            {/* Application Dialog */}
            <Dialog open={applicationOpen} onOpenChange={setApplicationOpen}>
                <DialogContent className="p-0 max-w-none w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] overflow-hidden">
    

        <div className="px-3 pt-12 pb-3 h-full">
          <iframe
            key={src} // IMPORTANT: forces reload when src changes
            title="Booking"
            src={src}
            className="w-full h-full border-0 rounded-md"
            allow="geolocation; microphone; camera; fullscreen; payment"
          />
        </div>
      </DialogContent>
            </Dialog>
        </div>
    )
}
