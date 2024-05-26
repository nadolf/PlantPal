import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { styles } from "../styles/ScannerScreenStyles";

export default function Scanner({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();

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
        { text: "Allow", onPress: { requestPermission } },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
