// PuzzleScreen.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./PuzzleScreen.styles";

interface PuzzleScreenProps {
  onExitGame: () => void;
}

const PuzzleScreen: React.FC<PuzzleScreenProps> = ({ onExitGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puzzle Screen</Text>
      {/* game goes here */}
      <TouchableOpacity style={styles.button} onPress={onExitGame}>
        <Text style={styles.buttonText}>Exit Game</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PuzzleScreen;
