import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Wind,
  Activity,
  Brain,
  Smile,
  Zap,
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react";

const exercises = [
  {
    id: "breathing",
    title: "Breathing Exercise",
    description: "Follow the circle to regulate your breathing",
    icon: Wind,
  },
  {
    id: "bodyScan",
    title: "Body Scan",
    description: "Increase awareness of your body and release tension",
    icon: Activity,
  },
  {
    id: "thoughtObservation",
    title: "Thought Observation",
    description: "Observe your thoughts without judgment",
    icon: Brain,
  },
  {
    id: "gratitude",
    title: "Gratitude Practice",
    description: "Focus on things you're thankful for",
    icon: Smile,
  },
  {
    id: "quickCalm",
    title: "Quick Calm",
    description: "2-minute exercise to reduce stress quickly",
    icon: Zap,
  },
  {
    id: "guidedMeditation",
    title: "Guided Meditation",
    description: "Listen to calming guided sessions",
    icon: Headphones,
  },
];

const guidedSessions = [
  {
    id: "1",
    title: "Calm Mind Meditation",
    audio: "https://freesound.org/data/previews/448/448573_9311684-lq.mp3",
  },
  { id: "2", title: "Stress Relief Breathing", audio: "'/placeholder.mp3'" },
  { id: "3", title: "Peaceful Visualization", audio: "'/placeholder.mp3'" },
];

