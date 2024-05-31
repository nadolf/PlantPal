import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: 'baseline',
    display: "flex",
    marginHorizontal: 10,
  },
  messages: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 10,
    marginBottom: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 10,
    alignSelf: "center",
  },
});
