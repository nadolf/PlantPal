import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/ProgressTrackerScreenStyles";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default ProgressTracker = ({ route, navigation }) => {
  const { plant } = route.params;
  const user = auth.currentUser;
  const [feed, setFeed] = useState([]);
  const [newFeedItem, setNewFeedItem] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      if (!user) return;
      try {
        const plantFeedRef = collection(
          db,
          "users",
          user.uid,
          "plants",
          plant,
          "feed"
        );
        const feedSnapshot = await getDocs(plantFeedRef);
        const feedData = feedSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeed(feedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feed: ", error);
        setLoading(false);
      }
    };

    fetchFeed();
  }, [user, plant]);

  const addFeedItem = async () => {
    if (!user || newFeedItem.trim() === "") return;
    try {
      const plantFeedRef = collection(
        db,
        "users",
        user.uid,
        "plants",
        plant,
        "feed"
      );
      const newFeedDoc = await addDoc(plantFeedRef, {
        text: newFeedItem,
        timestamp: Timestamp.now(),
      });
      setFeed([
        ...feed,
        { id: newFeedDoc.id, text: newFeedItem, timestamp: Timestamp.now() },
      ]);
      setNewFeedItem("");
    } catch (error) {
      console.error("Error adding feed item: ", error);
    }
  };

  const addWaterFeedItem = async () => {
    if (!user) return;
    const itemText = `${plant} was watered`;
    try {
      const plantFeedRef = collection(
        db,
        "users",
        user.uid,
        "plants",
        plant,
        "feed"
      );
      const newFeedDoc = await addDoc(plantFeedRef, {
        text: itemText,
        timestamp: Timestamp.now(),
      });
      setFeed([
        ...feed,
        { id: newFeedDoc.id, text: itemText, timestamp: Timestamp.now() },
      ]);
    } catch (error) {
      console.error("Error adding preset feed item: ", error);
    }
  };

  const addFertilizerFeedItem = async () => {
    if (!user) return;
    const itemText = `${plant} was fertilized`;
    try {
      const plantFeedRef = collection(
        db,
        "users",
        user.uid,
        "plants",
        plant,
        "feed"
      );
      const newFeedDoc = await addDoc(plantFeedRef, {
        text: itemText,
        timestamp: Timestamp.now(),
      });
      setFeed([
        ...feed,
        { id: newFeedDoc.id, text: itemText, timestamp: Timestamp.now() },
      ]);
    } catch (error) {
      console.error("Error adding preset feed item: ", error);
    }
  };

  const deleteFeedItem = async (id) => {
    if (!user) return;
    try {
      const feedDocRef = doc(
        db,
        "users",
        user.uid,
        "plants",
        plant,
        "feed",
        id
      );
      await deleteDoc(feedDocRef);
      setFeed(feed.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting feed item: ", error);
    }
  };

  const renderItem = ({ item }) => {
    const date = item.timestamp.toDate();
    const formattedDate = `${date.toDateString()} at ${date.toLocaleTimeString(
      [],
      { hour: "2-digit", minute: "2-digit" }
    )}`;
    return (
      <View style={styles.feedItem}>
        <Text>{item.text}</Text>
        <View style={styles.ItemDateContainer}>
          <Text style={styles.timestamp}>{formattedDate}</Text>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteFeedItem(item.id)}
          >
            <Icon name="trash" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="chevron-back" size={30} />
        </TouchableOpacity>
        <Text style={styles.plantName}>{plant}</Text>
      </View>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.feedList}
      />
      <View style={styles.additionalButtonsContainer}>
      <TouchableOpacity style={styles.button} onPress={addWaterFeedItem}>
        <Icon name="water-outline" size={24} color={"white"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={addFertilizerFeedItem}>
        <Image
          style={styles.fertilizerIcon}
          source={require("../assets/fertilizerIcon.png")}
        />
      </TouchableOpacity></View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new feed item"
          value={newFeedItem}
          onChangeText={setNewFeedItem}
        />
        <TouchableOpacity style={styles.button} onPress={addFeedItem}>
          <Image
            style={styles.sendIcon}
            source={require("../assets/sendIcon.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
