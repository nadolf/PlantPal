import React, { useState, useEffect } from "react";
import { styles } from "../styles/ChatBotScreenStyles";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { auth, db } from "../firebase";
import { getDoc, doc } from "firebase/firestore";
import axios from "axios";
import { OPENAI_API_KEY } from "@env";

export default function ChatBot() {
  const user = auth.currentUser;
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How may I assist you?" },
  ]);
  const [input, setInput] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profileImage);
        }
      } catch (error) {
        console.error("Error fetching profile image: ", error);
      }
    };

    fetchProfileImage();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input.trim() };
      const newMessages = [...messages, userMessage];
      setMessages(newMessages);
      setInput("");

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: newMessages,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        const botMessage = {
          role: "assistant",
          content: response.data.choices[0].message.content,
        };
        setMessages([...newMessages, botMessage]);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <View style={styles.header}>
          <Image
            style={styles.chatBotHeaderIcon}
            source={require("../assets/chatbot.png")}
          />
          <Text style={styles.chatBotText}>Chatbot</Text>
        </View>
        <View style={styles.messageContainer}>
          <ScrollView>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={
                  msg.role === "user"
                    ? styles.userMessageContainer
                    : styles.botMessageContainer
                }
              >
                <Image
                  style={
                    msg.role === "user" ? styles.userImage : styles.botImage
                  }
                  source={
                    msg.role === "user"
                      ? profileImage
                        ? { uri: profileImage }
                        : require("../assets/defaultProfileIcon.png") // Fallback user image
                      : require("../assets/chatbot.png") // Bot image
                  }
                />
                <View
                  style={
                    msg.role === "user" ? styles.userMessage : styles.botMessage
                  }
                >
                  <Text
                    style={
                      msg.role === "user"
                        ? styles.userMessageText
                        : styles.botMessageText
                    }
                  >
                    {msg.content}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type your message..."
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Image
              style={styles.sendIcon}
              source={require("../assets/sendIcon.png")}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}