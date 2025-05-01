"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Github, Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";

const DemoForm = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!repoUrl) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    if (!repoUrl.includes("github.com")) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    try {
      // Here you would make your actual API call to process the GitHub repo
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Redirect to results or dashboard
      window.location.href = "/auth/sign-in?demo=true";
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
      setError("Failed to process repository. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="w-full max-w-md mx-auto bg-secondary/30 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle>Try It Now</CardTitle>
          <CardDescription>
            Enter a GitHub repository URL to see the analyzer in action
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="repo-url">GitHub Repository URL</Label>
              <div className="flex">
                <div className="bg-muted flex items-center px-3 rounded-l-md border border-r-0 border-input">
                  <Github className="h-4 w-4 text-muted-foreground" />
                </div>
                <Input
                  id="repo-url"
                  placeholder="https://github.com/username/repository"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Analyze Repository"
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default DemoForm;
