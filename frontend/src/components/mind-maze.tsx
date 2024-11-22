import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Flag } from "lucide-react";

const CELL_SIZE = 40;
const MAZE_SIZE = 12;
const PLAYER_SIZE = 30;

type Position = { x: number; y: number };

// Generate a maze with obstacles
const generateMaze = (): number[][] => {
  const maze = Array(MAZE_SIZE)
    .fill(0)
    .map(() => Array(MAZE_SIZE).fill(0)); // Start with empty cells

  // Add larger obstacles (big boxes)
  for (let i = 0; i < 5; i++) {
    const boxSize = Math.floor(Math.random() * 2) + 2; // Box size of 2x2 or 3x3
    const startX = Math.floor(Math.random() * (MAZE_SIZE - boxSize - 1)) + 1;
    const startY = Math.floor(Math.random() * (MAZE_SIZE - boxSize - 1)) + 1;

    for (let x = startX; x < startX + boxSize; x++) {
      for (let y = startY; y < startY + boxSize; y++) {
        maze[y][x] = 1; // Place a large obstacle
      }
    }
  }

  // Add smaller stone obstacles
  for (let i = 0; i < 10; i++) {
    const stoneX = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1;
    const stoneY = Math.floor(Math.random() * (MAZE_SIZE - 2)) + 1;
    maze[stoneY][stoneX] = 1; // Place a stone
  }

  // Ensure start and end cells are open
  maze[1][1] = 0;
  maze[MAZE_SIZE - 2][MAZE_SIZE - 2] = 0;

  return maze;
};

const MindMaze: React.FC = () => {
  const [maze, setMaze] = useState(generateMaze);
  const [playerPos, setPlayerPos] = useState<Position>({ x: 1, y: 1 });
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("Navigate carefully...");

  // Check if the player is moving into an obstacle or out of bounds
  const isCollision = (x: number, y: number) => {
    return (
      x < 0 || y < 0 || x >= MAZE_SIZE || y >= MAZE_SIZE || maze[y][x] === 1
    );
  };

  const movePlayer = (dx: number, dy: number) => {
    setPlayerPos((prev) => {
      const newX = prev.x + dx;
      const newY = prev.y + dy;

      // Check if the move is valid and within bounds
      if (isCollision(newX, newY)) {
        setMessage("Ouch! Hit an obstacle or boundary. Restarting...");
        return { x: 1, y: 1 }; // Reset player to start on collision
      }

      // Check if the player reached the goal
      if (newX === MAZE_SIZE - 2 && newY === MAZE_SIZE - 2) {
        setScore((prevScore) => prevScore + 10);
        setMessage("Maze completed! Generating a new maze...");
        setTimeout(() => {
          setMaze(generateMaze());
          setPlayerPos({ x: 1, y: 1 });
        }, 1000);
      }

      return { x: newX, y: newY };
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        movePlayer(0, -1);
        break;
      case "ArrowDown":
        movePlayer(0, 1);
        break;
      case "ArrowLeft":
        movePlayer(-1, 0);
        break;
      case "ArrowRight":
        movePlayer(1, 0);
        break;
    }
  };

  useEffect(() => {
    const container = document.getElementById("maze-container");
    if (container) container.focus();
  }, []);

  return (
    <div
      id="maze-container"
      className="max-w-lg mx-auto p-6 bg-gradient-to-b from-blue-200 to-green-200 rounded-lg shadow-lg text-center outline-none"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <h2 className="text-3xl font-inter font-bold text-blue-700 mb-6">
        Mind Maze
      </h2>
      <div className="text-blue-800 mb-4">Score: {score}</div>
      <div
        className="relative"
        style={{ width: MAZE_SIZE * CELL_SIZE, height: MAZE_SIZE * CELL_SIZE }}
      >
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={`absolute ${cell ? "bg-gray-600" : "bg-green-100"}`}
              style={{
                left: x * CELL_SIZE,
                top: y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
          ))
        )}
        {/* Render the player using framer-motion */}
        <motion.div
          animate={{ x: playerPos.x * CELL_SIZE, y: playerPos.y * CELL_SIZE }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute bg-pink-500 rounded-full"
          style={{
            width: PLAYER_SIZE,
            height: PLAYER_SIZE,
            transform: "translate(-50%, -50%)",
          }}
        />
        {/* Render the goal (flag) */}
        <div
          className="absolute text-green-500"
          style={{
            left: (MAZE_SIZE - 1.5) * CELL_SIZE,
            top: (MAZE_SIZE - 1.5) * CELL_SIZE,
          }}
        >
          <Flag size={CELL_SIZE} />
        </div>
      </div>
      <div className="mt-4 text-blue-800">{message}</div>
    </div>
  );
};

export default MindMaze;
