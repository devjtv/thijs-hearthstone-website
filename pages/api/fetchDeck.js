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
  const deckRequest = await axios.get(
    "https://us.api.blizzard.com/hearthstone/deck",
    {
      params: { locale: "en_US", code },
      headers: { Authorization: `Bearer ${bearerToken}` },
    }
  );
  return deckRequest.data;
};

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("hearthstone");

    const { code } = req.query;
    const currentTime = Math.floor(Date.now() / 1000);
    const expiryInterval = 3600 * 12;

    const bearerToken = await getBearerToken(db, currentTime, expiryInterval);

    if (bearerToken && code) {
      const deckData = await fetchDeckData(bearerToken, code);
      res.json({ message: "success", data: deckData });
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
