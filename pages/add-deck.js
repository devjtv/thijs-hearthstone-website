import DeckCard from "../components/DeckCard";
import { sortCards } from "../utils/functions";
import { Button } from "@mui/joy";
import Hero from "../components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";

export default function AddDeck() {
    const [code, setCode] = useState(
        "AAECAQceiKAEiaAEjtQEkNQE/cQF8M0FtPgFkPsF2IEGhYIGkIMGi5QG95cGnJ4Gn54Gz54G0Z4Gh6AGx6QGr6gG7KkG0LAGw7oG1boGwr4Gjr8GusEG+skG88oGp9MGAAABBpbUBP3EBc+eBv3EBb2+Bv3EBfWzBsekBvezBsekBujeBsekBgAA"
    );

    const [deckName, setDeckName] = useState("");
    const [deckDate, setDeckDate] = useState(""); // New state for deck date
    const [deckArchetype, setDeckArchetype] = useState(""); // New state for deck archetype

    const { user } = useAuth();

    const archetypes = [
        "Aggro",
        "Control",
        "Combo",
        "Midrange",
        "Zoo",
        "Ramp",
        "Token",
        "Disruption",
        "Spell",
        "Highlander"
    ];

    const fetchDeck = async () => {
        const response = await axios.get("/api/fetchDeck", { params: { code } });
        
        if (response.data.deckName !== null && response.data.deckName !== "") {
            setDeckName(response.data.deckName);
        }

        return response.data.data;
    };

    const { data: deck, refetch, isLoading, isError, error, isFetched, isSuccess } = useQuery({
        queryKey: ["deck", code],
        queryFn: fetchDeck,
        enabled: false
    });

    const submitDeck = useMutation({
        mutationFn: async (deckData) => {
            const response = await axios.post("/api/addDeck", deckData);
            console.log(response.data);
            return response.data;
        },
        onSuccess: (data) => {
            toast('Deck submitted successfully!', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            // Clear the form fields
            setCode("");  // Clear the deck code
            setDeckName("");  // Clear the deck name
            setDeckDate("");  // Clear the deck date
            setDeckArchetype(""); // Clear the deck archetype
        },
        onError: (error) => {
            toast.error('Error submitting deck: ' + error.message, {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    });

    useEffect(() => {
        if (isSuccess) {
            toast('Deck Loaded Successfully!', {
                position: "bottom-right",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }, [isSuccess]);

    const loadDeck = () => {
        refetch();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitDeck.mutate({
            deckName,
            deckDate: deckDate,
            deckArchetype, // Include the selected archetype in the submission
            deckData: JSON.stringify(deck)
        });
    };

    return (
        <ProtectedRoute>
            <Hero title="Add New Deck" image="/images/backgrounds/bg-hero.png" />

            <div className="container pt-12 mx-auto px-4 md:px-8">
                <label className="text-2xl" htmlFor="deck-code">Deck Code:</label>

                <textarea
                    name="deck-code"
                    id="deck-code"
                    className="border-2 font-mono text-background border-gray-300 rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />

                <Button
                    className="bg-highlight w-full mt-2 py-4 text-background hover:bg-backgroundLight hover:text-white transition-all duration-300"
                    onClick={loadDeck}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Load Deck"}
                </Button>
            </div>

            {isError && <div className="text-red-500 container mx-auto mt-4">Error: {error.message}</div>}

            {deck && (
                <form onSubmit={handleSubmit} className="container mx-auto mt-12 space-y-6">
                    <div>
                        <label htmlFor="deckName" className="block text-xl text-white">Deck Name</label>
                        <input
                            type="text"
                            id="deckName"
                            value={deckName}
                            onChange={(e) => setDeckName(e.target.value)}
                            className="mt-1 block w-full text-background font-mono p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="deckDate" className="block text-xl text-white">Deck Date</label>
                        <input
                            type="date"
                            id="deckDate"
                            value={deckDate}
                            onChange={(e) => setDeckDate(e.target.value)}
                            className="mt-1 block w-full text-background font-mono p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="deckArchetype" className="block text-xl text-white">Deck Archetype</label>
                        <select
                            id="deckArchetype"
                            value={deckArchetype}
                            onChange={(e) => setDeckArchetype(e.target.value)}
                            className="mt-1 block w-full text-background font-mono p-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        >
                            <option value="">Select Archetype</option>
                            {archetypes.map((archetype) => (
                                <option key={archetype} value={archetype}>{archetype}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2 bg-backgroundLight px-2 py-12 rounded-lg">
                        <div className="flex flex-col gap-4 justify-around items-center sm:flex-row sm:items-start">
                            <div>
                                <h3 className="text-xl mb-1 text-white">Deck Cards</h3>
                                <div className="flex flex-col gap-[2px]">
                                    {sortCards(deck.cards, deck.sideboardCards).map((card) => (
                                        <DeckCard key={card.id} card={card} />
                                    ))}
                                </div>
                            </div>

                            {typeof deck.sideboardCards !== "undefined" && deck.sideboardCards.length > 0 && (
                                <div className="flex flex-col gap-6">
                                    {deck.sideboardCards && deck.sideboardCards.map((sideboard, index) => (
                                        <div key={index}>
                                            <h3 className="text-xl mb-1 text-white">{sideboard.sideboardCard.name}</h3>
                                            <div className="flex flex-col gap-[2px]">
                                                {sortCards(sideboard.cardsInSideboard).map((card) => (
                                                    <DeckCard key={card.id} card={card} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="bg-highlight w-full mt-2 py-4 text-background hover:bg-backgroundLight hover:text-white transition-all duration-300"
                        disabled={submitDeck.isLoading}
                    >
                        {submitDeck.isLoading ? "Submitting..." : "Submit Deck"}
                    </Button>
                </form>
            )}
        </ProtectedRoute>
    );
}
