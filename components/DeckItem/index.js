
import Chip from "../Chip";

export default function DeckItem() {
    const imagePositionMapping = {
        "demon-hunter": "30%",
    }
    return (
        <section className="rounded-xl h-[125px] bg-background overflow-hidden px-8 py-4 relative">
            <img src="/images/backgrounds/bg-demon-hunter.png" alt="Deck Item" className="absolute top-0 left-0 w-full h-full object-cover object-[50%_30%] opacity-30" />
            <div className="flex flex-row items-center h-full gap-3 relative z-10">
                <img src="/images/classes/ico-demon-hunter.png" alt="Deck Item" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col items-start">
                    <p className="text-white text-2xl leading-6">24.08.24</p>
                    <p className="text-demonHunter text-2xl leading-6">Naga Demon Hunter</p>
                    <div className="flex flex-row gap-2 items-center mt-2">
                        <Chip size="7" label="12" image="/images/ico-spells.png" />
                        <Chip size="7" label="32" image="images/ico-minions.png" />
                        <Chip size="7" label="11898" image="images/ico-dust.png" />
                    </div>
                </div>
            </div>
        </section>
    );
}