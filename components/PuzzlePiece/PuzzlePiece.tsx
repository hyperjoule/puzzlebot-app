import React, { useRef, useEffect } from "react";
import { Animated, Image } from "react-native";
import { styles } from "./PuzzlePiece.styles";

interface PuzzlePieceProps {
  imageURL: string;
  pieceSize: number;
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  imageURL,
  pieceSize,
  fromRow,
  fromCol,
  toRow,
  toCol
}) => {
  const positionX = useRef(new Animated.Value(fromCol * pieceSize)).current;
  const positionY = useRef(new Animated.Value(fromRow * pieceSize)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(positionX, {
        toValue: toCol * pieceSize,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.timing(positionY, {
        toValue: toRow * pieceSize,
        duration: 500,
        useNativeDriver: true
      })
    ]).start();
  }, [pieceSize, toRow, toCol, positionX, positionY]);

  return (
    <Animated.View
      style={[
        styles.pieceContainer,
        {
          width: pieceSize,
          height: pieceSize,
          transform: [{ translateX: positionX }, { translateY: positionY }]
        }
      ]}
    >
      <Image
        source={{ uri: imageURL }}
        style={[
          styles.image,
          {
            width: pieceSize * 3, // Assuming numRows = 3
            height: pieceSize * 3, // Assuming numCols = 3
            transform: [
              { translateX: -fromCol * pieceSize },
              { translateY: -fromRow * pieceSize }
            ]
          }
        ]}
      />
    </Animated.View>
  );
};

export default PuzzlePiece;
