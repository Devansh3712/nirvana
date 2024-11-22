import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Gamepad2, PartyPopper, Puzzle, Target, Zap } from "lucide-react";
import BreatheAndBloom from "./breathe-bloom";
import PiecefulSlidingPuzzle from "./jigsaw";
import MindMaze from "./mind-maze";
import PositivePop from "./positive-pop";
import WhackAMole from "./whack-a-mole";

interface Game {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  component: React.ComponentType;
}

const games: Game[] = [
  {
    id: 1,
    title: "Breathe and Bloom",
    description: "Practice controlled breathing to reduce stress and anger.",
    icon: <Zap className="h-8 w-8 text-blue-500" />,
    component: BreatheAndBloom,
  },
  {
    id: 2,
    title: "Pieceful Puzzle",
    description: "Solve puzzles to understand and manage anger triggers.",
    icon: <Puzzle className="h-8 w-8 text-purple-500" />,
    component: PiecefulSlidingPuzzle,
  },
  {
    id: 3,
    title: "Postitive Pop",
    description: "Click calmly and steadily to train patience focus.",
    icon: <PartyPopper className="h-8 w-8 text-red-500" />,
    component: PositivePop,
  },
  {
    id: 4,
    title: "Mindful Maze",
    description: "Navigate through a maze while practicing mindfulness.",
    icon: <Gamepad2 className="h-8 w-8 text-yellow-500" />,
    component: MindMaze,
  },
  {
    id: 5,
    title: "Whack a Mole",
    description: "Click calmly and steadily to train patience focus.",
    icon: <Target className="h-8 w-8 text-red-500" />,
    component: WhackAMole,
  },
];

export function MiniGamesPageComponent() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  const handleStartGame = (game: Game) => {
    setSelectedGame(game);
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Nirvana Mini-Games
        </h1>
        {!selectedGame ? (
          <>
            <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
              Explore our collection of mini-games designed to help you manage
              anger, reduce stress, and improve emotional well-being.
            </p>
            <ScrollArea className="h-[600px] w-full">
              <div className="grid grid-cols-3 gap-6">
                {games.map((game) => (
                  <Card key={game.id} className="flex flex-col">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        {game.icon}
                        <span>{game.title}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{game.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto">
                      <Button
                        className="w-full"
                        onClick={() => handleStartGame(game)}
                      >
                        Start Game
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Button onClick={handleBackToGames} className="mb-4">
              Back to Games
            </Button>
            <selectedGame.component />
          </div>
        )}
      </div>
    </div>
  );
}
