

"use client";

import { useState, useEffect } from "react";
import AutoJoinToggle from "@/components/AutoJoinToggle";
import { useUser } from "@stackframe/stack"; // Stack Auth Hook

export default function SettingsPage() {
  const user = useUser();
  const [initialStatus, setInitialStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      // Jab tak Stack Auth se user load nahi hota, wait karo
      if (!user) return;

      try {
        setLoading(true);
        // Backend se user ki dynamic ID ke basis par settings mangao
        const response = await fetch(`http://localhost:8000/settings/get-config?user_id=${user.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Pehle 'Integrations' mein ja kar Google connect karo.");
          }
          throw new Error("Backend se settings nahi mil pa rahi hain.");
        }

        const data = await response.json();
        // Database mein jo value hai (True/False) use state mein set karo
        setInitialStatus(data.auto_join_enabled);
        setError(null);
      } catch (err) {
        console.error("Settings Fetch Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [user]);

  // Loading States
  if (!user) return <div className="p-10 text-center text-gray-500">Stack Auth se login kar rahe hain...</div>;
  if (loading) return <div className="p-10 text-center text-blue-600 font-medium">Loading your preferences...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Apne bot ki recording settings manage karein.</p>
      </header>
      
      {error && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-xl mb-6 flex items-center gap-3">
          <span>⚠️</span> {error}
        </div>
      )}

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recording Preferences</h2>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Ab Toggle ko hum asli User ID aur DB status bhej rahe hain */}
            <AutoJoinToggle 
              userId={user.id} 
              initialState={initialStatus} 
            />
          </div>
        </section>

        <section className="p-5 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4 items-start">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-blue-800 font-medium">Pro Tip:</p>
            <p className="text-blue-700 text-sm opacity-90">
              Jab "Auto-record" ON hota hai, bot aapke Google Calendar ki meetings mein 5 minute pehle automatically join kar leta hai.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}






// "use client";

// import { useState, useEffect } from "react";
// import AutoJoinToggle from "@/components/AutoJoinToggle";

// export default function SettingsPage() {
//   const [initialStatus, setInitialStatus] = useState(false);
//   const [loading, setLoading] = useState(true);
  
//   // Apni Supabase user_id yahan dalo (Testing ke liye)
//   const userId = "467c77e9-f5d8-49ce-9d3c-2162d63052fc"; 

//   useEffect(() => {
//     async function fetchSettings() {
//       try {
//         // Ye endpoint humne main.py mein banaya hai
//         const response = await fetch(`http://localhost:8000/settings/get-config?user_id=${userId}`);
//         const data = await response.json();
        
//         // DB se aayi hui asli value state mein dalo
//         setInitialStatus(data.auto_join_enabled); 
//       } catch (err) {
//         console.error("Failed to fetch settings", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchSettings();
//   }, [userId]);

//   if (loading) return <div className="p-10 text-center">Loading Settings...</div>;

//   return (
//     <div className="p-8 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-2">Settings</h1>
//       <p className="text-gray-500 mb-8">Manage your bot recording and account preferences.</p>

//       <div className="space-y-6">
//         <section>
//           <h2 className="text-xl font-semibold mb-4">Recording Preferences</h2>
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
//             <AutoJoinToggle 
//               userId={userId} 
//               initialState={initialStatus} 
//             />
//           </div>
//         </section>

//         {/* Yahan tu aur bhi settings add kar sakta hai baad mein */}
//         <section className="p-4 bg-blue-50 rounded-lg text-blue-700 text-sm">
//           💡 <strong>Tip:</strong> Jab "Auto-record" ON hota hai, bot aapke scheduled meetings mein 5 minute pehle join kar leta hai.
//         </section>
//       </div>
//     </div>
//   );
// }