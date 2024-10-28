import React, { useState, useCallback, useEffect } from 'react';
import { formatCardName } from '../../utils/functions';
import { IconStarFilled } from '@tabler/icons-react';

const deckRarityColourMapping = {
    1: "#C0C0C0",
    2: "#C0C0C0",
    3: "#4169E1",
    4: "#9932CC",
    5: "#FFA726",
};



export default function DeckCard({ card }) {
    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    const handleMouseMove = useCallback((event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    }, []);

    const getImagePosition = useCallback(() => {
        const imageWidth = 350;
        const imageHeight = 350 * 1.4; // Assuming a 1.4 aspect ratio for the card image
        const padding = 0; // Padding from the edge of the screen

        let left = mousePosition.x;
        let top = mousePosition.y;

        // Adjust horizontal position
        if (left + imageWidth / 2 + padding > windowSize.width) {
            left = windowSize.width - imageWidth / 2 - padding;
        } else if (left - imageWidth / 2 - padding < 0) {
            left = imageWidth / 2 + padding;
        }

        // Adjust vertical position
        if (top + imageHeight / 2 + padding > windowSize.height) {
            top = windowSize.height - imageHeight / 2 - padding;
        } else if (top - imageHeight / 2 - padding < 0) {
            top = imageHeight / 2 + padding;
        }

        return { left, top };
    }, [mousePosition, windowSize]);

    return (
        <div 
            className="flex flex-row w-[250px] h-[38px] relative overflow-hidden bg-background rounded-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
        >
            <img src={card.cropImage !== null ? card.cropImage : card.image} style={ card.cropImage == null ? { objectPosition: "50% 30%", width: "455px", maxWidth: "unset", left: "-30%" } : {} } alt={card.name} className="absolute top-0 left-0 -z-1 w-full h-full object-cover object-center opacity-45" />
            <div className="flex flex-row gap-2 items-center justify-start w-full h-full relative z-1">
                <div className="flex items-center justify-center h-[38px] w-[38px]" style={{ backgroundColor: deckRarityColourMapping[card?.rarityId ?? 5] }}>
                    <span className="text-white text-xl">{card.manaCost}</span>
                </div>
                
                <p className="text-white text-lg font-light leading-1 tracking-wide relative top-[1.5px]">{formatCardName(card.name)}</p>
            </div>

            {/* Qty Badge */}
            {card.qty && card.qty > 1 && (
                <div className="flex items-center justify-center bg-zinc-700 z-1 h-[38px] w-[38px] absolute right-0 top-0">
                    <span className="text-white text-xl">{card.qty}</span>
                </div>
            )}

            {/* Legendary Icon */}
            {card.rarityId && card.rarityId == 5 && (
                <div className="flex items-center justify-center bg-zinc-700 z-1 h-[38px] w-[38px] absolute right-0 top-0">
                   <IconStarFilled className="text-highlight" width={18} />
                </div>
            )}

            {isHovering && (
                <div 
                    className="fixed z-50 pointer-events-none"
                    style={{ 
                        ...getImagePosition(),
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <img 
                        src={card.image} 
                        alt={card.name}
                        className="w-[350px] min-w-[350px] h-auto"
                    />
                </div>
            )}
        </div>
    );
}