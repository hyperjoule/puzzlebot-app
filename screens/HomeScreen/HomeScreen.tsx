// HomeScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./HomeScreen.styles";

interface HomeScreenProps {
  onStartGame: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PuzzleBot</Text>
      <TouchableOpacity style={styles.button} onPress={onStartGame}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
