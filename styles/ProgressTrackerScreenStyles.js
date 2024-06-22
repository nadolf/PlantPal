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
    flexDirection: "row",
    alignItems: "center",
  },
  plantName: {
    flex: 1,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  feedList: {
    flex: 1,
    marginTop: 20,
  },
  feedItem: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: "15%",
    marginVertical: 10,
  },
  timestamp: {
    color: "gray",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: "white",
    borderRadius: "50%",
    paddingHorizontal: 20,
  },
  backButtonText: {
    fontSize: 30,
  },
  ItemDateContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    aspectRatio: 1,
    borderRadius: "100%",
    backgroundColor: "#B36540",
    color: "white",
    marginLeft: 10,
  },
  additionalButtonsContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginVertical: 10
  },
  sendIcon: {
    width: 25,
    height: 25,
    transform: [{ rotate: "-35deg" }],
  },
  fertilizerIcon: {
    width: 25,
    height: 25,
  },
});
