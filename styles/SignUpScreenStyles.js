import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 0.5,
    paddingHorizontal: 5,
    marginVertical: 5,
    fontWeight: "600",
    borderRadius: "10%",
  },
  borderLine: {
    paddingHorizontal: "40%",
    borderBottomColor: "#BEBBBB",
    borderBottomWidth: 2,
    flex: 1,
  },
  buttonContainer: {
    width: 120,
    height: 45,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginVertical: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: "16px",
  },
  googleButtonContainer: {
    width: "60%",
    height: "8%",
    backgroundColor: "#4285F4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginTop: 15,
  },
  appleButtonContainer: {
    width: "60%",
    height: "8%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginTop: 15,
  },
  metaButtonContainer: {
    width: "60%",
    height: "8%",
    backgroundColor: "#3B5998",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    marginTop: 15,
  },
  signInText: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "5%",
  },
  googleImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  appleImage: {
    width: 21,
    height: 25,
    marginRight: 10,
  },
  metaImage: {
    width: 30,
    height: 20,
    marginRight: 10,
  },
  altSignInButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  orText: {
    fontSize: 20,
    marginBottom: 5,
    color: "gray",
  },
});