import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import ProfileForm from "./profile-form";
export const dynamic = "force-dynamic";
export default async function ProfilePage() {
  const { user, profile } = await requireAdmin();
  return <main className="admin-shell"><header className="admin-header"><Link href="/admin" className="admin-brand">Source de Grâce <span>Administration</span></Link><div className="admin-user">{profile.full_name}<form action="/auth/deconnexion" method="post"><button className="admin-logout">Déconnexion</button></form></div></header><div className="admin-content"><div className="admin-title-row"><div><span className="admin-kicker">ESPACE PERSONNEL</span><h1>Mon profil</h1><p>Vos informations personnelles et votre fonction dans l'église.</p></div><Link href="/admin" className="admin-site-link">← Tableau de bord</Link></div><ProfileForm fullName={profile.full_name} phone={profile.phone ?? ""} email={user.email ?? ""} role={profile.role} /></div></main>;
}
