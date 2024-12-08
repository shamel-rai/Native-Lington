import { View, Text, TouchableOpacity, StyleSheet, Alert, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import { heightPercentage, widthPercentage } from '../../helpers/common';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';

const Profile = () => {
    const { user, setAuth, logout } = useAuth();
    const router = useRouter();


    const onLogout = async () => {
        await logout;
        router.replace('/welcome')
    }
    const handleLogout = async () => {
        // show confirmation
        Alert.alert('Confirm', 'Are you sure you want to logout', [{
            text: 'Cancel',
            onPress: () => console.log("cancelled"),
            style: 'cancel'
        },
        {
            text: 'Logout',
            onPress: () => onLogout(),
            style: 'destructive'
        }])
    }

    return (
        <ScreenWrapper bg='white'>
            <UserHeader user={user} router={router} handleLogout={handleLogout} />
        </ScreenWrapper>
    )
}

const UserHeader = ({ user, router, handleLogout }) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: widthPercentage(4) }}>
            <View>
                <Header title="Profile" mb={30} />
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Icon name='logout' color={theme.colors.rose} />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <View style={{ gap: 50 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.profilePicture}
                            size={heightPercentage(12)}
                            rounded={theme.radius.xxl * 1.4} />
                        <Pressable style={styles.editIcon} onPress={() => router.push('editProfile')}>
                            <Icon name='edit' strokeWidth={2.5} size={20} />
                        </Pressable>
                    </View>
                    {/* User Detail */}
                    <View style={{ alignItems: 'center', gap: 4 }}>
                        {user && user.fullName ? (
                            <Text style={styles.userName}>{user.fullName}</Text>
                        ) : (
                            <Text>Loading...</Text> // Show a placeholder while user is being fetched
                        )}
                    </View>
                </View>

            </View>
        </View>
    )
}

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        marginHorizontal: widthPercentage(4),
        marginBottom: 20
    },
    headerShape: {
        width: widthPercentage(100),
        height: heightPercentage(20)
    },
    avatarContainer: {
        height: heightPercentage(12),
        width: heightPercentage(12),
        alignSelf: 'center'
    },
    logoutButton: {
        position: 'absolute',
        right: 0,
        padding: 5,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2'
    },
    listStyle: {
        paddingHorizontal: widthPercentage(4),
        paddingBottom: 30
    },
    noPost: {
        fontSize: heightPercentage(2),
        textAlign: 'center',
        color: theme.colors.text
    },
    editIcon: {
        position: 'absolute',
        bottom: 0,
        right: -12,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },
    userName: {
        fontSize: heightPercentage(3),
        fontWeight: '500',
        color: theme.colors.textDark
    }

})