import { useState } from "react";
import { Button } from "@mui/joy";
import Hero from "../components/Hero";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/login", { username, password });
            login(response.data); // Use context's login function
        } catch (error) {
            toast.error("Login failed: " + error.response.data.message);
        }
    };

    return (
        <>
            <Hero title="Login" image="/images/backgrounds/bg-hero.png" />
            <div className="container mx-auto p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-lg">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border-2 font-mono text-background border-gray-300 rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500l"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-lg">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 font-mono text-background border-gray-300 rounded-lg p-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <Button type="submit" className="bg-highlight w-full mt-2 py-4 text-background hover:bg-backgroundLight hover:text-white transition-all duration-300">Login</Button>
                </form>
            </div>
        </>
    );
}
