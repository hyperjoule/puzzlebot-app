import React, { useState, useEffect, useCallback } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { getScreenDimensions } from "../../helpers/screenHelpers";
import PuzzlePiece from "../PuzzlePiece/PuzzlePiece";

const PuzzleGrid = () => {
  const { width } = getScreenDimensions();
  const imageSize = width < 1024 ? Math.floor(width * 0.9) : 512;
  const numRows = 4;
  const numCols = 4;
  const pieceSize = imageSize / numRows;

  const [imageURL, setImageURL] = useState("");
  const [isShuffled, setIsShuffled] = useState(false);
  const [piecePositions, setPiecePositions] = useState<number[]>([]);

  const shuffleArray = useCallback((array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  }, []);

  const fetchImage = useCallback(async () => {
    const response = await fetch(
      `https://picsum.photos/${imageSize}/${imageSize}`
    );
    setImageURL(response.url);
    setPiecePositions(shuffleArray([...Array(numRows * numCols).keys()]));
    setIsShuffled(true);
  }, [imageSize, shuffleArray]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const checkIfPuzzleIsComplete = () => {
    return piecePositions.every((value, index) => value === index);
  };

  const updatePiecePosition = useCallback(
    (fromRow: number, fromCol: number) => {
      const fromIndex = fromRow * numCols + fromCol;
      const toIndex = piecePositions.findIndex((index) => index === fromIndex);

      const newPiecePositions = [...piecePositions];
      [newPiecePositions[fromIndex], newPiecePositions[toIndex]] = [
        newPiecePositions[toIndex],
        newPiecePositions[fromIndex]
      ];

      setPiecePositions(newPiecePositions);

      if (checkIfPuzzleIsComplete()) {
        fetchImage();
      }
    },
    [numCols, piecePositions, fetchImage]
  );

  const puzzlePieces =
    imageURL &&
    isShuffled &&
    piecePositions.map((shuffledIndex, index) => {
      const fromRow = Math.floor(index / numCols);
      const fromCol = index % numCols;
      const toRow = Math.floor(shuffledIndex / numCols);
      const toCol = shuffledIndex % numCols;
      return (
        <PuzzlePiece
          key={`${fromRow}-${fromCol}`}
          imageURL={imageURL}
          pieceSize={pieceSize}
          fromRow={fromRow}
          fromCol={fromCol}
          toRow={toRow}
          toCol={toCol}
          numRows={numRows}
          numCols={numCols}
          onPieceTap={updatePiecePosition}
        />
      );
    });

  return (
    <View style={{ width: imageSize, height: imageSize }}>
      {puzzlePieces && puzzlePieces.length > 0 ? (
        puzzlePieces
      ) : (
        <TouchableOpacity onPress={fetchImage}>
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
