// AuthProvider.js (frontend)
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import API from '../utils/API';  // Assuming API is configured for axios requests

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = await SecureStore.getItemAsync('Token');
                if (!token) {
                    console.log("No token found, setting user to null");
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const response = await API.get('/home', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (response.data?.user) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error("Error loading user:", error);
                if (error.response?.status === 401) {
                    console.log("Unauthorized. Token might be expired.");
                    await SecureStore.deleteItemAsync('Token');
                    setUser(null);
                    // Optionally, call a function to refresh the token here
                }
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    const refreshToken = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('RefreshToken');
            if (!refreshToken) {
                console.log("No refresh token found");
                setUser(null);
                return;
            }

            const response = await API.post('/refresh-token', { refreshToken });
            if (response.data?.token) {
                await SecureStore.setItemAsync('Token', response.data.token);
                await loadUser(); // Retry loading user after refreshing the token
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    const logout = async () => {
        try {
            await SecureStore.deleteItemAsync('Token');
            await SecureStore.deleteItemAsync('RefreshToken');
            setUser(null);
            console.log("User logged out.");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, logout, loading, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
