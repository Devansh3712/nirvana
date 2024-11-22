import React, { useState, useEffect } from "react";
import { Play, Pause, RefreshCw } from "lucide-react";

interface FireflyProps {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

const generateFireflies = (count: number): FireflyProps[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    color: `hsl(${Math.floor(Math.random() * 360)}, 100%, 70%)`,
    opacity: Math.random() * 0.5 + 0.5,
  }));
};

const BreatheAndBloom: React.FC = () => {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "exhale" | "hold">(
    "inhale"
  );
  const [timer, setTimer] = useState(4);
  const [fireflies, setFireflies] = useState(generateFireflies(70)); // Increased to 70 fireflies

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isBreathing) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            setBreathPhase((prevPhase) => {
              switch (prevPhase) {
                case "inhale":
                  return "hold";
                case "hold":
                  return "exhale";
                case "exhale":
                  return "inhale";
              }
            });
            return breathPhase === "hold" ? 7 : 4;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isBreathing, breathPhase]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
    if (!isBreathing) {
      setBreathPhase("inhale");
      setTimer(4);
    }
  };

  const resetBreathing = () => {
    setIsBreathing(false);
    setBreathPhase("inhale");
    setTimer(4);
  };

  const getFireflyStyle = (firefly: FireflyProps) => {
    // Calculate new positions based on the breathing phase
    const offsetX =
      breathPhase === "inhale"
        ? firefly.x + Math.random() * 30 - 15
        : firefly.x;
    const offsetY =
      breathPhase === "inhale"
        ? firefly.y + Math.random() * 30 - 15
        : firefly.y;

    const transformScale =
      breathPhase === "inhale"
        ? "translate(-50%, -50%) scale(1.5)"
        : breathPhase === "exhale"
        ? "translate(-50%, -50%) scale(0.8)"
        : "translate(-50%, -50%) scale(1)";

    const brightness = breathPhase === "inhale" ? 1.8 : 1;

    return {
      position: "absolute",
      left: `${offsetX}%`,
      top: `${offsetY}%`,
      width: `${firefly.size}px`,
      height: `${firefly.size}px`,
      backgroundColor: firefly.color,
      opacity: firefly.opacity,
      borderRadius: "50%",
      filter: `brightness(${brightness})`,
      transform: transformScale,
      transition:
        "transform 2s ease-out, filter 2s ease-out, left 2s ease-out, top 2s ease-out",
    };
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-b from-blue-200 to-green-200 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-inter font-bold text-blue-700 mb-6">
        Breathe & Bloom
      </h2>

      {/* Fireflies Animation */}
      <div className="relative w-80 h-80 mx-auto mb-8 overflow-hidden">
        {fireflies.map((firefly) => (
          <div key={firefly.id} style={getFireflyStyle(firefly)}></div>
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-5xl font-bold text-white">{timer}</p>
        </div>
      </div>

      {/* Breathing Phase Indicator */}
      <p className="text-2xl font-inter text-blue-900 mb-6">
        {breathPhase === "inhale"
          ? "Inhale deeply..."
          : breathPhase === "hold"
          ? "Hold your breath..."
          : "Exhale slowly..."}
      </p>

      {/* Control Buttons */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleBreathing}
          className="flex items-center justify-center py-2 px-5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-inter"
        >
          {isBreathing ? (
            <Pause className="w-5 h-5 mr-2" />
          ) : (
            <Play className="w-5 h-5 mr-2" />
          )}
          {isBreathing ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetBreathing}
          className="flex items-center justify-center py-2 px-5 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors font-inter"
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
};

export default BreatheAndBloom;
