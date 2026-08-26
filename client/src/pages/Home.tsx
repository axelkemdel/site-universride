// Trajectoire Rouge — hero asymétrique, modules de mobilité et preuve de service.
import { useEffect, useState } from "react";
import type { FormEvent, MouseEvent } from "react";
import {
  ArrowUpRight,
  Building2,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Headphones,
  LocateFixed,
  MapPin,
  MessageCircle,
  Navigation,
  Package,
  Phone,
  Route,
  Send,
  ShieldCheck,
  Smartphone,
  Users,
  WalletCards,
} from "lucide-react";

const storage = {
  hero: "/assets/bangui-arc-pixel.png",
  banguiMonument: "/assets/bangui-monument-pixel.png",
  passenger: "/assets/car-go.webp",
  operations: "/assets/delivery-car.webp",
  routeMark: "/assets/logo-nav.png",
  go: "/assets/car-go.webp",
  comfort: "/assets/car-confort.webp",
  xl: "/assets/car-xl.webp",
  vip: "/assets/car-vip.webp",
  moto: "/assets/delivery-moto.webp",
  deliveryCar: "/assets/delivery-car.webp",
};

const vehicles = [
  { name: "Univers Go", detail: "Le quotidien, simplement.", meta: "4 places · essentiel", image: storage.go, tone: "blue" },
  { name: "Univers Confort", detail: "Plus d’espace, plus de sérénité.", meta: "4 places · climatisée", image: storage.comfort, tone: "green" },
  { name: "Univers XL", detail: "Les groupes et les bagages.", meta: "6–7 places · grand volume", image: storage.xl, tone: "amber" },
  { name: "Univers VIP", detail: "Un service qui marque l’arrivée.", meta: "4 places · premium", image: storage.vip, tone: "red" },
];

const routeSteps = [
  { index: "01", icon: MapPin },
  { index: "02", icon: LocateFixed },
  { index: "03", icon: Navigation },
];

interface HomeProps {
  focus?: string;
  lang?: Language;
}

