import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookOpen, PenLine, ChevronRight } from "lucide-react";

const EMOTION_COLORS = ["#FF6B6B", "#4D96FF", "#9B59B6", "#48C9B0", "#F39C12"];

export function JournalingFeatureComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pastEntries, setPastEntries] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [insight, setInsight] = useState("");

  useEffect(() => {
    fetchPastEntries();
  }, []);

  const fetchPastEntries = async () => {
    try {
      const response = await fetch("http://localhost:8000/entries");
      const data = await response.json();
      setPastEntries(
        data.map((entry) => ({
          date: new Date(entry.created_at).toISOString().split("T")[0],
          title: entry.title,
        }))
      );
    } catch (error) {
      console.error("Error fetching past entries:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const emotionResponse = await fetch(
        "http://localhost:8000/emotion-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body: entry }),
        }
      );
      const emotionData = await emotionResponse.json();
      setEmotionData(
        emotionData.map((emotion, index) => ({
          name: emotion.label,
          value: Math.round(emotion.score * 100),
          color: EMOTION_COLORS[index % EMOTION_COLORS.length],
        }))
      );

      const insightResponse = await fetch(
        "http://localhost:8001/entry-insights",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: entry }),
        }
      );
      const insightData = await insightResponse.json();
      setInsight(insightData);
      setIsModalOpen(true);

      // Refresh the past entries
      fetchPastEntries();

      // Clear the form
      setTitle("");
      setEntry("");
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Nirvana: Journaling
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 flex items-center">
              <PenLine className="mr-2" />
              New Journal Entry
            </CardTitle>
            <CardDescription>
              Express your thoughts and feelings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-blue-600">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Give your entry a title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="entry" className="text-blue-600">
                    Your thoughts
                  </Label>
                  <Textarea
                    id="entry"
                    value={entry}
                    onChange={(e) => setEntry(e.target.value)}
                    placeholder="Write about your day..."
                    className="mt-1 h-40"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white"
              >
                Save Entry
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 flex items-center">
              <BookOpen className="mr-2" />
              Past Entries
            </CardTitle>
            <CardDescription>Review your journey</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] w-full rounded-md border border-neutral-200 p-4 dark:border-neutral-800">
              {pastEntries.map((entry, index) => (
                <div key={index} className="mb-4 last:mb-0">
                  <p className="text-sm text-blue-500">{entry.date}</p>
                  <p className="text-lg font-semibold text-blue-700">
                    {entry.title}
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-green-500 hover:text-green-600"
                  >
                    Read more <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white max-w-5xl w-11/12">
          <DialogHeader>
            <DialogTitle className="text-2xl text-blue-700">
              Entry Summary
            </DialogTitle>
            <DialogDescription>
              Here's an analysis of your recent journal entry
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[400px]">
            <Card className="bg-lilac-100">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-700">{insight}</p>
              </CardContent>
            </Card>
            <Card className="bg-pink-100">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  Emotion Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {emotionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
