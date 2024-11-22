import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function WhackAMole() {
  const [score, setScore] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smash-yxDoMDKLjlCPiEZuNt0FA5I1Ogqn5E.mp3"
    );

    const runGame = () => {
      if (boardRef.current) {
        const holes = Array.from(boardRef.current.querySelectorAll(".hole"));
        const i = Math.floor(Math.random() * holes.length);
        const hole = holes[i] as HTMLDivElement;
        let timer: NodeJS.Timeout | null = null;

        const img = document.createElement("img");
        img.classList.add(
          "absolute",
          "left-1/2",
          "bottom-0",
          "w-[70%]",
          "-translate-x-1/2",
          "select-none",
          "pointer-events-auto",
          "z-10"
        );
        img.style.animation = "rise 0.3s ease-out";
        img.src =
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mole-hqsEaZXq6j7ayWRTT7BJaarhjvZ7eP.png";
        img.alt = "Mole";

        const handleClick = () => {
          setScore((prevScore) => prevScore + 10);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          }
          img.src =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mole-whacked-Ph4Es35b0jhO8LXOYfLTMpAVKg1KKK.png";
          if (timer) clearTimeout(timer);
          setTimeout(() => {
            if (hole.contains(img)) {
              hole.removeChild(img);
            }
            runGame();
          }, 500);
        };

        img.addEventListener("click", handleClick);
        hole.appendChild(img);

        timer = setTimeout(() => {
          if (hole.contains(img)) {
            hole.removeChild(img);
          }
          runGame();
        }, 1500);
      }
    };

    runGame();

    const handleMouseMove = (e: MouseEvent) => {
      if (boardRef.current) {
        const rect = boardRef.current.getBoundingClientRect();
        setCursorPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const board = boardRef.current;
    if (board) {
      board.addEventListener("mousemove", handleMouseMove);
      board.addEventListener("mousedown", handleMouseDown);
      board.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      if (board) {
        board.removeEventListener("mousemove", handleMouseMove);
        board.removeEventListener("mousedown", handleMouseDown);
        board.removeEventListener("mouseup", handleMouseUp);
      }
    };
  }, []);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-blue-600">
          Whack-A-Thought
        </CardTitle>
        <CardDescription className="text-center text-gray-600">
          Whack the moles to release stress and improve your focus!
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-8">
        <div className="text-3xl mb-6 font-bold text-green-600">
          SCORE: <span>{score.toString().padStart(2, "0")}</span>
        </div>
        <div className="relative w-full max-w-[500px] aspect-square">
          <div
            ref={boardRef}
            className="w-full h-full grid grid-cols-3 grid-rows-3 gap-8 bg-green-100 p-6 rounded-xl"
          >
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="hole relative bg-amber-800 rounded-full shadow-[inset_0_10px_0_7px_rgb(53,21,6),inset_0_20px_20px_15px_rgba(0,0,0,0.3),0_0_5px_rgba(0,0,0,0.5)] overflow-hidden"
              />
            ))}
          </div>
          <div
            className={`absolute w-[100px] h-[110px] pointer-events-none z-20 transition-transform duration-100 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hammer-tKhJ8FNB1L2vQ4Eiya2vaxdzBdW9A8.png')] bg-contain bg-no-repeat ${
              isActive ? "rotate-[-45deg]" : ""
            }`}
            style={{
              top: `${cursorPosition.y}px`,
              left: `${cursorPosition.x}px`,
              transform: "translate(-20%, -20%)",
            }}
          />
        </div>
        <p className="mt-6 text-sm text-center text-gray-600">
          This game is a metaphor for managing intrusive thoughts. Stay calm and
          focused!
        </p>
        <Sparkles className="mt-2 text-pink-300 w-6 h-6 animate-pulse" />
      </CardContent>
    </Card>
  );
}
