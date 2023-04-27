import React, { useRef, useEffect } from "react";
import { Animated, Image, TouchableOpacity } from "react-native";
import { styles } from "./PuzzlePiece.styles";

interface PuzzlePieceProps {
  imageURL: string;
  pieceSize: number;
  fromRow: number;
  fromCol: number;
  toRow: number;
  toCol: number;
  numRows: number;
  numCols: number;
  onPieceTap: (fromRow: number, fromCol: number) => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({
  imageURL,
  pieceSize,
  fromRow,
  fromCol,
  toRow,
  toCol,
  numRows,
  numCols,
  onPieceTap
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

  const handlePieceTap = () => {
    onPieceTap(fromRow, fromCol);
  };

  return (
    <TouchableOpacity onPress={handlePieceTap}>
      <Animated.View
        style={[
          styles.pieceContainer,
          {
            width: pieceSize,
            height: pieceSize,
            zIndex: fromRow * numCols + fromCol,
            transform: [{ translateX: positionX }, { translateY: positionY }]
          }
        ]}
      >
        <Image
          source={{ uri: imageURL }}
          style={[
            styles.image,
            {
              width: pieceSize * numRows,
              height: pieceSize * numCols,
              transform: [
                { translateX: -fromCol * pieceSize },
                { translateY: -fromRow * pieceSize }
              ]
            }
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default PuzzlePiece;
