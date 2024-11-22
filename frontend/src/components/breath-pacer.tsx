import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export function BreathPacerComponent() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathDuration, setBreathDuration] = useState(4);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            return 0;
          }
          return prevProgress + (100 / (breathDuration * 1000)) * 10;
        });
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathDuration]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
    setProgress(0);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Breath Pacer
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="w-64 h-64 rounded-full border-8 border-blue-500 flex items-center justify-center mb-4">
          <div
            className="w-56 h-56 rounded-full bg-blue-500 transition-all duration-100 ease-in-out"
            style={{
              transform: `scale(${progress / 100})`,
              opacity: progress > 50 ? 2 - progress / 50 : progress / 50,
            }}
          />
        </div>
        <p className="text-xl mb-4">
          {progress <= 50 ? "Inhale..." : "Exhale..."}
        </p>
        <div className="w-full max-w-xs mb-4">
          <p className="mb-2">Breath Duration: {breathDuration} seconds</p>
          <Slider
            value={[breathDuration]}
            onValueChange={(value) => setBreathDuration(value[0])}
            min={2}
            max={10}
            step={1}
          />
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button onClick={toggleBreathing}>
          {isBreathing ? "Stop" : "Start"} Breathing Exercise
        </Button>
      </CardFooter>
    </Card>
  );
}
