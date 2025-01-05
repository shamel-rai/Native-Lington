import React, { useState } from 'react';
import {
    View,
    TextInput,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentage, widthPercentage } from '../helpers/common'; // Adjust the import path accordingly

const PostField = () => {
    const [text, setText] = useState('');
    const [media, setMedia] = useState([]);

    // Request permissions when component mounts
    const requestPermissions = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    // Handle image/video picking
    const pickMedia = async (type) => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: type === 'image'
                    ? ImagePicker.MediaTypeOptions.Images
                    : ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled && result.assets && result.assets[0]) {
                const newMedia = {
                    uri: result.assets[0].uri,
                    type: type,
                };
                setMedia([...media, newMedia]);
            }
        } catch (error) {
            console.error('Error picking media:', error);
            alert('Error picking media');
        }
    };

    // Remove media item
    const removeMedia = (index) => {
        const newMedia = [...media];
        newMedia.splice(index, 1);
        setMedia(newMedia);
    };

    // Handle post submission
    const handlePost = () => {
        // Here you would typically send the post data to your backend
        console.log('Post Data:', {
            text,
            media,
        });

        // Clear the form
        setText('');
        setMedia([]);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <TextInput
                    style={styles.input}
                    multiline
                    placeholder="What's on your mind?"
                    value={text}
                    onChangeText={setText}
                />

                {/* Media Preview Section */}
                <ScrollView
                    horizontal
                    style={styles.mediaPreview}
                    showsHorizontalScrollIndicator={false}
                >
                    {media.map((item, index) => (
                        <View key={index} style={styles.mediaContainer}>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeMedia(index)}
                            >
                                <Ionicons name="close-circle" size={24} color="white" />
                            </TouchableOpacity>

                            {item.type === 'image' ? (
                                <Image
                                    source={{ uri: item.uri }}
                                    style={styles.mediaPreviewImage}
                                />
                            ) : (
                                <Video
                                    source={{ uri: item.uri }}
                                    style={styles.mediaPreviewVideo}
                                    resizeMode="cover"
                                    shouldPlay={false}
                                />
                            )}
                        </View>
                    ))}
                </ScrollView>

                {/* Media Picker Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() => pickMedia('image')}
                    >
                        <Ionicons name="image" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.mediaButton}
                        onPress={() => pickMedia('video')}
                    >
                        <Ionicons name="videocam" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.postButton, !text && !media.length && styles.postButtonDisabled]}
                        onPress={handlePost}
                        disabled={!text && !media.length}
                    >
                        <Ionicons name="send" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: widthPercentage(4),
    },
    scrollView: {
        flex: 1,
    },
    input: {
        fontSize: 16,
        minHeight: heightPercentage(12),
        textAlignVertical: 'top',
        marginBottom: heightPercentage(2),
        padding: widthPercentage(3),
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    mediaPreview: {
        height: heightPercentage(25),
        marginBottom: heightPercentage(2),
    },
    mediaContainer: {
        marginRight: widthPercentage(3),
        position: 'relative',
    },
    removeButton: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
        padding: widthPercentage(2),
    },
    mediaPreviewImage: {
        width: widthPercentage(40),
        height: heightPercentage(20),
        borderRadius: 8,
    },
    mediaPreviewVideo: {
        width: widthPercentage(40),
        height: heightPercentage(20),
        borderRadius: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: heightPercentage(2),
    },
    mediaButton: {
        padding: widthPercentage(3),
        borderRadius: 25,
        backgroundColor: '#f0f0f0',
    },
    postButton: {
        padding: widthPercentage(3),
        borderRadius: 25,
        backgroundColor: '#1DA1F2',
    },
    postButtonDisabled: {
        backgroundColor: '#ccc',
    },
});

export default PostField;
