import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import UserCreateForm from "./user-create-form";

export const dynamic = "force-dynamic";

const roleLabels: Record<string, string> = {
  super_admin: "Super Admin", pastor: "Pasteur", finance: "Finance", secretary: "Secrétaire", deacon: "Diacre",
};

export default async function UsersPage() {
  const { supabase, profile } = await requireAdmin(["super_admin"]);
  const { data: users, error } = await supabase
    .from("profils_administration")
    .select("user_id, full_name, phone, role, active, created_at")
    .order("created_at", { ascending: false });

  return <main className="admin-shell">
    <header className="admin-header"><Link href="/admin" className="admin-brand">Source de Grâce <span>Administration</span></Link><div className="admin-user">{profile.full_name}<form action="/auth/deconnexion" method="post"><button className="admin-logout">Déconnexion</button></form></div></header>
    <div className="admin-content">
      <div className="admin-title-row"><div><span className="admin-kicker">GESTION DES ACCÈS</span><h1>Comptes administrateurs</h1><p>Créez un compte personnel et attribuez un rôle à chaque responsable.</p></div><Link className="admin-site-link" href="/admin">← Tableau de bord</Link></div>
      <UserCreateForm />
      <section className="admin-panel"><h2>Comptes existants</h2>
        {error ? <p className="admin-error">{error.message}</p> : <div className="admin-user-list">{(users ?? []).map((item) => <article className="admin-user-row" key={item.user_id}><div><strong>{item.full_name}</strong><span>{roleLabels[item.role] ?? item.role} · {item.phone || "Téléphone non renseigné"}</span></div><span className={item.active ? "admin-status-active" : "admin-status-inactive"}>{item.active ? "Actif" : "Désactivé"}</span></article>)}</div>}
      </section>
    </div>
  </main>;
}
