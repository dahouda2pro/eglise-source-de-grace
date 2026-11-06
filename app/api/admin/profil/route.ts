import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
export async function PATCH(request:Request){
 const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)return NextResponse.json({error:"Authentification requise."},{status:401});
 const body=await request.json();const fullName=String(body.fullName??"").trim();const phone=String(body.phone??"").trim();if(fullName.length<2||fullName.length>120)return NextResponse.json({error:"Nom invalide."},{status:400});
 const key=process.env.SUPABASE_SERVICE_ROLE_KEY;const url=process.env.NEXT_PUBLIC_SUPABASE_URL;if(!key||!url)return NextResponse.json({error:"Configuration serveur manquante."},{status:500});
 const admin=createSupabaseClient(url,key,{auth:{autoRefreshToken:false,persistSession:false}});
 const {error}=await admin.from("profils_administration").update({full_name:fullName,phone:phone||null,updated_at:new Date().toISOString()}).eq("user_id",user.id);
 if(error)return NextResponse.json({error:error.message},{status:400});return NextResponse.json({message:"Profil mis à jour."});
}
