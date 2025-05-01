"use client";
import MaxWidthWrapper from "@/components/global/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Database, FileCode, FileText, Github } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  isAuthenticated: boolean;
}

const HeroSection = ({ isAuthenticated }: HeroSectionProps) => {
  const redirectPath = isAuthenticated ? "/dashboard" : "/auth/sign-in";

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Hero content */}
      <MaxWidthWrapper>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center space-y-12"
        >
          <div className="min-h-screen flex flex-col items-center justify-center space-y-12">
            {/* Headline */}
            <div className="space-y-6">
              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight"
                variants={fadeIn}
                transition={{ duration: 0.5 }}
              >
                Understand GitHub Repos <br className="hidden sm:inline" />
                <span className="text-primary">In Seconds</span>
              </motion.h1>
              <motion.p
                className="mx-auto max-w-2xl text-xl text-muted-foreground"
                variants={item}
              >
                Analyze any GitHub repository, generate comprehensive file
                summaries, and create perfect documentation automatically.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                asChild
                size="lg"
                className="text-lg px-8 py-6 rounded-full group"
              >
                <Link href={redirectPath}>
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 rounded-full"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  View on GitHub
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Feature highlights */}
          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          >
            <motion.div
              variants={item}
              className="bg-secondary/30 backdrop-blur-sm p-8 rounded-xl border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">File Summaries</h3>
              <p className="text-muted-foreground">
                Generate concise summaries for every file in the repository to
                quickly understand the codebase.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-secondary/30 backdrop-blur-sm p-8 rounded-xl border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Persistent Storage</h3>
              <p className="text-muted-foreground">
                Save all generated summaries in a database for quick access and
                future reference.
              </p>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-secondary/30 backdrop-blur-sm p-8 rounded-xl border border-border"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <FileCode className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Auto Documentation</h3>
              <p className="text-muted-foreground">
                Automatically generate README.md, CONTRIBUTING.md, and
                .env.example files for your projects.
              </p>
            </motion.div>
          </motion.div>

          {/* How it works section */}
          <motion.div variants={item} className="mt-24">
            <h2 className="text-3xl font-bold mb-12">How It Works</h2>
            <div className="relative">
              <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-border" />
              <div className="space-y-16">
                {[
                  {
                    step: "1",
                    title: "Paste GitHub Repo URL",
                    description:
                      "Simply paste the URL of any public GitHub repository you want to analyze.",
                  },
                  {
                    step: "2",
                    title: "Automatic Analysis",
                    description:
                      "Our system reads all files, analyzes the content, and generates comprehensive summaries.",
                  },
                  {
                    step: "3",
                    title: "Documentation Generation",
                    description:
                      "Get perfectly formatted README.md, CONTRIBUTING.md, and .env.example files.",
                  },
                  {
                    step: "4",
                    title: "Save & Share",
                    description:
                      "All summaries are saved to your account for future reference and easy sharing.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg absolute left-1/2 -ml-6 -mt-2 z-10">
                      {item.step}
                    </div>
                    <div
                      className={`w-1/2 ${
                        index % 2 === 0 ? "pr-12 text-right" : "pl-12 ml-auto"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Final CTA */}
          <motion.div
            variants={item}
            className="mt-24 bg-secondary/40 backdrop-blur-sm p-12 rounded-2xl border border-border"
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to understand any codebase?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop spending hours trying to understand new repositories. Get
              instant insights and documentation.
            </p>
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 rounded-full"
            >
              <Link href={redirectPath}>
                Start Analyzing Repos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HeroSection;
