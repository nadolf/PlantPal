import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import React from "react";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Home({navigation}) {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView>
      <Text>HOME</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
