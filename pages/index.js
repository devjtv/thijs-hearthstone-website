import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseCookies } from "nookies"; // You might need to install 'nookies'

export default function Home({ userProfile }) {
  const [code, setCode] = useState(
    "AAECAea5AwLlsATZ0AUOiLIEmLoE+b8EpeIElaoF5OQF4fgFxfkFkIMGhY4GhpAGiZAGjZAGnJoGAA=="
  );
  const [deck, setDeck] = useState(null);

  const loadDeck = () => {
    axios.get("/api/fetchDeck", { params: { code } }).then((response) => {
      console.log(response);
      if (response.data) {
        setDeck(response.data.data);
      }
    });
  };

  useEffect(() => {
    console.log("Loaded!", userProfile);
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Thijs | Official Community</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#333333" />
      </Head>

      <main>
        <label htmlFor="deck-code">Deck Code:</label>
        <input
          type="text"
          name="deck-code"
          id="deck-code"
          className="border-2 ml-2"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
          }}
        />
        <input
          type="button"
          onClick={loadDeck}
          value="Load Deck"
          className="border-2 ml-2"
        />

        {deck !== null && deck?.cards.length && (
          <ul>
            {deck?.cards.map((card) => (
              <li>
                <img src={card.image} />
              </li>
            ))}
          </ul>
        )}

        {/* Display user profile if it exists */}
        {userProfile && (
          <div>
            <h3>User Profile:</h3>
            {/* Render user profile details */}
            <p>{userProfile.display_name}</p>
            <img src={userProfile.profile_image_url} />
          </div>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const cookies = parseCookies(context);
  const userProfile = cookies.userProfile
    ? JSON.parse(cookies.userProfile)
    : null;

  console.log(userProfile);
  return {
    props: {
      userProfile, // Pass this to the page as a prop
    },
  };
};
