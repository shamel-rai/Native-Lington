// _layout.js
import { Stack } from 'expo-router';
import MainLayout from './MainLayout';
import AuthProvider from '../context/AuthProvider';

const _layout = () => {
    return (
        <AuthProvider>
            <MainLayout />
        </AuthProvider>

    );
};

export default _layout;
