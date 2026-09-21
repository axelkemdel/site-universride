import { useEffect, useState } from "react";

export function Loader({ onLoadComplete }: { onLoadComplete?: () => void }) {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if hero image is already cached or loaded
    const img = new Image();
    img.src = "/assets/hero-bangui.jpg";
    const handleReady = () => {
      setFading(true);
      const timer = window.setTimeout(() => {
        setLoading(false);
        onLoadComplete?.();
      }, 400);
      return () => clearTimeout(timer);
    };

    if (img.complete) {
      handleReady();
    } else {
      img.onload = handleReady;
      img.onerror = handleReady; // Fallback so user isn't blocked if image fails
    }

    // Maximum timeout fallback in case of slow connection
    const maxTimer = window.setTimeout(() => {
      if (loading) {
        setFading(true);
        window.setTimeout(() => setLoading(false), 400);
      }
    }, 2500);

    return () => clearTimeout(maxTimer);
  }, []);

  if (!loading) return null;

  return (
    <div className={`site-loader ${fading ? "site-loader-fade" : ""}`} aria-hidden={!loading}>
      <div className="site-loader-content">
        <div className="site-loader-brand">
          <span className="site-loader-logo">U</span>
          <span className="site-loader-title">UNIVERS <b>RIDE</b></span>
        </div>
        <div className="site-loader-bar"><span className="site-loader-progress" /></div>
        <p className="site-loader-text">Chargement de l’expérience de mobilité…</p>
      </div>
    </div>
  );
}
