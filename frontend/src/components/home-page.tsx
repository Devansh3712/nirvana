import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HeartHandshake,
  Brain,
  Users,
  ArrowRight,
  BarChart3,
  Headphones,
  BookOpen,
} from "lucide-react";

export function HomePageComponent() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <header className="bg-white shadow-sm">
        <nav className="w-full px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-2xl font-bold text-blue-600">
            Nirvana
          </a>
          <div className="space-x-4">
            <a href="/home" className="text-blue-600 hover:text-blue-800">
              Login
            </a>
            <Button asChild>
              <a href="/register">Get Started</a>
            </Button>
          </div>
        </nav>
      </header>

      <main className="w-full px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-800 mb-4">
            Find Your Inner Peace
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Nirvana helps teenagers manage anger through evidence-based
            techniques, cognitive-behavioral therapy, and mindfulness
            strategies.
          </p>
          <Button size="lg" asChild>
            <a href="/register">
              Start Your Journey <ArrowRight className="ml-2" />
            </a>
          </Button>
        </section>

        <section className="grid grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<BarChart3 className="h-10 w-10 text-blue-500" />}
            title="Self-Assessment"
            description="Measure your anger levels and track progress over time."
          />
          <FeatureCard
            icon={<Brain className="h-10 w-10 text-green-500" />}
            title="Mindfulness Exercises"
            description="Practice guided meditation and breathing techniques to stay calm."
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-purple-500" />}
            title="Community Support"
            description="Connect with peers and share experiences in a safe, moderated environment."
          />
        </section>

        <section className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            How Nirvana Helps
          </h2>
          <div className="grid grid-cols-4 gap-6 mt-8">
            <BenefitCard
              icon={<HeartHandshake className="h-8 w-8 text-pink-500" />}
              title="Emotional Regulation"
            />
            <BenefitCard
              icon={<Headphones className="h-8 w-8 text-blue-500" />}
              title="Stress Relief"
            />
            <BenefitCard
              icon={<BookOpen className="h-8 w-8 text-green-500" />}
              title="Coping Strategies"
            />
            <BenefitCard
              icon={<Users className="h-8 w-8 text-purple-500" />}
              title="Peer Support"
            />
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join Nirvana today and start your journey towards better emotional
            well-being.
          </p>
          <Button size="lg" asChild>
            <a href="/register">Create Your Free Account</a>
          </Button>
        </section>
      </main>
    </div>
  );
}

interface FeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-semibold">
          {icon}
          <span className="ml-2">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

interface BenefitCardProps {
  icon: any;
  title: string;
}

function BenefitCard({ icon, title }: BenefitCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="inline-block p-3 bg-blue-50 rounded-full mb-4">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
      </CardContent>
    </Card>
  );
}
