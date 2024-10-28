import clientPromise from "../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { username, password } = req.body;

    try {
        const client = await clientPromise;
        const db = client.db("hearthstone");
        
        const existingUser = await db.collection("users").findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection("users").insertOne({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