export function ZenModeComponent() {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathingDuration, setBreathingDuration] = useState(4);
  const [gratitudeItems, setGratitudeItems] = useState(["", "", ""]);
  const [currentThought, setCurrentThought] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSession, setCurrentSession] = useState(guidedSessions[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isBreathing) {
      interval = setInterval(() => {
        setIsBreathing((prev) => !prev);
      }, breathingDuration * 1000);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathingDuration]);

  const toggleBreathing = () => setIsBreathing((prev) => !prev);

  const handleGratitudeChange = (index: number, value: string) => {
    const newItems = [...gratitudeItems];
    newItems[index] = value;
    setGratitudeItems(newItems);
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const renderExerciseContent = (exerciseId: string) => {
    switch (exerciseId) {
      case "breathing":
        return (
          <div className="flex flex-col items-center">
            <div
              className={`w-48 h-48 rounded-full border-4 border-green-500 flex items-center justify-center transition-all duration-1000 ease-in-out ${
                isBreathing ? "scale-150 bg-green-100" : "scale-100 bg-white"
              }`}
            >
              <span className="text-blue-600 text-lg font-semibold">
                {isBreathing ? "Exhale" : "Inhale"}
              </span>
            </div>
            <div className="mt-8 space-y-4 w-full max-w-xs">
              <div className="flex justify-between items-center">
                <span className="text-blue-600">Breathing Duration:</span>
                <span className="text-blue-700 font-semibold">
                  {breathingDuration}s
                </span>
              </div>
              <Slider
                value={[breathingDuration]}
                onValueChange={(value) => setBreathingDuration(value[0])}
                max={10}
                min={2}
                step={1}
              />
              <Button
                onClick={toggleBreathing}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                {isBreathing ? "Stop" : "Start"} Breathing Exercise
              </Button>
            </div>
          </div>
        );
      case "bodyScan":
        return (
          <div className="space-y-4">
            <p className="text-blue-700">
              Follow these steps for a relaxing body scan:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-600">
              <li>Find a comfortable position, sitting or lying down.</li>
              <li>Close your eyes and take a few deep breaths.</li>
              <li>
                Starting from your toes, focus your attention on each part of
                your body.
              </li>
              <li>Notice any sensations without trying to change them.</li>
              <li>
                Slowly move your attention up through your body to the top of
                your head.
              </li>
              <li>
                Take a final deep breath and open your eyes when you're ready.
              </li>
            </ol>
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
              Start Guided Body Scan
            </Button>
          </div>
        );
      case "thoughtObservation":
        return (
          <div className="space-y-4">
            <p className="text-blue-700">
              Practice observing your thoughts without judgment:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-600">
              <li>Sit comfortably and close your eyes.</li>
              <li>Imagine your thoughts as clouds passing in the sky.</li>
              <li>As thoughts arise, acknowledge them without engaging.</li>
              <li>
                Let each thought drift away, returning your focus to your
                breath.
              </li>
              <li>
                If you get caught up in a thought, gently redirect your
                attention.
              </li>
              <li>Continue this practice for 5-10 minutes.</li>
            </ol>
            <div className="mt-4">
              <Label htmlFor="current-thought" className="text-blue-600">
                Current Thought:
              </Label>
              <Input
                id="current-thought"
                value={currentThought}
                onChange={(e) => setCurrentThought(e.target.value)}
                placeholder="Type your current thought here"
                className="mt-2"
              />
              <Button
                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setCurrentThought("")}
              >
                Let It Go
              </Button>
            </div>
          </div>
        );
      case "gratitude":
        return (
          <div className="space-y-4">
            <p className="text-blue-700">
              Cultivate gratitude with this simple exercise:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-600">
              <li>Take a few deep breaths to center yourself.</li>
              <li>Think of three things you're grateful for today.</li>
              <li>
                For each item, spend a moment really feeling the gratitude.
              </li>
              <li>Consider why you're grateful for these things.</li>
              <li>Notice how focusing on gratitude affects your mood.</li>
            </ol>
            <div className="mt-4 space-y-2">
              {gratitudeItems.map((item, index) => (
                <div key={index}>
                  <Label
                    htmlFor={`gratitude-${index}`}
                    className="text-blue-600"
                  >
                    I'm grateful for:
                  </Label>
                  <Input
                    id={`gratitude-${index}`}
                    value={item}
                    onChange={(e) =>
                      handleGratitudeChange(index, e.target.value)
                    }
                    placeholder={`Gratitude item ${index + 1}`}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case "quickCalm":
        return (
          <div className="space-y-4">
            <p className="text-blue-700">
              Use this 2-minute exercise to quickly reduce stress:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-blue-600">
              <li>Sit or stand comfortably and close your eyes.</li>
              <li>Take a deep breath in through your nose for 4 counts.</li>
              <li>Hold your breath for 4 counts.</li>
              <li>Exhale slowly through your mouth for 6 counts.</li>
              <li>Repeat this breathing pattern 4 times.</li>
              <li>Open your eyes and notice how you feel.</li>
            </ol>
            <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white">
              Start 2-Minute Quick Calm
            </Button>
          </div>
        );
      case "guidedMeditation":
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-blue-700 font-semibold">
                {currentSession.title}
              </span>
              <select
                value={currentSession.id}
                onChange={(e) =>
                  setCurrentSession(
                    guidedSessions.find((s) => s.id === e.target.value) ||
                      guidedSessions[0]
                  )
                }
                className="border rounded p-1"
              >
                {guidedSessions.map((session) => (
                  <option key={session.id} value={session.id}>
                    {session.title}
                  </option>
                ))}
              </select>
            </div>
            <audio
              ref={audioRef}
              src={currentSession.audio}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="bg-lilac-100 p-4 rounded-md">
              <div className="flex justify-between items-center text-blue-600 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <Slider
                value={[currentTime]}
                onValueChange={handleSeek}
                max={duration}
                step={1}
              />
            </div>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="icon">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handlePlayPause}>
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" size="icon">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Nirvana: Zen Mode
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {exercises.map((exercise) => (
          <Dialog key={exercise.id}>
            <DialogTrigger asChild>
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 flex items-center">
                    <exercise.icon className="mr-2" />
                    {exercise.title}
                  </CardTitle>
                  <CardDescription>{exercise.description}</CardDescription>
                </CardHeader>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-2xl text-blue-700 flex items-center">
                  <exercise.icon className="mr-2" />
                  {exercise.title}
                </DialogTitle>
                <DialogDescription>{exercise.description}</DialogDescription>
              </DialogHeader>
              {renderExerciseContent(exercise.id)}
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
