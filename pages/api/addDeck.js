import clientPromise from "../../lib/mongodb";
import axios from "axios";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("hearthstone");
    const decksCollection = db.collection("decks");

    const { deckName, deckDate, deckData, deckArchetype } = req.body;

    if (deckName && deckDate && deckData && deckArchetype) {
      // Prepare the data for insertion
      const deckDocument = {
        deckName: deckName,
        deckArchetype: deckArchetype,
        deckDate: deckDate,
        deckSubmitted: Math.floor(Date.now() / 1000), // Current time in seconds
        deckData: deckData
      };

      // Insert the deck document into the database
      await decksCollection.insertOne(deckDocument);

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