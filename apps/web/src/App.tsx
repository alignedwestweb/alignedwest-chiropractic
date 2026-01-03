import { useState } from "react"

import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "@/pages/Home"
import About from "@/pages/About"
import Services from "@/pages/Services"
import Resources from "@/pages/Resources"
import ClinicInfo from "@/pages/Clinic"
import "./index.css"
import { Navigation } from "@/components/ui/navigation"
import type { PageType } from "@/components/ui/navigation/types"
import { Footer } from "./components/ui/navigation/footer"
import { ScrollToTop } from "@/lib/context/ScrollToTop"

function App() {
    const navigate = useNavigate()


  const [currentPage, setCurrentPage] = useState<PageType>('home')
  const handleNavigate = (page: PageType) => {
    setCurrentPage(page)

    switch (page) {
      case "home":
        navigate("/")
        break
      case "about":
        navigate("/about")
        break
      case "services":
        navigate("/services")
        break
      case "resources":
        navigate("/resources")
        break
      case "clinic":
        navigate("/clinic")
        break
      case "book":
        navigate("/book") // if you ever add a booking page
        break
      default:
        navigate("/")
    }
  }


  return (
    <>
    <ScrollToTop />
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <Routes>
        <Route path="/" element={<Home onNavigate={handleNavigate} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services 
        onLearnMore={(slug) => {
                // IMPORTANT: use React Router navigation, not pushState
                navigate(`/resources?article=${encodeURIComponent(slug)}`)
              }}
              />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/clinic" element={<ClinicInfo />} />

      </Routes>
      <Footer onNavigate={handleNavigate} />
    </>
  )
}


export { App }