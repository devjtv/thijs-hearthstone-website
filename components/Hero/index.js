export default function Hero({ title, image }) {
    return (
        <section className="container pt-12 mx-auto px-4 md:px-8">
            <div className="rounded-xl h-[260px] bg-backgroundLight overflow-hidden relative md:h-[350px]">
                <img src={image} alt={title} className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-6xl absolute bottom-6 left-8">{title}</h1>
                </div>
            </div>
        </section>
    );
}