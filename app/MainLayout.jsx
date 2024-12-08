import { useAuth } from '../context/AuthProvider';
import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';

const MainLayout = () => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (loading) {
            return;
        }

        if (user) {
            router.replace('home');
        } else {
            router.replace('welcome');
        }
    }, [user, router, loading]);

        
    return (
        <Stack screenOptions={{ headerShown: false }}>
        </Stack>
    );
};

export default MainLayout;
