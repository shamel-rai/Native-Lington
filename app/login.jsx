import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import { theme } from '../constants/theme'
import Icon from '../assets/icons'
import { StatusBar } from 'expo-status-bar'
import BackButton from '../components/BackButton'
import { useRouter } from 'expo-router'
import { heightPercentage, widthPercentage } from '../helpers/common'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import * as SecureStore from "expo-secure-store";

const Login = () => {
  const router = useRouter();
  const usernameOrEmailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const loginAPI = "http://192.168.101.6:3001/api/v1/login";

  const onSubmit = async () => {
    const identifier = usernameOrEmailRef.current.trim();
    const password = passwordRef.current.trim();

    if (!identifier || !password) {
        Alert.alert("Login", "Please enter your credentials");
        return;
    }

    try {
        setLoading(true);
        const response = await axios.post(loginAPI, {
            username: identifier.includes('@') ? undefined : identifier, 
            email: identifier.includes('@') ? identifier : undefined, 
            password
        }, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        });

        const { token } = response.data;
        if (!token) {
            throw new Error("No token in response");
        }

        console.log("Token from login response:", token);
        await SecureStore.setItemAsync("Token", token);
        router.push("home"); 
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message || error);
        const errorMessage = error.response?.data?.message || error.message || "Login failed.";
        Alert.alert("Error", errorMessage);
    } finally {
        setLoading(false);
    }
};



  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <BackButton router={router} size={27} />

        {/* Subtitle */}
        <View>
          <Text style={styles.SubText}>Hey</Text>
          <Text style={styles.SubText}>Welcome Back </Text>
        </View>
        {/* form */}
        <View style={styles.form}>
          <Text style={styles.text}>Please Login to Continue</Text>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Username"
            onChangeText={value => usernameOrEmailRef.current = value}
          />
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Password"
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
          />
          <Text style={styles.forgotPassowrd}>
            Forgot Password ?
          </Text>
          {/* Login Button */}
          <Button title='Login' loading={loading} onPress={onSubmit} />
        </View>
        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't Have an account?
          </Text>
          <Pressable onPress={() => router.push("signup")}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>Sign Up</Text>
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: widthPercentage(5)
  },
  text: {
    fontSize: heightPercentage(2.5),
    color: theme.colors.text
  },
  SubText: {
    fontSize: heightPercentage(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text
  },
  form: {
    gap: 25
  },
  forgotPassowrd: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: heightPercentage(1.6)
  }
})

