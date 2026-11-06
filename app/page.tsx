"use client";

import { useEffect, useState } from "react";
import {
  ArrowDown,
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

// Le site est entièrement rédigé en français.

const copy = {
  fr: {
    pageTitle: "Église Source de Grâce | Kolwezi",
    pageDescription: "Un lieu de foi, d'espérance et de transformation. Église Source de Grâce, Kolwezi, République démocratique du Congo.",
    churchLabel: "ÉGLISE · KOLWEZI",
    heroLocation: "KOLWEZI, RDC",
    brandAria: "Église Source de Grâce - accueil",
    languageLabel: "Choisir la langue",
    menuLabel: "Ouvrir ou fermer le menu",
    leadership: "02 / DIRECTION",
    verse: "Ta parole est une lampe à mes pieds",
    verseReference: "PSAUME 119:105",
    everyWeek: "CHAQUE SEMAINE",
    backTop: "Retour en haut",
    galleryNote: "Les photos officielles des événements de l'église seront ajoutées prochainement.",
    nav: ["Accueil", "À propos", "Ministères", "Messages", "Galerie", "YouTube", "Événements", "Contact"],
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
    galleryLabel: "EN IMAGES",
    galleryTitle: "La vie de notre église, en images.",
    galleryText: "Revivez les temps forts de nos cultes, rencontres et événements.",
    galleryItems: ["Célébration & louange", "Communion fraternelle", "Rencontres de l'église"],
    youtubeLabel: "RESTEZ INSPIRÉS",
    youtubeTitle: "Retrouvez nos messages en vidéo.",
    youtubeText: "Suivez les prédications, les temps de louange et les temps forts de notre communauté sur notre chaîne YouTube.",
    youtubeButton: "Visiter notre chaîne YouTube",
    youtubePlaceholder: "Votre vidéo YouTube apparaîtra ici",
    youtubeSetup: "Ajoutez l'identifiant de votre vidéo dans app/page.tsx pour l'afficher ici.",
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
};

const navTargets = ["home", "about", "ministries", "messages", "gallery", "youtube", "events", "contact"];

// Renseignez ici l’identifiant de la vidéo et l’adresse de la chaîne YouTube.
const YOUTUBE_VIDEO_ID = "";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const t = copy.fr;

  useEffect(() => {
    document.title = t.pageTitle;
    document.documentElement.lang = "fr";
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", t.pageDescription);
  }, [t.pageTitle, t.pageDescription]);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" aria-label={t.brandAria}>
          <span className="brand-mark"><Cross size={22} strokeWidth={1.5} /></span>
          <span className="brand-text">
            <strong>Source de Grâce</strong>
            <small>{t.churchLabel}</small>
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
          <a className="header-visit" href="#contact">{t.visit}</a>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={t.menuLabel}>
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
        <div className="hero-location"><MapPin size={15} /> {t.heroLocation}</div>
      </section>

      <section className="welcome section page-width" id="about">
        <div className="welcome-photo">
          <div className="photo-caption"><span>01</span><span>"UNE ÉGLISE, UNE FAMILLE"</span></div>
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
            <span>"PHOTO DU PASTEUR À AJOUTER"</span>
          </div>
          <span className="image-index">{t.leadership}</span>
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
            <span>« {t.verse} »</span>
            <small>{t.verseReference}</small>
          </div>
        </div>
      </section>

      <section className="gallery section page-width" id="gallery">
        <div className="section-heading centered">
          <span className="eyebrow">{t.galleryLabel}</span>
          <h2>{t.galleryTitle}</h2>
          <p>{t.galleryText}</p>
        </div>
        <div className="gallery-grid">
          <figure className="gallery-item gallery-item-large">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1200&q=85" alt={t.galleryItems[0]} />
            <figcaption>{t.galleryItems[0]}</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85" alt={t.galleryItems[1]} />
            <figcaption>{t.galleryItems[1]}</figcaption>
          </figure>
          <figure className="gallery-item">
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=900&q=85" alt={t.galleryItems[2]} />
            <figcaption>{t.galleryItems[2]}</figcaption>
          </figure>
        </div>
        <p className="gallery-note">{t.galleryNote}</p>
      </section>

      <section className="youtube-section section" id="youtube">
        <div className="page-width youtube-inner">
          <div className="youtube-copy">
            <span className="eyebrow">{t.youtubeLabel}</span>
            <h2>{t.youtubeTitle}</h2>
            <p>{t.youtubeText}</p>
            <a className="button button-dark" href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer">
              {t.youtubeButton}<ArrowUpRight size={17} />
            </a>
          </div>
          <div className="youtube-frame">
            {YOUTUBE_VIDEO_ID ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}`}
                title="Vidéo YouTube de l’Église Source de Grâce"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="youtube-placeholder">
                <span className="youtube-play"><Play size={28} fill="currentColor" /></span>
                <strong>{t.youtubePlaceholder}</strong>
                <small>{t.youtubeSetup}</small>
              </div>
            )}
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
          <div className="event-date"><CalendarDays size={22} /><span>{t.everyWeek}</span></div>
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
            <span className="brand-text"><strong>Source de Grâce</strong><small>{t.churchLabel}</small></span>
          </a>
          <p>{t.footerLine}</p>
          <a className="back-top" href="#home">{t.backTop} <ArrowUpRight size={16} /></a>
        </div>
        <div className="page-width footer-bottom">
          <span>© {new Date().getFullYear()} Église Source de Grâce. {t.footer}</span>
          <span>{t.heroLocation}</span>
        </div>
      </footer>
    </main>
  );
}
