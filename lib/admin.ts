import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ChurchRole = "super_admin" | "pastor" | "finance" | "secretary" | "deacon";
export type AdminProfile = {
  user_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  role: ChurchRole;
  active: boolean;
};

export async function requireAdmin(allowedRoles?: ChurchRole[]) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/connexion");

  const { data: profile, error } = await supabase
    .from("profils_administration")
    .select("user_id, full_name, phone, avatar_url, role, active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !profile || !profile.active) redirect("/admin/acces-refuse");
  if (allowedRoles && !allowedRoles.includes(profile.role as ChurchRole)) {
    redirect("/admin/acces-refuse");
  }
  return { supabase, user, profile: profile as AdminProfile };
}
