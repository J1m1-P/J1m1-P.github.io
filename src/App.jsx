import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen.jsx";
import SiteHeader from "./components/SiteHeader.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ExperiencePage from "./pages/ExperiencePage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";

import PersonalPage from './pages/PersonalPage.jsx';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
};

const RouteTransition = () => {
  const { pathname } = useLocation();

  return <div key={pathname} className="route-transition" aria-hidden="true" />;
};

const App = () => (
  <>
    <LoadingScreen />
    <ScrollToTop />
    <SiteHeader />
    <RouteTransition />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/experience" element={<ExperiencePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path='/personal' element={<PersonalPage />} />
      </Routes>
    </main>
  </>
);

export default App;
