"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the GitHub repo analyzer work?",
    answer:
      "Our analyzer uses advanced AI to read through each file in a GitHub repository, understand its purpose and functionality, and generate comprehensive summaries. It then compiles these summaries to create documentation like README.md, CONTRIBUTING.md, and .env.example files.",
  },
  {
    question: "Do I need to provide API keys or credentials?",
    answer:
      "For public repositories, no credentials are needed. For private repositories, you'll need to authenticate with GitHub using OAuth, which allows our system to access your repositories securely without storing your credentials.",
  },
  {
    question: "How accurate are the generated summaries?",
    answer:
      "Our AI model has been trained on millions of code repositories and produces highly accurate summaries for most common programming languages and frameworks. The accuracy depends on code complexity and documentation, but most users report 85-95% accuracy.",
  },
  {
    question: "Which programming languages are supported?",
    answer:
      "We support all major programming languages including JavaScript, TypeScript, Python, Java, C#, Go, Ruby, PHP, Swift, Kotlin, and many more. Our system can also understand configuration files, markup languages, and documentation formats.",
  },
  {
    question: "Can I customize the generated documentation?",
    answer:
      "Yes! After the initial generation, you can edit any part of the documentation through our interface. Your changes will be saved and can be exported or committed back to your repository.",
  },
  {
    question: "Is my code data secure?",
    answer:
      "Absolutely. We never store your actual code - only the generated summaries and documentation. All data is encrypted both in transit and at rest, and we follow industry best practices for security.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our GitHub repo analyzer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
