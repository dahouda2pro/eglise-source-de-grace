
import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <span className="admin-kicker">ACCÈS RESTREINT</span>
        <h1>Accès non autorisé</h1>
        <p>
          Votre compte est connecté, mais il ne possède pas
          les autorisations nécessaires pour accéder à
          l'administration de l'Église Source de Grâce.
        </p>
        <Link href="/" className="admin-primary">
          Retour au site
        </Link>
      </div>
    </main>
  );
}
