import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreatheAndBloom from "@/components/breathe-bloom";
import ChatbotPage from "@/components/chatbot-page";
import { CommunityForumPageComponent } from "@/components/community-forum-page";
import { EducationalResourcesComponent } from "@/components/educational-resources";
import { HomePageComponent } from "@/components/home-page";
import { JournalingFeatureComponent } from "@/components/journaling-feature";
import MindMaze from "@/components/mind-maze";
import { MiniGamesPageComponent } from "@/components/mini-games-page";
import { NotFoundPageComponent } from "@/components/not-found-page";
import PiecefulSlidingPuzzle from "@/components/jigsaw";
import PositivePop from "@/components/positive-pop";
import { SelfAssessmentPageComponent } from "@/components/self-assessment-page";
import { UserDashboardComponent } from "@/components/user-dashboard";
import { ZenModeComponent } from "@/components/zen-mode";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePageComponent />} />
        <Route path="/chat" element={<ChatbotPage />} />
        <Route path="/home" element={<UserDashboardComponent />} />
        <Route path="/community" element={<CommunityForumPageComponent />} />
        <Route path="/resources" element={<EducationalResourcesComponent />} />
        <Route path="/journal" element={<JournalingFeatureComponent />} />
        <Route path="/games" element={<MiniGamesPageComponent />} />
        <Route path="/assessment" element={<SelfAssessmentPageComponent />} />
        <Route path="/zen" element={<ZenModeComponent />} />
        <Route path="/games/breathe-bloom" element={<BreatheAndBloom />} />
        <Route path="/games/jigsaw" element={<PiecefulSlidingPuzzle />} />
        <Route path="/games/mind-maze" element={<MindMaze />} />
        <Route path="/games/positive-pop" element={<PositivePop />} />
        <Route path="*" element={<NotFoundPageComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
