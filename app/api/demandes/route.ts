import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nom = String(body.nom ?? "").trim(), email = String(body.email ?? "").trim();
    const telephone = String(body.telephone ?? "").trim(), type_demande = String(body.type_demande ?? "Autre");
    const sujet = String(body.sujet ?? "").trim(), message = String(body.message ?? "").trim();
    const allowed = ["Prière", "Accompagnement pastoral", "Témoignage", "Information", "Autre"];
    if (nom.length < 2 || nom.length > 120 || sujet.length < 2 || sujet.length > 180 || message.length < 10 || message.length > 5000 || !allowed.includes(type_demande))
      return NextResponse.json({ error: "Veuillez vérifier les champs du formulaire." }, { status: 400 });
    const supabase = await createClient();
    const { error } = await supabase.from("demandes_fideles").insert({ nom, email: email || null, telephone: telephone || null, type_demande, sujet, message });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Impossible d'envoyer votre demande pour le moment. Réessayez plus tard." }, { status: 500 });
  }
}
