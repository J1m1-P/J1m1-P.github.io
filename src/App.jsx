import { useEffect } from 'react'
import NavBar from './components/NavBar.jsx'
import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'
import ShowcaseTitle from './sections/ShowcaseTitle.jsx'


import { Routes, Route } from 'react-router-dom'
import LogoSection from './components/LogoSection.jsx'
import FeatureCards from './components/FeatureCards.jsx'

const App = () => {

    // Returning to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <Routes>

            <Route 
                path="/" 
                element={
                    <>
                        <NavBar /> 
                        <Hero />
                        <ShowcaseTitle />
                        <ShowcaseSection />
                        <LogoSection />
                        <FeatureCards />
                    </>
                } 
            />

            <Route 
                path="/projects" 
                element={
                    <>
                        <ShowcaseSection />
                    </>
                } 
            />

        </Routes>
    )
}

export default App