"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/components/contexts/AuthContext";

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast("You have been signed out.");
    } catch (error) {
      toast("error");
    }
  };

  if (!user) {
    return null; // This will not be rendered as we're redirecting to login
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome to your Dashboard</CardTitle>
          <CardDescription>You're logged in!</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>User ID:</strong> {user.id}
          </p>
          {user.user_metadata?.full_name && (
            <p>
              <strong>Name:</strong> {user.user_metadata.full_name}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSignOut} className="w-full">
            Sign Out
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
