import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { Clock, Calendar, ArrowLeft, Share2, Bookmark, ChevronRight, Zap, Target } from "lucide-react";

const articles = [
    {
        id: "ardennes-drive",
        title: "The Ultimate Belgian Ardennes Drive",
        subtitle: "A journey through forests, valleys, and winding roads",
        author: "MC Rental Cars Owner",
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
                caption: "Precision meeting purpose on the N86",
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
                    "The N86 towards La Roche-en-Ardenne is where the magic truly begins. Sweeping corners, dramatic elevation changes, and views that demand you pull over and breathe it all in.",
            },
        ],
    },
    {
        id: "lamborghini-day",
        title: "24 Hours with the Lamborghini Huracán",
        subtitle: "An unforgettable day with Italian engineering excellence",
        author: "MC Rental Cars Owner",
        date: "December 28, 2025",
        readTime: "6 min read",
        heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920",
        category: "Car Stories",
        content: [
            {
                type: "text",
                content: "When the key to a Lamborghini Huracán EVO is handed to you, the world suddenly feels smaller and much louder. This isn't just a car; it's a naturally aspirated V10 symphony that demands your absolute presence. For the next 24 hours, Brussels wouldn't just be our home; it would be our playground.",
            },
            {
                type: "image",
                url: "/images/gallery/supercar_night_city_1770125298388.png",
                caption: "Obsidian shadows and Italian fire.",
            },
            {
                type: "text",
                content: "The first thing you notice isn't the speed—it's the visceral connection. Every input is met with an immediate, almost telepathic response. Passing through the city at dusk, the Huracán doesn't just attract attention; it commands the atmosphere. The neon reflections off its angular bodywork make it look like a jet that accidentally found itself on the street.",
            },
            {
                type: "pullquote",
                content: "It's the kind of machine that makes you realize driving isn't a chore, it's a privilege.",
            },
            {
                type: "text",
                content: "As we hit the open stretches near Waterloo, the V10 truly sang. The sound at 8,000 RPM is something that stays with you—a mechanical howl that vibrates through your spine. 24 hours wasn't enough, but it was exactly what we needed to remember why we love the drive.",
            }
        ],
    },
    {
        id: "winter-driving",
        title: "Winter Driving: A Guide to the Mountains",
        subtitle: "Essential tips for your alpine adventure",
        author: "MC Rental Cars Owner",
        date: "November 10, 2025",
        readTime: "10 min read",
        heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
        category: "Tips & Guides",
        content: [
            {
                type: "text",
                content: "The Swiss Alps in January are a test of both machine and driver. White-out conditions, black ice, and hair-pin turns that require surgical precision. In these conditions, luxury isn't just about comfort—it's about the confidence provided by superior all-wheel-drive systems and thermal management.",
            },
            {
                type: "image",
                url: "/images/gallery/luxury_suv_gallery_1770125084892.png",
                caption: "The Range Rover Vogue mastering the frozen pass.",
            },
            {
                type: "text",
                content: "Our vehicle of choice for the ascent was the Range Rover Vogue. Its Terrain Response system felt almost sentient as it navigated the slush and deep snow of the Julier Pass. The heated massage seats provides a surreal contrast to the -15°C storm raging outside the double-glazed glass.",
            },
            {
                type: "pullquote",
                content: "The mountain doesn't forgive, but the right machine ensures you never have to ask for it.",
            },
            {
                type: "text",
                content: "The key to winter driving is smooth inputs. Every brake, turn, and throttle application must be measured. When you're in a vehicle designed for these extremes, the journey becomes as serene as the destination. We reached St. Moritz as the sun dipped below the peaks, the Range Rover's headlights cut through the blue hour with piercing clarity.",
            }
        ],
    },
];

