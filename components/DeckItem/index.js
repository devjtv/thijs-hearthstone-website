import React from 'react';
import Chip from "../Chip";
import { Tooltip } from "react-tippy";
import IconButton from "../IconButton";
import { IconCopy, IconEye, IconShare } from "@tabler/icons-react";
import { classConfig } from "../../utils/constants";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js'; // Adjust the path as necessary

const fullConfig = resolveConfig(tailwindConfig);

function getTailwindColor(colorName) {
  const color = fullConfig.theme.colors[colorName];
  return typeof color === 'string' ? color : color['DEFAULT']; // Adjust for Tailwind color shades
}

export default function DeckItem({ type = 'demon-hunter' }) {
    const { image, color } = classConfig[type];
    const borderColor = getTailwindColor(color);
    const textColor = getTailwindColor(color); // Use the same color or adjust as needed
    const backgroundColor = 'background'; // Replace this with a valid color or calculation if needed
    
    return (
        <section style={{ borderBottomColor: borderColor }} className={`rounded-lg h-[125px] border-b-4 bg-${backgroundColor} overflow-hidden px-8 py-4 relative`}>
            <img src={`/images/backgrounds/bg-${image}.png`} alt="Deck Item" className="absolute top-0 left-0 w-full h-full object-cover object-[50%_30%] opacity-30" />
            <div className="flex flex-row items-center h-full gap-3 relative z-10">
                <img src={`/images/classes/ico-${image}.png`} alt="Deck Item" className="w-20 h-20 rounded-full" />
                <div className="flex flex-col items-start">
                    <p className="text-white text-2xl leading-6">24.08.24</p>
                    <p style={{ color: textColor }} className="text-2xl leading-6">Naga Demon Hunter</p>
                    <div className="flex flex-row gap-2 items-center mt-2">
                        <Tooltip title="Spells" position="bottom">
                            <Chip size={12} label="12" image="/images/ico-spells.png" />
                        </Tooltip>
                        
                        <Tooltip title="Minions" position="bottom">
                            <Chip size={12} label="32" image="images/ico-minions.png" />
                        </Tooltip>

                        <Tooltip title="Dust" position="bottom">
                            <Chip size={12} label="11898" image="images/ico-dust.png" />
                        </Tooltip>
                    </div>
                </div>

                <div className="flex flex-col h-full justify-around items-start ml-auto">
                    <IconButton icon={IconCopy} color={color} label="Copy" onClick={() => console.log("Copy")} />
                    <IconButton icon={IconEye} color={color} label="View" onClick={() => console.log("View")} />
                </div>
            </div>
        </section>
    );
}