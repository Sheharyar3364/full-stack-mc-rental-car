import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react";

const articles = [
    {
        id: "ardennes-drive",
        title: "The Ultimate Belgian Ardennes Drive",
        subtitle: "A journey through forests, valleys, and winding roads",
        author: "James Morrison",
        date: "January 15, 2026",
        readTime: "8 min read",
        heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920",
        category: "Road Trips",
        content: [
            {
                type: "text",
                content:
                    "There's something magical about the Belgian Ardennes in autumn. The way the morning mist clings to the valleys, the roads that twist and turn through ancient forests, and the villages that seem frozen in time. This is the definitive guide to experiencing it all from behind the wheel of a luxury vehicle.",
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600",
                caption: "The Porsche 911 handles the winding roads with precision",
            },
            {
                type: "text",
                content:
                    "We started our journey in Brussels, picking up a Porsche 911 Carrera S – the perfect companion for the roads ahead. The E411 motorway took us south, but the real adventure began when we exited at Marche-en-Famenne.",
            },
            {
                type: "pullquote",
                content:
                    "The roads here aren't just asphalt – they're an invitation to drive the way driving was meant to be experienced.",
            },
            {
                type: "text",
                content:
                    "The N86 towards La Roche-en-Ardenne is where the magic truly begins. Sweeping corners, dramatic elevation changes, and views that demand you pull over and breathe it all in. We stopped at a small café in Hotton for coffee and watched the morning light paint the hillsides gold.",
            },
        ],
    },
    {
        id: "lamborghini-day",
        title: "24 Hours with the Lamborghini Huracán",
        subtitle: "An unforgettable day with Italian engineering excellence",
        author: "Sarah Chen",
        date: "December 28, 2025",
        readTime: "6 min read",
        heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920",
        category: "Car Stories",
        content: [],
    },
    {
        id: "winter-driving",
        title: "Winter Driving: A Guide to the Mountains",
        subtitle: "Essential tips for your alpine adventure",
        author: "Marcus Berg",
        date: "November 10, 2025",
        readTime: "10 min read",
        heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
        category: "Tips & Guides",
        content: [],
    },
];

export default function JournalArticlePage({ id }: { id: string }) {
    const article = articles.find((a) => a.id === id) || articles[0];
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <Layout>
            {/* Hero */}
            <div ref={heroRef} className="relative h-[80vh] min-h-[600px] overflow-hidden">
                <motion.div className="absolute inset-0" style={{ y }}>
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-[120%] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/30 to-transparent" />
                </motion.div>

                <motion.div
                    className="absolute inset-0 flex items-end pb-20"
                    style={{ opacity }}
                >
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <FadeUpReveal>
                                <span className="inline-block px-4 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest mb-6">
                                    {article.category}
                                </span>
                            </FadeUpReveal>

                            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.9] mb-6">
                                <TextReveal delay={0.2}>{article.title}</TextReveal>
                            </h1>

                            <FadeUpReveal delay={0.4}>
                                <p className="text-xl text-white/70 mb-8">{article.subtitle}</p>
                            </FadeUpReveal>

                            <FadeUpReveal delay={0.5}>
                                <div className="flex items-center gap-6 text-white/60 text-sm">
                                    <span className="font-medium text-white">{article.author}</span>
                                    <span className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        {article.date}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        {article.readTime}
                                    </span>
                                </div>
                            </FadeUpReveal>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Article Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-3xl mx-auto">
                    {/* Actions */}
                    <div className="flex items-center justify-between mb-12 pb-8 border-b border-border">
                        <Link href="/journal">
                            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-5 h-5" />
                                Back to Journal
                            </button>
                        </Link>
                        <div className="flex gap-3">
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                                <Bookmark className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-secondary hover:text-white transition-all">
                                <Share2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Content Blocks */}
                    <article className="prose prose-lg dark:prose-invert max-w-none">
                        {article.content.map((block: any, i) => {
                            if (block.type === "text") {
                                return (
                                    <FadeUpReveal key={i} delay={i * 0.1}>
                                        <p className="text-lg leading-relaxed text-muted-foreground mb-8">
                                            {block.content}
                                        </p>
                                    </FadeUpReveal>
                                );
                            }

                            if (block.type === "image") {
                                return (
                                    <FadeUpReveal key={i} delay={i * 0.1}>
                                        <figure className="my-12">
                                            <div className="rounded-2xl overflow-hidden">
                                                <img
                                                    src={block.url}
                                                    alt={block.caption}
                                                    className="w-full"
                                                />
                                            </div>
                                            {block.caption && (
                                                <figcaption className="text-center text-sm text-muted-foreground mt-4">
                                                    {block.caption}
                                                </figcaption>
                                            )}
                                        </figure>
                                    </FadeUpReveal>
                                );
                            }

                            if (block.type === "pullquote") {
                                return (
                                    <FadeUpReveal key={i} delay={i * 0.1}>
                                        <blockquote className="my-12 pl-8 border-l-4 border-secondary">
                                            <p className="text-2xl font-bold italic text-foreground">
                                                "{block.content}"
                                            </p>
                                        </blockquote>
                                    </FadeUpReveal>
                                );
                            }

                            return null;
                        })}
                    </article>

                    {/* Author */}
                    <div className="mt-16 pt-8 border-t border-border">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-red-500 flex items-center justify-center text-white text-xl font-bold">
                                {article.author[0]}
                            </div>
                            <div>
                                <p className="font-bold">{article.author}</p>
                                <p className="text-muted-foreground text-sm">
                                    Automotive journalist and driving enthusiast
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
