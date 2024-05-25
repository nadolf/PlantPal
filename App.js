import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SignUp from './screens/SignUpScreen';
import SignIn from './screens/SignInScreen';
import Home from './screens/HomeScreen';
import AppNavigation from './navigation/appNavigation';

export default function App() {
  return (
    <View style={styles.container}>
      <SignUp/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
