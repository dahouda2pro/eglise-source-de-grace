"use client";
import { FormEvent, useState } from "react";

export default function UserCreateForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("pastor");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage("");
    try {
      const response = await fetch("/api/admin/utilisateurs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fullName, email, phone, role }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Une erreur est survenue.");
      setMessage(result.message); setFullName(""); setEmail(""); setPhone(""); setRole("pastor");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Erreur inattendue."); }
    finally { setBusy(false); }
  }
  return <section className="admin-panel"><h2>Créer un compte</h2><p>La personne recevra un e-mail d'invitation pour définir son mot de passe.</p>
    <form className="admin-create-grid" onSubmit={submit}>
      <label>Nom complet<input value={fullName} onChange={e=>setFullName(e.target.value)} required minLength={2} /></label>
      <label>Adresse e-mail<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
      <label>Téléphone<input value={phone} onChange={e=>setPhone(e.target.value)} /></label>
      <label>Rôle<select value={role} onChange={e=>setRole(e.target.value)}><option value="pastor">Pasteur</option><option value="finance">Finance</option><option value="secretary">Secrétaire</option><option value="deacon">Diacre</option></select></label>
      <button className="admin-primary" disabled={busy}>{busy ? "Création..." : "Créer et envoyer l'invitation"}</button>
    </form>
    {message && <p className="admin-notice">{message}</p>}
  </section>;
}
