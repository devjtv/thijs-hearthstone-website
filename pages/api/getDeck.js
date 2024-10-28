import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("hearthstone");
    const decksCollection = db.collection("decks");

    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Deck ID is required" });
    }

    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      return res.status(400).json({ message: "Invalid deck ID format" });
    }

    const deck = await decksCollection.findOne({ _id: objectId });

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    res.json({ message: "success", data: deck });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};