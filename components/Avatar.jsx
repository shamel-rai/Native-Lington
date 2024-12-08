import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentage } from '../helpers/common'
import { theme } from '../constants/theme'
import { Image } from 'expo-image'
import { getUserImageSrc } from '../service/imageService'
const Avatar = ({
    uri,
    size = heightPercentage(4.5),
    rounded = theme.radius.md,
    style = {}
}) => {
    return (
        <View>
            <Image
                source={getUserImageSrc(uri)}
                transition={100}
                style={[styles.avatar, { height: size, width: size, borderRadius: rounded }, style]}
            />
        </View>
    )
}

export default Avatar;

const styles = StyleSheet.create({
    avatar: {
        borderCurve: 'continuous',
        borderColor: theme.colors.darkLight,
        borderWidth: 1
    }
})