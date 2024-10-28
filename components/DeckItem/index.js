import React from 'react';
import Chip from "../Chip";
import { Tooltip } from "react-tippy";
import IconButton from "../IconButton";
import { IconCopy, IconEye, IconShare } from "@tabler/icons-react";
import { classConfig } from "../../utils/constants";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js'; // Adjust the path as necessary
import { calculateDeckDustCost, calculateDeckMinions, calculateDeckSpells, convertUnixTimestampToDate, generateDeckCode, getMappedClassName } from '../../utils/functions';

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
    console.log("DECK:", deck);

    const deckJson = JSON.parse(deck.deckData);

    console.log("Deck JSON:", deckJson);
    const type = getMappedClassName(deckJson.class.slug);
    
    const { image, color } = classConfig[type];
    const borderColor = getTailwindColor(color);
    const textColor = getTailwindColor(color);
    const backgroundColor = 'background';

    // Copy to clipboard
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        console.log('Text copied to clipboard:', text);
    };
    
    return (
        <section style={{ borderBottomColor: borderColor }} className={`rounded-lg h-[125px] border-b-4 bg-${backgroundColor} overflow-hidden px-8 py-4 relative`}>
            <img src={`/images/backgrounds/bg-${image}.png`} alt="Deck Item" style={{ objectPosition: `50% ${typeof classImagePositionMapping[type] !== 'undefined' ? classImagePositionMapping[type] : "30%"}` }} className="absolute top-0 left-0 w-full h-full object-cover opacity-30" />
            <div className="flex flex-row items-center h-full gap-3 relative z-10">
                <img src={`/images/classes/ico-${image}.png`} alt="Deck Item" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col items-start">
                    <p className="text-white text-2xl leading-6">{ convertUnixTimestampToDate(deck.deckDate) }</p>
                    <p style={{ color: textColor }} className="text-2xl leading-6">{deck.deckName ?? deckJson.class.name}</p>
                    <div className="flex flex-row gap-2 items-center mt-2">
                        <Tooltip title="Spells" position="bottom">
                            <Chip size={12} label={ calculateDeckSpells(deckJson) } image="/images/ico-spells.png" />
                        </Tooltip>
                        
                        <Tooltip title="Minions" position="bottom">
                            <Chip size={12}  label={ calculateDeckMinions(deckJson) } image="images/ico-minions.png" />
                        </Tooltip>

                        <Tooltip title="Dust" position="bottom">
                            <Chip size={12} label={ calculateDeckDustCost(deckJson) } image="images/ico-dust.png" />
                        </Tooltip>
                    </div>
                </div>

                <div className="flex flex-col h-full justify-around items-start ml-auto">
                    <IconButton icon={IconCopy} color={color} label="Copy" onClick={() => copyToClipboard(generateDeckCode(deck.deckName, deckJson))} />
                    <IconButton icon={IconEye} color={color} label="View" onClick={() => console.log("View")} />
                </div>
            </div>
        </section>
    );
}