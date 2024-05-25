import { signOut } from "firebase/auth";
import React from "react";
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native";

export default function Home() {
  const handelLogout = async () => {
    await signOut(auth);
  };

  return (
    <SafeAreaView>
      <Text>HOME</Text>
      <TouchableOpacity onPress={handelLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
