import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function TopNavigator({ navigation }) {
  const user = auth.currentUser;
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profil image: ", error);
      }
    };

    fetchProfileImage();
  }, []);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.image} />
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 63,
    height: 63,
    alignItems: 'flex-end'
  },
});
