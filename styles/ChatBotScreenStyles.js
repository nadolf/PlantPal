import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    alignSelf: "center",
    alignItems: "center",
    width: "90%",
    height: "10%",
    borderRadius: "100%",
    backgroundColor: "white",
    flexDirection: "row",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    display: "flex",
    marginHorizontal: 15,
  },
  messageContainer: {
    backgroundColor: "white",
    borderRadius: "30%",
    height: "72%",
    width: "90%",
    marginVertical: 15,
    alignSelf: "center",
    padding: 10,
  },
  messages: {
    flex: 1,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#F2F2F2",
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#8492A6",
    padding: 10,
    borderRadius: 20,
    marginBottom: 5,
  },
  userMessageText: {
    color: "black",
    fontWeight: '600'
  },
  botMessageText: {
    color: "white",
    fontWeight: '600'
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
    marginVertical: 5
  },
  botImage: {
    width: 35,
    height: 35,
    borderRadius: 20,
    marginRight: 10,
    marginVertical: 5
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    paddingLeft: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  chatBotHeaderIcon: {
    width: 50,
    height: 50,
    borderRadius: "100%",
    marginHorizontal: 15,
  },
  chatBotText: {
    fontWeight: "900",
    fontSize: 25,
  },
  sendButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    aspectRatio: 1,
    borderRadius: "100%",
    backgroundColor: "#B36540",
    color: "white",
    marginHorizontal: 10,
  },
  sendIcon: {
    width: 25,
    height: 25,
    transform: [{ rotate: "-35deg" }],
  },
});
