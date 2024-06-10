import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Button,
  Image,
} from "react-native";
import { styles } from "../styles/SignUpScreenStyles";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, GeoPoint } from "firebase/firestore";

const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
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
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
        <TextInput
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.orText}>or</Text>
        <View style={styles.borderLine}></View>
        <TouchableOpacity
          style={styles.googleButtonContainer}
          onPress={handleSignUp}
        >
          <View style={styles.altSignInButtons}>
            <Image
              style={styles.googleImage}
              source={require("../assets/google_logo.png")}
            />
            <Text style={styles.buttonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.appleButtonContainer}
          onPress={handleSignUp}
        >
          <View style={styles.altSignInButtons}>
            <Image
              style={styles.appleImage}
              source={require("../assets/apple_logo.png")}
            />
            <Text style={styles.buttonText}>Sign In with Apple</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.metaButtonContainer}
          onPress={handleSignUp}
        >
          <View style={styles.altSignInButtons}>
            <Image
              style={styles.metaImage}
              source={require("../assets/meta_logo.png")}
            />
            <Text style={styles.buttonText}>Sign In with Meta</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.signInText}>
          <Text>Already have an account?</Text>
          <Button
            title="Sign In"
            onPress={() => navigation.navigate("SignIn")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
