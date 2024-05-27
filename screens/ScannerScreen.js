import { PLANT_ID_API_KEY } from "@env";
import React, { useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { styles } from "../styles/ScannerScreenStyles";
import axios from "axios";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    return <View/>;
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
      } catch (error) {
        console.error(error);
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
    </View>
  );
}
