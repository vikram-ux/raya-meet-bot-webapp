// components/LetterAvatar.jsx

const colorPalette = [
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-red-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500'
];


const nameToColor = (name) => {
    if (!name) return 'bg-gray-400';

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const colorIndex = Math.abs(hash) % colorPalette.length;
    return colorPalette[colorIndex];
};

export default function LetterAvatar({ displayName, size = 'w-8 h-8' }) {

    const name = displayName || "U";
    const initial = name.charAt(0).toUpperCase();
    const backgroundColorClass = nameToColor(name);
    return (
        <div
            className={`${size} rounded-full flex items-center justify-center text-white font-semibold text-base ${backgroundColorClass}`}
            title={displayName}
        >
            {initial}
        </div>
    );
}