import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useAuth from "./hooks/useAuth";
import SignUp from "./screens/SignUpScreen";
import SignIn from "./screens/SignInScreen";
import ProgressTracker from "./screens/ProgressTrackerScreen";
import BottomTabNavigator from "./components/BottomNavigation";
import Profile from "./screens/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? "BottomNav" : "SignUp"}>
        {user ? (
          <>
            <Stack.Screen
              name="BottomNav"
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ProgressTracker"
              component={ProgressTracker}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
