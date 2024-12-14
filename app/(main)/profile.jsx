import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Pressable,
    ActivityIndicator
} from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { heightPercentage, widthPercentage } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";
import Icon from '../../assets/icons';

const Profile = () => {
    const { user, logout, loading } = useAuth();
    const router = useRouter();
    const [profileData, setProfileData] = useState(null); // To store the user profile fetched from API

 
    const fetchUserProfile = async () => {
        try {
            const token = await SecureStore.getItemAsync('Token');
            if (!token) {
                Alert.alert("Error", "No token found, please login again.");
                return;
            }

            const response = await axios.get(`http://192.168.101.9:3001/api/v1/${user.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data) {
                setProfileData(response.data.user);
            }
        } catch (error) {
            console.error("Error fetching user profile:", error);
            Alert.alert("Error", "There was an issue fetching the profile data.");
        }
    };

    useEffect(() => {
        if (user?.id) {
            fetchUserProfile();
        }
    }, [user]);

    if (loading) {
        return <ActivityIndicator size="large" color={theme.colors.primary} />;
    }

    if (!user) {
        return <Text>User not logged in</Text>;
    }

    // Merge the local user from context with profile data from API
    const combinedUser = { ...user, ...profileData };

   
    const handleLogout = async () => {
        Alert.alert('Confirm', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Logout', onPress: () => logout(), style: 'destructive' }
        ]);
    };

    return (
        <ScreenWrapper bg='white'>
            <UserHeader user={combinedUser} router={router} handleLogout={handleLogout} />
        </ScreenWrapper>
    );
};

const UserHeader = ({ user, router, handleLogout }) => {
    return (
        <View style={styles.container}>
            <Header title="Profile" mb={30} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Icon name='logout' color={theme.colors.rose} />
            </TouchableOpacity>

            <View style={styles.profileContainer}>
                {/* Avatar with edit button */}
                <View style={styles.avatarContainer}>
                    <Avatar
                        uri={user?.profilePicture}
                        size={heightPercentage(16)}
                        rounded={theme.radius.xxl * 1.8}
                    />
                    <Pressable
                        style={styles.editIcon}
                        onPress={() => router.push('editProfile')}
                    >
                        <Icon name='edit' strokeWidth={2.5} size={20} />
                    </Pressable>
                </View>

                {/* User information */}
                <View style={{ alignItems: 'center', gap: 10 }}>
                    <Text style={styles.userName}>
                        {user?.fullName ?? 'Loading...'}
                    </Text>
                    <Text style={styles.infoText}>
                        {user?.username ?? 'Loading...'}
                    </Text>
                </View>

                {/* Stats for followers, following, and posts */}
                <View style={[styles.info, {marginHorizontal: heightPercentage(1), marginVertical:heightPercentage(1.2)}]}>
                    <Icon name='user' size={20} color={theme.colors.textLight} />
                    <Text style={styles.infoText}>
                        {user?.followers?.length || 0} Followers
                    </Text>

                    <Icon name='user' size={20} color={theme.colors.textLight} />
                    <Text style={styles.infoText}>
                        {user?.following?.length || 0} Following
                    </Text>

                    <Icon name='user' size={20} color={theme.colors.textLight} />
                    <Text style={styles.infoText}>
                        {user?.post || 0} Posts
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: widthPercentage(4),
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
    },
    avatarContainer: {
        height: heightPercentage(16),
        width: heightPercentage(16),
    },
    editIcon: {
        position: 'absolute',
        bottom: 5,
        right: -15,
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'white',
    },
    userName: {
        fontSize: heightPercentage(4),
        fontWeight: '500',
        color: theme.colors.textDark
    },
    infoText: {
        fontSize: heightPercentage(1.6),
        fontWeight: '500',
        color: theme.colors.textLight
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});
