import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated()) {
            router.push('/admin-login'); // Redirect to login if not authenticated
        }
    }, [loading, isAuthenticated, router]);

    // Show a loading indicator while checking auth state
    if (loading) {
        return <div>Loading...</div>; // Optionally show a loading spinner or message
    }

    // Render children if authenticated
    return children; 
};

export default ProtectedRoute;
