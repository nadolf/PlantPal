import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { styles } from "../styles/ScannerScreenStyles";
import { auth, db } from "../firebase";
import axios from "axios";
import { PLANT_ID_API_KEY } from "@env";
import {
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState(null);

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    Alert.alert(
      "'PlantPal' Would Like to Access the Camera",
      "To enable scanner feature",
      [
        {
          text: "Don't Allow",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "Allow", onPress: () => requestPermission() },
      ]
    );
  }

  const takePicture = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setImage(photo.uri);
      identifyPlant(photo.uri);
    }
  };

  const identifyPlant = async () => {
    if (image) {
      try {
        const base64Image = await fetch(image)
          .then((response) => response.blob())
          .then((blob) => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          });

        const response = await axios.post(
          "https://plant.id/api/v3/identification",
          {
            images: [base64Image],
            classification_level: "all",
          },
          {
            headers: {
              "Api-Key": PLANT_ID_API_KEY,
              "Content-Type": "application/json",
            },
          }
        );
        const plantData = response.data;
        console.log(JSON.stringify(plantData, null, 2));
        const plantName = plantData.result.classification.suggestions[0].name;
        setIdentifiedPlant(plantName);
        await addIdentifiedPlantToCollection(plantName);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addIdentifiedPlantToCollection = async (plantName) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const plantCollectionRef = doc(db, "users", user.uid);
        const PlantDoc = await getDoc(plantCollectionRef);
        if (PlantDoc.exists()) {
          const plantData = PlantDoc.data();
          const updatedPlantCollection = [
            ...plantData.plantCollection,
            plantName,
          ];
          await updateDoc(plantCollectionRef, {
            plantCollection: updatedPlantCollection
          });
          Alert.alert(
            "Success",
            `${plantName} has been added to your collection.`
          );
        }
      } catch (error) {
        console.error("Error adding plant to collection: ", error);
        Alert.alert("Error", "Error adding plant to collection.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} ref={(camera) => setCamera(camera)}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {identifiedPlant && (
        <View>
          <Text style={styles.text}>Identified Plant: {identifiedPlant}</Text>
        </View>
      )}
    </View>
  );
}
