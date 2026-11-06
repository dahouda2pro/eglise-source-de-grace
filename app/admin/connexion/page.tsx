
"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
export default function ConnexionAdmin() {
  const router = useRouter(); const [email,setEmail] = useState(""); const [password,setPassword] = useState("");
  const [error,setError] = useState(""); const [loading,setLoading] = useState(false);
  async function submit(e: FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError("Identifiants incorrects ou accès non autorisé."); setLoading(false); return; }
    router.replace("/admin"); router.refresh();
  }
  return <main className="admin-auth">
    <div className="admin-auth-card">
      <Link href="/" className="admin-back">← Retour au site</Link>
      <span className="admin-kicker">ÉGLISE SOURCE DE GRÂCE · KOLWEZI</span>
      <h1>Espace administration</h1>
      <p>Connectez-vous pour consulter les demandes des fidèles.</p>
      <form onSubmit={submit} className="admin-form">
        <label>Adresse e-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username" /></label>
        <label>Mot de passe<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" /></label>
        {error && <p className="admin-error">{error}</p>}
        <button className="admin-primary" disabled={loading}>{loading ? "Connexion..." : "Se connecter"}</button>
      </form>
    </div>
  </main>;
}