export default function JournalArticlePage({ id }: { id: string }) {
    const article = articles.find((a) => a.id === id) || articles[0];
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <Layout>
            <div className="bg-[#050505] min-h-screen text-white">
                {/* Cinematic Parallax Hero */}
                <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
                    <motion.div className="absolute inset-0" style={{ y, scale }}>
                        <img
                            src={article.heroImage}
                            alt={article.title}
                            className="w-full h-full object-cover grayscale-[0.2]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    <motion.div
                        className="absolute inset-0 flex flex-col justify-end pb-32"
                        style={{ opacity: opacityHero }}
                    >
                        <div className="container mx-auto px-6 lg:px-24">
                            <div className="max-w-5xl">
                                <FadeUpReveal>
                                    <div className="flex items-center gap-4 mb-8">
                                        <span className="px-5 py-2 rounded-full bg-secondary text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                                            {article.category}
                                        </span>
                                        <div className="w-12 h-[1px] bg-white/20" />
                                        <span className="text-white/40 text-[10px] uppercase font-mono tracking-widest">
                                            SYNC_ID: {article.id.toUpperCase()}
                                        </span>
                                    </div>
                                </FadeUpReveal>

                                <h1 className="text-6xl md:text-[8rem] font-black uppercase leading-[0.8] tracking-tighter text-white mb-10">
                                    <TextReveal delay={0.2}>{article.title}</TextReveal>
                                </h1>

                                <FadeUpReveal delay={0.4}>
                                    <p className="text-xl md:text-2xl text-white/50 font-medium max-w-3xl leading-relaxed italic mb-12">
                                        {article.subtitle}
                                    </p>
                                </FadeUpReveal>

                                <FadeUpReveal delay={0.6}>
                                    <div className="flex flex-wrap items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-t border-white/10 pt-10">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full overflow-hidden border border-secondary/50 ring-4 ring-secondary/5 ring-offset-4 ring-offset-[#050505]">
                                                <img src="/logo.png" alt="Owner" className="w-full h-full object-cover" />
                                            </div>
                                            <span className="text-white">{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-secondary" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-secondary" />
                                            {article.readTime}
                                        </div>
                                    </div>
                                </FadeUpReveal>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Article Body */}
                <div className="relative z-10 container mx-auto px-6 py-32">
                    <div className="max-w-4xl mx-auto">
                        {/* Upper Actions Bar */}
                        <div className="flex items-center justify-between mb-24 pb-8 border-b border-white/5">
                            <Link href="/journal">
                                <button className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-secondary transition-all">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                                    Return to Archive
                                </button>
                            </Link>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white hover:scale-110 transition-all">
                                    <Bookmark className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-white hover:scale-110 transition-all">
                                    <Share2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Editorial Grid Content */}
                        <article className="space-y-16">
                            {article.content.map((block: any, i) => {
                                if (block.type === "text") {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2}>
                                            <p className="text-xl md:text-2xl leading-[1.8] text-white/70 font-medium">
                                                {block.content}
                                            </p>
                                        </FadeUpReveal>
                                    );
                                }

                                if (block.type === "image") {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2} className="w-full py-10">
                                            <figure className="relative group rounded-[3rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                                                <img
                                                    src={block.url}
                                                    alt={block.caption}
                                                    className="w-full grayscale-[0.2] transition-all duration-[2s] group-hover:grayscale-0 group-hover:scale-105"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                {block.caption && (
                                                    <figcaption className="absolute bottom-8 left-8 right-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                                                        <span className="text-secondary mr-3">//</span> {block.caption}
                                                    </figcaption>
                                                )}
                                                {/* Technical Scan on Hover */}
                                                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 pointer-events-none">
                                                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white animate-scan" />
                                                </div>
                                            </figure>
                                        </FadeUpReveal>
                                    );
                                }

                                if (block.type === "pullquote") {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2} className="relative py-20 px-10 md:px-20 overflow-hidden">
                                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-secondary/30" />
                                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-secondary/30" />
                                            <p className="text-4xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none text-center">
                                                "{block.content}"
                                            </p>
                                        </FadeUpReveal>
                                    );
                                }

                                return null;
                            })}
                        </article>

                        {/* Editorial Author Bio */}
                        <div className="mt-32 p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-secondary/50 ring-8 ring-secondary/5 ring-offset-4 ring-offset-[#070707] transition-all group-hover:scale-110">
                                    <img src="/logo.png" alt="Owner" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-center md:text-left space-y-3">
                                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-secondary mb-2 block">// The Narrator</span>
                                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter">{article.author}</h4>
                                    <p className="text-white/30 text-base max-w-lg leading-relaxed font-medium">
                                        Curator of the MC Collection. Passionate about the fusion of cinematic aesthetics and high-performance automotive legacy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-20 pt-10 border-t border-white/5">
                            <Link href="/cars" className="w-full md:w-auto">
                                <button className="w-full h-16 px-12 bg-secondary text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-xl shadow-secondary/20 hover:scale-105 transition-all flex items-center justify-center gap-4 text-xs">
                                    <Zap className="w-4 h-4" /> Book the Fleet
                                </button>
                            </Link>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Next Entry: Archives</span>
                                <Link href="/journal">
                                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                        <ChevronRight className="w-6 h-6" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
            `}} />
        </Layout>
    );
}
