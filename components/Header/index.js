export default function Header() {
    return (
        <header className="flex justify-between items-center py-4 px-8 border-b-highlight border-b-8 bg-backgroundLight">
            <div className="container mx-auto">
                <div className="flex h-full gap-6 justify-start items-center">
                    <div className="flex items-center gap-2">
                        <img src="/images/thijs-portrait.png" alt="Logo" className="w-12 h-12 rounded-full" />
                        <p className="text-3xl ml-4">THIJS<span className="text-highlight">HS</span></p>
                    </div>

                    <div className="bg-white w-[1.5px] h-[35px]"></div>

                    <nav className="flex gap-4 items-center">
                        <a href="#" className="text-3xl hover:text-highlight transition-all duration-300">
                            Decks
                        </a>
                        <a href="#" className="text-3xl hover:text-highlight transition-all duration-300">
                            About
                        </a>
                        <a href="#" className="text-3xl hover:text-highlight transition-all duration-300">
                            Contact
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}