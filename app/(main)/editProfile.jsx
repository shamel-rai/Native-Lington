import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const EditProfileScreen = () => {
  const [username, setUsername] = useState('Shamel');
  const [bio, setBio] = useState('Love coding and exploring new technologies!');
  const [followers, setFollowers] = useState(1234);
  const [following, setFollowing] = useState(567);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [interests, setInterests] = useState(['Technology', 'Travel']);
  const [showInterestDropdown, setShowInterestDropdown] = useState(false);

  const availableInterests = [
    'Technology', 'Travel', 'Photography', 'Cooking',
    'Music', 'Sports', 'Art', 'Reading', 'Gaming',
    'Fashion', 'Fitness', 'Movies'
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const addInterest = (interest) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
    setShowInterestDropdown(false);
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(item => item !== interest));
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log('Profile updated:', {
      username,
      bio,
      interests,
      profileImage,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#4A00E0', '#8E2DE2']}
        style={styles.headerGradient}
      >
        <View style={styles.profileSection}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <View style={styles.editIconContainer}>
              <Text style={styles.editIcon}>📷</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{followers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{following.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Post</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.formSection}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>USERNAME</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Enter username"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>BIO</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            placeholderTextColor="#999"
            multiline
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>INTERESTS</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setShowInterestDropdown(!showInterestDropdown)}
          >
            <Text style={styles.dropdownButtonText}>+ Add Interest</Text>
          </TouchableOpacity>

          {showInterestDropdown && (
            <View style={styles.dropdown}>
              {availableInterests
                .filter(interest => !interests.includes(interest))
                .map((interest) => (
                  <TouchableOpacity
                    key={interest}
                    style={styles.dropdownItem}
                    onPress={() => addInterest(interest)}
                  >
                    <Text style={styles.dropdownItemText}>{interest}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          )}

          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <View key={interest} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
                <TouchableOpacity 
                  style={styles.removeInterestButton}
                  onPress={() => removeInterest(interest)}
                >
                  <Text style={styles.removeInterest}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={['#4A00E0', '#8E2DE2']}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerGradient: {
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: 'white',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A00E0',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  editIcon: {
    fontSize: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 15,
    width: width * 0.8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginTop: 4,
  },
  formSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  bioInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  dropdownButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdownButtonText: {
    color: '#4A00E0',
    fontSize: 16,
    fontWeight: '500',
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0ff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderWidth: 1,
    borderColor: '#4A00E0',
  },
  interestText: {
    color: '#4A00E0',
    fontSize: 14,
    fontWeight: '500',
  },
  removeInterestButton: {
    marginLeft: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(74, 0, 224, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeInterest: {
    color: '#4A00E0',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  saveButtonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;