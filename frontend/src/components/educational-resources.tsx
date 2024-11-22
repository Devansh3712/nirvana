import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText } from "lucide-react";

interface ArticleProps {
  title: string;
  summary: string;
  link: string;
  type: "article";
}

interface VideoProps {
  title: string;
  embedId: string;
  type: "video";
}

interface InfographicProps {
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
  type: "infographic";
}

// const articles: ArticleProps[] = [
//   {
//     title: "Understanding Anger: Causes and Effects",
//     summary:
//       "Explore the root causes of anger and its impact on mental physical health.",
//     link: "#",
//     type: "article",
//   },
//   {
//     title: "5 Effective Techniques for Managing Anger",
//     summary:
//       "Learn practical strategies to control and channel anger in positive ways.",
//     link: "#",
//     type: "article",
//   },
//   {
//     title: "The Role of Mindfulness in Anger Management",
//     summary:
//       "Discover how mindfulness practices can help in regulating emotions and reducing anger.",
//     link: "#",
//     type: "article",
//   },
//   {
//     title: "Anger Management for Teens: A Parent's Guide",
//     summary:
//       "Tips for parents to help their teenagers cope with anger and emotional challenges.",
//     link: "#",
//     type: "article",
//   },
// ];

const articles: ArticleProps[] = [
  {
    title: "Understanding Anger: Causes and Effects",
    summary:
      "Explore the root causes of anger and its impact on mental physical health.",
    link: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/in-depth/anger-management/art-20045434",
    type: "article",
  },
  {
    title: "5 Effective Techniques for Managing Anger",
    summary:
      "Learn practical strategies to control and channel anger in positive ways.",
    link: "https://www.healthline.com/health/anger-management-techniques",
    type: "article",
  },
  {
    title: "The Role of Mindfulness in Anger Management",
    summary:
      "Discover how mindfulness practices can help in regulating emotions and reducing anger.",
    link: "https://www.mindful.org/mindfulness-for-anger-management/",
    type: "article",
  },
  {
    title: "Anger Management for Teens: A Parent's Guide",
    summary:
      "Tips for parents to help their teenagers cope with anger and emotional challenges.",
    link: "https://www.verywellfamily.com/help-your-teen-manage-anger-4171893",
    type: "article",
  },
];

const videos: VideoProps[] = [
  {
    title: "Anger Management Techniques",
    embedId: "BsVq5R_F6RA",
    type: "video",
  },
  {
    title: "How to Process Anger",
    embedId: "Yh1-y3TzSO4",
    type: "video",
  },
];

const infographics: InfographicProps[] = [
  {
    title: "The Anger Iceberg",
    summary: "Visualize the hidden emotions beneath anger.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "#",
    type: "infographic",
  },
  {
    title: "10 Steps to Cool Down",
    summary: "Quick tips for managing anger in the moment.",
    imageUrl: "/placeholder.svg?height=300&width=400",
    link: "#",
    type: "infographic",
  },
];

export function EducationalResourcesComponent() {
  return (
    <div className="min-h-screen bg-blue-50 p-8 font-sans">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Educational Resources
      </h1>
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 rounded-xl bg-blue-100">
          <TabsTrigger
            value="all"
            className="rounded-xl data-[state=active]:bg-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="articles"
            className="rounded-xl data-[state=active]:bg-white"
          >
            Articles
          </TabsTrigger>
          <TabsTrigger
            value="videos"
            className="rounded-xl data-[state=active]:bg-white"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            value="infographics"
            className="rounded-xl data-[state=active]:bg-white"
          >
            Infographics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ResourceGrid resources={[...articles, ...videos, ...infographics]} />
        </TabsContent>
        <TabsContent value="articles">
          <ResourceGrid resources={articles} />
        </TabsContent>
        <TabsContent value="videos">
          <ResourceGrid resources={videos} />
        </TabsContent>
        <TabsContent value="infographics">
          <ResourceGrid resources={infographics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ResourceGrid({ resources }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {resources.map((resource, index) => (
        <ResourceCard key={index} resource={resource} />
      ))}
    </div>
  );
}

function ResourceCard({ resource }) {
  const { title, summary, link, type, embedId, imageUrl } = resource;

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-xl text-blue-700 flex items-center">
          {type === "article" && <BookOpen className="mr-2 h-5 w-5" />}
          {type === "video" && <Video className="mr-2 h-5 w-5" />}
          {type === "infographic" && <FileText className="mr-2 h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        {type === "video" && (
          <div className="aspect-w-16 aspect-h-9 mb-4">
            <iframe
              src={`https://www.youtube.com/embed/${embedId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-md"
            />
          </div>
        )}
        {type === "infographic" && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto mb-4 rounded-md"
          />
        )}
        {summary && <CardDescription>{summary}</CardDescription>}
      </CardContent>
      <CardFooter>
        <Button
          asChild
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            {type === "video" ? "Watch on YouTube" : "Read More"}
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
