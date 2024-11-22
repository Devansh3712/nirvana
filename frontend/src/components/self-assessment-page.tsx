import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Question {
  id: string;
  text: string;
  reverse: boolean;
}

interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

interface AssessmentCardProps {
  assessment: Assessment;
}

function AssessmentCard({ assessment }: AssessmentCardProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const totalScore = assessment.questions.reduce((acc, question) => {
      const answer = parseInt(answers[question.id] || "'0'");
      return acc + (question.reverse ? 6 - answer : answer);
    }, 0);
    setScore(totalScore);
  };

  const handleReset = () => {
    setAnswers({});
    setScore(null);
  };

  const progress =
    (Object.keys(answers).length / assessment.questions.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {assessment.title}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CardTitle>
        <CardDescription>{assessment.description}</CardDescription>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          <Progress value={progress} className="mb-4" />
          <ScrollArea className="h-[400px] pr-4">
            <form onSubmit={handleSubmit}>
              {assessment.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <p className="mb-2">{question.text}</p>
                  <RadioGroup
                    value={answers[question.id] || ""}
                    onValueChange={(value) =>
                      setAnswers((prev) => ({ ...prev, [question.id]: value }))
                    }
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`${question.id}-${value}`}
                        />
                        <Label htmlFor={`${question.id}-${value}`}>
                          {value === 1
                            ? "Strongly Disagree"
                            : value === 2
                            ? "Disagree"
                            : value === 3
                            ? "Neutral"
                            : value === 4
                            ? "Agree"
                            : "Strongly Agree"}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
            </form>
          </ScrollArea>
        </CardContent>
      )}
      {isExpanded && (
        <CardFooter className="flex justify-between">
          <Button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
            }}
          >
            Submit
          </Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      )}
      {score !== null && (
        <CardContent>
          <p className="font-bold text-lg">Your Score: {score}</p>
          <p className="text-sm text-gray-600 mt-2">
            This score is a general indication. For a more comprehensive
            understanding, please consult with a mental health professional.
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export function SelfAssessmentPageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-800 mb-8 text-center">
          Self-Assessment
        </h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
          Complete these questionnaires to gain insights into your anger and
          aggression levels. Remember, this is a tool for self-reflection and
          not a clinical diagnosis.
        </p>
        <div className="space-y-6">
          {assessments.map((assessment) => (
            <AssessmentCard key={assessment.id} assessment={assessment} />
          ))}
        </div>
      </div>
    </div>
  );
}

