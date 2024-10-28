export const sortCards = (cards, sideboardCards = false) => {

    const aggregatedSideboardCards = [
        102983
    ];

    if(
        sideboardCards !== false &&
        sideboardCards.length > 0
    ) {
        // Check if one of the cards[...].id is in aggregatedSideboardCards

        sideboardCards.forEach((sideboardCard, index) => {
            const isAggregatedSideboardCard = aggregatedSideboardCards.some(id => sideboardCard.sideboardCard.id == id);
            if(isAggregatedSideboardCard) {
                let aggregateManaCost = 0;

                sideboardCard.cardsInSideboard.forEach((card) => {
                    aggregateManaCost += card.manaCost;
                });

                // Find the card with the same id in the "cards" array and set that ids manaCost to the aggregated manaCost
                const cardIndex = cards.findIndex(card => card.id == sideboardCard.sideboardCard.id);
                cards[cardIndex].manaCost = aggregateManaCost;
            }
        })
    }

    // Helper function to compare cards
    const compareCards = (a, b) => {
        if (a.manaCost !== b.manaCost) {
            return a.manaCost - b.manaCost;
        }
        return a.rarityId - b.rarityId;
    };

    // Sort cards by manaCost and rarityId
    const sortedCards = [...cards].sort(compareCards);

    // Create a map to count duplicates and store unique cards
    const cardMap = new Map();

    sortedCards.forEach(card => {
        const key = `${card.manaCost}-${card.rarityId}-${card.name}`;
        if (cardMap.has(key)) {
            cardMap.get(key).qty += 1;
        } else {
            cardMap.set(key, { ...card, qty: 1 });
        }
    });

    // Convert map values back to an array
    return Array.from(cardMap.values());
};

export const formatCardName = (name) => {
    // Return card name with max lenth of 12 characters and "..." if longer
    const maxLength = 22;
    if (name.length > maxLength) {
        return `${name.substring(0, maxLength)}...`;
    }
    return name;
};

export const calculateDeckDustCost = (data) => {
    const cards = data.cards;
    const sideboardCards = data.sideboardCards ?? false;
    let dustCost = 0;

    const rarityIdToDustCost = {
        5: 1600,
        4: 400,
        3: 100,
        2: 0,
        1: 40
    }

    // Check Sideboard Cards
    if(sideboardCards !== false && sideboardCards.length > 0) {
        sideboardCards.forEach((sideboardCard) => {
            sideboardCard.cardsInSideboard.forEach((card) => {
                if( card.collectible == 1 && typeof card.rarityId !== 'undefined' && card.cardSetId !== 1637) {
                    console.log(card.name);
                    dustCost += rarityIdToDustCost[card.rarityId];
                }
            });
        });
    }
    

    // Check Main Cards
    cards.forEach((card) => {
        if( card.collectible == 1 && typeof card.rarityId !== 'undefined' && card.cardSetId !== 1637) {
            console.log(card.name, rarityIdToDustCost[card.rarityId]);
            dustCost += rarityIdToDustCost[card.rarityId];
        }
    });
    
    return dustCost;
}

export const calculateDeckMinions = (deck) => {
    // Find number of cards that have card cardTypeId = 4
    const minions = deck.cards.filter(card => card.cardTypeId == 4 || card.cardTypeId == 3);
    return minions.length;
}

export const calculateDeckSpells = (deck) => {
    // Find number of cards that have card cardTypeId = 5
    const spells = deck.cards.filter(card => card.cardTypeId == 5);
    return spells.length;
}

export const calculateDeckWeapons = (deck) => {
    // Find number of cards that have card cardTypeId = 7
    const weapons = deck.cards.filter(card => card.cardTypeId == 7);
    return weapons.length;
}


export const getMappedClassName = (originalSlug) => {
    const mappedClassName = {
        'deathknight': 'death-knight',
        'demonhunter': 'demon-hunter',
        'druid': 'druid',
        'hunter': 'hunter',
        'mage': 'mage',
        'paladin': 'paladin',
        'priest': 'priest',
        'rogue': 'rogue',
        'shaman': 'shaman',
        'warlock': 'warlock',
        'warrior': 'warrior'
    }

    return mappedClassName[originalSlug] ?? originalSlug;
}

// Function that converts eppoch unix timestamp into Y.m.d
export const convertUnixTimestampToDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${day}.${month}.${year}`;
}

export const generateDeckCode = (deckName, deckJson) => {
    let deckCodeString = `### ${deckName}`;

    deckCodeString += `\n${deckJson.deckCode}`;
    return deckCodeString;
}
    

