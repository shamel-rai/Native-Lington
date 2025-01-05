import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { heightPercentage, widthPercentage } from '../../helpers/common';
import { theme } from '../../constants/theme';
import Avatar from '../../components/Avatar';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'expo-router';
import PostField from '../../components/PostField';

const NewPost = () => {
  const { user } = useAuth();
  const bodyRef = useRef("");
  const editorRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Header title="Create Post" />
        <ScrollView contentContainerStyle={{ gap: 20 }}>
          {/* Avatar */}
          <View style={styles.header}>
            <Avatar
              uri={user?.profilePicture}
              size={heightPercentage(6.5)}
              rounded={theme.radius.xl}
            />
          </View>

          {/* Username */}
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>
              {user?.username || "No username available"}
            </Text>
          </View>

          {/* TextEditor */}
          <View style={styles.textEditor}>
            <PostField />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    paddingHorizontal: widthPercentage(4),
    gap: 15,
  },
  title: {
    fontSize: heightPercentage(2.5),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  username: {
    fontSize: heightPercentage(2.2),
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  avatar: {
    height: heightPercentage(6.5),
    width: heightPercentage(6.5),
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});

export default NewPost;
