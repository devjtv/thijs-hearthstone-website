import React, { useState } from 'react';
import Chip from "../Chip";
import { Tooltip } from "react-tippy";
import IconButton from "../IconButton";
import { IconCopy, IconEye, IconEyeOff, IconShare } from "@tabler/icons-react";
import { classConfig } from "../../utils/constants";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js'; // Adjust the path as necessary
import { calculateDeckDustCost, calculateDeckMinions, calculateDeckSpells, convertUnixTimestampToDate, generateDeckCode, getMappedClassName, sortCards } from '../../utils/functions';
import DeckCard from '../DeckCard';
import { toast } from "react-toastify";

const fullConfig = resolveConfig(tailwindConfig);

function getTailwindColor(colorName) {
  const color = fullConfig.theme.colors[colorName];
  return typeof color === 'string' ? color : color['DEFAULT']; // Adjust for Tailwind color shades
}

const classImagePositionMapping = {
    'demon-hunter': '30%',
    'druid': '20%',
    'hunter': '25%',
    'paladin': '15%',
    'rogue': '15%',
    'warlock': '38%',
    'warrior': '35%'
}

export default function DeckItem({ deck }) {
    const [viewing, setViewing] = useState(false);

    const deckJson = JSON.parse(deck.deckData);
    const type = getMappedClassName(deckJson.class.slug);
    
    const { image, color } = classConfig[type];
    const borderColor = getTailwindColor(color);
    const textColor = getTailwindColor(color);
    const backgroundColor = 'background';

    // Copy to clipboard
    const copyToClipboard = (text, deckName) => {
        navigator.clipboard.writeText(text);
        toast('Deck Copied to Clipboard!', {
            position: "bottom-right",
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    
    return (
        <>
            <section onClick={() => { setViewing(!viewing); }} style={{ borderBottomColor: borderColor }} className={`rounded-lg h-[125px] border-b-4 bg-${backgroundColor} overflow-hidden px-8 py-4 relative transition-all duration-300 hover:cursor-pointer hover:-mx-4 hover:px-12`}>
                <img src={`/images/backgrounds/bg-${image}.png`} alt="Deck Item" style={{ objectPosition: `50% ${typeof classImagePositionMapping[type] !== 'undefined' ? classImagePositionMapping[type] : "30%"}` }} className="absolute top-0 left-0 w-full h-full object-cover opacity-30" />
                <div className="flex flex-row items-center h-full gap-3 relative z-10">
                    <img src={`/images/classes/ico-${image}.png`} alt="Deck Item" className="w-20 h-20 rounded-full" />
                    <div className="flex flex-col items-start">
                        <p className="text-white text-2xl leading-6">{convertUnixTimestampToDate(deck.deckDate)}</p>
                        <p style={{ color: textColor }} className="text-2xl leading-6">{deck.deckName ?? deckJson.class.name}</p>
                        <div className="flex flex-row gap-2 items-center mt-2">
                            <Tooltip title="Spells" position="bottom">
                                <Chip size={12} label={calculateDeckSpells(deckJson)} image="/images/ico-spells.png" />
                            </Tooltip>

                            <Tooltip title="Minions" position="bottom">
                                <Chip size={12} label={calculateDeckMinions(deckJson)} image="images/ico-minions.png" />
                            </Tooltip>

                            <Tooltip title="Dust" position="bottom">
                                <Chip size={12} label={calculateDeckDustCost(deckJson)} image="images/ico-dust.png" />
                            </Tooltip>
                        </div>
                    </div>

                    <div className="flex flex-col h-full justify-around items-start ml-auto">
                        <IconButton
                            icon={IconCopy}
                            color={color}
                            label="Copy"
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(generateDeckCode(deck.deckName, deckJson)); }}
                        />
                        <IconButton
                            icon={viewing ? IconEyeOff : IconEye}
                            color={color}
                            label={viewing ? "Hide" : "View"}
                            onClick={(e) => { e.stopPropagation(); setViewing(!viewing); }}
                        />
                    </div>
                </div>
            </section>


            {viewing && (
                <div className="space-y-2 bg-backgroundLight py-12 rounded-lg">
                    <div className="flex flex-col gap-4 justify-around items-center lg:flex-row lg:items-start">
                        <div>
                            <h3 className="text-xl mb-1 text-white">Deck Cards</h3>
                            <div className="flex flex-col gap-[2px]">
                                {sortCards(deckJson.cards, deckJson.sideboardCards).map((card) => (
                                    <DeckCard key={card.id} card={card} />
                                ))}
                            </div>
                        </div>

                        {typeof deckJson.sideboardCards !== "undefined" && deckJson.sideboardCards.length > 0 && (
                            <>
                            {deckJson.sideboardCards && deckJson.sideboardCards.map((sideboard, index) => (
                                <div key={index}>
                                    <h3 className="text-xl mb-1 text-white">{sideboard.sideboardCard.name}</h3>
                                    <div className="flex flex-col gap-[2px]">
                                        {sortCards(sideboard.cardsInSideboard).map((card) => (
                                            <DeckCard key={card.id} card={card} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}