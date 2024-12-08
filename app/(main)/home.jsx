import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../../components/ScreenWrapper'
import Button from '../../components/Button'
import { useAuth } from '../../context/AuthProvider'
import { useRouter } from 'expo-router';
import { heightPercentage, widthPercentage } from '../../helpers/common'
import { theme } from '../../constants/theme'
import Icon from '../../assets/icons'
import Avatar from '../../components/Avatar'


const Home = () => {
    const { user } = useAuth();
    const router = useRouter();


    return (

        <ScreenWrapper bg="white">
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>LingtonConnects</Text>
                    <View style={styles.icon}>
                        <Pressable onPress={() => router.push("notification")}>
                            <Icon name='heart' size={heightPercentage(3.2)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push("newPost")}>
                            <Icon name='plus' size={heightPercentage(3.2)} strokeWidth={2} color={theme.colors.text} />
                        </Pressable>
                        <Pressable onPress={() => router.push("profile")}>
                            <Avatar
                                uri={user?.profilePicture}
                                size={heightPercentage(4.3)}
                                rounded={theme.radius.sm}
                                style={{ borderWidth: 2 }}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            {/* <Button title='Logout' onPress={onLogout} /> */}
        </ScreenWrapper>
    )
}

export default Home


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginHorizontal: widthPercentage(4)
    },
    title: {
        color: theme.colors.text,
        fontSize: heightPercentage(3.2),
        fontWeight: theme.fonts.bold
    },
    avatarImage: {
        height: heightPercentage(4.3),
        width: heightPercentage(4.3),
        borderRadius: theme.radius.sm,
        borderCurve: 'continuous',
        borderColor: theme.colors.gray,
        borderWidth: 3
    },
    icon: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 18
    },
    noPosts: {
        fontSize: heightPercentage(2),
        textAlign: 'center',
        color: theme.colors.text
    }
})