"use client";

import { useState, useEffect } from "react";
import AutoJoinToggle from "@/components/AutoJoinToggle";

export default function SettingsPage() {
  const [initialStatus, setInitialStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Apni Supabase user_id yahan dalo (Testing ke liye)
  const userId = "467c77e9-f5d8-49ce-9d3c-2162d63052fc"; 

  useEffect(() => {
    async function fetchSettings() {
      try {
        // Ye endpoint humne main.py mein banaya hai
        const response = await fetch(`http://localhost:8000/settings/get-config?user_id=${userId}`);
        const data = await response.json();
        
        // DB se aayi hui asli value state mein dalo
        setInitialStatus(data.auto_join_enabled); 
      } catch (err) {
        console.error("Failed to fetch settings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [userId]);

  if (loading) return <div className="p-10 text-center">Loading Settings...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-gray-500 mb-8">Manage your bot recording and account preferences.</p>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-4">Recording Preferences</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <AutoJoinToggle 
              userId={userId} 
              initialState={initialStatus} 
            />
          </div>
        </section>

        {/* Yahan tu aur bhi settings add kar sakta hai baad mein */}
        <section className="p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
          💡 <strong>Tip:</strong> Jab "Auto-record" ON hota hai, bot aapke scheduled meetings mein 5 minute pehle join kar leta hai.
        </section>
      </div>
    </div>
  );
}