function SectionIntro({ eyebrow, title, text, align = "left" }: { eyebrow: string; title: string; text: string; align?: "left" | "center" }) {
  return (
    <div className={`section-intro ${align === "center" ? "section-intro-center" : ""}`}>
      <span className="kicker"><span className="kicker-dot" />{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}

function RouteLine() {
  return <div className="route-line" aria-hidden="true"><span /><span /><span /><span /></div>;
}

function PhoneFrame({ label, tone = "red", mode = "passenger" }: { label: string; tone?: string; mode?: "passenger" | "operations" }) {
  return (
    <div className={`phone-frame phone-${tone}`}>
      <div className="phone-top"><span /><span /><span /></div>
      <div className={`phone-ui phone-ui-${mode}`}>
        <div className="phone-ui-header"><span className="phone-ui-logo">U</span><span>{mode === "passenger" ? "Ma course" : "Opérations"}</span><span className="phone-ui-bell">•</span></div>
        <div className="phone-ui-map"><span className="phone-map-grid" /><span className="phone-map-route" /><span className="phone-map-pin pin-start" /><span className="phone-map-pin pin-end" /><span className="phone-map-car"><CarFront size={12} /></span></div>
        {mode === "passenger" ? <><div className="phone-ui-line"><span className="phone-dot green" /><span>Départ confirmé</span><b>PK5</b></div><div className="phone-ui-line"><span className="phone-dot red" /><span>Destination</span><b>Centre-ville</b></div><div className="phone-ui-action">Voir les véhicules disponibles <ArrowUpRight size={11} /></div></> : <><div className="phone-ui-kpis"><span><b>12</b><small>Demandes</small></span><span><b className="green-text">08</b><small>Disponibles</small></span></div><div className="phone-ui-line"><span className="phone-dot green" /><span>Course active</span><b>En route</b></div><div className="phone-ui-action">Ouvrir le tableau de bord <ArrowUpRight size={11} /></div></>}
      </div>
      <div className="phone-caption"><span className="status-dot" />{label}</div>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const topic = String(data.get("topic") || "Assistance générale").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Remplissez votre nom, votre adresse email et votre message.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMessage("Saisissez une adresse email valide pour que l’équipe puisse vous répondre.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: "6fbf58d9-fa53-4bc8-8b21-87315f817ecb",
          subject: `[Univers Ride] ${topic} - ${name}`,
          name: name,
          email: email,
          message: `Motif : ${topic}\n\nMessage :\n${message}\n\nCoordonnées du client :\nNom : ${name}\nE-mail : ${email}`
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setErrorMessage("");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Une erreur est survenue lors de l'envoi. Veuillez réessayer.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Impossible de contacter le serveur. Vérifiez votre connexion internet.");
    }
  }

  return (
    <form className="support-form" onSubmit={handleSubmit} noValidate>
      <div className="support-form-heading"><span className="kicker"><span className="kicker-dot" />Écrire à l’équipe</span><span className="support-form-note">Réponse directe par e-mail</span></div>
      <div className="support-form-row"><label><span>Nom</span><input name="name" type="text" autoComplete="name" placeholder="Votre nom" required disabled={status === "submitting"} /></label><label><span>Email</span><input name="email" type="email" autoComplete="email" placeholder="vous@exemple.com" required disabled={status === "submitting"} /></label></div>
      <label><span>Motif de contact</span><select name="topic" defaultValue="Assistance générale" disabled={status === "submitting"}><option>Assistance générale</option><option>Question sur une course</option><option>Devenir chauffeur ou partenaire</option><option>Livraison</option><option>Confidentialité et données</option></select></label>
      <label><span>Message</span><textarea name="message" rows={5} placeholder="Expliquez-nous comment nous pouvons vous aider…" required disabled={status === "submitting"} /></label>
      <div className="support-form-footer"><button className="button button-primary" type="submit" disabled={status === "submitting"}>{status === "submitting" ? "Envoi en cours..." : "Envoyer le message"} <Send size={16} /></button><small>Votre message est envoyé directement à universride.rca@univers-ride.org.</small></div>
      {status === "error" && <p className="form-status form-status-error" role="alert">{errorMessage}</p>}
      {status === "success" && <p className="form-status form-status-success" role="status">Votre message a bien été envoyé à l’équipe Univers Ride. Nous vous répondrons rapidement.</p>}
    </form>
  );
}

import { translations, Language } from "../locales";

export default function Home({ focus, lang = "fr" }: HomeProps) {
  const t = translations[lang];
  const [driverNotice, setDriverNotice] = useState(false);

  function handleDriverLink(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setDriverNotice(true);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    if (!focus) return;
    const targetId = focus === "features" ? "services" : focus === "drivers" ? "chauffeurs" : focus === "pricing" ? "tarifs" : "contact";
    window.setTimeout(() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [focus]);

  return (
    <main>
      <section className="hero-section" id="top">
        <div className="hero-backdrop" style={{ backgroundImage: `url(${storage.hero})` }} aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content page-width">
          <div className="hero-copy">
            <div className="eyebrow-row"><span className="live-pulse" />{t.heroBadge}</div>
            <h1>{t.heroTitleLine1}<br /><em>{t.heroTitleLine2}</em></h1>
            <p className="hero-lead">{t.heroLead}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#telecharger">{t.heroCtaPrimary} <ArrowUpRight size={17} /></a>
              <a className="button button-quiet" href="#services">{t.heroCtaSecondary} <ChevronRight size={17} /></a>
            </div>
            <div className="hero-proof"><ShieldCheck size={16} /> {t.heroProof}</div>
          </div>
          <div className="hero-visual" aria-label="Aperçu de la mobilité Univers Ride à Bangui">
            <div className="hero-route-card">
              <div className="route-card-label"><span className="status-dot" /> Bangui · service actif</div>
              <div className="route-card-path"><b>PK5</b><RouteLine /><b>Centre-ville</b></div>
              <div className="route-card-meta"><span><Clock3 size={14} /> Suivi en direct</span><span><CarFront size={14} /> 4 gammes</span></div>
            </div>
            <div className="hero-phone-wrap"><PhoneFrame label="Espace passager" mode="passenger" /></div>
            <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
          </div>
        </div>
        <div className="hero-scroll page-width"><span>Défiler pour découvrir</span><span className="scroll-bar" /></div>
      </section>

      <section className="signal-strip" aria-label="Repères Univers Ride">
        <div className="page-width signal-grid">
          <div className="signal-item"><span className="signal-number">03</span><span>{t.serviceUsage}</span></div>
          <div className="signal-item"><span className="signal-number">04</span><span>{t.serviceFleet}</span></div>
          <div className="signal-item"><span className="signal-number">01</span><span>{t.serviceCallCenter}</span></div>
        </div>
      </section>

      <section className="services-section page-section" id="services">
        <div className="page-width">
          <SectionIntro eyebrow={t.servicesEyebrow} title={t.servicesTitle} text={t.servicesLead} />
          <div className="service-layout">
            <article className="service-feature service-feature-large">
              <div className="service-index">01 / PASSAGER</div>
              <div className="service-feature-content"><div className="service-icon"><Navigation size={20} /></div><h3>{t.service1Title}</h3><p>{t.service1Text}</p><a href="#comment-ca-marche" className="text-link">{t.service1Link} <ArrowUpRight size={15} /></a></div>
              <div className="service-route-art"><span className="route-node node-a" /><span className="route-node node-b" /><span className="route-path" /></div>
            </article>
            <article className="service-feature service-feature-delivery">
              <div className="service-index">02 / LIVRAISON</div>
              <img src={storage.moto} alt="Moto de livraison Univers Ride" loading="lazy" /><div className="service-feature-content"><div className="service-icon icon-light"><Package size={20} /></div><h3>{t.service2Title}</h3><p>{t.service2Text}</p></div>
            </article>
            <article className="service-feature service-feature-light">
              <div className="service-index">03 / ENTREPRISES</div><div className="service-feature-content"><div className="service-icon"><Headphones size={20} /></div><h3>{t.service3Title}</h3><p>{t.service3Text}</p><a href="/contact" className="text-link">{t.service3Link} <ArrowUpRight size={15} /></a></div><div className="mini-status-card"><span className="status-dot" /> 12 demandes suivies</div>
            </article>
          </div>
        </div>
      </section>

      <section className="app-preview-section page-section" id="fonctionnalites">
        <div className="page-width preview-grid">
          <div className="preview-copy"><SectionIntro eyebrow={t.previewEyebrow} title={t.previewTitle} text={t.previewLead} /><div className="check-list"><div><Check size={16} /> {t.previewCheck1}</div><div><Check size={16} /> {t.previewCheck2}</div><div><Check size={16} /> {t.previewCheck3}</div></div><a className="button button-primary" href="#telecharger">{t.previewCta} <ArrowUpRight size={17} /></a></div>
          <div className="preview-phones"><PhoneFrame label="Passager · demande en cours" tone="red" mode="passenger" /><PhoneFrame label="Opérations · suivi des demandes" tone="green" mode="operations" /></div>
        </div>
      </section>

      <section className="fleet-section page-section" id="gammes">
        <div className="page-width"><SectionIntro eyebrow={t.fleetEyebrow} title={t.fleetTitle} text={t.fleetLead} align="center" /><div className="fleet-grid">{vehicles.map((vehicle) => <article className={`fleet-card fleet-${vehicle.tone}`} key={vehicle.name}><div className="fleet-card-top"><span className="fleet-marker" />{vehicle.meta}</div><div className="fleet-image-wrap"><img src={vehicle.image} alt={vehicle.name} loading="lazy" /></div><div className="fleet-copy"><h3>{vehicle.name}</h3><p>{vehicle.detail}</p></div><a href="#telecharger" className="fleet-link" aria-label={`Choisir ${vehicle.name}`}><ArrowUpRight size={16} /></a></article>)}</div></div>
      </section>

      <section className="process-section page-section city-background-section" id="comment-ca-marche" style={{ backgroundImage: `url(${storage.banguiMonument})` }}>
        <div className="page-width"><div className="process-heading"><SectionIntro eyebrow={t.processEyebrow} title={t.processTitle} text={t.processLead} /><img src={storage.routeMark} alt="Univers Ride trajectory symbol" className="route-mark" /></div><div className="process-grid">{routeSteps.map(({ index, icon: Icon }) => { const step = index === "01" ? { title: t.step1Title, text: t.step1Text } : index === "02" ? { title: t.step2Title, text: t.step2Text } : { title: t.step3Title, text: t.step3Text }; return <article className="process-card" key={index}><div className="process-card-index">{index}</div><Icon size={22} className="process-icon" /><h3>{step.title}</h3><p>{step.text}</p></article>; })}</div></div>
      </section>

      <section className="tariff-section page-section" id="tarifs" style={{ backgroundImage: `url(${storage.banguiMonument})` }}>
        <div className="page-width tariff-panel"><div className="tariff-copy"><span className="kicker"><span className="kicker-dot" />{t.tariffEyebrow}</span><h2>{t.tariffTitle}</h2><p>{t.tariffLead}</p><a href="#telecharger" className="button button-primary">{lang === "fr" ? "Calculer mon trajet" : "Estimate my trip"} <ArrowUpRight size={17} /></a></div><div className="tariff-card"><div className="tariff-card-head"><WalletCards size={18} /><span>Estimation de course</span><span className="tariff-live">en direct</span></div><div className="tariff-route"><div><span className="route-pin route-pin-start" />Départ</div><div className="tariff-line" /><div><span className="route-pin route-pin-end" />Destination</div></div><div className="tariff-row"><span>Gamme sélectionnée</span><b>Univers Confort</b></div><div className="tariff-row"><span>Montant estimé</span><b className="tariff-price">XAF · à confirmer</b></div><div className="tariff-foot"><ShieldCheck size={14} /> Le montant final dépend du trajet confirmé.</div></div></div>
      </section>

      <section className="driver-section page-section city-background-section" id="chauffeurs" style={{ backgroundImage: `url(${storage.hero})` }}>
        <div className="page-width driver-panel"><div className="driver-visual"><img src={storage.operations} alt="Univers Ride driver and operations dashboards" loading="lazy" /><div className="driver-visual-tag"><Users size={15} /> {lang === "fr" ? "Partenaires & chauffeurs" : "Partners & drivers"}</div></div><div className="driver-copy"><span className="kicker"><span className="kicker-dot" />{t.driverEyebrow}</span><h2>{t.driverTitle}</h2><p>{t.driverLead}</p><div className="driver-points"><div><Check size={16} /> {t.driverPoint1}</div><div><Check size={16} /> {t.driverPoint2}</div><div><Check size={16} /> {t.driverPoint3}</div></div><a className="button button-primary" href="/contact">{t.driverCta} <ArrowUpRight size={17} /></a></div></div>
      </section>

      <section className="download-section page-section" id="telecharger">
        <div className="page-width download-panel"><div className="download-copy"><span className="kicker"><span className="kicker-dot" />{t.downloadEyebrow}</span><h2>{t.downloadTitle}</h2><p>{t.downloadLead}</p><div className="download-actions"><a className="button button-primary" href="/assets/univers-ride.apk" download="univers-ride.apk">{t.downloadButtonText} <ArrowUpRight size={17} /></a><span className="play-note"><span className="play-icon">▶</span> {t.downloadNote}</span></div></div><div className="download-stamp"><Smartphone size={26} /><span>Android<br /><b>APK officiel</b></span></div></div>
      </section>

      <section className="contact-section page-section" id="contact">
        <div className="page-width contact-grid"><div><SectionIntro eyebrow={t.contactEyebrow} title={t.contactTitle} text={t.contactLead} />{driverNotice && <p className="driver-contact-notice" role="status">Pour devenir chauffeur, veuillez nous contacter via notre boîte e-mail. Merci.</p>}<div className="contact-links"><a href="tel:+23672636363"><Phone size={18} /><span><small>Call Center · Appel</small><b>+236 72 63 63 63</b></span><ArrowUpRight size={16} /></a><a href="https://wa.me/23672636363" target="_blank" rel="noreferrer"><MessageCircle size={18} /><span><small>WhatsApp</small><b>Écrire à l’équipe</b></span><ArrowUpRight size={16} /></a><a href="mailto:universride.rca@univers-ride.org"><Send size={18} /><span><small>Support</small><b>universride.rca@univers-ride.org</b></span><ArrowUpRight size={16} /></a></div></div><div className="contact-stack"><ContactForm /><div className="contact-note"><div className="contact-note-icon"><Building2 size={21} /></div><h3>Univers Ride, Bangui</h3><p>Une plateforme locale pour rendre les services de mobilité plus simples, plus visibles et plus accessibles.</p><RouteLine /><a href="/politique-confidentialite" className="text-link">Consulter la politique de confidentialité <ArrowUpRight size={15} /></a></div></div></div>
      </section>
      <footer className="site-footer">
        <div className="page-width footer-grid"><div><a className="brand-lockup" href="/" aria-label="Univers Ride, accueil"><img className="brand-symbol-image" src="/assets/logo-nav.png" alt="" /><span className="brand-wordmark">UNIVERS <b>RIDE</b><i className="brand-route-underline" /></span></a><p className="footer-caption">{t.footerCaption}</p></div><div className="footer-column"><b>Explorer</b><a href="#services">Services</a><a href="#gammes">Gammes</a><a href="#comment-ca-marche">Comment ça marche</a></div><div className="footer-column"><b>Partenaires</b><a href="#contact" onClick={handleDriverLink}>Devenir chauffeur</a></div><div className="footer-column"><b>Confiance</b><a href="/politique-confidentialite">Politique de confidentialité</a><a href="/suppression-compte">Suppression de compte</a><a href="/conditions-utilisation">Conditions d’utilisation</a></div></div><div className="page-width footer-bottom"><span>© {new Date().getFullYear()} Univers Ride · Bangui, République Centrafricaine</span><span className="footer-credits" style={{opacity: 0.98, display: "block", marginTop: "8px", fontSize: "13px", lineHeight: "1.6"}}>Conception et architecture par la société <b>PGS_DSS</b>, sous la direction du PDG <b>Abraham PATASSE</b>. Réalisation technique par les ingénieurs <b>GOUNOUMOUNDJOU Oméga Hosana</b> & <b>MAGBELEMOKODE Axel Magloire</b>.</span><span className="footer-phone"><Phone size={13} /> +236 72 63 63 63</span></div>
      </footer>
    </main>
  );
}
