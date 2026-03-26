import { useState } from 'react';

export default function AutoJoinToggle({ userId, initialState }) {
  const [enabled, setEnabled] = useState(initialState);

  const handleToggle = async () => {
    const prevState = enabled;
    const newState = !enabled;
    
    // UI ko turant update karo (Optimistic UI)
    setEnabled(newState);

    try {
      const response = await fetch(`http://localhost:8000/settings/toggle-auto-join?user_id=${userId}&enabled=${newState}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error:", errorData.detail);
        alert(`Galti: ${errorData.detail}. Check karo ki User ID "${userId}" sahi hai?`);
        
        // Agar error aaya toh wapas purani state par le jao
        setEnabled(prevState);
      } else {
        console.log("DB Updated successfully!");
      }
    } catch (error) {
      console.error("Network error:", error);
      setEnabled(prevState); // Network fail hone par bhi wapas purani state
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow border border-gray-100">
      <div>
        <h3 className="font-bold text-gray-800">Auto-record meetings</h3>
        <p className="text-sm text-gray-500 italic">ID: {userId}</p>
      </div>
      <button 
        onClick={handleToggle}
        className={`w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-purple-600' : 'bg-gray-300'}`}
      >
        <div className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${enabled ? 'translate-x-7' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}