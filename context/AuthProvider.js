// AuthProvider.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

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

    const loadUser = async () => {
        try {
            const token = await SecureStore.getItemAsync('Token');
            if (!token) {
                setUser(null);
                setLoading(false);
                return;
            }

            const response = await axios.get('http://192.168.101.9:3001/api/v1/home', {
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
                await SecureStore.deleteItemAsync('Token');
                setUser(null);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const refreshToken = async () => {
        try {
            const refreshToken = await SecureStore.getItemAsync('RefreshToken');
            if (!refreshToken) {
                setUser(null);
                return;
            }

            const response = await axios.post('http://192.168.101.6:3001/api/v1/refresh-token', { refreshToken });
            if (response.data?.token) {
                await SecureStore.setItemAsync('Token', response.data.token);
                loadUser();
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
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout, loading, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
