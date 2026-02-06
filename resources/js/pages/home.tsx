import { Hero } from '@/components/frontend/hero';
import { Layout } from '@/components/frontend/layout';
import { Card } from '@/components/ui/card';
import { CompareButton } from '@/components/ui/compare-mode';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Crown, Monitor, Mountain, Shield, Sparkles, Users, Zap } from 'lucide-react';

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
        id: 'grand-tour',
        title: 'Grand Tour',
        subtitle: 'Continental luxury for the nomad soul.',
        icon: <Sparkles className="h-5 w-5 text-secondary" />,
        image: '/images/gallery/luxury_suv_gallery_1770125084892.png',
        color: '#3b82f6',
        className: 'md:col-span-2',
    },
    {
        id: 'alpine-adventure',
        title: 'Alpine Adventure',
        subtitle: 'Conquer altitudes with precision.',
        icon: <Mountain className="h-5 w-5 text-emerald-400" />,
        image: '/images/gallery/sports_car_mountain_road_1770125099659.png',
        color: '#10b981',
        className: 'md:col-span-1',
    },
    {
        id: 'red-carpet',
        title: 'Red Carpet',
        subtitle: 'Arrive in a statement of pure class.',
        icon: <Crown className="h-5 w-5 text-rose-500" />,
        image: '/images/gallery/classic_car_european_street_1770125114528.png',
        color: '#ef4444',
        className: 'md:col-span-3',
    },
];

const trustSignals = [
    {
        icon: <Shield className="h-6 w-6" />,
        title: 'Royal Coverage',
        desc: 'Bespoke insurance policies for peace of mind.',
        stat: 'SECURED',
    },
    {
        icon: <Zap className="h-6 w-6" />,
        title: '24/7 Concierge',
        desc: 'Global support team at your immediate beck and call.',
        stat: 'ALWAYS',
    },
    {
        icon: <Monitor className="h-6 w-6" />,
        title: 'Digital Sync',
        desc: 'Manage your reservation through our cutting-edge app.',
        stat: 'SYNCED',
    },
];

