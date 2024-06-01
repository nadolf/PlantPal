import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header: {
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
    },
    plantName: {
      fontSize: 18,
      color: "gray",
    },
    feedList: {
      flex: 1,
      marginTop: 20,
    },
    feedItem: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    timestamp: {
      color: "gray",
      fontSize: 12,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      paddingHorizontal: 10,
      marginTop: 20,
    },
  });
  