import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeImages } from "../../utils/siteImagePreloader.js";
import { preloadImages } from "../../utils/imagePreloader.js";

const RouteImagePreloader = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const images = routeImages[pathname];

    if (!images) return;

    // Prioritize this page over the site-wide requests started by the loader.
    preloadImages(images.priority ?? [], "high");
    preloadImages(images.standard ?? []);
  }, [pathname]);

  return null;
};

export default RouteImagePreloader;
