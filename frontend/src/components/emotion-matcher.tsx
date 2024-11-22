import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smile, Frown, Meh, Angry } from "lucide-react";

const emotions = [
  { name: "'Happy'", icon: <Smile className="w-12 h-12" /> },
  { name: "'Sad'", icon: <Frown className="w-12 h-12" /> },
  { name: "'Neutral'", icon: <Meh className="w-12 h-12" /> },
  { name: "'Angry'", icon: <Angry className="w-12 h-12" /> },
];

const scenarios = [
  { text: "You received a surprise gift from friend.", emotion: "'Happy'" },
  { text: "Your favorite team lost an important game.", emotion: "'Sad'" },
  {
    text: "You're waiting in line at the grocery store.",
    emotion: "'Neutral'",
  },
  { text: "Someone cut in front of you traffic.", emotion: "'Angry'" },
  { text: "You accomplished a personal goal.", emotion: "'Happy'" },
  { text: "You missed an important deadline at work.", emotion: "'Sad'" },
  {
    text: "You're folding laundry on a quiet afternoon.",
    emotion: "'Neutral'",
  },
  {
    text: "Your sibling borrowed your things without asking.",
    emotion: "'Angry'",
  },
];

export function EmotionMatcherComponent() {
  const [currentScenario, setCurrentScenario] = useState(scenarios[0]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const shuffleScenarios = () => {
    return [...scenarios].sort(() => Math.random() - 0.5);
  };

  const [remainingScenarios, setRemainingScenarios] = useState(
    shuffleScenarios()
  );

  const handleEmotionClick = (selectedEmotion: string) => {
    if (selectedEmotion === currentScenario.emotion) {
      setScore(score + 1);
    }

    if (remainingScenarios.length > 1) {
      setRemainingScenarios(remainingScenarios.slice(1));
      setCurrentScenario(remainingScenarios[1]);
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setRemainingScenarios(shuffleScenarios());
    setCurrentScenario(scenarios[0]);
    setScore(0);
    setGameOver(false);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Emotion Matcher
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {!gameOver ? (
          <>
            <p className="text-lg mb-4 text-center">{currentScenario.text}</p>
            <div className="grid grid-cols-2 gap-4">
              {emotions.map((emotion) => (
                <Button
                  key={emotion.name}
                  onClick={() => handleEmotionClick(emotion.name)}
                  className="flex flex-col items-center p-4"
                >
                  {emotion.icon}
                  <span className="mt-2">{emotion.name}</span>
                </Button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center">
            <p className="text-2xl mb-4">Game Over!</p>
            <p className="text-xl mb-4">
              Your Score: {score} / {scenarios.length}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center">
        {gameOver && <Button onClick={restartGame}>Play Again</Button>}
      </CardFooter>
    </Card>
  );
}
