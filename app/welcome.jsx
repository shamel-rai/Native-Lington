import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { widthPercentage, heightPercentage } from '../helpers/common';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import { useRouter } from 'expo-router';

const Welcome = () => {
    const router = useRouter();
    return (
        <ScreenWrapper bg="white">
            <StatusBar style="dark" />
            <View style={styles.container}>
                {/* Image */}
                <Image
                    style={styles.welcomeImage}
                    resizeMode="contain"
                    source={require('../assets/images/welcome.png')}
                />
                {/* Title  */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>
                        LingtonConnects
                    </Text>
                    <Text style={styles.punchline}>Where Conversations Build Connections</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Button
                        title='Getting Started'
                        buttonStyles={{ marginHorizontal: widthPercentage(3) }}
                        onPress={() => { router.push('signup') }}
                    />
                </View>
                <View style={styles.bottomtextContainer}>
                    <Text style={styles.loginText}>
                        Already have an account
                    </Text>
                    <Pressable onPress={() =>router.push('login')}>
                        <Text style={[styles.loginText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Log In</Text>
                    </Pressable>
                </View>
            </View>
        </ScreenWrapper>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around', // Centered content
        paddingHorizontal: widthPercentage(4), // Padding around the container
    },
    welcomeImage: {
        width: widthPercentage(60), // Adjusted width (60% of the screen)
        height: heightPercentage(40), // Adjusted height (40% of the screen)
        alignSelf: 'center'
    },
    title: {
        color: theme.colors.text,
        fontSize: heightPercentage(5),
        textAlign: 'center',
        fontWeight: theme.fonts.extraBold
    },
    punchline: {
        textAlign: 'center',
        paddingHorizontal: widthPercentage(10),
        fontSize: heightPercentage(2.4)
    },
    footer: {
        gap: 30,
        width: '100%'
    },
    bottomtextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
    },
    loginText: {
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: heightPercentage(2.1)
    }
});
