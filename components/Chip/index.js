export default function Chip({ label, image, size, icon = false }) {
    const Icon = icon;
    return (
        <div className="bg-background rounded-full flex items-center justify-center pr-2">
            {icon && <Icon size={size} className="w-[28px] h-[28px] rounded-full p-1" />}
            {!icon && <img src={image} alt={label} className={`w-[28px] h-[28px] rounded-full p-1`} />}
            <p className="text-white text-lg leading-4 ml-1 mt-1">{label}</p>
        </div>
    );
}