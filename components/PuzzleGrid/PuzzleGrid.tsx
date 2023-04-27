import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { getScreenDimensions } from "../../helpers/screenHelpers";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PuzzleGridProps {}

const PuzzleGrid: React.FC<PuzzleGridProps> = (_props) => {
  const { width } = getScreenDimensions();
  const imageSize = width < 1024 ? Math.floor(width * 0.75) : 512;

  const [imageURL, setImageURL] = useState("");
  const [isShuffled, setIsShuffled] = useState(false);
  const numRows = 3;
  const numCols = 3;
  const pieceSize = imageSize / numRows;

  useEffect(() => {
    const fetchImage = async () => {
      const response = await fetch(
        `https://picsum.photos/${imageSize}/${imageSize}`
      );
      setImageURL(response.url);
    };

    fetchImage();
  }, [imageSize]);

  // Shuffle the puzzle pieces
  const shuffledIndices = [...Array(numRows * numCols).keys()].sort(
    () => Math.random() - 0.5
  );

  // Generate puzzle pieces
  const puzzlePieces = [];
  if (imageURL && isShuffled) {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const index = row * numCols + col;
        const shuffledIndex = shuffledIndices[index];
        const toRow = Math.floor(shuffledIndex / numCols);
        const toCol = shuffledIndex % numCols;
        puzzlePieces.push(
          <PuzzlePiece
            key={`${row}-${col}`}
            imageURL={imageURL}
            pieceSize={pieceSize}
            fromRow={row}
            fromCol={col}
            toRow={toRow}
            toCol={toCol}
          />
        );
      }
    }
  }

  return (
    <View style={{ width: imageSize, height: imageSize }}>
      {imageURL && isShuffled ? (
        puzzlePieces
      ) : (
        <TouchableOpacity onPress={() => setIsShuffled(true)}>
          {imageURL && (
            <Image
              source={{ uri: imageURL }}
              style={{ width: imageSize, height: imageSize }}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PuzzleGrid;
