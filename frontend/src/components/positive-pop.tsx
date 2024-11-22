import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

type Word = {
  id: number;
  text: string;
  x: number;
  y: number;
  isPositive: boolean;
  isClicked: boolean;
};

const negativeWords = [
  "anger",
  "stress",
  "frustration",
  "anxiety",
  "worry",
  "fear",
  "sadness",
  "doubt",
  "panic",
  "guilt",
  "envy",
  "hate",
  "resentment",
  "despair",
  "loneliness",
  "regret",
  "grief",
  "depression",
  "jealousy",
  "disappointment",
  "hopelessness",
];

const positiveWords = [
  "calm",
  "peace",
  "joy",
  "confidence",
  "strength",
  "hope",
  "happiness",
  "courage",
  "love",
  "gratitude",
  "kindness",
  "compassion",
  "patience",
  "optimism",
  "serenity",
  "balance",
  "freedom",
  "contentment",
  "faith",
  "trust",
  "laughter",
];

const PositivePop: React.FC = () => {
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [spawnInterval, setSpawnInterval] = useState(1000);
  const [speed, setSpeed] = useState(3);
  const [emoji, setEmoji] = useState<string | null>(null);

  const canvasHeight = 600;
  const canvasWidth = 700; // Reduced width
  const mindLineY = canvasHeight - 70;

  const addWord = useCallback(() => {
    const newWord: Word = {
      id: Date.now(),
      text: negativeWords[Math.floor(Math.random() * negativeWords.length)],
      x: Math.random() * (canvasWidth - 100),
      y: -50,
      isPositive: false,
      isClicked: false,
    };
    setWords((prevWords) => [...prevWords, newWord]);
  }, [canvasWidth]);

  const moveWords = () => {
    setWords((prevWords) => {
      return prevWords
        .map((word) => {
          const newY = word.y + speed;

          if (newY > mindLineY && !word.isClicked) {
            word.isClicked = true;

            // Check if the word is positive or negative
            if (word.isPositive) {
              console.log("Positive word crossed the line:", word.text);
              setEmoji("😃");
            } else {
              console.log("Negative word crossed the line:", word.text);
              setLives((prevLives) => Math.max(0, prevLives - 1));
              setEmoji("💔");
            }
          }

          return { ...word, y: newY };
        })
        .filter((word) => word.y <= mindLineY + 50);
    });

    // End the game if lives run out
    if (lives <= 0 && !gameOver) {
      setGameOver(true);
      setEmoji(null);
    }
  };

  // Add a useEffect to handle the emoji visibility duration
  useEffect(() => {
    if (emoji) {
      const timer = setTimeout(() => {
        setEmoji(null);
      }, 1000); // Show the emoji for 1 second

      return () => clearTimeout(timer);
    }
  }, [emoji]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const intervalId = setInterval(() => {
        moveWords();
      }, 50);
      return () => clearInterval(intervalId);
    }
  }, [gameStarted, gameOver, speed, lives]);

  const handleWordClick = (clickedWord: Word) => {
    setWords((prevWords) => {
      return prevWords.map((word) => {
        if (word.id === clickedWord.id && !word.isClicked) {
          const newWord = {
            ...word,
            text: positiveWords[
              Math.floor(Math.random() * positiveWords.length)
            ],
            isPositive: true,
            isClicked: true,
          };
          console.log(
            "Word clicked and transformed:",
            newWord.text,
            "isPositive:",
            newWord.isPositive
          );
          return newWord;
        }
        return word;
      });
    });
    setScore((prevScore) => prevScore + 1);
  };

  const startGame = () => {
    setWords([]);
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
    setSpawnInterval(1000);
    setSpeed(3);
    setEmoji(null);
    addWord();
  };

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        setSpeed((prevSpeed) => prevSpeed + 0.2);
        setSpawnInterval((prevInterval) => Math.max(500, prevInterval - 100));
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (gameStarted && !gameOver) {
      intervalId = setInterval(addWord, spawnInterval);
    }

    return () => clearInterval(intervalId);
  }, [addWord, gameStarted, gameOver, spawnInterval]);

  return (
    <div className="relative w-full flex flex-col items-center bg-lilac font-inter">
      <div className="flex justify-between w-full p-4">
        <div className="text-2xl font-bold text-blue-600">Score: {score}</div>
        <div className="flex space-x-2">
          {Array.from({ length: lives }).map((_, idx) => (
            <Heart key={idx} className="text-red-500" />
          ))}
        </div>
      </div>

      <div
        className="relative"
        style={{
          height: canvasHeight,
          width: canvasWidth,
          border: "2px solid #333",
        }}
      >
        <AnimatePresence>
          {words.map((word) => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, x: word.x, y: word.y }}
              exit={{ opacity: 0 }}
              onClick={() => handleWordClick(word)}
              className={`absolute cursor-pointer px-4 py-2 rounded-full ${
                word.isPositive
                  ? "bg-green-400 text-white"
                  : "bg-baker-miller-pink text-blue-800"
              }`}
            >
              {word.text}
            </motion.div>
          ))}
        </AnimatePresence>

        <div className="absolute bottom-0 left-0 mb-4 ml-4 text-black font-bold">
          Protect Your Mind!
        </div>
        <div
          className="absolute w-full h-3 bg-blue-700"
          style={{ top: mindLineY }}
        ></div>
      </div>

      {emoji && <div className="text-6xl mt-4">{emoji}</div>}

      {!gameStarted && (
        <button
          onClick={startGame}
          className="px-6 py-3 bg-blue-500 text-white rounded-md mt-6 hover:bg-blue-600"
        >
          Start Game
        </button>
      )}

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg text-center text-gray-900">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Game Over</h2>
            <p className="text-xl mb-4">
              You protected your mind from {score} negative thoughts! Keep
              going! 💪
            </p>
            <button
              onClick={startGame}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PositivePop;
