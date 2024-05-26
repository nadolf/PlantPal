import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  GeoPoint,
} from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [profilePic, setProfilePic] = useState("");
  const [plantCollection, setPlantCollection] = useState([]);

  const handleSignUp = async () => {
    if (email && password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userId = userCredential.user.uid;

        const firestore = getFirestore();
        await setDoc(doc(firestore, "users", userId), {
          username: username,
          email: email,
          profilePic: profilePic,
          location: new GeoPoint(location.latitude, location.longitude),
          plantCollection: plantCollection,
        });
        console.log("User added!");
      } catch (err) {
        console.log("Error: ", err.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={handleSignUp}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <View>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
