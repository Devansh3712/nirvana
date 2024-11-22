import React, { useState, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

type PuzzlePiece = {
  id: number;
  imageData: string;
  currentPosition: number;
};

const GRID_SIZE = 3; // 3x3 grid for easier gameplay
const TOTAL_PIECES = GRID_SIZE * GRID_SIZE;
const EMPTY_TILE_ID = TOTAL_PIECES - 1; // The last tile is the empty space
const IMAGE_URL =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const PiecefulSlidingPuzzle: React.FC = () => {
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [emptyTilePosition, setEmptyTilePosition] =
    useState<number>(EMPTY_TILE_ID);
  const [isComplete, setIsComplete] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState("");

  useEffect(() => {
    initializePuzzle();
  }, []);

  const initializePuzzle = () => {
    const img = new Image();
    img.src = IMAGE_URL;
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const pieceWidth = img.width / GRID_SIZE;
      const pieceHeight = img.height / GRID_SIZE;
      const newPieces: PuzzlePiece[] = [];

      // Generate pieces from the image
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const id = y * GRID_SIZE + x;
          const pieceCanvas = document.createElement("canvas");
          pieceCanvas.width = pieceWidth;
          pieceCanvas.height = pieceHeight;
          const pieceContext = pieceCanvas.getContext("2d");

          if (id !== EMPTY_TILE_ID) {
            pieceContext?.drawImage(
              img,
              x * pieceWidth,
              y * pieceHeight,
              pieceWidth,
              pieceHeight,
              0,
              0,
              pieceWidth,
              pieceHeight
            );
          }

          const imageData = pieceCanvas.toDataURL("image/png");
          newPieces.push({
            id,
            imageData,
            currentPosition: id,
          });
        }
      }

      shufflePieces(newPieces);
      setStartTime(new Date()); // Start the timer when the puzzle is initialized
    };
  };

  const shufflePieces = (piecesToShuffle: PuzzlePiece[]) => {
    const shuffled = [...piecesToShuffle].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
    setEmptyTilePosition(
      shuffled.findIndex((piece) => piece.id === EMPTY_TILE_ID)
    );
    setIsComplete(false);
    setShowSolution(false);
    setStartTime(new Date());
    setEndTime(null);
  };

  const moveTile = (tileIndex: number) => {
    // Check if the tile is adjacent to the empty space
    const tileRow = Math.floor(tileIndex / GRID_SIZE);
    const tileCol = tileIndex % GRID_SIZE;
    const emptyRow = Math.floor(emptyTilePosition / GRID_SIZE);
    const emptyCol = emptyTilePosition % GRID_SIZE;

    const isAdjacent =
      Math.abs(tileRow - emptyRow) + Math.abs(tileCol - emptyCol) === 1;

    if (isAdjacent) {
      setPieces((prevPieces) => {
        const newPieces = [...prevPieces];
        [newPieces[tileIndex], newPieces[emptyTilePosition]] = [
          newPieces[emptyTilePosition],
          newPieces[tileIndex],
        ];

        return newPieces;
      });

      setEmptyTilePosition(tileIndex);
      checkCompletion();
    }
  };

  const checkCompletion = () => {
    const isSolved = pieces.every((piece, index) => piece.id === index);
    if (isSolved) {
      setIsComplete(true);
      setEndTime(new Date());
    }
  };

  const formatElapsedTime = () => {
    if (startTime && endTime) {
      const timeDiff = endTime.getTime() - startTime.getTime();
      const minutes = Math.floor(timeDiff / 60000);
      const seconds = Math.floor((timeDiff % 60000) / 1000);
      return `${minutes}m ${seconds}s`;
    }
    return "";
  };

  useEffect(() => {
    if (isComplete && startTime && endTime) {
      setElapsedTime(formatElapsedTime());
    }
  }, [isComplete, endTime]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-lg mx-auto p-6 bg-lilac rounded-lg shadow-lg">
        <h2 className="text-3xl font-inter font-bold text-blue-600 mb-6 text-center">
          Sliding Tile Puzzle
        </h2>

        {/* Show Solution Button */}
        <div className="mb-4 flex justify-center">
          <button
            onClick={() => setShowSolution(!showSolution)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-inter"
          >
            {showSolution ? "Hide Solution" : "Show Solution"}
          </button>
        </div>

        {showSolution ? (
          <div className="text-center">
            <img
              src={IMAGE_URL}
              alt="Solved puzzle"
              className="w-full rounded-lg shadow-md mb-4"
            />
          </div>
        ) : isComplete ? (
          <div className="text-center">
            <img
              src={IMAGE_URL}
              alt="Completed puzzle"
              className="w-full rounded-lg shadow-md mb-4"
            />
            <p className="text-xl font-inter text-green-800 mb-4">
              Congratulations! You solved the puzzle!
            </p>
            <p className="text-lg font-inter text-blue-600 mb-4">
              Time taken: {elapsedTime}
            </p>
            <button
              onClick={initializePuzzle}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-inter"
            >
              Start New Puzzle
            </button>
          </div>
        ) : (
          <>
            <div
              className="grid grid-cols-3 gap-2 mb-6"
              style={{ aspectRatio: "1 / 1" }}
            >
              {pieces.map((piece, index) => (
                <div
                  key={piece.id}
                  onClick={() => moveTile(index)}
                  className={`border-2 border-blue-300 rounded-md overflow-hidden ${
                    piece.id === EMPTY_TILE_ID ? "bg-black" : ""
                  }`}
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: piece.id === EMPTY_TILE_ID ? "default" : "pointer",
                  }}
                >
                  {piece.id !== EMPTY_TILE_ID && (
                    <img
                      src={piece.imageData}
                      alt={`Piece ${piece.id}`}
                      className="w-full h-full object-cover"
                      draggable={false}
                    />
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => shufflePieces(pieces)}
              className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-inter"
            >
              Shuffle Tiles
            </button>
          </>
        )}
      </div>
    </DndProvider>
  );
};

export default PiecefulSlidingPuzzle;
