import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 120,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 63,
    height: 63,
    borderRadius: 63,
    marginTop: 47,
    marginLeft: 10,
  },
  cameraButton: {
    width: 75,
    aspectRatio: 1,
    borderColor:'white',
    borderWidth: 2,
    borderRadius: '50%'
  },
  notificationButton: {
    width: 46,
    aspectRatio: 1,
    backgroundColor:'white',
    opacity: 0.5,
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: "12%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: 10
  },
});
