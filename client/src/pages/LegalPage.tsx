// Trajectoire Rouge — pages légales publiques, lisibles et bilingues.
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import type { Language } from "../locales";

type LegalType = "privacy" | "deletion" | "terms";
type LegalSection = { title: string; text: string };

type LegalCopy = {
  label: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

const copy: Record<Language, Record<LegalType, LegalCopy>> = {
  fr: {
    privacy: {
      label: "Confidentialité",
      title: "Politique de confidentialité",
      intro: "Cette page explique quelles données Univers Ride peut traiter pour faire fonctionner les courses, les livraisons, le support et le suivi de compte.",
      sections: [
        { title: "1. Responsable du traitement", text: "Univers Ride, opérateur de la plateforme de mobilité et de livraison à Bangui, est responsable du traitement des données utilisées pour fournir ses services. Pour toute question, écrivez à universride.rca@univers-ride.org." },
        { title: "2. Données utilisées", text: "Selon le service utilisé, Univers Ride peut traiter votre nom, numéro de téléphone, adresse électronique, informations de compte, historique de courses, adresses de départ et de destination, ainsi que les données de localisation nécessaires au suivi d’une course." },
        { title: "3. Téléphone, support et services techniques", text: "Votre numéro peut servir à confirmer une demande, permettre la communication entre les personnes concernées par une course et répondre aux demandes de support. Les services de carte et de géolocalisation peuvent transmettre les informations strictement nécessaires à leur fonctionnement." },
        { title: "4. Partage limité", text: "Les informations utiles à l’exécution d’un service peuvent être visibles par le passager, le chauffeur, le coursier ou le partenaire concerné. Univers Ride ne vend pas vos données personnelles." },
        { title: "5. Conservation et sécurité", text: "Les données sont conservées pendant la durée nécessaire au compte, au service demandé, à la sécurité et aux obligations applicables. Les échanges de production doivent utiliser HTTPS/TLS et les mots de passe doivent être stockés sous forme hachée." },
        { title: "6. Vos choix", text: "Vous pouvez demander l’accès, la rectification ou la suppression de vos données en écrivant à l’adresse de confidentialité. La demande peut nécessiter une vérification raisonnable de l’identité." },
      ],
    },
    deletion: {
      label: "Vos données",
      title: "Suppression de compte",
      intro: "Vous pouvez demander la suppression de votre compte et de vos données personnelles à tout moment, depuis l’application ou par contact direct.",
      sections: [
        { title: "1. Depuis l’application", text: "Ouvrez votre espace compte, choisissez les paramètres de compte, puis l’option de suppression. L’application peut vous demander une confirmation avant l’envoi de la demande." },
        { title: "2. Par email", text: "Envoyez un message à universride.rca@univers-ride.org avec l’objet « Demande de suppression de compte ». Indiquez l’adresse électronique ou le numéro associé au compte. Ne transmettez pas de mot de passe." },
        { title: "3. Traitement de la demande", text: "Nous vérifions que la demande provient bien de la personne concernée, puis nous supprimons ou anonymisons les données qui ne doivent plus être conservées. Certaines informations peuvent rester temporairement conservées lorsqu’une obligation légale, une prévention de fraude ou un litige l’exige." },
        { title: "4. Assistance", text: "Pour une aide immédiate, appelez le Call Center au +236 72 63 63 63 ou écrivez sur WhatsApp au même numéro." },
      ],
    },
    terms: {
      label: "Cadre de service",
      title: "Conditions d’utilisation",
      intro: "Ces conditions décrivent les règles générales d’utilisation des services Univers Ride pour les passagers, chauffeurs, coursiers et partenaires.",
      sections: [
        { title: "1. Objet", text: "Univers Ride met en relation des passagers, des chauffeurs, des coursiers et des partenaires pour des services de mobilité, de livraison et de réservation. Les modalités visibles dans l’application peuvent varier selon la disponibilité locale." },
        { title: "2. Utilisation responsable", text: "Vous devez fournir des informations exactes, garder vos moyens d’accès confidentiels et utiliser la plateforme dans le respect des personnes, des véhicules et des lois applicables. Toute demande frauduleuse ou dangereuse peut être refusée." },
        { title: "3. Disponibilité et tarification", text: "Une gamme peut être temporairement indisponible lorsque les chauffeurs sont déjà engagés, hors ligne ou trop éloignés. Une estimation affichée dans l’application reste liée aux informations du trajet confirmé et aux règles tarifaires en vigueur." },
        { title: "4. Support et modifications", text: "Pour une difficulté, contactez le Call Center. Univers Ride peut faire évoluer ses écrans, ses fonctionnalités et ses conditions afin d’améliorer la sécurité et la qualité du service. Les changements importants seront présentés de manière visible." },
      ],
    },
  },
  en: {
    privacy: {
      label: "Privacy",
      title: "Privacy Policy",
      intro: "This page explains which data Univers Ride may process to operate rides, deliveries, support, and account services.",
      sections: [
        { title: "1. Data controller", text: "Univers Ride, the Bangui mobility and delivery platform operator, is responsible for processing the data used to provide its services. For questions, email universride.rca@univers-ride.org." },
        { title: "2. Data we use", text: "Depending on the service, Univers Ride may process your name, phone number, email address, account information, ride history, pickup and destination addresses, and location data needed to track a ride." },
        { title: "3. Phone, support, and technical services", text: "Your phone number may be used to confirm a request, enable communication between people involved in a ride, and answer support requests. Mapping and location services may receive information strictly necessary for their operation." },
        { title: "4. Limited sharing", text: "Information needed to provide a service may be visible to the relevant passenger, driver, courier, or partner. Univers Ride does not sell your personal data." },
        { title: "5. Retention and security", text: "Data is kept for as long as needed for the account, requested service, security, and applicable obligations. Production exchanges must use HTTPS/TLS and passwords must be stored in hashed form." },
        { title: "6. Your choices", text: "You may request access, correction, or deletion of your data by contacting our privacy address. A reasonable identity check may be required." },
      ],
    },
    deletion: {
      label: "Your data",
      title: "Account deletion",
      intro: "You may request the deletion of your account and personal data at any time from the app or by contacting us directly.",
      sections: [
        { title: "1. From the app", text: "Open your account area, select account settings, then choose the deletion option. The app may ask you to confirm before sending the request." },
        { title: "2. By email", text: "Email universride.rca@univers-ride.org with the subject “Account deletion request”. Include the email address or phone number associated with the account. Do not send a password." },
        { title: "3. Request processing", text: "We verify that the request comes from the person concerned, then delete or anonymize data that no longer needs to be kept. Some information may be retained temporarily when required by law, fraud prevention, or a dispute." },
        { title: "4. Assistance", text: "For immediate help, call the Call Center at +236 72 63 63 63 or write to the same number on WhatsApp." },
      ],
    },
    terms: {
      label: "Service framework",
      title: "Terms of use",
      intro: "These terms describe the general rules for using Univers Ride services as a passenger, driver, courier, or partner.",
      sections: [
        { title: "1. Purpose", text: "Univers Ride connects passengers, drivers, couriers, and partners for mobility, delivery, and booking services. Information shown in the app may vary according to local availability." },
        { title: "2. Responsible use", text: "You must provide accurate information, keep your access credentials confidential, and use the platform in accordance with people, vehicles, and applicable laws. Fraudulent or dangerous requests may be refused." },
        { title: "3. Availability and pricing", text: "A vehicle class may be temporarily unavailable when drivers are already engaged, offline, or too far away. An estimate shown in the app remains linked to the confirmed route and current pricing rules." },
        { title: "4. Support and changes", text: "For an issue, contact the Call Center. Univers Ride may update screens, features, and terms to improve service safety and quality. Important changes will be presented clearly." },
      ],
    },
  },
  sg: {
    privacy: {
      label: "Bango na bango",
      title: "Ndoni ti bata bango ni",
      intro: "Mbeni mbeto afa aye ti mbilimbili so Univers Ride alingbi ti sala teti kongo lege, fango ye na bata compte.",
      sections: [
        { title: "1. Molenge ti kusala ni", text: "Univers Ride, nene ti kongo lege na fango ye na Bangui, ayeke bata bango ti mbilimbili. Teti hunda kue, son na universride.rca@univers-ride.org." },
        { title: "2. Aye ti bango", text: "Alingbi na kusala ni, Univers Ride alingbi ti bata iri ti mo, nimero ti telefo, email, kongo lege ti mo na sango ti ndo." },
        { title: "3. Telefo na wakua", text: "Nimero ti mo alingbi ti mû maboko na fango tene, sara tene na chauffeur na kiri tënë na hunda." },
        { title: "4. Mungö na mbeni zo ape", text: "Sango ti kusala alingbi ti wara na passenger wala chauffeur. Univers Ride ayeke koni bango ti mo ape." },
        { title: "5. Bata ni na bango ti polele", text: "A bata sango ni teti ngoi so alingbi na mbeto na kusala." },
        { title: "6. Soro ti mo", text: "Mo lingbi ti hunda bango, yengo wala futo ti sango ti mo na tongo ti mbeto ni." },
      ],
    },
    deletion: {
      label: "Sango ti mo",
      title: "Futongo ti compte",
      intro: "Mo lingbi ti hunda futongo ti compte ti mo na a-application wala na kongo nene.",
      sections: [
        { title: "1. Na yâ application ni", text: "Zibe ndo ti compte ti mo, soro paramètre na hunda futongo ni." },
        { title: "2. Na lege ti email", text: "Tokua email na universride.rca@univers-ride.org na tënë « Hunda futongo ti compte »." },
        { title: "3. Bango ti hunda ni", text: "E yeke bango hunda ni hio na e yeke futo wala honge sango ti mo." },
        { title: "4. Wakua", text: "Teti mungo maboko hio, iri Call Center na +236 72 63 63 63." },
      ],
    },
    terms: {
      label: "Mbeto ti kusala",
      title: "Ndoni ti salango kusala",
      intro: "Ndoni ti mbeto afa tambela ti salango kusala ti Univers Ride teti passenger, chauffeur na wamarä.",
      sections: [
        { title: "1. Tene ti kusala ni", text: "Univers Ride akono passenger, chauffeur na wamarä teti kongo lege na fango ye." },
        { title: "2. Salango kusala na mbilimbili", text: "Mo hunda ti fa bango ti mbilimbili na bata yengo ti mo na yâ mbeto ti kodoro." },
        { title: "3. Wara ni na pé", text: "Tele moto alingbi ti wara kusala ape tongana chauffeur ayeke na yâ mbeni kongo lege ni awe." },
        { title: "4. Wakua na changement", text: "Teti kpale, iri Call Center. Univers Ride alingbi ti mû yengo ti fini teti nzoni ti kusala." },
      ],
    },
  },
};

const legalBackgrounds: Record<LegalType, string> = {
  privacy: "/assets/bangui-arc-pixel.png",
  deletion: "/assets/bangui-monument-pixel.png",
  terms: "/assets/bangui-arc-pixel.png",
};

function LegalFooter({ lang }: { lang: Language }) {
  const en = lang === "en";
  return (
    <footer className="legal-footer">
      <div><b>UNIVERS <span>RIDE</span></b><p>{en ? "Local mobility, designed for Bangui." : "La mobilité locale, pensée pour Bangui."}</p></div>
      <div className="legal-footer-links"><a href="/">{en ? "Home" : "Accueil"}</a><a href="/politique-confidentialite">{en ? "Privacy" : "Confidentialité"}</a><a href="/suppression-compte">{en ? "Account deletion" : "Suppression de compte"}</a><a href="/conditions-utilisation">{en ? "Terms" : "Conditions"}</a></div>
    </footer>
  );
}

function LegalHeader({ lang }: { lang: Language }) {
  return <header className="legal-topbar"><a href="/" className="brand-lockup"><span className="brand-mark">U</span><span className="brand-wordmark">UNIVERS <b>RIDE</b></span></a><a href="/" className="back-link"><ArrowLeft size={16} /> {lang === "en" ? "Back to home" : "Retour à l’accueil"}</a></header>;
}

export default function LegalPage({ type, lang = "fr" }: { type: LegalType; lang?: Language }) {
  const page = copy[lang][type];
  const en = lang === "en";
  return (
    <main className={`legal-page legal-page-${type}`}>
      <div
        className="legal-page-backdrop"
        aria-hidden="true"
        style={{ backgroundImage: `url('${legalBackgrounds[type]}')` }}
      />
      <div className="legal-page-scrim" aria-hidden="true" />
      <div className="legal-page-content">
        <LegalHeader lang={lang} />
        <div className="legal-layout">
          <aside className="legal-aside"><span className="kicker"><span className="kicker-dot" />Univers Ride · {page.label}</span><div className="legal-aside-rule" /><p>{en ? "Last updated: August 2026" : "Dernière mise à jour : août 2026"}</p><a href="mailto:universride.rca@univers-ride.org"><Mail size={15} /> universride.rca@univers-ride.org</a></aside>
          <article className="legal-article">
            <h1>{page.title}</h1>
            <p className="legal-intro">{page.intro}</p>
            <div className="legal-content">{page.sections.map(section => <section key={section.title}><h2>{section.title}</h2><p>{section.text}</p></section>)}</div>
            <div className="legal-contact-card"><ShieldCheck size={20} /><div><b>{en ? "Have a question about your data?" : "Une question sur vos données ?"}</b><p>{en ? "Contact the team at" : "Contactez l’équipe à"} <a href="mailto:universride.rca@univers-ride.org">universride.rca@univers-ride.org</a> {en ? "or call" : "ou appelez le"} <a href="tel:+23672636363">+236 72 63 63 63</a>.</p></div></div>
          </article>
        </div>
        <LegalFooter lang={lang} />
      </div>
    </main>
  );
}
