import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../constants/theme'
import { heightPercentage } from '../helpers/common'
import Loading from './Loading'

const Button = ({ buttonStyles, textStyle, title = '', onPress = () => { }, loading =false, hasShadow = true }) => {
    const shadowStyles = {
        shadowColor: theme.colors.dark,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.5,
        shadowRadius: 22,
        elevation: 10, // An
    };

    if (loading) {
        return (
            <View style={[styles.button, buttonStyles, { backgroundColor: 'white' }]}>
                <Loading />
            </View>
        )
    }

    return (
        <Pressable onPress={onPress} style={[styles.button, buttonStyles, hasShadow && shadowStyles]}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </Pressable>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        backgroundColor: theme.colors.primary,
        height: heightPercentage(6.6),
        justifyContent: 'center',
        alignItems: 'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl
    },
    text: {
        fontSize: heightPercentage(2.5),
        color: 'white',
        fontWeight: theme.fonts.bold
    }
})