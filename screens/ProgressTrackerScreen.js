import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { styles } from "../styles/ProgressTrackerScreenStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { collection, addDoc, getDocs, Timestamp, deleteDoc} from "firebase/firestore";

export default ProgressTracker = ({ route }) => {
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

  const deleteFeedItem = async () => {
    if (!user) return;
    try {
        const plantFeedRef = collection(
            db,
            "users",
            user.uid,
            "plants",
            plant,
            "feed",
            id );
            await deleteDoc(plantFeedRef);
            setFeed(feed.filter( item => item.id !== id))
    } catch (error) {
        console.error("Error deleting feed item: ", error);
    }
  }

  const renderItem = ({ item }) => {
    const date = item.timestamp.toDate(); 
    return (
      <View style={styles.feedItem}>
        <Text>{item.text}</Text>
        <Text style={styles.timestamp}>{date.toDateString()}</Text>
        <Button title="Delete" onPress={deleteFeedItem}/>
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
        <Text style={styles.title}>Plant Feed</Text>
        <Text style={styles.plantName}>{plant}</Text>
      </View>
      <FlatList
        data={feed}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.feedList}
      />
      <TextInput
        style={styles.input}
        placeholder="Add new feed item"
        value={newFeedItem}
        onChangeText={setNewFeedItem}
      />
      <Button title="Add Feed Item" onPress={addFeedItem} />
    </SafeAreaView>
  );
};