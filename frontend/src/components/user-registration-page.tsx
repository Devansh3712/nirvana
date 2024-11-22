import React, { useState } from "'react'";
import { useForm } from "'react-hook-form'";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle } from "'react-icons/fa'";
import { AlertCircle } from "'lucide-react'";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function UserRegistrationPage() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>();
  const [registrationError, setRegistrationError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      // This is a placeholder for the actual API call
      const response = await fetch("'http://localhost:8000/register'", {
        method: "'POST'",
        headers: {
          "'Content-Type'": "'application/json'",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("'Registration failed'");
      }

      // Handle successful registration (e.g., redirect to login page)
      console.log("'Registration successful'");
    } catch (error) {
      setRegistrationError("'Registration failed. Please try again.'");
    }
  };

  const handleGoogleSignIn = () => {
    // Placeholder for Google OAuth implementation
    console.log("'Google Sign In clicked'");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-blue-700">Create Your Account</CardTitle>
          <CardDescription className="text-center">Join Nirvana and start your journey to better anger management</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                {...register("'name'", { required: "'Name is required'" })}
                className="mt-1"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("'email'", { 
                  required: "'Email is required'",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "'Invalid email address'",
                  }
                })}
                className="mt-1"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("'password'", { 
                  required: "'Password is required'",
                  minLength: {
                    value: 8,
                    message: "'Password must be at least 8 characters'",
                  }
                })}
                className="mt-1"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("'confirmPassword'", { 
                  required: "'Please confirm your password'",
                  validate: value => value === getValues("'password'") || "'Passwords do not match'"
                })}
                className="mt-1"
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Register
            </Button>
          </form>
          {registrationError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{registrationError}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <div className="w-full">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              className="mt-4 w-full bg-white border border-neutral-200 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-neutral-800"
            >
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
              Sign up with Google
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}