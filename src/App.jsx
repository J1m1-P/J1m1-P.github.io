import { useEffect } from 'react'
import Hero from './sections/Hero.jsx'
import ShowcaseSection from './sections/ShowcaseSection.jsx'

const App = () => {

    // Returning to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            <Hero />
            <ShowcaseSection />
        </>
    )
}

export default App