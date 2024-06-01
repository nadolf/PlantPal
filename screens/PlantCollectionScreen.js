import React, { useEffect, useState } from "react";
import { styles } from "../styles/PlantCollectionScreenStyles";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Button,
  TextInput,
} from "react-native";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function PlantCollection({ navigation }) {
  const [plantCollection, setPlantCollection] = useState([]);
  const [newPlant, setNewPlant] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlants = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setPlantCollection(userData.plantCollection || []);
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
          setNewPlant("");
        }
      }
    } catch (error) {
      console.error("Error adding plant: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <SafeAreaView>
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
        <Button title="Delete" onPress={() => deletePlant(item)} />
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
      <View>
        <TextInput
          style={styles.input}
          placeholder="Enter new plant"
          value={newPlant}
          onChangeText={setNewPlant}
        />
        <Button title="Add Plant" onPress={addPlant} />
        <FlatList
          data={plantCollection}
          keyExtractor={(item) => item}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}
