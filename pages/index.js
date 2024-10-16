import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies";
import Hero from "../components/Hero";
import DeckItem from "../components/DeckItem";
import { classConfig } from "../utils/constants";

export default function Home({ userProfile }) {
  const [code, setCode] = useState(
    "AAECAea5AwLlsATZ0AUOiLIEmLoE+b8EpeIElaoF5OQF4fgFxfkFkIMGhY4GhpAGiZAGjZAGnJoGAA=="
  );
  const [deck, setDeck] = useState(null);

  const loadDeck = () => {
    axios.get("/api/fetchDeck", { params: { code } }).then((response) => {
      if (response.data) {
        setDeck(response.data.data);
      }
    });
  };

  useEffect(() => {
    // console.log("Loaded!", userProfile);
  }, []);

  return (
    <>
      <Hero title="Decks" image="/images/backgrounds/bg-hero.png" />

      <div className="container pt-12 mx-auto">
        <div className="flex flex-col gap-6">
          {Object.keys(classConfig).map((type) => (
            <DeckItem type={type} />
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
