"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "This tool saved me hours of reading through code. I was able to understand a complex repo in minutes!",
    author: "Alex Johnson",
    role: "Senior Developer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "The auto-generated documentation is incredibly accurate. It's like having an AI developer explain the codebase to you.",
    author: "Sarah Chen",
    role: "Tech Lead",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    quote:
      "I use this for every new project I join. It helps me get up to speed with the codebase much faster than reading docs.",
    author: "Michael Rodriguez",
    role: "Software Engineer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">What Developers Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Developers love how our tool helps them understand codebases faster.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full bg-secondary/20 backdrop-blur-sm border-border">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="text-foreground italic">{testimonial.quote}</p>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-4">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>
                        {testimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
