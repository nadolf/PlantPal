import React, { useState } from "react";
import { styles } from "../styles/ChatBotScreenStyles";
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
} from "react-native";
import axios from "axios";
import { OPENAI_API_KEY } from "@env";

export default function ChatBot({ navigation }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! How may I assist you?" },
  ]);
  const [input, setInput] = useState("");

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
    <SafeAreaView>
      <ScrollView>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={msg.role === "user" ? styles.userMessage : styles.botMessage}
          >
            <Text>{msg.content}</Text>
          </View>
        ))}      
        </ScrollView>
        <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <Button title="Send" onPress={handleSend} />
        </View>
    </SafeAreaView>
  );
}