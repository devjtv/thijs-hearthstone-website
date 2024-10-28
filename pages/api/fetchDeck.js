import clientPromise from "../../lib/mongodb";
import axios from "axios";

const getBearerToken = async (db, currentTime, expiryInterval) => {
  const bearerTokenResponse = await db
    .collection("blizzardAccessTokens")
    .findOne({ token_type: "bearer" });

  if (bearerTokenResponse && bearerTokenResponse.expiry > currentTime) {
    console.log(
      `Bearer Token Valid! Expires in ${
        bearerTokenResponse.expiry - currentTime
      } Seconds.`
    );
    return bearerTokenResponse.token;
  }

  console.log("Bearer Token Expired! Generating New Token...");
  const bearerTokenRequest = await axios.post(
    "https://oauth.battle.net/token?grant_type=client_credentials",
    {},
    {
      auth: {
        username: process.env.BLIZZARD_CLIENT_ID,
        password: process.env.BLIZZARD_CLIENT_SECRET,
      },
    }
  );

  if (bearerTokenRequest.status === 200) {
    console.log("Bearer Token Generated Successfully!");
    const newToken = bearerTokenRequest.data.access_token;
    await db
      .collection("blizzardAccessTokens")
      .updateOne(
        { token_type: "bearer" },
        { $set: { expiry: currentTime + expiryInterval, token: newToken } }
      );
    return newToken;
  }

  throw new Error("Failed to generate bearer token");
};

const fetchDeckData = async (bearerToken, code) => {
  try {
    // Clean the code by removing lines that start with '#'
    const cleanedCode = code
      .split('\n')
      .filter(line => !line.trim().startsWith('#'))
      .join('\n');

    const deckRequest = await axios.get(
      "https://us.api.blizzard.com/hearthstone/deck",
      {
        params: { locale: "en_US", code: cleanedCode },
        headers: { Authorization: `Bearer ${bearerToken}` },
      }
    );
    return deckRequest.data;
  } catch (error) {
    console.error("Failed to fetch deck data:", error);
    return null; // or throw an error, or return a default value, as needed
  }
};

const checkForDeckNameInCode = (code) => {
  // Check for a line that starts with "### " and the text that remains on that line should be the deck name.

  const lines = code.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('### ') && line.length > 4) {
      return line.substring(4).trim();
    }
  }
  
  return null;
};

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("hearthstone");

    const { code } = req.query;
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryInterval = 3600 * 12;


    const deckName = checkForDeckNameInCode(code);
    const bearerToken = await getBearerToken(db, currentTime, expiryInterval);

    if (bearerToken && code) {
      const deckData = await fetchDeckData(bearerToken, code);
      res.json({ message: "success", data: deckData, deckName });
    } else {
      res.json({
        message: "error: bearer token not found or code not provided.",
      });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
