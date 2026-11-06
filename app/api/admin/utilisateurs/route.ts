import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const allowedRoles = ["pastor", "finance", "secretary", "deacon"] as const;

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Authentification requise." }, { status: 401 });

  const { data: actor } = await supabase
    .from("profils_administration").select("role, active").eq("user_id", user.id).maybeSingle();
  if (!actor?.active || actor.role !== "super_admin") {
    return NextResponse.json({ error: "Seul le Super Admin peut créer des comptes." }, { status: 403 });
  }

  const body = await request.json();
  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const role = String(body.role ?? "");
  if (fullName.length < 2 || !/^\S+@\S+\.\S+$/.test(email) || !allowedRoles.includes(role as typeof allowedRoles[number])) {
    return NextResponse.json({ error: "Nom, e-mail ou rôle invalide." }, { status: 400 });
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!serviceKey || !url) return NextResponse.json({ error: "Configuration serveur manquante : SUPABASE_SERVICE_ROLE_KEY." }, { status: 500 });

  const admin = createSupabaseClient(url, serviceKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName },
    redirectTo: `${new URL(request.url).origin}/admin/connexion`,
  });
  if (inviteError || !invited.user) {
    return NextResponse.json({ error: inviteError?.message ?? "Impossible d'envoyer l'invitation." }, { status: 400 });
  }

  const { error: profileError } = await admin.from("profils_administration").insert({
    user_id: invited.user.id, full_name: fullName, phone: phone || null, role, active: true,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(invited.user.id);
    return NextResponse.json({ error: `Compte non créé : ${profileError.message}` }, { status: 500 });
  }
  return NextResponse.json({ message: `Invitation envoyée à ${email}.` }, { status: 201 });
}
