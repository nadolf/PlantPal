import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: "50%",
    width: 200,
    padding: 20,
    margin: 5,
    alignSelf: "center",
  },
  updateButton: {
    backgroundColor: "#B36540",
    borderRadius: "50%",
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5
  },
  updateButtonText: {
    color: "white",
    fontWeight: "bold"
  },
  signOutButton: {
    borderColor: "#B36540",
    borderWidth: 2,
    borderRadius: "50%",
    width: 100,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 150
  },
  signOutButtontText: {
    color: "#B36540",
    fontWeight: "bold"
  },
});
