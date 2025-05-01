"use client";

import {
  ArrowLeft,
  BookText,
  FileCheck,
  FolderGit2,
  Loader,
} from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";

import FadeIn from "@/components/global/fade-in";
import FadeSlideIn from "@/components/global/fade-slide-in";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "One Link Setup",
    description:
      "Just paste a GitHub repo link — we'll fetch and analyze everything behind the scenes for you.",
    icon: FolderGit2,
  },
  {
    title: "Auto-Generate README.md",
    description:
      "We'll create a professional README.md based on the repo's content and structure — no writing needed.",
    icon: BookText,
  },
  {
    title: "CONTRIBUTING.md & .env.example Generator",
    description:
      "Get boilerplate contributing guidelines and environment variable examples generated automatically.",
    icon: FileCheck,
  },
];

export default function SignIn() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await signIn("google", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      setIsGithubLoading(true);
      await signIn("github", {
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log("error.stack is ", error.stack);
        console.log("error.message is ", error.message);
      }
    } finally {
      setIsGithubLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden ">
      {/* Left Panel - Info Section */}
      <div className="hidden lg:block lg:w-3/5 relative z-10">
        <div className="h-full flex flex-col justify-between p-2 lg:p-4">
          {/* Header */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
                {siteConfig.name}
              </h1>
            </Link>
          </div>

          {/* Features */}
          <div className="space-y-6 max-w-2xl my-8">
            <div className="grid gap-4">
              {features.map((feature, i) => (
                <FadeSlideIn key={i} delay={i * 0.15}>
                  <div className="flex items-start gap-5 p-5 rounded-xl border bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors group cursor-pointer">
                    <div className="p-3 rounded-lg border bg-background/50 text-primary group-hover:bg-muted/40 transition-colors">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-medium text-lg text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </FadeSlideIn>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-muted-foreground pt-6">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/4 right-0 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl -z-10" />
      </div>

      {/* Right Panel - Auth Section */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 relative">
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl -z-10" />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl -z-10" />

        {/* Mobile header - only visible on small screens */}
        <div className="lg:hidden absolute top-8 left-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              {siteConfig.name}
            </h1>
          </Link>
        </div>

        <FadeIn delay={0.1}>
          <div className="w-full max-w-md p-8 bg-card/70 backdrop-blur-md rounded-xl border shadow-lg space-y-8">
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "group tracking-wider"
              )}
            >
              <ArrowLeft className="h-2 w-2 group-hover:-translate-x-2 transition-all" />
              Back to home
            </Link>
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">Sign in to your account</h2>
              <p className="text-muted-foreground">
                Choose your preferred sign-in method to continue
              </p>
            </div>

            <div className="space-y-4">
              <Button
                onClick={handleGitHubSignIn}
                disabled={isGithubLoading}
                variant="outline"
                className="w-full text-foreground  py-2"
              >
                {isGithubLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Wait ...
                  </>
                ) : (
                  <>
                    <FaGithub className="mr-2 h-5 w-5" />
                    <span className="text-center tracking-wide">
                      Continue with GitHub
                    </span>
                  </>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase ">
                  <span className="bg-background px-2 text-foreground">Or</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full text-primary  py-1"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Wait ...
                  </>
                ) : (
                  <>
                    <Image
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      width={18}
                      height={18}
                      className="mr-2"
                    />
                    Continue with Google
                  </>
                )}
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
