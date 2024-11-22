import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ThumbsUp, MessageCircle, Send } from "lucide-react";

interface Comment {
  id: number;
  author: string;
  content: string;
  likes: number;
  timestamp: string;
}

interface Post {
  id: number;
  author: string;
  content: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
}

// fetch posts and comments from the backend API
// for fetching posts:
// endpoint: http://localhost:8000/forum/posts
// response body: [{"id": <post id>, "author": <post author>, "content": <post content>, "likes": <number of likes>, "created_at": <post created at>}, ...]
// for fetching comments of a post:
// endpoint: http://localhost:8000/forum/comments/<post id>
// response body: [{"post_id": <post id>, "id": <comment id>, "author": <post author>, "content": <post content>, "likes": <number of likes>, "created_at": <post created at>}, ...]
const initialPosts: Post[] = [
  {
    id: 1,
    author: "Alex Johnson",
    content:
      "Just had a breakthrough in managing my anger! Meditation really helps. Anyone else tried it?",
    likes: 15,
    comments: [
      {
        id: 1,
        author: "Sarah Lee",
        content:
          "That's great! I've been meditating for a month now and it's made huge difference.",
        likes: 3,
        timestamp: "2 hours ago",
      },
      {
        id: 2,
        author: "Mike Brown",
        content: "How long do you meditate each day? I'm thinking of starting.",
        likes: 1,
        timestamp: "1 hour ago",
      },
    ],
    timestamp: "3 hours ago",
  },
  {
    id: 2,
    author: "Emily Chen",
    content:
      "Feeling overwhelmed with school and family expectations. Any tips on how to communicate my feelings without exploding?",
    likes: 8,
    comments: [
      {
        id: 3,
        author: "David Kim",
        content:
          "I've found that writing my feelings down before discussing them helps me organize thoughts.",
        likes: 4,
        timestamp: "30 minutes ago",
      },
    ],
    timestamp: "4 hours ago",
  },
];

export function CommunityForumPageComponent() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");

  const handleCreatePost = () => {
    if (newPostContent.trim() === "") return;

    const newPost: Post = {
      id: posts.length + 1,
      author: "Current User",
      content: newPostContent,
      likes: 0,
      comments: [],
      timestamp: "Just now",
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLikePost = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleLikeComment = (postId: number, commentId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, likes: comment.likes + 1 }
                  : comment
              ),
            }
          : post
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Nirvana Community Forum
        </h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts or experiences..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreatePost}>Post</Button>
          </CardFooter>
        </Card>

        <ScrollArea className="h-[600px]">
          {posts.map((post) => (
            <Card key={post.id} className="mb-6">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{post.author}</CardTitle>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" onClick={() => handleLikePost(post.id)}>
                  <ThumbsUp className="mr-2 h-4 w-4" /> {post.likes} Likes
                </Button>
                <Button variant="ghost">
                  <MessageCircle className="mr-2 h-4 w-4" />{" "}
                  {post.comments.length} Comments
                </Button>
              </CardFooter>

              <Separator className="my-4" />

              <CardContent>
                <h3 className="font-semibold mb-4">Comments</h3>
                {post.comments.map((comment) => (
                  <div key={comment.id} className="mb-4">
                    <div className="flex items-center space-x-2 mb-1">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="ml-8 mb-2">{comment.content}</p>
                    <div className="ml-8">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeComment(post.id, comment.id)}
                      >
                        <ThumbsUp className="mr-1 h-3 w-3" /> {comment.likes}{" "}
                        Likes
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex items-center space-x-2 mt-4">
                  <Input placeholder="Add a comment..." className="flex-grow" />
                  <Button size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
