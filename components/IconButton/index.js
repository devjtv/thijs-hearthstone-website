import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

const fullConfig = resolveConfig(tailwindConfig);

function getTailwindColor(colorName) {
  const color = fullConfig.theme.colors[colorName];
  return typeof color === 'string' ? color : color['DEFAULT']; // Adjust if you use Tailwind's color shades
}

function getContrastColor(bgColor) {
  if (!bgColor) return 'black'; // Default if bgColor not provided

  // Remove leading # if present
  const hex = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  
  // Convert to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calculate relative luminance (simplified)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  
  // Return black or white text based on luminance
  return luminance > 0.5 ? 'black' : 'white';
}

export default function IconButton({ icon, label, color, onClick }) {
    const Icon = icon;
    const backgroundColor = getTailwindColor(color);
    const textColor = getContrastColor(backgroundColor);
    
    return (
        <button style={{ backgroundColor }} className="w-[100px] rounded-full flex items-center justify-between px-2 py-1" onClick={onClick}>
            <Icon size={20} style={{ color: textColor }} />
            <p style={{ color: textColor }} className="text-md leading-4 ml-1 mt-1">{label}</p>
        </button>
    );
}