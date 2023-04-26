import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen/HomeScreen";

export default function App() {
  const handleStartGame = () => {
    // Handle starting the game here
  };

  return (
    <View style={styles.container}>
      <HomeScreen onStartGame={handleStartGame} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});
