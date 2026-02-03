import { Head, Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { Hero } from "@/components/frontend/hero";
import { Card } from "@/components/ui/card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CompareButton } from "@/components/ui/compare-mode";
import { FadeUpReveal, TextReveal } from "@/components/ui/text-reveal";
import {
    ArrowRight,
    Users,
    Fuel,
    Settings,
    Shield,
    Star,
    Sparkles,
    Mountain,
    Crown,
    Monitor,
    Zap,
    MapPin,
    ArrowUpRight
} from "lucide-react";

interface Car {
    id: number;
    name: string;
    brand: string;
    type: string;
    image: string;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
}

interface HomeProps {
    featuredCars: Car[];
    locations: { id: number; name: string }[];
}

const experiences = [
    {
        id: "grand-tour",
        title: "Grand Tour",
        subtitle: "Continental luxury for the nomad soul.",
        icon: <Sparkles className="w-5 h-5 text-secondary" />,
        image: "/images/gallery/luxury_suv_gallery_1770125084892.png",
        color: "#3b82f6",
        className: "md:col-span-2"
    },
    {
        id: "alpine-adventure",
        title: "Alpine Adventure",
        subtitle: "Conquer altitudes with precision.",
        icon: <Mountain className="w-5 h-5 text-emerald-400" />,
        image: "/images/gallery/sports_car_mountain_road_1770125099659.png",
        color: "#10b981",
        className: "md:col-span-1"
    },
    {
        id: "red-carpet",
        title: "Red Carpet",
        subtitle: "Arrive in a statement of pure class.",
        icon: <Crown className="w-5 h-5 text-rose-500" />,
        image: "/images/gallery/classic_car_european_street_1770125114528.png",
        color: "#ef4444",
        className: "md:col-span-3"
    },
];

const trustSignals = [
    {
        icon: <Shield className="w-6 h-6" />,
        title: "Royal Coverage",
        desc: "Bespoke insurance policies for peace of mind.",
        stat: "SECURED"
    },
    {
        icon: <Zap className="w-6 h-6" />,
        title: "24/7 Concierge",
        desc: "Global support team at your immediate beck and call.",
        stat: "ALWAYS"
    },
    {
        icon: <Monitor className="w-6 h-6" />,
        title: "Digital Sync",
        desc: "Manage your reservation through our cutting-edge app.",
        stat: "SYNCED"
    }
];

export default function Home({ featuredCars, locations }: HomeProps) {
    return (
        <Layout>
            <Head title="MC Rental Cars | The Pinnacle of Premium Performance" />
            <Hero locations={locations} />

            {/* Featured Collection: Bento Style */}
            <section className="py-32 bg-[#080808] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                <div className="container px-6 mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
                        <div className="max-w-3xl">
                            <FadeUpReveal>
                                <div className="flex items-center gap-3 text-secondary mb-6">
                                    <Sparkles className="w-4 h-4 fill-current" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">The 2026 Collection</span>
                                </div>
                            </FadeUpReveal>
                            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white leading-[0.85]">
                                <TextReveal>Featured</TextReveal> <br />
                                <span className="text-white/20"><TextReveal>Masterpieces</TextReveal></span>
                            </h2>
                        </div>
                        <FadeUpReveal delay={0.4}>
                            <Link href="/cars" className="group">
                                <MagneticButton className="h-20 px-12 border border-white/10 rounded-full flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                    Browse Full Catalog <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </MagneticButton>
                            </Link>
                        </FadeUpReveal>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredCars.map((car, i) => (
                            <FadeUpReveal key={car.id} delay={0.2 + i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    className="group relative"
                                >
                                    <Card className="rounded-[2.5rem] overflow-hidden bg-zinc-900/50 border-white/5 backdrop-blur-sm group-hover:border-secondary/30 transition-all duration-500 overflow-hidden">
                                        <Link href={`/cars/${car.id}`} className="block relative aspect-[4/5] overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                                            {/* Top Info */}
                                            <div className="absolute top-8 left-8 flex flex-col gap-2">
                                                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-white">
                                                    {car.brand}
                                                </div>
                                                <div className="px-4 py-1.5 rounded-full bg-secondary/80 backdrop-blur-xl text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                                    Available
                                                </div>
                                            </div>

                                            {/* Bottom Info */}
                                            <div className="absolute bottom-8 left-8 right-8">
                                                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-4 group-hover:text-secondary transition-colors">
                                                    {car.name}
                                                </h3>
                                                <div className="flex gap-4 items-center">
                                                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                                        <Users className="w-3 h-3" /> {car.seats} Seats
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-bold uppercase tracking-widest">
                                                        <Zap className="w-3 h-3" /> {car.transmission}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="p-8 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 block mb-1">Starting From</span>
                                                <div className="text-3xl font-black text-white">
                                                    €{car.price.toLocaleString()}
                                                    <span className="text-sm font-light text-white/30 ml-2">/Day</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CompareButton car={car} />
                                                <Link href={`/cars/${car.id}`}>
                                                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-secondary hover:border-secondary transition-all">
                                                        <ArrowRight className="w-6 h-6" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            </FadeUpReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Immersive Experiences Section */}
            <section className="py-32 bg-black overflow-hidden relative">
                <div className="container px-6 mx-auto">
                    <div className="text-center mb-24">
                        <FadeUpReveal>
                            <span className="text-secondary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Crafted Moments</span>
                        </FadeUpReveal>
                        <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter">
                            <TextReveal>Ultimate</TextReveal> <br />
                            <span className="text-white/20 italic"><TextReveal>Experiences</TextReveal></span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {experiences.map((exp, i) => (
                            <FadeUpReveal key={exp.id} delay={0.2 + i * 0.1} className={exp.className}>
                                <Link href={`/experiences#${exp.id}`}>
                                    <motion.div
                                        className="relative h-[500px] rounded-[3rem] overflow-hidden group cursor-pointer"
                                        whileHover={{ scale: 0.98 }}
                                    >
                                        <img
                                            src={exp.image}
                                            alt={exp.title}
                                            className="absolute inset-0 w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        <div className="absolute inset-x-10 bottom-10">
                                            <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:border-secondary transition-all shadow-xl">
                                                {exp.icon}
                                            </div>
                                            <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-4">{exp.title}</h3>
                                            <p className="text-white/60 text-lg leading-snug group-hover:text-white transition-colors">{exp.subtitle}</p>
                                        </div>

                                        <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black shadow-2xl">
                                                <ArrowUpRight className="w-6 h-6" />
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            </FadeUpReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Editorial Trust Signals */}
            <section className="py-40 bg-[#050505] relative">
                <div className="container px-6 mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <div>
                            <FadeUpReveal>
                                <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">Brand Philosophy</span>
                            </FadeUpReveal>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-12">
                                For Those Who <br />
                                <span className="text-white/30">Never Compromise</span>
                            </h2>
                            <p className="text-white/50 text-xl font-light leading-relaxed max-w-lg mb-12">
                                Since our inception, we have curated a fleet that transcends utility. Every vehicle in our
                                stable is a testament to the pursuit of absolute perfection.
                            </p>
                            <Link href="/contact" className="group">
                                <MagneticButton className="h-20 px-12 bg-zinc-900 border border-white/10 rounded-full flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest hover:bg-secondary hover:border-secondary transition-all">
                                    Contact Our Concierge <ArrowRight className="w-4 h-4" />
                                </MagneticButton>
                            </Link>
                        </div>

                        <div className="grid gap-8">
                            {trustSignals.map((signal, i) => (
                                <FadeUpReveal key={i} delay={i * 0.1}>
                                    <div className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-secondary/30 transition-all flex items-center gap-10">
                                        <div className="w-20 h-20 rounded-3xl bg-white/5 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-inner">
                                            {signal.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-2">{signal.stat}</div>
                                            <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{signal.title}</h4>
                                            <p className="text-white/40 text-sm leading-relaxed">{signal.desc}</p>
                                        </div>
                                    </div>
                                </FadeUpReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
}
