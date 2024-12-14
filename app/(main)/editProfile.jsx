import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import { theme } from '../../constants/theme'
import { heightPercentage, widthPercentage } from '../../helpers/common'
import Header from '../../components/Header'
import { Image } from 'expo-image'
import { useAuth } from '../../context/AuthProvider'
import { getUserImageSrc } from '../../service/imageService'
import Icon from '../../assets/icons'
import Input from '../../components/Input'

const EditProfile = () => {
    const { user } = useAuth();
    const [profileData, setProfileData] = useState({
        username: "",
        bio: "",
        interest: "",
        profilePicture: null
    });

    // Load current user details once `user` changes
    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || 'Sawmail',  // Default username if none
                bio: user.bio || "Why are you gay",    // Default bio if none
                interest: user.interest || "",
                profilePicture: user.profilePicture || null
            });
        }
    }, [user]);

    // Get the user's image source
    const imageSource = getUserImageSrc(profileData.profilePicture);

    const pickImage = async () => {
        // Function to pick a new image (not implemented yet)
    }

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Header title="Edit Profile" />

                    {/* Profile Edit Form */}
                    <View style={styles.form}>
                        <View style={styles.avatarContainer}>
                            <Image source={imageSource} style={styles.avatar} />
                            <Pressable style={styles.cameraIcon} onPress={pickImage}>
                                <Icon name="camera" size={20} strokeWidth={2.5} />
                            </Pressable>
                        </View>
                        <Text style={{ fontSize: heightPercentage(1.5), color: theme.colors.text }}>
                            Please enter your profile details
                        </Text>

                        {/* Username Input */}
                        <Input
                            icon={<Icon name="user" />}
                            placeholder="Username"
                            value={profileData.username}  // Bind to profileData.username
                            onChangeText={value => setProfileData({ ...profileData, username: value })}  // Update profileData state
                        />
                    </View>
                </ScrollView>
            </View>
        </ScreenWrapper>
    );
};

export default EditProfile;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        borderWidth: 0.4,
        borderColor: theme.colors.text,
        borderRadius: theme.radius.xxl,
        borderCurve: 'continuous',
        padding: 17,
        paddingHorizontal: 20,
        gap: 15
    },
    bio: {
        flexDirection: 'row',
        height: heightPercentage(15),
        alignItems: 'flex-start',
        paddingVertical: 15
    },
    form: {
        gap: 18,
        marginTop: 20
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.xxl * 1.8,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.colors.darkLight
    },
    avatarContainer: {
        height: heightPercentage(18),
        width: heightPercentage(17),
        alignSelf: 'center'
    },
    container: {
        flex: 1,
        paddingHorizontal: widthPercentage(4)
    }
});
