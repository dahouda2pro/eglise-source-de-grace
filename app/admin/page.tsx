
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DemandesTable from "./table";


export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  // 1. Vérifier la connexion
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/connexion");
  }

  // 2. Vérifier que le compte est administrateur
  const { data: admin, error: adminError } = await supabase
    .from("admins_eglise")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminError || !admin) {
    redirect("/admin/acces-refuse");
  }

  // 3. Récupérer les demandes
  const { data, error } = await supabase
    .from("demandes_fideles")
    .select("*")
    .order("created_at", { ascending: false });

  const demandes = data ?? [];

  const count = (status: string) =>
    demandes.filter((d) => d.statut === status).length;

  return (
    <main className="admin-shell">
      <header className="admin-header">
        <Link href="/" className="admin-brand">
          Source de Grâce <span>Administration</span>
        </Link>

        <div className="admin-user">
          {user.email}
          <form action="/auth/deconnexion" method="post">
            <button className="admin-logout">Déconnexion</button>
          </form>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-title-row">
          <div>
            <span className="admin-kicker">ESPACE PRIVÉ</span>
            <h1>Demandes des fidèles</h1>
            <p>Consultez et gérez les messages reçus par l'église.</p>
          </div>
          <Link href="/" className="admin-site-link">
            Voir le site ↗
          </Link>
        </div>

        {error ? (
          <p className="admin-error">
            Erreur de lecture : {error.message}.
            Vérifiez les autorisations Supabase.
          </p>
        ) : (
          <>
            <div className="admin-stats">
              <article>
                <strong>{demandes.length}</strong>
                <span>Total des demandes</span>
              </article>
              <article>
                <strong>{count("En attente")}</strong>
                <span>En attente</span>
              </article>
              <article>
                <strong>{count("En cours")}</strong>
                <span>En cours</span>
              </article>
              <article>
                <strong>{count("Traitée")}</strong>
                <span>Traitées</span>
              </article>
            </div>

            <DemandesTable demandes={demandes} />
          </>
        )}
      </div>
    </main>
  );
}
