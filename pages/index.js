import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Hero from "../components/Hero";
import DeckItem from "../components/DeckItem";
import { classConfig } from "../utils/constants";
import { Button } from "@mui/joy";
import DeckCard from "../components/DeckCard";
import { sortCards } from "../utils/functions";
import { useQuery } from "@tanstack/react-query";

export default function Home({ userProfile }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [allDecks, setAllDecks] = useState([]);
  const [noMoreDecks, setNoMoreDecks] = useState(false);

  // Get Decks Function
  const getDecks = async (page = 1, limit = 10) => {
    const response = await axios.get("/api/getDecks", { params: { page, limit } });
    return response.data;
  };

  // Setup Tanstack Query
  const { data: decks, isLoading, isError, error, isFetched, isSuccess } = useQuery({
    queryKey: ["decks", currentPage],
    queryFn: () => getDecks(currentPage),
    enabled: true,
    refetchInterval: 5000,
  });

  // Effect to update allDecks when decks data is fetched
  useEffect(() => {
    if (isSuccess && decks) {
      setAllDecks((prevDecks) => [...prevDecks, ...decks.data]);
      console.log("Decks Loaded Successfully!");
      
      if (decks.data.length === 0) {
        console.log("No Decks Found");
        setNoMoreDecks(true);

      }
    }
  }, [isSuccess, decks]);

  // Load more function
  const loadMoreDecks = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Hero title="Decks" image="/images/backgrounds/bg-hero.png" />

      <div className="container pt-12 mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6">
          {allDecks.length > 0 && allDecks.map((deck) => (
            <DeckItem key={deck.id} deck={deck} /> // Ensure to provide a unique key
          ))}
        </div>
        {isError && <p>Error: {error.message}</p>}
        
        {!noMoreDecks && <Button onClick={loadMoreDecks} disabled={isLoading} className="bg-highlight w-full mt-12 py-4 text-background hover:bg-backgroundLight hover:text-white transition-all duration-300">
          Load More
        </Button>}
        
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userProfile = cookies.userProfile
    ? JSON.parse(cookies.userProfile)
    : null;

  return {
    props: {
      userProfile, // Pass this to the page as a prop
    },
  };
};
