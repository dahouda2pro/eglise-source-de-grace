
"use client";
import { FormEvent, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
export default function DemandeForm() {
  const [loading, setLoading] = useState(false), [notice, setNotice] = useState(""), [success, setSuccess] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setNotice(""); setSuccess(false);
    const form = event.currentTarget, values = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch("/api/demandes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Une erreur est survenue.");
      form.reset(); setSuccess(true); setNotice("Votre demande a bien été envoyée. Notre équipe pastorale vous répondra dès que possible.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Une erreur est survenue."); }
    finally { setLoading(false); }
  }
  return <form className="request-form" onSubmit={submit}>
    <label>Votre nom *<input name="nom" required minLength={2} maxLength={120} placeholder="Nom et prénom" /></label>
    <div className="request-form-row">
      <label>Adresse e-mail<input name="email" type="email" placeholder="vous@exemple.com" /></label>
      <label>Téléphone<input name="telephone" type="tel" placeholder="+243 ..." /></label>
    </div>
    <label>Nature de la demande *<select name="type_demande" required defaultValue="Prière"><option>Prière</option><option>Accompagnement pastoral</option><option>Témoignage</option><option>Information</option><option>Autre</option></select></label>
    <label>Objet *<input name="sujet" required minLength={2} maxLength={180} placeholder="Résumez votre demande" /></label>
    <label>Votre message *<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Écrivez votre message ici..." /></label>
    <button className="button button-light request-submit" type="submit" disabled={loading}>{loading ? "Envoi en cours..." : "Envoyer ma demande"} <Send size={16} /></button>
    {notice && <p className={success ? "form-notice success" : "form-notice"} role="status">{success && <CheckCircle2 size={17} />}{notice}</p>}
    <small className="privacy-note">Vos informations sont confidentielles et accessibles uniquement à l'équipe autorisée de l'église.</small>
  </form>;
}
