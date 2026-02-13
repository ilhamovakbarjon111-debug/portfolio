import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { PortfolioDataProvider } from './context/PortfolioDataContext'
import { LanguageProvider } from './context/LanguageContext'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminPage from './pages/AdminPage'

function PortfolioPage() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <ScrollProgress />
      <BackToTop />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioDataProvider>
        <LanguageProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PortfolioPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </BrowserRouter>
        </LanguageProvider>
      </PortfolioDataProvider>
    </ThemeProvider>
  )
}
