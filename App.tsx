import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import PuzzleScreen from "./screens/PuzzleScreen/PuzzleScreen";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleExitGame = () => {
    setGameStarted(false);
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <HomeScreen onStartGame={handleStartGame} />
      ) : (
        <PuzzleScreen onExitGame={handleExitGame} />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
