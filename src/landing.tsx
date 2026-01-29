import Hero from './Components/Hero/hero'
import Features from './Components/Features/fetures'
import Process from './Components/process/process'
import FAQSection from './Components/FAQ/faq'
import Footer from './Components/footer/footer'
import './landingpage.css'
function LandingPage() {


  return (
    <div className='LandingPage'> 
      <Hero/>
      <Features />
      <Process />
      <FAQSection/>
      <Footer/>
    </div>
    
  )
}

export default LandingPage
