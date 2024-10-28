import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("hearthstone");
    const decksCollection = db.collection("decks");

    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Ensure page and limit are positive integers
    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(400).json({ message: "Invalid page or limit value" });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const decks = await decksCollection
      .find({})
      .sort({deckDate: -1, deckSubmitted: -1})
      .skip(skip)
      .limit(limitNumber)
      .toArray();

    const total = await decksCollection.countDocuments();

    res.json({
      message: "success",
      data: decks,
      currentPage: pageNumber,
      totalPages: Math.ceil(total / limitNumber),
      totalDecks: total
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
