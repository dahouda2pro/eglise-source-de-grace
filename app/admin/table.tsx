
"use client";
import { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
type Demande = { id:string; nom:string; email:string|null; telephone:string|null; type_demande:string; sujet:string; message:string; statut:string; note_interne:string|null; created_at:string };
export default function DemandesTable({ demandes: initial }: { demandes: Demande[] }) {
  const [items,setItems] = useState(initial), [filter,setFilter] = useState("Toutes"), [selected,setSelected] = useState<Demande|null>(null), [busy,setBusy] = useState(false), [notice,setNotice] = useState("");
  const visible = useMemo(()=>items.filter(d=>filter==="Toutes"||d.statut===filter),[items,filter]);
  async function save(patch: Partial<Demande>) {
    if (!selected) return; setBusy(true); setNotice("");
    const supabase=createClient(); const {error}=await supabase.from("demandes_fideles").update(patch).eq("id",selected.id);
    if(error){setNotice("La mise à jour a échoué : "+error.message);setBusy(false);return;}
    const updated={...selected,...patch}; setItems(old=>old.map(d=>d.id===selected.id?updated:d)); setSelected(updated); setNotice("Modifications enregistrées.");setBusy(false);
  }
  async function remove() {
    if(!selected || !confirm("Supprimer définitivement cette demande ?")) return;
    setBusy(true);const supabase=createClient();const {error}=await supabase.from("demandes_fideles").delete().eq("id",selected.id);
    if(error){setNotice("Suppression impossible : "+error.message);setBusy(false);return;}
    setItems(old=>old.filter(d=>d.id!==selected.id));setSelected(null);setBusy(false);
  }
  return <section className="requests-panel">
    <div className="requests-toolbar"><h2>Boîte de réception <span>{visible.length}</span></h2><select value={filter} onChange={e=>setFilter(e.target.value)}><option>Toutes</option><option>En attente</option><option>En cours</option><option>Traitée</option></select></div>
    {visible.length===0?<div className="admin-empty">Aucune demande à afficher pour ce filtre.</div>:<div className="requests-list">{visible.map(d=><button key={d.id} className="request-row" onClick={()=>{setSelected(d);setNotice("");}}><span className="request-avatar">{d.nom.trim().slice(0,1).toUpperCase()}</span><span className="request-row-main"><strong>{d.nom}</strong><small>{d.type_demande} · {d.sujet}</small></span><span className={"status status-"+d.statut.replaceAll(" ","-")}>{d.statut}</span><time>{new Date(d.created_at).toLocaleDateString("fr-FR")}</time></button>)}</div>}
    {selected&&<div className="request-overlay" onClick={()=>setSelected(null)}><article className="request-detail" onClick={e=>e.stopPropagation()}><button className="detail-close" onClick={()=>setSelected(null)}>×</button><span className="admin-kicker">DÉTAIL DE LA DEMANDE</span><h2>{selected.sujet}</h2><p className="detail-sender">{selected.nom} · {new Date(selected.created_at).toLocaleString("fr-FR")}</p><div className="detail-contact">{selected.email&&<a href={"mailto:"+selected.email}>{selected.email}</a>}{selected.telephone&&<a href={"tel:"+selected.telephone}>{selected.telephone}</a>}<span>{selected.type_demande}</span></div><div className="detail-message">{selected.message}</div><label className="detail-label">Statut<select value={selected.statut} onChange={e=>save({statut:e.target.value})}><option>En attente</option><option>En cours</option><option>Traitée</option></select></label><label className="detail-label">Note interne<textarea defaultValue={selected.note_interne??""} key={selected.id} id="internal-note" rows={3} placeholder="Note visible uniquement par l'administration..." /></label><button className="admin-primary" disabled={busy} onClick={()=>{const el=document.getElementById("internal-note") as HTMLTextAreaElement|null;save({note_interne:el?.value??""});}}>Enregistrer la note</button><button className="admin-delete" disabled={busy} onClick={remove}>Supprimer cette demande</button>{notice&&<p className="admin-notice">{notice}</p>}</article></div>}
  </section>;
}
