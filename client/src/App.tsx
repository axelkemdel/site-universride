import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import LegalPage from "@/pages/LegalPage";
import { Loader } from "@/components/Loader";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useEffect, useState } from "react";
import { Globe, Moon, Sun } from "lucide-react";
import type { Language } from "./locales";

function Router({ lang }: { lang: Language }) {
  return (
    <Switch>
      <Route path="/"><Home lang={lang} /></Route>
      <Route path="/contact"><Home lang={lang} /></Route>
      <Route path="/politique-confidentialite"><LegalPage type="privacy" lang={lang} /></Route>
      <Route path="/suppression-compte"><LegalPage type="deletion" lang={lang} /></Route>
      <Route path="/conditions-utilisation"><LegalPage type="terms" lang={lang} /></Route>
      <Route path="/404" component={NotFound} />
      <Route><NotFound /></Route>
    </Switch>
  );
}

function SiteHeader({ lang, setLang }: { lang: Language; setLang: (language: Language) => void }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-nav">
      <a className="brand-lockup" href="/" aria-label="Univers Ride, accueil">
        <img className="brand-symbol-image" src="/assets/logo-nav.png" alt="" />
        <span className="brand-wordmark">UNIVERS <b>RIDE</b><i className="brand-route-underline" /></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigation principale">
        <a href="/#services">Services</a>
        <a href="/#gammes">{lang === "fr" ? "Gammes" : "Vehicles"}</a>
        <a href="/#comment-ca-marche">{lang === "fr" ? "Comment ça marche" : "How it works"}</a>
        <a href="/#contact">{lang === "fr" ? "Partenaires" : "Partners"}</a>
      </nav>
      <div className="nav-actions">
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
          aria-label={theme === "dark" ? "Activer le mode clair" : "Activer le mode sombre"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          type="button"
          className="lang-switch-btn"
          onClick={() => setLang(lang === "fr" ? "en" : lang === "en" ? "sg" : "fr")}
          title={lang === "fr" ? "Passer en anglais" : lang === "en" ? "Yângâ tî Sängö" : "Passer en français"}
          aria-label={lang === "fr" ? "Passer en anglais" : lang === "en" ? "Yângâ tî Sängö" : "Passer en français"}
        >
          <Globe size={15} />
          <span>{lang === "fr" ? "EN" : lang === "en" ? "SG" : "FR"}</span>
        </button>
        <a className="button button-primary nav-download-btn" href="/assets/univers-ride.apk" download="univers-ride.apk">
          {lang === "fr" ? "Télécharger" : "Download"}
        </a>
      </div>
    </header>
  );
}

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem("univers_ride_lang") as Language) || "fr";
  });

  useEffect(() => {
    localStorage.setItem("univers_ride_lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Loader />
          <Toaster />
          <div className="app-frame">
            <SiteHeader lang={lang} setLang={setLang} />
            <Router lang={lang} />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
