import { Layout } from '@/components/frontend/layout';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Link } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Bookmark, Calendar, ChevronRight, Clock, Share2, Zap } from 'lucide-react';
import { useRef } from 'react';

const articles = [
    {
        id: 'ardennes-drive',
        title: 'The Ultimate Belgian Ardennes Drive',
        subtitle: 'A journey through forests, valleys, and winding roads',
        author: 'MCRENTALCARS Owner',
        date: 'January 15, 2026',
        readTime: '8 min read',
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920',
        category: 'Road Trips',
        content: [
            {
                type: 'text',
                content:
                    "There's something magical about the Belgian Ardennes in autumn. The way the morning mist clings to the valleys, the roads that twist and turn through ancient forests, and the villages that seem frozen in time. This is the definitive guide to experiencing it all from behind the wheel of a luxury vehicle.",
            },
            {
                type: 'image',
                url: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600',
                caption: 'Precision meeting purpose on the N86',
            },
            {
                type: 'text',
                content:
                    'We started our journey in Brussels, picking up a Porsche 911 Carrera S – the perfect companion for the roads ahead. The E411 motorway took us south, but the real adventure began when we exited at Marche-en-Famenne.',
            },
            {
                type: 'pullquote',
                content: "The roads here aren't just asphalt – they're an invitation to drive the way driving was meant to be experienced.",
            },
            {
                type: 'text',
                content:
                    'The N86 towards La Roche-en-Ardenne is where the magic truly begins. Sweeping corners, dramatic elevation changes, and views that demand you pull over and breathe it all in.',
            },
        ],
    },
    {
        id: 'lamborghini-day',
        title: '24 Hours with the Lamborghini Huracán',
        subtitle: 'An unforgettable day with Italian engineering excellence',
        author: 'MCRENTALCARS Owner',
        date: 'December 28, 2025',
        readTime: '6 min read',
        heroImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920',
        category: 'Car Stories',
        content: [
            {
                type: 'text',
                content:
                    "When the key to a Lamborghini Huracán EVO is handed to you, the world suddenly feels smaller and much louder. This isn't just a car; it's a naturally aspirated V10 symphony that demands your absolute presence. For the next 24 hours, Brussels wouldn't just be our home; it would be our playground.",
            },
            {
                type: 'image',
                url: '/images/gallery/supercar_night_city_1770125298388.png',
                caption: 'Obsidian shadows and Italian fire.',
            },
            {
                type: 'text',
                content:
                    "The first thing you notice isn't the speed—it's the visceral connection. Every input is met with an immediate, almost telepathic response. Passing through the city at dusk, the Huracán doesn't just attract attention; it commands the atmosphere. The neon reflections off its angular bodywork make it look like a jet that accidentally found itself on the street.",
            },
            {
                type: 'pullquote',
                content: "It's the kind of machine that makes you realize driving isn't a chore, it's a privilege.",
            },
            {
                type: 'text',
                content:
                    "As we hit the open stretches near Waterloo, the V10 truly sang. The sound at 8,000 RPM is something that stays with you—a mechanical howl that vibrates through your spine. 24 hours wasn't enough, but it was exactly what we needed to remember why we love the drive.",
            },
        ],
    },
    {
        id: 'winter-driving',
        title: 'Winter Driving: A Guide to the Mountains',
        subtitle: 'Essential tips for your alpine adventure',
        author: 'MCRENTALCARS Owner',
        date: 'November 10, 2025',
        readTime: '10 min read',
        heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
        category: 'Tips & Guides',
        content: [
            {
                type: 'text',
                content:
                    "The Swiss Alps in January are a test of both machine and driver. White-out conditions, black ice, and hair-pin turns that require surgical precision. In these conditions, luxury isn't just about comfort—it's about the confidence provided by superior all-wheel-drive systems and thermal management.",
            },
            {
                type: 'image',
                url: '/images/gallery/luxury_suv_gallery_1770125084892.png',
                caption: 'The Range Rover Vogue mastering the frozen pass.',
            },
            {
                type: 'text',
                content:
                    'Our vehicle of choice for the ascent was the Range Rover Vogue. Its Terrain Response system felt almost sentient as it navigated the slush and deep snow of the Julier Pass. The heated massage seats provides a surreal contrast to the -15°C storm raging outside the double-glazed glass.',
            },
            {
                type: 'pullquote',
                content: "The mountain doesn't forgive, but the right machine ensures you never have to ask for it.",
            },
            {
                type: 'text',
                content:
                    "The key to winter driving is smooth inputs. Every brake, turn, and throttle application must be measured. When you're in a vehicle designed for these extremes, the journey becomes as serene as the destination. We reached St. Moritz as the sun dipped below the peaks, the Range Rover's headlights cut through the blue hour with piercing clarity.",
            },
        ],
    },
];

