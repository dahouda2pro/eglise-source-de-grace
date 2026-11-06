"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Cross,
  Heart,
  MapPin,
  Menu,
  Play,
  Quote,
  X,
} from "lucide-react";

type Language = "fr" | "en";

const copy = {
  fr: {
    nav: ["Accueil", "À propos", "Ministères", "Messages", "Événements", "Contact"],
    eyebrow: "BIENVENUE À L'ÉGLISE SOURCE DE GRÂCE",
    headline: "Une source de grâce.\nUne famille de foi.",
    intro:
      "Un lieu où chacun peut rencontrer Dieu, grandir dans la foi et trouver une communauté qui l'accueille avec amour.",
    visit: "Planifier une visite",
    discover: "Découvrir notre église",
    welcome: "BIENVENUE CHEZ VOUS",
    welcomeTitle: "Vous avez votre place ici.",
    welcomeText:
      "Que vous découvriez la foi ou que vous cherchiez une famille spirituelle, nous serions heureux de vous accueillir. Venez comme vous êtes : avançons ensemble dans la grâce de Dieu.",
    aboutLink: "En savoir plus sur nous",
    missionLabel: "NOTRE CŒUR",
    missionTitle: "Connaître Dieu. Vivre sa grâce. La partager.",
    missionText:
      "Nous croyons en une foi vivante qui transforme les cœurs, restaure les vies et se manifeste par l'amour envers notre prochain.",
    values: [
      ["Foi", "Nous plaçons Jésus-Christ au centre de notre vie et de notre espérance."],
      ["Communauté", "Nous grandissons ensemble dans l'amour, la prière et le partage."],
      ["Service", "Nous mettons nos dons au service de Dieu et de notre prochain."],
    ],
    pastorLabel: "UN MOT DE NOTRE PASTEUR",
    pastorTitle: "Bienvenue dans la famille.",
    pastorText:
      "Je vous invite à découvrir une communauté où la Parole de Dieu nous inspire, où la grâce nous relève et où chacun peut grandir dans sa relation avec le Seigneur.",
    pastorName: "Felly Kasongo",
    pastorRole: "Pasteur principal",
    ministriesLabel: "GRANDIR ENSEMBLE",
    ministriesTitle: "Une place pour chacun.",
    ministriesText:
      "Découvrez les espaces où nous apprenons, servons, prions et partageons la vie ensemble.",
    ministries: [
      ["Louange & adoration", "Célébrer Dieu ensemble dans la louange et la prière."],
      ["Jeunesse", "Accompagner la nouvelle génération dans une foi solide."],
      ["Enseignement biblique", "Approfondir la Parole et grandir dans la connaissance de Dieu."],
    ],
    messagesLabel: "NOURRIR VOTRE FOI",
    messagesTitle: "La Parole pour chaque saison.",
    messagesText:
      "Retrouvez bientôt ici nos prédications, enseignements et ressources pour vous accompagner tout au long de la semaine.",
    messagesCta: "Explorer les messages",
    eventsLabel: "RESTONS CONNECTÉS",
    eventsTitle: "La vie de notre église.",
    eventsText:
      "Retrouvez-nous lors de nos rassemblements et partageons des moments de foi, de communion et de joie.",
    sunday: "Culte dominical",
    sundayTime: "Horaire à confirmer",
    eventNote: "Les horaires et les détails seront bientôt publiés.",
    contactLabel: "NOUS SERIONS HEUREUX DE VOUS RENCONTRER",
    contactTitle: "Faisons connaissance.",
    contactText:
      "Vous avez une question, un sujet de prière ou souhaitez nous rendre visite ? Écrivez-nous. Nous serons heureux de vous répondre.",
    location: "Kolwezi, Lualaba\nRépublique démocratique du Congo",
    contactButton: "Nous contacter",
    footerLine: "Un lieu de foi, d'espérance et de transformation.",
    footer: "Tous droits réservés.",
    prayer: "Besoin de prière ?",
    prayerText: "Nous sommes là pour vous écouter et prier avec vous.",
  },
  en: {
    nav: ["Home", "About", "Ministries", "Messages", "Events", "Contact"],
    eyebrow: "WELCOME TO SOURCE OF GRACE CHURCH",
    headline: "A source of grace.\nA family of faith.",
    intro:
      "A place to encounter God, grow in faith, and find a community that welcomes you with love.",
    visit: "Plan your visit",
    discover: "Discover our church",
    welcome: "WELCOME HOME",
    welcomeTitle: "There is a place for you here.",
    welcomeText:
      "Whether you are exploring faith or looking for a spiritual family, we would love to welcome you. Come as you are: let us grow together in the grace of God.",
    aboutLink: "Learn more about us",
    missionLabel: "OUR HEART",
    missionTitle: "Know God. Live in grace. Share it.",
    missionText:
      "We believe in a living faith that transforms hearts, restores lives, and is expressed through love for our neighbors.",
    values: [
      ["Faith", "We place Jesus Christ at the center of our lives and our hope."],
      ["Community", "We grow together through love, prayer, and fellowship."],
      ["Service", "We use our gifts to serve God and those around us."],
    ],
    pastorLabel: "A WORD FROM OUR PASTOR",
    pastorTitle: "Welcome to the family.",
    pastorText:
      "I invite you to discover a community where God's Word inspires us, grace lifts us up, and everyone can grow in their relationship with the Lord.",
    pastorName: "Felly Kasongo",
    pastorRole: "Senior Pastor",
    ministriesLabel: "GROWING TOGETHER",
    ministriesTitle: "A place for everyone.",
    ministriesText:
      "Discover the places where we learn, serve, pray, and share life together.",
    ministries: [
      ["Worship", "Celebrate God together through worship and prayer."],
      ["Youth", "Encourage the next generation to build a strong faith."],
      ["Bible teaching", "Explore Scripture and grow in the knowledge of God."],
    ],
    messagesLabel: "NOURISH YOUR FAITH",
    messagesTitle: "The Word for every season.",
    messagesText:
      "Our sermons, teachings, and resources will soon be available here to encourage you throughout the week.",
    messagesCta: "Explore messages",
    eventsLabel: "STAY CONNECTED",
    eventsTitle: "Life at our church.",
    eventsText:
      "Join us for worship and share moments of faith, fellowship, and joy.",
    sunday: "Sunday worship",
    sundayTime: "Schedule to be confirmed",
    eventNote: "Service times and event details will be published soon.",
    contactLabel: "WE WOULD LOVE TO MEET YOU",
    contactTitle: "Let's get to know each other.",
    contactText:
      "Have a question, a prayer request, or want to visit? Get in touch. We would be happy to hear from you.",
    location: "Kolwezi, Lualaba\nDemocratic Republic of the Congo",
    contactButton: "Get in touch",
    footerLine: "A place of faith, hope, and transformation.",
    footer: "All rights reserved.",
    prayer: "Need prayer?",
    prayerText: "We are here to listen and pray with you.",
  },
};

