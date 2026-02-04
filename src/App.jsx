import { useEffect } from 'react'
import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'

import { Routes, Route } from 'react-router-dom'
import ShowcaseTitle from './sections/ShowcaseTitle.jsx'

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
                        <Hero />

                        <ShowcaseTitle />

                        <ShowcaseSection />
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