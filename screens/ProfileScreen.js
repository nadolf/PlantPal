import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Button,
  Alert,
  Image,
  View,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { auth, storage, db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { styles } from "../styles/ProfileScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";

export default function Profile({ navigation }) {
  const user = auth.currentUser;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Error fetching user profile: ", error);
        Alert.alert(
          "Error",
          "There was an issue fetching your profile. Please try again."
        );
      }
    };

    fetchUserProfile();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const source = result.assets[0].uri;
        await uploadImage(source);
      }
    } catch (error) {
      console.error("Error picking image: ", error);
      Alert.alert(
        "Error",
        "There was an issue picking the image. Please try again."
      );
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const storageRef = ref(storage, `profileImages/${user.uid}`);

      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      await saveImageURLToFirestore(downloadURL);
      setProfileImage(downloadURL);
    } catch (error) {
      console.error("Error uploading image: ", error);
      Alert.alert(
        "Error",
        "There was an issue uploading the image. Please try again."
      );
    }
  };

  const saveImageURLToFirestore = async (downloadURL) => {
    try {
      if (!user) {
        throw new Error("User is not authenticated");
      }
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, { profileImage: downloadURL }, { merge: true });
      console.log("Image URL saved to Firestore successfully");
    } catch (error) {
      console.error("Error saving image URL to Firestore: ", error);
      Alert.alert(
        "Error",
        "There was an issue saving the image URL. Please try again."
      );
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const userDoc = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          firstName,
          lastName,
          email,
        },
        { merge: true }
      );
      Alert.alert("Success!", "Your profile has been updated!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      Alert.alert("Error", "There was an issue logging out. Please try again.");
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back" size={30} />
        </TouchableOpacity>
      </View>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.image} />
      ) : (
        <Image
          source={require("../assets/defaultProfileIcon.png")}
          style={styles.image}
        />
      )}
      <Button title="Edit Profile Picture" onPress={pickImage} />
      <View>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.textInput}
        />
        <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
        {/* <Text>Dark/Light Mode</Text> */}
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
        <Text style={styles.signOutButtontText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
