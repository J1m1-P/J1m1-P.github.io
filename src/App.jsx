import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import LoadingScreen from "./components/layout/LoadingScreen.jsx";
import RouteImagePreloader from "./components/layout/RouteImagePreloader.jsx";
import SiteHeader from "./components/layout/SiteHeader.jsx";
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

const RouteTransitionLayer = ({ pathname, personalDiscovery, onTransitionComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDiscoveryTransition] = useState(
    () => pathname === "/personal" && personalDiscovery === "revealing",
  );

  if (!isVisible) return null;

  return (
    <div
      className={`route-transition${pathname === '/personal' ? ' route-transition--personal' : ''}${isDiscoveryTransition ? ' route-transition--discovery' : ''}`}
      aria-hidden="true"
      onAnimationEnd={(event) => {
        if (event.target !== event.currentTarget || event.animationName !== "route-fade-through") return;

        setIsVisible(false);
        if (personalDiscovery === "revealing") {
          onTransitionComplete(pathname === "/personal");
        }
      }}
    />
  );
};

const RouteTransition = ({ personalDiscovery, onTransitionComplete }) => {
  const { pathname } = useLocation();

  return (
    <RouteTransitionLayer
      key={pathname}
      pathname={pathname}
      personalDiscovery={personalDiscovery}
      onTransitionComplete={onTransitionComplete}
    />
  );
};

const App = () => {
  const [personalDiscovery, setPersonalDiscovery] = useState("hidden");
  const completePersonalTransition = (arrivedAtPersonal) => {
    setPersonalDiscovery((current) =>
      current === "revealing"
        ? (arrivedAtPersonal ? "discovered" : "hidden")
        : current,
    );
  };

  return (
    <>
      <LoadingScreen />
      <ScrollToTop />
      <RouteImagePreloader />
      <SiteHeader personalDiscovered={personalDiscovery !== "hidden"} />
      <RouteTransition
        personalDiscovery={personalDiscovery}
        onTransitionComplete={completePersonalTransition}
      />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route
            path="/contact"
            element={<ContactPage onPersonalTransitionStarted={() => setPersonalDiscovery("revealing")} />}
          />
          <Route path="/resume" element={<ResumePage />} />
          <Route path='/personal' element={<PersonalPage />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
