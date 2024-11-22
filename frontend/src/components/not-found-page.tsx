import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function NotFoundPageComponent() {
  return (
    <div className="h-screen w-full bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-800 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 mr-2 text-blue-500" />
            404 - Page Not Found
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center text-gray-600 mb-4">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-md text-center text-gray-500">
            It might have been moved or deleted, or you may have mistyped the
            address.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
            <Link to="/">Return to Dashboard</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
