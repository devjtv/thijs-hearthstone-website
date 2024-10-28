import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New loading state
    const router = useRouter();

    useEffect(() => {
        checkLocalStorage();
        setLoading(false); // Set loading to false after checking
    }, []);

    const checkLocalStorage = () => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        return storedUser;
    };

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Store user data
        router.push('/add-deck'); // Redirect after login
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Clear user data from local storage
        router.push('/login'); // Redirect after logout
    };

    const isAuthenticated = () => !!user || !!checkLocalStorage(); // Check if user is authenticated only after loading is done

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
