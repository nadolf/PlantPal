import React, { useEffect, useState } from "react";
import { styles } from "../styles/PlantCollectionScreenStyles";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function PlantCollection({ navigation }) {
  const [plantCollection, setPlantCollection] = useState([]);
  const [filteredPlantCollection, setFilteredPlantCollection] = useState([]);
  const [newPlant, setNewPlant] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserPlants = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profileImage);
          setPlantCollection(userData.plantCollection || []);
          setFilteredPlantCollection(userData.plantCollection || []);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserPlants(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const deletePlant = async (plant) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const UpdatePlantCollection = userData.plantCollection.filter(
            (p) => p !== plant
          );
          await updateDoc(userDocRef, {
            plantCollection: UpdatePlantCollection,
          });
          setPlantCollection(UpdatePlantCollection);
          setFilteredPlantCollection(UpdatePlantCollection);
        }
      }
    } catch (error) {
      console.error("Error removing plant: ", error);
    }
  };

  const addPlant = async () => {
    if (newPlant.trim() === "") return;
    try {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const updatedPlantCollection = [
            ...userData.plantCollection,
            newPlant,
          ];
          await updateDoc(userDocRef, {
            plantCollection: updatedPlantCollection,
          });
          setPlantCollection(updatedPlantCollection);
          setFilteredPlantCollection(updatedPlantCollection);
          setNewPlant("");
        }
      }
    } catch (error) {
      console.error("Error adding plant: ", error);
    }
  };

  useEffect(() => {
    const filtered = plantCollection.filter((plant) =>
      plant.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlantCollection(filtered);
  }, [searchQuery, plantCollection]);

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProgressTracker", { plant: item })
          }
        >
          <View style={styles.itemWapper}>
            <Text style={styles.plantNameText}>{item}</Text>
            <Image
              source={require("../assets/plantImage.png")}
              style={styles.plantImage}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => deletePlant(item)}
            >
              <Icon name="trash" size={24} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.image} />
          ) : (
            <Image
              source={require("../assets/defaultProfileIcon.png")}
              style={styles.image}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.notificationButton}>
          <Icon name="notifications-outline" size={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBarContainer}>
        <TextInput
          placeholder="Search Plant"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
      </View>
      <FlatList
        data={filteredPlantCollection}
        keyExtractor={(item) => item}
        renderItem={renderItem}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter new plant"
        value={newPlant}
        onChangeText={setNewPlant}
      />
      <TouchableOpacity onPress={addPlant} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
