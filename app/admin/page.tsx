import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import DemandesTable from "./table";

export const dynamic = "force-dynamic";

const roleNames: Record<string, string> = { super_admin: "Super Admin", pastor: "Pasteur", finance: "Finance", secretary: "Secrétaire", deacon: "Diacre" };
const responsibilities: Record<string, string[]> = {
  super_admin: ["Créer et gérer les comptes administrateurs", "Attribuer les rôles et contrôler les accès", "Superviser les activités de l'administration"],
  pastor: ["Superviser les activités de l'église", "Consulter et traiter les demandes des fidèles", "Suivre les équipes et les responsables"],
  finance: ["Préparer les recettes et dépenses", "Suivre les offrandes et les dons", "Préparer les rapports financiers"],
  secretary: ["Gérer les demandes des fidèles", "Préparer les annonces et événements", "Tenir les procès-verbaux et les registres"],
  deacon: ["Suivre les présences et les visiteurs", "Assurer le suivi des demandes de prière", "Soumettre les rapports de service"],
};

export default async function AdminPage() {
  const { supabase, user, profile } = await requireAdmin();
  const canManageRequests = ["super_admin", "pastor", "secretary"].includes(profile.role);
  let demandes: any[] = [];
  let requestError: string | null = null;
  if (canManageRequests) {
    const { data, error } = await supabase.from("demandes_fideles").select("*").order("created_at", { ascending: false });
    demandes = data ?? []; requestError = error?.message ?? null;
  }
  const count = (status: string) => demandes.filter((d) => d.statut === status).length;

  return <main className="admin-shell">
    <header className="admin-header"><Link href="/" className="admin-brand">Source de Grâce <span>Administration</span></Link><div className="admin-user"><span>{profile.full_name} · {roleNames[profile.role]}</span><Link href="/admin/profil" className="admin-site-link">Mon profil</Link><form action="/auth/deconnexion" method="post"><button className="admin-logout">Déconnexion</button></form></div></header>
    <div className="admin-content">
      <div className="admin-title-row"><div><span className="admin-kicker">ESPACE PRIVÉ · {roleNames[profile.role].toUpperCase()}</span><h1>Bonjour, {profile.full_name.split(" ")[0]}</h1><p>Bienvenue dans votre espace d'administration de l'Église Source de Grâce.</p></div><Link href="/" className="admin-site-link">Voir le site ↗</Link></div>
      <section className="admin-panel"><div className="admin-panel-heading"><div><h2>Votre espace de travail</h2><p>Les fonctions disponibles dépendent de votre rôle.</p></div></div><ul className="admin-responsibilities">{(responsibilities[profile.role] ?? []).map((item) => <li key={item}>{item}</li>)}</ul>
        <nav className="admin-quick-links">
          {profile.role === "super_admin" && <Link href="/admin/utilisateurs">Gestion des comptes <span>→</span></Link>}
          {canManageRequests && <a href="#demandes">Demandes des fidèles <span>→</span></a>}
          <Link href="/admin/profil">Mon profil <span>→</span></Link>
        </nav>
      </section>
      {canManageRequests && <section id="demandes" className="admin-section"><div className="admin-title-row"><div><span className="admin-kicker">RELATION AVEC LES FIDÈLES</span><h2>Demandes des fidèles</h2><p>Consultez et gérez les messages reçus par l'église.</p></div></div>
        {requestError ? <p className="admin-error">Erreur de lecture : {requestError}. Vérifiez les politiques RLS Supabase.</p> : <><div className="admin-stats"><article><strong>{demandes.length}</strong><span>Total des demandes</span></article><article><strong>{count("En attente")}</strong><span>En attente</span></article><article><strong>{count("En cours")}</strong><span>En cours</span></article><article><strong>{count("Traitée")}</strong><span>Traitées</span></article></div><DemandesTable demandes={demandes} /></>}
      </section>}
    </div>
  </main>;
}
