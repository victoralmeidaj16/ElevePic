"use client";

import { motion } from "framer-motion";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Digital Marketer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        content: "I used to spend hundreds on professional headshots. ElevePic gave me better results in 5 minutes for a fraction of the cost.",
        rating: 5
    },
    {
        name: "Michael Chen",
        role: "Software Engineer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        content: "The quality is insane. I updated my LinkedIn profile and immediately started getting more recruiter messages. Highly recommend!",
        rating: 5
    },
    {
        name: "Emily Rodriguez",
        role: "Content Creator",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        content: "As a creator, I need fresh content constantly. This tool is a lifesaver for generating professional-looking photos for my brand.",
        rating: 5
    }
];

export function SocialProof() {
    return (
        <section className="py-24 bg-gradient-to-b from-black/40 to-background relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-background to-background -z-10" />

            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        Trusted by Professionals
                    </h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        Join thousands of users who have elevated their professional presence with ElevePic.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <Card className="h-full bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex items-center gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground mb-6 flex-grow italic">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <Avatar className="h-12 w-12 border-2 border-purple-500/50">
                                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                                            <AvatarFallback><User className="h-6 w-6" /></AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h4 className="font-semibold">{testimonial.name}</h4>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
