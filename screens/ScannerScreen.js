import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Alert, Image } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { styles } from "../styles/ScannerScreenStyles";
import { auth, db } from "../firebase";
import axios from "axios";
import { PLANT_ID_API_KEY } from "@env";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [identifiedPlant, setIdentifiedPlant] = useState(null);
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
        console.error("Error fetching profile image: ", error);
      }
    };

    fetchProfileImage();
  }, []);

  if (!permission) {
    return <View />;
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
        Alert.alert(plantName, "Want to add it to your garden?", [
          {
            text: "Close",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          {
            text: "Add",
            onPress: () => addIdentifiedPlantToCollection(plantName),
          },
        ]);
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
            plantCollection: updatedPlantCollection,
          });
          Alert.alert("Added", `${plantName} has been added to your garden.`);
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <View style={styles.cameraButton}></View>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
