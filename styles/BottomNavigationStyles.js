import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabBarContainer: {
      position: "absolute",
      bottom: 20,
      left: 20,
      right: 20,
      height: 70,
      borderRadius: 35,
      backgroundColor: "white",
      elevation: 5,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      justifyContent: "center",
    },
    tabBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      flex: 1,
    },
    tabItem: {
      alignItems: "center",
    },
  });
  