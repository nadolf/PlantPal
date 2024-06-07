import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, GeoPoint } from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          plantCollection: plantCollection,
        });
        Alert.alert("Success!", "You have successfully signed up!");
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
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
