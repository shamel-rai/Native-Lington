import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ScreenWrapper = ({ children, bg }) => {
    const { top } = useSafeAreaInsets(); // Use safe area insets to calculate padding

    return (
        <View style={[styles.container, { backgroundColor: bg, paddingTop: top > 0 ? top + 5 : 30 }]}>
            {children}
        </View>
    );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
