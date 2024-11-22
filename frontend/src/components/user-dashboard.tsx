import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Users,
  BookOpen,
  PenTool,
  Gamepad2,
  ClipboardCheck,
  Leaf,
} from "lucide-react";

const pages = [
  {
    name: "Chatbot",
    path: "/chat",
    icon: <MessageCircle className="h-6 w-6" />,
    description: "Talk to our AI assistant for support and guidance.",
  },
  {
    name: "Community Forum",
    path: "/community",
    icon: <Users className="h-6 w-6" />,
    description: "Connect with others and share your experiences.",
  },
  {
    name: "Educational Resources",
    path: "/resources",
    icon: <BookOpen className="h-6 w-6" />,
    description: "Learn more about anger management and emotional well-being.",
  },
  {
    name: "Journaling",
    path: "/journal",
    icon: <PenTool className="h-6 w-6" />,
    description: "Record your thoughts and track progress.",
  },
  {
    name: "Mini Games",
    path: "/games",
    icon: <Gamepad2 className="h-6 w-6" />,
    description: "Play games designed to help manage stress and anger.",
  },
  {
    name: "Self Assessment",
    path: "/assessment",
    icon: <ClipboardCheck className="h-6 w-6" />,
    description:
      "Evaluate your current emotional state and track improvements.",
  },
  {
    name: "Zen Mode",
    path: "/zen",
    icon: <Leaf className="h-6 w-6" />,
    description: "Relax and unwind with calming exercises meditations.",
  },
];

const motivationalQuotes = [
  "The greatest glory in living lies not never falling, but rising every time we fall. - Nelson Mandela",
  "The way to get started is quit talking and begin doing. - Walt Disney",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "If life were predictable it would cease to be life, and without flavor. - Eleanor Roosevelt",
  "If you look at what have in life, you'll always more. - Oprah Winfrey",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "Spread love everywhere you go. Let no one ever come to without leaving happier. - Mother Teresa",
];

export function UserDashboardComponent() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(
      motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]
    );
  }, []);

  return (
    <div className="w-full bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="w-full px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
          Welcome to Nirvana, Devansh
        </h1>

        <Card className="mb-8 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-blue-600">Daily Inspiration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic text-center text-gray-700">{quote}</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pages.map((page) => (
            <Card
              key={page.name}
              className="flex flex-col h-full bg-white shadow-md"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-blue-600">
                  {React.cloneElement(page.icon, {
                    className: "h-6 w-6 text-blue-500",
                  })}
                  <span>{page.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {page.description}
                </CardDescription>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  asChild
                  className="w-full bg-green-500 text-white hover:bg-green-600"
                >
                  <Link to={page.path}>Go to {page.name}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
