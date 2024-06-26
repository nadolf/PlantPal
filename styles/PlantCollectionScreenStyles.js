import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingEnd: 10,
  },
  loadingContainer: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
  },
  itemContainer: {
    width: "90%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    alignSelf: "center",
    borderRadius: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 63,
    height: 63,
    borderRadius: 63,
    marginLeft: 10,
  },
  notificationButton: {
    width: 46,
    aspectRatio: 1,
    backgroundColor: "white",
    opacity: 0.5,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    alignSelf: "flex-end",
    justifyContent: "center",
  },
  plantNameText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#8492A6",
    alignSelf: "center",
    flex: 1,
  },
  itemWapper: {
    flexDirection: "row",
  },
  plantImage: {
    width: 90,
    height: 90,
  },
  searchBarContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 10,
  },
  searchBar: {
    backgroundColor: "white",
    borderRadius: "50%",
    paddingHorizontal: 20,
    height: 50,

  },
  addButton: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: "#B36540",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    bottom: "-40%",
  },
  addButtonText: {
    color: "white",
    fontSize: 30,
    fontWeight: "300",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "black",
    width: 80,
    margin: 10,
  },
  buttonAdd: {
    backgroundColor: "#B36540",
    width: 80,
    marginRight: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTextInput: {
    // borderColor: "gray",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: "50%"
  }
});