const assessments: Assessment[] = [
  {
    id: "buss-perry",
    title: "Buss-Perry Aggression Questionnaire",
    description: "Measures physical aggression, verbal anger, and hostility.",
    questions: [
      {
        id: "'bp1'",
        text: "I sometimes find it hard to control my temper.",
        reverse: false,
      },
      {
        id: "'bp2'",
        text: "I tell my friends openly when I disagree with them.",
        reverse: false,
      },
      {
        id: "'bp3'",
        text: "I flare up quickly but get over it quickly.",
        reverse: false,
      },
      {
        id: "'bp4'",
        text: "I am sometimes eaten up with jealousy.",
        reverse: false,
      },
      {
        id: "'bp5'",
        text: "Given enough provocation, I may hit another person.",
        reverse: false,
      },
      {
        id: "'bp6'",
        text: "I often find myself disagreeing with people.",
        reverse: false,
      },
      {
        id: "'bp7'",
        text: "When frustrated, I let my irritation show.",
        reverse: false,
      },
      {
        id: "'bp8'",
        text: "At times I feel have gotten a raw deal out of life.",
        reverse: false,
      },
      { id: "'bp9'", text: "If somebody hits me, I hit back.", reverse: false },
      {
        id: "'bp10'",
        text: "When people annoy me, I may tell them what think of them.",
        reverse: false,
      },
      {
        id: "'bp11'",
        text: "I sometimes feel like a powder keg ready to explode.",
        reverse: false,
      },
      {
        id: "'bp12'",
        text: "Other people always seem to get the breaks.",
        reverse: false,
      },
      {
        id: "'bp13'",
        text: "I get into fights a little more than the average person.'",
        reverse: false,
      },
      {
        id: "'bp14'",
        text: "I can't help getting into arguments when people disagree with me.",
        reverse: false,
      },
      { id: "'bp15'", text: "I am an even-tempered person.", reverse: true },
      {
        id: "'bp16'",
        text: "I wonder why sometimes I feel so bitter about things.",
        reverse: false,
      },
      {
        id: "'bp17'",
        text: "If I have to resort violence protect my rights, will.",
        reverse: false,
      },
      {
        id: "'bp18'",
        text: "My friends say that I'm somewhat argumentative.",
        reverse: false,
      },
      {
        id: "'bp19'",
        text: "Some of my friends think I'm a hothead.",
        reverse: false,
      },
      {
        id: "'bp20'",
        text: "I know that friends talk about me behind my back.",
        reverse: false,
      },
      {
        id: "'bp21'",
        text: "There are people who pushed me so far that we came to blows.",
        reverse: false,
      },
      {
        id: "'bp22'",
        text: "Sometimes I fly off the handle for no good reason.",
        reverse: false,
      },
      {
        id: "'bp23'",
        text: "I am suspicious of overly friendly strangers.",
        reverse: false,
      },
      {
        id: "'bp24'",
        text: "I can think of no good reason for ever hitting a person.",
        reverse: true,
      },
      {
        id: "'bp25'",
        text: "I have trouble controlling my temper.",
        reverse: false,
      },
      {
        id: "'bp26'",
        text: "I sometimes feel that people are laughing at me behind my back.",
        reverse: false,
      },
      {
        id: "'bp27'",
        text: "I have threatened people I know.",
        reverse: false,
      },
      {
        id: "'bp28'",
        text: "When people are especially nice, I wonder what they want.",
        reverse: false,
      },
      {
        id: "'bp29'",
        text: "I have become so mad that I broken things.",
        reverse: false,
      },
    ],
  },
  {
    id: "buss-durkee",
    title: "Buss-Durkee Hostility Inventory",
    description: "Assesses various aspects of hostility and aggression.",
    questions: [
      {
        id: "'bd1'",
        text: "I rarely strike back, even if someone hits me first.",
        reverse: true,
      },
      {
        id: "'bd2'",
        text: "I sometimes spread gossip about people I don't like.",
        reverse: false,
      },
      {
        id: "'bd3'",
        text: "Unless somebody asks me in a nice way, I won't do what they want.",
        reverse: false,
      },
      {
        id: "'bd4'",
        text: "I lose my temper easily but get over it quickly.",
        reverse: false,
      },
      {
        id: "'bd5'",
        text: "I don't seem to get what's coming to me.",
        reverse: false,
      },
      {
        id: "'bd6'",
        text: "I know that people tend to talk about me behind my back.",
        reverse: false,
      },
      {
        id: "'bd7'",
        text: "When I disapprove of my friends' behavior, I let them know it.",
        reverse: false,
      },
      {
        id: "'bd8'",
        text: "The few times I have cheated, suffered unbearable feelings of remorse.",
        reverse: false,
      },
      {
        id: "'bd9'",
        text: "Once in a while I cannot control my urge to harm others.",
        reverse: false,
      },
      {
        id: "'bd10'",
        text: "I never get mad enough to throw things.",
        reverse: true,
      },
      {
        id: "'bd11'",
        text: "Sometimes people bother me just by being around.",
        reverse: false,
      },
      {
        id: "'bd12'",
        text: "When someone makes a rule I don't like, I am tempted to break it.",
        reverse: false,
      },
      {
        id: "'bd13'",
        text: "Other people always seem to get the breaks.",
        reverse: false,
      },
      {
        id: "'bd14'",
        text: "I tend to be on my guard with people who are somewhat more friendly than I expected.",
        reverse: false,
      },
      {
        id: "'bd15'",
        text: "I often find myself disagreeing with people.",
        reverse: false,
      },
      {
        id: "'bd16'",
        text: "I sometimes have bad thoughts which make me feel ashamed of myself.",
        reverse: false,
      },
      {
        id: "'bd17'",
        text: "I can think of no good reason for ever hitting anyone.",
        reverse: true,
      },
      {
        id: "'bd18'",
        text: "When I am angry, sometimes sulk.",
        reverse: false,
      },
      {
        id: "'bd19'",
        text: "When someone is bossy, I do the opposite of what he asks.",
        reverse: false,
      },
      {
        id: "'bd20'",
        text: "I am irritated a great deal more than people are aware of.",
        reverse: false,
      },
    ],
  },
  {
    id: "anger-self-report",
    title: "Anger Self-Report Questionnaire",
    description:
      "Evaluates your personal experiences and expressions of anger.",
    questions: [
      { id: "'asr1'", text: "I am quick tempered.", reverse: false },
      { id: "'asr2'", text: "I have a fiery temper.", reverse: false },
      { id: "'asr3'", text: "I am a hotheaded person.", reverse: false },
      {
        id: "'asr4'",
        text: "I get angry when I'm slowed down by others' mistakes.",
        reverse: false,
      },
      {
        id: "'asr5'",
        text: "I feel annoyed when I am not given recognition for doing good work.",
        reverse: false,
      },
      { id: "'asr6'", text: "I fly off the handle easily.", reverse: false },
      {
        id: "'asr7'",
        text: "When I get mad, say nasty things.",
        reverse: false,
      },
      {
        id: "'asr8'",
        text: "It makes me furious when I am criticized in front of others.",
        reverse: false,
      },
      {
        id: "'asr9'",
        text: "When I get frustrated, feel like hitting someone.",
        reverse: false,
      },
      {
        id: "'asr10'",
        text: "I feel infuriated when I do a good job and get poor evaluation.",
        reverse: false,
      },
      {
        id: "'asr11'",
        text: "I get angry quickly but over it quickly.",
        reverse: false,
      },
      {
        id: "'asr12'",
        text: "When frustrated, I let my irritation show.",
        reverse: false,
      },
      {
        id: "'asr13'",
        text: "I sometimes feel like a powder keg ready to explode.",
        reverse: false,
      },
      { id: "'asr14'", text: "I am an even-tempered person.", reverse: true },
      {
        id: "'asr15'",
        text: "Some of my friends think I'm a hothead.",
        reverse: false,
      },
    ],
  },
];
