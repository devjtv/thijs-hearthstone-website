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

  // Get Decks Function
  const getDecks = async (page = 1, limit = 10) => {
    const response = await axios.get("/api/getDecks", { params: { page, limit } });
    return response.data;
  };

  // Setup Tanstack Query
  const { data: decks, isLoading, isError, error, isFetched, isSuccess } = useQuery({
    queryKey: ["decks"],
    queryFn: getDecks,
    enabled: true,
    refetchInterval: 5000
  });

  useEffect(() => {
    if(isSuccess) {
      console.log("Decks Loaded Successfully!");
      
      if(decks?.data?.length === 0) {
        console.log("No Decks Found");
      }
    }
  }, [isSuccess]);

  return (
    <>
      <Hero title="Decks" image="/images/backgrounds/bg-hero.png" />

      <div className="container pt-12 mx-auto px-4 md:px-8">
        <div className="flex flex-col gap-6">
          {isSuccess && decks?.data?.length > 0 && decks.data.map((deck) => (
            <DeckItem deck={deck} />
          ))}
        </div>
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