export default function JournalArticlePage({ id }: { id: string }) {
    const article = articles.find((a) => a.id === id) || articles[0];
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <Layout>
            <div className="min-h-screen bg-[#050505] text-white">
                {/* Cinematic Parallax Hero */}
                <div ref={heroRef} className="relative h-screen min-h-[700px] overflow-hidden">
                    <motion.div className="absolute inset-0" style={{ y, scale }}>
                        <img src={article.heroImage} alt={article.title} className="h-full w-full object-cover grayscale-[0.2]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>

                    <motion.div className="absolute inset-0 flex flex-col justify-end pb-32" style={{ opacity: opacityHero }}>
                        <div className="container mx-auto px-6 lg:px-24">
                            <div className="max-w-5xl">
                                <FadeUpReveal>
                                    <div className="mb-8 flex items-center gap-4">
                                        <span className="rounded-full bg-secondary px-5 py-2 text-[10px] font-black tracking-[0.4em] text-white uppercase shadow-2xl">
                                            {article.category}
                                        </span>
                                        <div className="h-[1px] w-12 bg-white/20" />
                                        <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                                            SYNC_ID: {article.id.toUpperCase()}
                                        </span>
                                    </div>
                                </FadeUpReveal>

                                <h1 className="mb-10 text-6xl leading-[0.8] font-black tracking-tighter text-white uppercase md:text-[8rem]">
                                    <TextReveal delay={0.2}>{article.title}</TextReveal>
                                </h1>

                                <FadeUpReveal delay={0.4}>
                                    <p className="mb-12 max-w-3xl text-xl leading-relaxed font-medium text-white/50 italic md:text-2xl">
                                        {article.subtitle}
                                    </p>
                                </FadeUpReveal>

                                <FadeUpReveal delay={0.6}>
                                    <div className="flex flex-wrap items-center gap-10 border-t border-white/10 pt-10 text-[10px] font-black tracking-[0.3em] text-white/40 uppercase">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 overflow-hidden rounded-full border border-secondary/50 ring-4 ring-secondary/5 ring-offset-4 ring-offset-[#050505]">
                                                <img src="/logo.png" alt="Owner" className="h-full w-full object-cover" />
                                            </div>
                                            <span className="text-white">{article.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-secondary" />
                                            {article.date}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-secondary" />
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
                    <div className="mx-auto max-w-4xl">
                        {/* Upper Actions Bar */}
                        <div className="mb-24 flex items-center justify-between border-b border-white/5 pb-8">
                            <Link href="/journal">
                                <button className="group flex items-center gap-4 text-[11px] font-black tracking-[0.3em] text-white/30 uppercase transition-all hover:text-secondary">
                                    <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-2" />
                                    Return to Archive
                                </button>
                            </Link>
                            <div className="flex gap-4">
                                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:scale-110 hover:bg-secondary hover:text-white">
                                    <Bookmark className="h-5 w-5" />
                                </button>
                                <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:scale-110 hover:bg-secondary hover:text-white">
                                    <Share2 className="h-5 w-5" />
                                </button>
                            </div>
                        </div>

                        {/* Editorial Grid Content */}
                        <article className="space-y-16">
                            {article.content.map((block: any, i) => {
                                if (block.type === 'text') {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2}>
                                            <p className="text-xl leading-[1.8] font-medium text-white/70 md:text-2xl">{block.content}</p>
                                        </FadeUpReveal>
                                    );
                                }

                                if (block.type === 'image') {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2} className="w-full py-10">
                                            <figure className="group relative overflow-hidden rounded-[3rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                                                <img
                                                    src={block.url}
                                                    alt={block.caption}
                                                    className="w-full grayscale-[0.2] transition-all duration-[2s] group-hover:scale-105 group-hover:grayscale-0"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                {block.caption && (
                                                    <figcaption className="absolute right-8 bottom-8 left-8 text-[10px] font-black tracking-[0.4em] text-white/60 uppercase">
                                                        <span className="mr-3 text-secondary">//</span> {block.caption}
                                                    </figcaption>
                                                )}
                                                {/* Technical Scan on Hover */}
                                                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-10">
                                                    <div className="animate-scan absolute top-1/2 left-0 h-[1px] w-full bg-white" />
                                                </div>
                                            </figure>
                                        </FadeUpReveal>
                                    );
                                }

                                if (block.type === 'pullquote') {
                                    return (
                                        <FadeUpReveal key={i} delay={0.2} className="relative overflow-hidden px-10 py-20 md:px-20">
                                            <div className="absolute top-0 left-0 h-16 w-16 border-t-2 border-l-2 border-secondary/30" />
                                            <div className="absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 border-secondary/30" />
                                            <p className="text-center text-4xl leading-none font-black tracking-tighter text-white uppercase italic md:text-6xl">
                                                "{block.content}"
                                            </p>
                                        </FadeUpReveal>
                                    );
                                }

                                return null;
                            })}
                        </article>

                        {/* Editorial Author Bio */}
                        <div className="group relative mt-32 overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] p-12">
                            <div className="absolute top-0 left-0 h-[1px] w-full scale-x-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent transition-transform duration-1000 group-hover:scale-x-100" />

                            <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row">
                                <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-secondary/50 ring-8 ring-secondary/5 ring-offset-4 ring-offset-[#070707] transition-all group-hover:scale-110">
                                    <img src="/logo.png" alt="Owner" className="h-full w-full object-cover" />
                                </div>
                                <div className="space-y-3 text-center md:text-left">
                                    <span className="mb-2 block text-[10px] font-black tracking-[0.5em] text-secondary uppercase">
                                        // The Narrator
                                    </span>
                                    <h4 className="text-3xl font-black tracking-tighter text-white uppercase">{article.author}</h4>
                                    <p className="max-w-lg text-base leading-relaxed font-medium text-white/30">
                                        Curator of the MC Collection. Passionate about the fusion of cinematic aesthetics and high-performance
                                        automotive legacy.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Actions */}
                        <div className="mt-20 flex flex-col items-center justify-between gap-10 border-t border-white/5 pt-10 md:flex-row">
                            <Link href="/cars" className="w-full md:w-auto">
                                <button className="flex h-16 w-full items-center justify-center gap-4 rounded-2xl bg-secondary px-12 text-xs font-black tracking-[0.4em] text-white uppercase shadow-xl shadow-secondary/20 transition-all hover:scale-105">
                                    <Zap className="h-4 w-4" /> Book the Fleet
                                </button>
                            </Link>
                            <div className="flex items-center gap-6">
                                <span className="text-[10px] font-black tracking-widest text-white/20 uppercase">Next Entry: Archives</span>
                                <Link href="/journal">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:bg-white hover:text-black">
                                        <ChevronRight className="h-6 w-6" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 3s linear infinite;
                }
            `,
                }}
            />
        </Layout>
    );
}
