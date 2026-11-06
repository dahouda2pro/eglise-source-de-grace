
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = [
  "Prière",
  "Accompagnement pastoral",
  "Témoignage",
  "Information",
  "Autre",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const nom = String(body.nom ?? "").trim();
    const email = String(body.email ?? "").trim();
    const telephone = String(body.telephone ?? "").trim();
    const type_demande = String(body.type_demande ?? "Autre");
    const sujet = String(body.sujet ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (
      nom.length < 2 ||
      nom.length > 120 ||
      sujet.length < 2 ||
      sujet.length > 180 ||
      message.length < 10 ||
      message.length > 5000 ||
      !ALLOWED_TYPES.includes(type_demande)
    ) {
      return NextResponse.json(
        { error: "Veuillez vérifier les champs du formulaire." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from("demandes_fideles")
      .insert({
        nom,
        email: email || null,
        telephone: telephone || null,
        type_demande,
        sujet,
        message,
      })
      .select("id")
      .single();

    if (error) {
      console.error("SUPABASE REQUEST INSERT ERROR:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        {
          error: "Votre demande n'a pas pu être enregistrée.",
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      id: data.id,
      message: "Votre demande a bien été enregistrée.",
    });

  } catch (error) {
    console.error("REQUEST API ERROR:", error);

    return NextResponse.json(
      { error: "Une erreur technique est survenue." },
      { status: 500 }
    );
  }
}