const navTargets = ["home", "about", "ministries", "messages", "events", "contact"];

export default function Home() {
  const [lang, setLang] = useState<Language>("fr");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy[lang];

  const changeLanguage = (next: Language) => {
    setLang(next);
    document.documentElement.lang = next;
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Église Source de Grâce - accueil">
          <span className="brand-mark"><Cross size={22} strokeWidth={1.5} /></span>
          <span className="brand-text">
            <strong>Source de Grâce</strong>
            <small>ÉGLISE · KOLWEZI</small>
          </span>
        </a>

        <nav className={`desktop-nav ${menuOpen ? "nav-open" : ""}`}>
          {t.nav.map((item, index) => (
            <a key={item} href={`#${navTargets[index]}`} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label="Choose language">
            <button className={lang === "fr" ? "active" : ""} onClick={() => changeLanguage("fr")}>FR</button>
            <span />
            <button className={lang === "en" ? "active" : ""} onClick={() => changeLanguage("en")}>EN</button>
          </div>
          <a className="header-visit" href="#contact">{t.visit}</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="hero-image" />
        <div className="hero-shade" />
        <div className="hero-content page-width">
          <span className="eyebrow light">{t.eyebrow}</span>
          <h1>{t.headline.split("\n").map((line) => <span key={line}>{line}</span>)}</h1>
          <p>{t.intro}</p>
          <div className="hero-actions">
            <a className="button button-light" href="#contact">{t.visit}<ArrowUpRight size={17} /></a>
            <a className="text-link light-link" href="#about">{t.discover}<ArrowDown size={16} /></a>
          </div>
        </div>
        <div className="hero-location"><MapPin size={15} /> KOLWEZI, RDC</div>
      </section>

      <section className="welcome section page-width" id="about">
        <div className="welcome-photo">
          <div className="photo-caption"><span>01</span><span>{lang === "fr" ? "UNE ÉGLISE, UNE FAMILLE" : "ONE CHURCH, ONE FAMILY"}</span></div>
        </div>
        <div className="welcome-copy">
          <span className="eyebrow">{t.welcome}</span>
          <h2>{t.welcomeTitle}</h2>
          <p>{t.welcomeText}</p>
          <a className="text-link" href="#mission">{t.aboutLink}<ArrowUpRight size={17} /></a>
        </div>
      </section>

      <section className="mission section" id="mission">
        <div className="page-width mission-inner">
          <div className="mission-heading">
            <span className="eyebrow">{t.missionLabel}</span>
            <h2>{t.missionTitle}</h2>
            <p>{t.missionText}</p>
          </div>
          <div className="values-grid">
            {t.values.map(([title, text], index) => (
              <article className="value-card" key={title}>
                <span className="value-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pastor section page-width">
        <div className="pastor-image">
          <div className="portrait-placeholder">
            <span className="portrait-icon"><Cross size={34} strokeWidth={1.2} /></span>
            <span>{lang === "fr" ? "PHOTO DU PASTEUR À AJOUTER" : "PASTOR PHOTO TO BE ADDED"}</span>
          </div>
          <span className="image-index">02 / LEADERSHIP</span>
        </div>
        <div className="pastor-copy">
          <Quote className="quote-icon" size={36} strokeWidth={1.2} />
          <span className="eyebrow">{t.pastorLabel}</span>
          <h2>{t.pastorTitle}</h2>
          <p>{t.pastorText}</p>
          <div className="pastor-signature">
            <strong>{t.pastorName}</strong>
            <span>{t.pastorRole}</span>
          </div>
        </div>
      </section>

      <section className="ministries section" id="ministries">
        <div className="page-width">
          <div className="section-heading centered">
            <span className="eyebrow">{t.ministriesLabel}</span>
            <h2>{t.ministriesTitle}</h2>
            <p>{t.ministriesText}</p>
          </div>
          <div className="ministry-grid">
            {t.ministries.map(([title, text], index) => (
              <article className="ministry-card" key={title}>
                <div className={`ministry-image ministry-image-${index + 1}`} />
                <div className="ministry-card-copy">
                  <span className="value-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <a href="#contact" aria-label={title}><ArrowUpRight size={18} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="messages section" id="messages">
        <div className="page-width messages-inner">
          <div>
            <span className="eyebrow">{t.messagesLabel}</span>
            <h2>{t.messagesTitle}</h2>
            <p>{t.messagesText}</p>
            <a className="button button-dark" href="#contact">{t.messagesCta}<ArrowUpRight size={17} /></a>
          </div>
          <div className="bible-art">
            <BookOpen size={54} strokeWidth={1} />
            <span>« {lang === "fr" ? "Ta parole est une lampe à mes pieds" : "Your word is a lamp to my feet"} »</span>
            <small>PSAUME 119:105 · PSALM 119:105</small>
          </div>
        </div>
      </section>

      <section className="events section page-width" id="events">
        <div className="events-title">
          <span className="eyebrow">{t.eventsLabel}</span>
          <h2>{t.eventsTitle}</h2>
          <p>{t.eventsText}</p>
        </div>
        <article className="event-card">
          <div className="event-date"><CalendarDays size={22} /><span>{lang === "fr" ? "CHAQUE SEMAINE" : "EVERY WEEK"}</span></div>
          <div className="event-info"><h3>{t.sunday}</h3><p>{t.sundayTime}</p></div>
          <div className="event-arrow"><ArrowUpRight /></div>
        </article>
        <p className="event-note">{t.eventNote}</p>
      </section>

      <section className="contact section" id="contact">
        <div className="page-width contact-inner">
          <div className="contact-copy">
            <span className="eyebrow light">{t.contactLabel}</span>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <a className="button button-light" href="mailto:contact@eglisesourcedegrace.org">{t.contactButton}<ArrowUpRight size={17} /></a>
          </div>
          <div className="contact-details">
            <div><MapPin size={20} /><span>{t.location}</span></div>
            <div><Heart size={20} /><span><strong>{t.prayer}</strong><br />{t.prayerText}</span></div>
            <div><CalendarDays size={20} /><span>{t.sunday}<br /><small>{t.sundayTime}</small></span></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="page-width footer-main">
          <a className="brand footer-brand" href="#home">
            <span className="brand-mark"><Cross size={22} strokeWidth={1.5} /></span>
            <span className="brand-text"><strong>Source de Grâce</strong><small>ÉGLISE · KOLWEZI</small></span>
          </a>
          <p>{t.footerLine}</p>
          <a className="back-top" href="#home">{lang === "fr" ? "Retour en haut" : "Back to top"} <ArrowUpRight size={16} /></a>
        </div>
        <div className="page-width footer-bottom">
          <span>© {new Date().getFullYear()} Église Source de Grâce. {t.footer}</span>
          <span>KOLWEZI · RDC</span>
        </div>
      </footer>
    </main>
  );
}
