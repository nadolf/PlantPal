import React from "react";
import { View, TouchableOpacity, Button, Text} from 'react-native';
import { CameraView,useCameraPermissions } from "expo-camera";
import { styles } from "../styles/ScannerScreenStyles";

export default function Scanner({ navigation }) {

    const [permission, requestPermission] = useCameraPermissions();
  
    if (!permission) {
      return <View />;
    }
  
    if (!permission.granted) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
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