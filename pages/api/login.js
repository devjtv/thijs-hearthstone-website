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
        const user = await db.collection("users").findOne({ username });

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Successful login
        res.status(200).json({ message: "Login successful", role: user.role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
