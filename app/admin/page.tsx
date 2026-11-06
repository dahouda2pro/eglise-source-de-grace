import Link from "next/link";
import {
  Activity, BookOpen, CalendarDays, ClipboardList, FileText, HandHeart,
  LayoutDashboard, ShieldCheck, Users, Wallet, ArrowRight, HeartHandshake,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import DemandesTable from "./table";

export const dynamic = "force-dynamic";

type Role = "super_admin" | "pastor" | "finance" | "secretary" | "deacon";

const roleConfig: Record<Role, {
  label: string;
  eyebrow: string;
  title: string;
  welcome: string;
  mission: string;
  priorities: string[];
  modules: { title: string; description: string; icon: typeof Users; status: "available" | "planned"; href?: string }[];
}> = {
  super_admin: {
    label: "Super Administrateur",
    eyebrow: "GOUVERNANCE ET ADMINISTRATION",
    title: "Administration générale",
    welcome: "Bienvenue dans votre espace d'administration.",
    mission: "Coordonner les équipes administratives, gérer les accès et veiller au bon fonctionnement de la plateforme de l'Église Source de Grâce.",
    priorities: ["Créer les comptes des responsables et attribuer leurs rôles", "Vérifier que les accès correspondent aux responsabilités", "Suivre l'activité générale et les besoins des différents services", "Veiller à la sécurité et à la qualité des données"],
    modules: [
      { title: "Comptes administrateurs", description: "Inviter les responsables, attribuer les rôles et gérer les profils.", icon: ShieldCheck, status: "available", href: "/admin/utilisateurs" },
      { title: "Vue d'ensemble", description: "Suivre les différents services et leurs activités.", icon: LayoutDashboard, status: "planned" },
      { title: "Journal d'activité", description: "Consulter l'historique des actions administratives.", icon: Activity, status: "planned" },
      { title: "Demandes des fidèles", description: "Superviser les demandes adressées à l'église.", icon: HeartHandshake, status: "available", href: "#demandes" },
    ],
  },
  pastor: {
    label: "Pasteur",
    eyebrow: "DIRECTION SPIRITUELLE ET ACCOMPAGNEMENT",
    title: "Espace pastoral",
    welcome: "Bienvenue dans votre espace pastoral.",
    mission: "Conduire la vision spirituelle de l'église, accompagner les fidèles et veiller à la bonne coordination des ministères.",
    priorities: ["Suivre les demandes d'accompagnement pastoral et de prière", "Orienter les responsables et les équipes de ministère", "Préparer et suivre les programmes spirituels", "Veiller à l'accueil, à l'intégration et à la croissance des fidèles"],
    modules: [
      { title: "Demandes des fidèles", description: "Lire les demandes, assurer leur suivi et noter les actions pastorales.", icon: HandHeart, status: "available", href: "#demandes" },
      { title: "Programmes spirituels", description: "Organiser les cultes, prières, enseignements et temps de jeûne.", icon: BookOpen, status: "planned" },
      { title: "Suivi des ministères", description: "Accompagner les responsables et suivre les activités des équipes.", icon: Users, status: "planned" },
      { title: "Vue de la communauté", description: "Consulter les tendances de participation et de suivi pastoral.", icon: Activity, status: "planned" },
    ],
  },
  finance: {
    label: "Responsable financier",
    eyebrow: "GESTION ET TRANSPARENCE FINANCIÈRES",
    title: "Espace financier",
    welcome: "Bienvenue dans votre espace financier.",
    mission: "Assurer une gestion rigoureuse, documentée et transparente des ressources confiées à l'église.",
    priorities: ["Enregistrer les dîmes, offrandes et dons avec leurs justificatifs", "Enregistrer les dépenses et conserver les pièces justificatives", "Suivre le budget et les engagements financiers", "Préparer les rapports périodiques destinés aux responsables autorisés"],
    modules: [
      { title: "Recettes", description: "Dîmes, offrandes, dons et autres entrées de fonds.", icon: Wallet, status: "planned" },
      { title: "Dépenses", description: "Saisie des dépenses, bénéficiaires et justificatifs.", icon: ClipboardList, status: "planned" },
      { title: "Budgets", description: "Prévisions, suivi budgétaire et écarts.", icon: CalendarDays, status: "planned" },
      { title: "Rapports financiers", description: "Synthèses périodiques et historique des transactions.", icon: FileText, status: "planned" },
    ],
  },
  secretary: {
    label: "Secrétaire",
    eyebrow: "GESTION ADMINISTRATIVE ET COMMUNICATION",
    title: "Espace secrétariat",
    welcome: "Bienvenue dans votre espace secrétariat.",
    mission: "Organiser les informations de l'église, assurer le suivi administratif des membres et faciliter la communication officielle.",
    priorities: ["Tenir à jour les informations des membres et visiteurs", "Préparer les annonces, convocations et calendriers", "Rédiger et archiver les procès-verbaux", "Recevoir, classer et orienter les demandes des fidèles"],
    modules: [
      { title: "Demandes des fidèles", description: "Réceptionner, classer et orienter les demandes.", icon: HandHeart, status: "available", href: "#demandes" },
      { title: "Membres et visiteurs", description: "Enregistrer les membres, visiteurs et nouvelles coordonnées.", icon: Users, status: "planned" },
      { title: "Annonces et événements", description: "Préparer les communications et gérer le calendrier de l'église.", icon: CalendarDays, status: "planned" },
      { title: "Documents et réunions", description: "Rédiger les procès-verbaux et archiver les documents officiels.", icon: FileText, status: "planned" },
    ],
  },
  deacon: {
    label: "Diacre",
    eyebrow: "SERVICE ET ACCOMPAGNEMENT DE LA COMMUNAUTÉ",
    title: "Espace diaconat",
    welcome: "Bienvenue dans votre espace de service.",
    mission: "Servir la communauté, soutenir les personnes dans le besoin et assurer un accompagnement fraternel selon les missions confiées.",
    priorities: ["Accueillir et orienter les visiteurs", "Assurer le suivi des personnes et familles qui vous sont confiées", "Participer aux visites et aux actions d'entraide", "Signaler les besoins et rendre compte des actions réalisées"],
    modules: [
      { title: "Personnes à accompagner", description: "Consulter les personnes qui vous sont attribuées et suivre les contacts.", icon: Users, status: "planned" },
      { title: "Visiteurs", description: "Noter les accueils et organiser les prises de contact.", icon: HeartHandshake, status: "planned" },
      { title: "Visites et entraide", description: "Suivre les visites, besoins pratiques et actions de solidarité.", icon: HandHeart, status: "planned" },
      { title: "Rapports de service", description: "Transmettre les comptes rendus de vos activités.", icon: ClipboardList, status: "planned" },
    ],
  },
};

export default async function AdminPage() {
  const { supabase, profile } = await requireAdmin();
  const role = profile.role as Role;
  const config = roleConfig[role];
  const canManageRequests = role === "super_admin" || role === "pastor" || role === "secretary";
  let demandes: { id: string; nom: string; email: string | null; telephone: string | null; type_demande: string; sujet: string; message: string; statut: string; note_interne: string | null; created_at: string }[] = [];
  let requestError: string | null = null;

  if (canManageRequests) {
    const { data, error } = await supabase.from("demandes_fideles").select("*").order("created_at", { ascending: false });
    demandes = data ?? [];
    requestError = error?.message ?? null;
  }
  const pending = demandes.filter((d) => d.statut === "En attente").length;
  const inProgress = demandes.filter((d) => d.statut === "En cours").length;
  const completed = demandes.filter((d) => d.statut === "Traitée").length;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link href="/" className="admin-brand">Source de Grâce <span>Administration</span></Link>
        <div className="admin-user">
          <span>{profile.full_name} · {config.label}</span>
          <Link href="/admin/profil" className="admin-site-link">Mon profil</Link>
          <form action="/auth/deconnexion" method="post"><button className="admin-logout">Déconnexion</button></form>
        </div>
      </header>

      <div className="admin-content role-dashboard">
        <section className="role-hero">
          <div>
            <span className="admin-kicker">ESPACE PRIVÉ · {config.eyebrow}</span>
            <p className="role-greeting">Bonjour, {profile.full_name.split(" ")[0]}</p>
            <h1>{config.title}</h1>
            <p className="role-welcome">{config.welcome}</p>
            <p className="role-mission">{config.mission}</p>
          </div>
          <div className="role-hero-mark"><LayoutDashboard size={34} strokeWidth={1.3} /></div>
        </section>

        <section className="role-priorities admin-panel">
          <div className="role-section-heading"><span className="admin-kicker">VOTRE MISSION</span><h2>Responsabilités principales</h2></div>
          <ul className="admin-responsibilities">{config.priorities.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>

        <section className="role-modules-section">
          <div className="role-section-heading"><span className="admin-kicker">VOTRE ENVIRONNEMENT DE TRAVAIL</span><h2>Vos espaces de travail</h2><p>Les modules sont affichés selon votre fonction et vos autorisations.</p></div>
          <div className="role-module-grid">
            {config.modules.map((module) => {
              const Icon = module.icon;
              const content = <><span className="role-module-icon"><Icon size={21} strokeWidth={1.6} /></span><span className="role-module-copy"><strong>{module.title}</strong><small>{module.description}</small><em>{module.status === "available" ? "Accéder au module" : "Module à venir"}</em></span>{module.status === "available" && <ArrowRight className="role-module-arrow" size={17} />}</>;
              return module.href
                ? <Link className="role-module-card" href={module.href} key={module.title}>{content}</Link>
                : <article className="role-module-card role-module-disabled" key={module.title}>{content}</article>;
            })}
          </div>
        </section>

        {canManageRequests && (
          <section id="demandes" className="admin-section role-requests">
            <div className="role-section-heading"><span className="admin-kicker">RELATION AVEC LES FIDÈLES</span><h2>Demandes des fidèles</h2><p>Suivez les demandes reçues et assurez leur traitement dans le respect de la confidentialité.</p></div>
            {requestError ? <p className="admin-error">Erreur de lecture : {requestError}. Vérifiez les politiques RLS Supabase.</p> : <>
              <div className="admin-stats">
                <article><strong>{demandes.length}</strong><span>Total des demandes</span></article>
                <article><strong>{pending}</strong><span>En attente</span></article>
                <article><strong>{inProgress}</strong><span>En cours</span></article>
                <article><strong>{completed}</strong><span>Traitées</span></article>
              </div>
              <DemandesTable demandes={demandes} canDelete={role === "super_admin"} />
            </>}
          </section>
        )}

        <footer className="role-footer"><span>Connecté en tant que <strong>{config.label}</strong></span><Link href="/admin/profil">Gérer mon profil <ArrowRight size={14} /></Link><Link href="/">Retour au site public</Link></footer>
      </div>
    </main>
  );
}
