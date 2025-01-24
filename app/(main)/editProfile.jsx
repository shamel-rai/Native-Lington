import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { theme } from '../../constants/theme';
import { heightPercentage, widthPercentage } from '../../helpers/common';
import Header from '../../components/Header';
import { Image } from 'expo-image';
import { useAuth } from '../../context/AuthProvider';
import { getUserImageSrc } from '../../service/imageService';
import Icon from '../../assets/icons';
import Input from '../../components/Input';
import MultiOptionDropdown from '../../components/MultiOptionDropdown'; 
import Button from '../../components/Button';
import axios from 'axios';
import * as SecureStore from "expo-secure-store";

const EditProfile = () => {
    const { user, setUser } = useAuth();  // using setUser to update the context with the new user data
    const [profileData, setProfileData] = useState({
        username: "",
        bio: "",
        interest: [],
        profilePicture: null
    });
    const [loading, setLoading] = useState(false);
    const [profileImage, setImage] = useState(''); 

    useEffect(() => {
        if (user) {
            setProfileData({
                username: user.username || '',
                bio: user.bio || '',
                interest: user.interest || [],
                profilePicture: user.profilePicture || null
            });
        }
    }, [user]);

    const imageSource = getUserImageSrc(profileData.profilePicture);

    const pickImage = async () => {
        // Function to pick a new image (not implemented yet)
        let result = await ImagePicker 

    };

    const onSubmit = async () => {
        const { username, bio, interest } = profileData;

        if (!username || !bio || !interest.length) {
            Alert.alert("Profile", "Please fill all the fields");
            return;
        }

        console.log("Submitting with User ID:", user.id); 

        setLoading(true);
        try {
            const token = await SecureStore.getItemAsync('Token');
            if (!token) {
                Alert.alert("Error", "No token found, please login again.");
                return;
            }

            const response = await axios.put(
                `http://192.168.101.9:3001/api/v1/${user.id}`,
                { username, bio, interest }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.user) {
                setUser(response.data.user);  
                Alert.alert("Profile", "Profile updated successfully!");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
            Alert.alert("Error", "There was an issue updating your profile.");
        } finally {
            setLoading(false);
        }
    };



    const handleInterestChange = (newInterests) => {
        setProfileData({ ...profileData, interest: newInterests });
    };

    const interestOptions = ['Coding', 'Design', 'Marketing', 'Business', 'AI', 'Networking'];

    return (
        <ScreenWrapper bg="white">
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Header title="Edit Profile" />

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

                        <Input
                            icon={<Icon name="user" />}
                            placeholder="Username"
                            value={profileData.username}
                            onChangeText={value => setProfileData({ ...profileData, username: value })}
                        />

                        <Input
                            placeholder="Bio"
                            value={profileData.bio}
                            multiline={true}
                            containerStyles={styles.bio}
                            onChangeText={value => setProfileData({ ...profileData, bio: value })}
                        />

                        {/* MultiOptionDropdown for Interests */}
                        <MultiOptionDropdown
                            options={interestOptions}
                            selectedOptions={profileData.interest}
                            onSelectionChange={handleInterestChange}
                        />

                        <Button title="Update" loading={loading} onPress={onSubmit} />
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
