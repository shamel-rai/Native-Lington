import { View, Text, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, Pressable } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import Icon from '../assets/icons';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { heightPercentage, widthPercentage } from '../helpers/common';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const signup = () => {
  const router = useRouter();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const usernameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const signupAPI = "http://192.168.101.6:3001/api/v1/signup";

  const validateEmail = (email) => {
    const re = /^[^\s@]+@(islingtoncollege\.edu\.np)$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    return uppercase.test(password) && specialCharacters.test(password);
  };

  const onSubmit = async () => {
    if (
      !usernameRef.current ||
      !passwordRef.current ||
      !nameRef.current ||
      !emailRef.current
    ) {
      Alert.alert("Sign Up", "Please enter all your credentials.");
      return;
    }

    if (!validateEmail(emailRef.current)) {
      Alert.alert("Sign Up", "Please use your @islingtoncollege.edu.np email.");
      return;
    }
    if (!validatePassword(passwordRef.current)) {
      Alert.alert("Sign Up", "Passwords needs to have a capital letter, speical characters and has to be of 8 character long");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        signupAPI,
        {
          fullName: nameRef.current,
          username: usernameRef.current,
          email: emailRef.current,
          password: passwordRef.current,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Signup Response", response.data);
      Alert.alert("Success", "You have signed up successfully!");
      router.push("login"); // Navigate to login screen after signup
    } catch (error) {
      console.error("Signup Error", error.response?.data || error.message);
      Alert.alert("Error", error.response?.data?.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton router={router} size={27} />

          {/* Subtitle */}
          <View>
            <Text style={styles.SubText}>Welcome To</Text>
            <Text style={styles.SubText}>LingtonConnects</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.text}>Please Enter your Credentials</Text>
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Full Name"
              onChangeText={(value) => (nameRef.current = value)}
            />
            <Input
              icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
              placeholder="Email"
              onChangeText={(value) => (emailRef.current = value)}
            />
            <Input
              icon={<Icon name="user" size={26} strokeWidth={1.6} />}
              placeholder="Username"
              onChangeText={(value) => (usernameRef.current = value)}
            />
            <Input
              icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
              placeholder="Password"
              secureTextEntry
              onChangeText={(value) => (passwordRef.current = value)}
            />

            {/* Signup Button */}
            <Button title="Sign up" loading={loading} onPress={onSubmit} />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Pressable onPress={() => router.push("login")}>
              <Text
                style={[
                  styles.footerText,
                  {
                    color: theme.colors.primaryDark,
                    fontWeight: theme.fonts.semibold,
                  },
                ]}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

export default signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 45,
    paddingHorizontal: widthPercentage(5),
  },
  text: {
    fontSize: heightPercentage(2.5),
    color: theme.colors.text,
  },
  SubText: {
    fontSize: heightPercentage(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  footerText: {
    textAlign: "center",
    color: theme.colors.text,
    fontSize: heightPercentage(1.6),
  },
});
