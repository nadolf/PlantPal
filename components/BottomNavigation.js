import React from "react";
import { styles } from "../styles/BottomNavigationStyles";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import ChatBot from "../screens/ChatBotScreen";
import Scanner from "../screens/ScannerScreen";
import PlantCollection from "../screens/PlantCollectionScreen";

const Tab = createBottomTabNavigator();

const BottomNav = (props) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {props.state.routes.map((route, index) => {
          const { options } = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;
          const isSelected = props.state.index === index;

          let iconName;
          if (route.name === "ChatBot") {
            iconName = "chatbox-ellipses-outline";
          } else if (route.name === "Scanner") {
            iconName = "scan-outline";
          } else if (route.name === "PlantCollection") {
            iconName = "leaf-outline";
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => props.navigation.navigate(route.name)}
            >
              <Icon
                name={iconName}
                size={24}
                color={isSelected ? "#B36540" : "black"}
              />
              <Text style={{ color: isSelected ? "#B36540" : "black" }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator tabBar={(props) => <BottomNav {...props} />}>
      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
        options={{ headerShown: false, tabBarLabel: "Chat" }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{ headerShown: false, tabBarLabel: "Scanner" }}
      />
      <Tab.Screen
        name="PlantCollection"
        component={PlantCollection}
        options={{ headerShown: false, tabBarLabel: "Garden" }}
      />
    </Tab.Navigator>
  );
}
