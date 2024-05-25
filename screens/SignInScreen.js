import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/native";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email && password) {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch(err) {
            console.log('got error: ', err.message);
            //Alert.alert('Invalid email or password');
        }

    }
    
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity onPress={handleSignIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};