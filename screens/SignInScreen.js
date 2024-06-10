import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Button,
  Image,
} from "react-native";
import { auth } from "../firebase";
import { style } from "../styles/SignInScreen";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log("Succesfully signed in!");
      } catch (err) {
        Alert.alert("Error", "Invalid email or password");
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={style.container}>
        <Text style={style.header}>Sign In</Text>
        <TextInput
          style={style.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={style.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TouchableOpacity style={style.buttonContainer} onPress={handleSignIn}>
          <Text style={style.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <Text style={style.orText}>or</Text>
        <View style={style.borderLine}></View>
        <TouchableOpacity
          style={style.GoogleButtonContainer}
          onPress={handleSignIn}
        >
          <View style={style.altSignInButtons}>
            <Image
              style={style.googleImage}
              source={require("../assets/google_logo.png")}
            />
            <Text style={style.buttonText}>Sign In with Google</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.AppleButtonContainer}
          onPress={handleSignIn}
        >
          <View style={style.altSignInButtons}>
            <Image
              style={style.appleImage}
              source={require("../assets/apple_logo.png")}
            />
            <Text style={style.buttonText}>Sign In with Apple</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.MetaButtonContainer}
          onPress={handleSignIn}
        >
          <View style={style.altSignInButtons}>
            <Image
              style={style.metaImage}
              source={require("../assets/meta_logo.png")}
            />
            <Text style={style.buttonText}>Sign In with Meta</Text>
          </View>
        </TouchableOpacity>
        <View style={style.signUpText}>
          <Text style={{ fontSize: 16 }}>Don't have an account?</Text>
          <Button title="Sign Up" onPress={() => navigation.navigate("SignUp")}/>
        </View>
      </View>
    </SafeAreaView>
  );
}
