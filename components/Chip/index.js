export default function Chip({ label, image, size }) {
    return (
        <div className="bg-background rounded-full flex items-center justify-center pr-4">
            <img src={image} alt={label} className={`w-${size} h-${size} rounded-full p-1`} />
            <p className="text-white text-lg leading-4 ml-1 mt-1">{label}</p>
        </div>
    );
}