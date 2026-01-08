//hello
"use client";
import { useUser } from "@stackframe/stack";
import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";

export default function UserSchemaHandler() {
  const user = useUser(); // Stack Auth hook

  useEffect(() => {
    const syncToSupabase = async () => {
      if (user) {
        // User Schema Introduce logic
        const { error } = await supabase
          .from('users')
          .upsert({ 
            id: user.id, // Primary Key from Stack
            display_name: user.displayName,
            email: user.primaryEmail,
            updated_at: new Date()
          });
          
        if (!error) console.log("User Schema Introduced ✅");
      }
    };
    syncToSupabase();
  }, [user]);

  return null;
}