export default function Home({ featuredCars, locations }: HomeProps) {
    return (
        <Layout>
            <Head title="MCRENTALCARS | The Pinnacle of Premium Performance" />
            <Hero locations={locations} />

            {/* Featured Collection: Bento Style */}
            <section className="relative overflow-hidden bg-[#080808] py-32">
                <div className="absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/5 blur-[120px]" />

                <div className="relative z-10 container mx-auto px-6">
                    <div className="mb-20 flex flex-col items-end justify-between gap-12 md:flex-row">
                        <div className="max-w-3xl">
                            <FadeUpReveal>
                                <div className="mb-6 flex items-center gap-3 text-secondary">
                                    <Sparkles className="h-4 w-4 fill-current" />
                                    <span className="text-[10px] font-black tracking-[0.4em] uppercase">The 2026 Collection</span>
                                </div>
                            </FadeUpReveal>
                            <h2 className="text-6xl leading-[0.85] font-black tracking-tighter text-white uppercase md:text-8xl">
                                <TextReveal>Featured</TextReveal> <br />
                                <span className="text-white/20">
                                    <TextReveal>Masterpieces</TextReveal>
                                </span>
                            </h2>
                        </div>
                        <FadeUpReveal delay={0.4}>
                            <Link href="/cars" className="group">
                                <MagneticButton className="flex h-20 items-center gap-4 rounded-full border border-white/10 px-12 text-xs font-black tracking-widest text-white uppercase transition-all hover:bg-white hover:text-black">
                                    Browse Full Catalog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                                </MagneticButton>
                            </Link>
                        </FadeUpReveal>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {featuredCars.map((car, i) => (
                            <FadeUpReveal key={car.id} delay={0.2 + i * 0.1}>
                                <motion.div whileHover={{ y: -10 }} className="group relative">
                                    <Card className="overflow-hidden rounded-[2.5rem] border-white/5 bg-zinc-900/50 backdrop-blur-sm transition-all duration-500 group-hover:border-secondary/30">
                                        <Link href={`/cars/${car.id}`} className="relative block aspect-[4/5] overflow-hidden">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="h-full w-full object-cover grayscale-[0.2] transition-transform duration-1000 group-hover:scale-110 group-hover:grayscale-0"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                                            {/* Top Info */}
                                            <div className="absolute top-8 left-8 flex flex-col gap-2">
                                                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[9px] font-black tracking-widest text-white uppercase backdrop-blur-xl">
                                                    {car.brand}
                                                </div>
                                                <div className="rounded-full bg-secondary/80 px-4 py-1.5 text-[9px] font-black tracking-widest text-white uppercase shadow-lg backdrop-blur-xl">
                                                    Available
                                                </div>
                                            </div>

                                            {/* Bottom Info */}
                                            <div className="absolute right-8 bottom-8 left-8">
                                                <h3 className="mb-4 text-4xl font-black tracking-tighter text-white uppercase transition-colors group-hover:text-secondary">
                                                    {car.name}
                                                </h3>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                                                        <Users className="h-3 w-3" /> {car.seats} Seats
                                                    </div>
                                                    <div className="h-1 w-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-white/50 uppercase">
                                                        <Zap className="h-3 w-3" /> {car.transmission}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>

                                        <div className="flex items-center justify-between p-8">
                                            <div>
                                                <span className="mb-1 block text-[10px] font-bold tracking-widest text-white/30 uppercase">
                                                    Starting From
                                                </span>
                                                <div className="text-3xl font-black text-white">
                                                    €{car.price.toLocaleString()}
                                                    <span className="ml-2 text-sm font-light text-white/30">/Day</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CompareButton car={car} />
                                                <Link href={`/cars/${car.id}`}>
                                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white transition-all hover:border-secondary hover:bg-secondary">
                                                        <ArrowRight className="h-6 w-6" />
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
            <section className="relative overflow-hidden bg-black py-32">
                <div className="container mx-auto px-6">
                    <div className="mb-24 text-center">
                        <FadeUpReveal>
                            <span className="mb-4 block text-xs font-black tracking-[0.4em] text-secondary uppercase">Crafted Moments</span>
                        </FadeUpReveal>
                        <h2 className="text-6xl font-black tracking-tighter text-white uppercase md:text-8xl">
                            <TextReveal>Ultimate</TextReveal> <br />
                            <span className="text-white/20 italic">
                                <TextReveal>Experiences</TextReveal>
                            </span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {experiences.map((exp, i) => (
                            <FadeUpReveal key={exp.id} delay={0.2 + i * 0.1} className={exp.className}>
                                <Link href={`/experiences#${exp.id}`}>
                                    <motion.div
                                        className="group relative h-[500px] cursor-pointer overflow-hidden rounded-[3rem]"
                                        whileHover={{ scale: 0.98 }}
                                    >
                                        <img
                                            src={exp.image}
                                            alt={exp.title}
                                            className="absolute inset-0 h-full w-full object-cover grayscale-[0.4] transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                        <div className="absolute inset-x-10 bottom-10">
                                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-xl transition-all group-hover:border-secondary group-hover:bg-secondary">
                                                {exp.icon}
                                            </div>
                                            <h3 className="mb-4 text-4xl font-black tracking-tight text-white uppercase">{exp.title}</h3>
                                            <p className="text-lg leading-snug text-white/60 transition-colors group-hover:text-white">
                                                {exp.subtitle}
                                            </p>
                                        </div>

                                        <div className="absolute top-10 right-10 opacity-0 transition-opacity group-hover:opacity-100">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-2xl">
                                                <ArrowUpRight className="h-6 w-6" />
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
            <section className="relative bg-[#050505] py-40">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 items-center gap-24 lg:grid-cols-2">
                        <div>
                            <FadeUpReveal>
                                <span className="mb-8 block text-[10px] font-black tracking-[0.5em] text-secondary uppercase">Brand Philosophy</span>
                            </FadeUpReveal>
                            <h2 className="mb-12 text-5xl leading-none font-black tracking-tighter text-white uppercase md:text-7xl">
                                For Those Who <br />
                                <span className="text-white/30">Never Compromise</span>
                            </h2>
                            <p className="mb-12 max-w-lg text-xl leading-relaxed font-light text-white/50">
                                Since our inception, we have curated a fleet that transcends utility. Every vehicle in our stable is a testament to
                                the pursuit of absolute perfection.
                            </p>
                            <Link href="/contact" className="group">
                                <MagneticButton className="flex h-20 items-center gap-4 rounded-full border border-white/10 bg-zinc-900 px-12 text-xs font-black tracking-widest text-white uppercase transition-all hover:border-secondary hover:bg-secondary">
                                    Contact Our Concierge <ArrowRight className="h-4 w-4" />
                                </MagneticButton>
                            </Link>
                        </div>

                        <div className="grid gap-8">
                            {trustSignals.map((signal, i) => (
                                <FadeUpReveal key={i} delay={i * 0.1}>
                                    <div className="group flex items-center gap-10 rounded-[2.5rem] border border-white/5 bg-zinc-900/40 p-10 transition-all hover:border-secondary/30">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-secondary shadow-inner transition-all group-hover:bg-secondary group-hover:text-white">
                                            {signal.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-2 text-[10px] font-black tracking-[0.4em] text-secondary uppercase">{signal.stat}</div>
                                            <h4 className="mb-2 text-2xl font-black tracking-tight text-white uppercase">{signal.title}</h4>
                                            <p className="text-sm leading-relaxed text-white/40">{signal.desc}</p>
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
