"use client";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code,
  Database,
  FileCode,
  FileText,
  GitBranch,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "File Summaries",
    description:
      "Generate concise summaries for every file in the repository to quickly understand the codebase structure and purpose.",
  },
  {
    icon: Database,
    title: "Database Storage",
    description:
      "All generated summaries are saved in a database for quick access, searching, and future reference.",
  },
  {
    icon: FileCode,
    title: "README Generation",
    description:
      "Automatically create comprehensive README.md files with project overview, setup instructions, and usage examples.",
  },
  {
    icon: GitBranch,
    title: "CONTRIBUTING.md",
    description:
      "Generate contribution guidelines that help new contributors understand how to participate in your project.",
  },
  {
    icon: BookOpen,
    title: ".env.example",
    description:
      "Automatically detect environment variables and create a properly formatted .env.example file for your project.",
  },
  {
    icon: Code,
    title: "Code Understanding",
    description:
      "Get insights into complex codebases without having to read through every line of code manually.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our GitHub repo analyzer provides everything you need to understand
            and document any codebase.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary/20 backdrop-blur-sm p-8 rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
