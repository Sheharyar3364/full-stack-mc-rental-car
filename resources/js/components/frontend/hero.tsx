import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { MapPin, Calendar, Clock, ArrowRight, Star, Sparkles } from "lucide-react";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 1000], [0, 400]);
    const opacity = useTransform(scrollY, [0, 600], [1, 0]);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Background Image with Ken Burns Effect */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y }}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            >
                <img
                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=2400&q=80"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover opacity-70"
                />

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

                {/* Radial spotlight effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-60" />

                {/* Grain Texture for Film Look */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="container relative z-20 flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-24 px-6 pt-20"
                style={{ opacity }}
            >
                {/* Left: Branding & Copy */}
                <div className="flex-1 w-full max-w-3xl text-center lg:text-left">
                    <FadeUpReveal delay={0.2}>
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-10">
                            <span className="px-4 py-1.5 rounded-full border border-white/20 bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/90 backdrop-blur-md shadow-lg">
                                Model Year 2026
                            </span>
                            <div className="flex gap-0.5 text-secondary drop-shadow-[0_0_8px_rgba(26,115,232,0.5)]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                                ))}
                            </div>
                        </div>
                    </FadeUpReveal>

                    <h1 className="font-black uppercase leading-[0.85] tracking-tighter mb-10">
                        <TextReveal
                            className="text-white block text-[clamp(3.5rem,11vw,8rem)] drop-shadow-2xl"
                            delay={0.3}
                        >
                            BEYOND
                        </TextReveal>
                        <div className="flex flex-col lg:block">
                            <TextReveal
                                className="text-secondary block text-[clamp(3.5rem,11vw,8rem)] lg:inline-block lg:mr-5 drop-shadow-[0_0_30px_rgba(26,115,232,0.6)]"
                                delay={0.4}
                            >
                                FIRST
                            </TextReveal>
                            <TextReveal
                                className="text-white block text-[clamp(3.5rem,11vw,8rem)] lg:inline-block drop-shadow-2xl"
                                delay={0.5}
                            >
                                CLASS
                            </TextReveal>
                        </div>
                    </h1>

                    <FadeUpReveal delay={0.6}>
                        <p className="text-white/80 text-lg md:text-xl font-light max-w-xl mx-auto lg:mx-0 leading-relaxed mb-12 tracking-wide">
                            Experience the art of motion. A curated collection of the world's most prestigious vehicles, ready for your command.
                        </p>
                    </FadeUpReveal>

                    <FadeUpReveal delay={0.8}>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                            <Link href="/cars" className="w-full sm:w-auto group">
                                <MagneticButton className="relative w-full sm:w-auto h-16 px-12 bg-white text-black font-black uppercase text-sm tracking-[0.2em] overflow-hidden hover:scale-105 transition-all duration-300 shadow-2xl">
                                    <span className="relative z-10">View Collection</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-secondary to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </MagneticButton>
                            </Link>
                            <Link href="/experiences" className="w-full sm:w-auto group">
                                <button className="relative w-full sm:w-auto h-16 px-12 border-2 border-white/30 text-white font-bold uppercase text-sm tracking-[0.2em] hover:border-white/60 transition-all duration-300 backdrop-blur-sm text-center flex items-center justify-center gap-3 overflow-hidden">
                                    <span className="relative z-10">Experiences</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </button>
                            </Link>
                        </div>
                    </FadeUpReveal>
                </div>

                {/* Right: Premium Booking Widget */}
                <FadeUpReveal delay={0.7} className="hidden lg:block w-full max-w-md">
                    <div className="relative group/card">
                        {/* Glow effect behind card */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-blue-500/20 to-secondary/20 rounded-3xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 p-10 shadow-2xl overflow-hidden rounded-2xl group-hover/card:border-white/20 transition-all duration-500">
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-blue-600/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                            {/* Top accent line with animation */}
                            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-secondary to-transparent opacity-60" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-white font-bold uppercase tracking-[0.25em] text-xs flex items-center gap-3">
                                        <div className="w-1 h-5 bg-gradient-to-b from-secondary to-blue-600 rounded-full" />
                                        <span>Quick Reservation</span>
                                    </h3>
                                    <Sparkles className="w-4 h-4 text-secondary/60 animate-pulse" />
                                </div>

                                <div className="space-y-7">
                                    <div className="space-y-3">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            Location
                                        </label>
                                        <div className="relative group/input">
                                            <input
                                                type="text"
                                                placeholder="City or Airport Code"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/30 focus:bg-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 outline-none"
                                            />
                                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold flex items-center gap-2">
                                                <Calendar className="w-3 h-3" />
                                                Date
                                            </label>
                                            <div className="relative group/input">
                                                <input
                                                    type="text"
                                                    placeholder="Select"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm placeholder:text-white/30 focus:bg-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 outline-none"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-semibold flex items-center gap-2">
                                                <Clock className="w-3 h-3" />
                                                Time
                                            </label>
                                            <div className="relative group/input">
                                                <input
                                                    type="text"
                                                    placeholder="10:00 AM"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm placeholder:text-white/30 focus:bg-white/10 focus:border-secondary/50 focus:ring-2 focus:ring-secondary/20 transition-all duration-300 outline-none"
                                                />
                                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/0 via-secondary/5 to-secondary/0 opacity-0 group-hover/input:opacity-100 transition-opacity pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/cars" className="block mt-8">
                                        <button className="relative w-full h-16 bg-gradient-to-r from-secondary to-blue-600 hover:from-secondary/90 hover:to-blue-600/90 text-white font-black uppercase tracking-[0.25em] text-sm transition-all duration-300 flex items-center justify-center gap-3 group overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 hover:scale-[1.02] active:scale-[0.98] rounded-xl">
                                            <span className="relative z-10">Search Availability</span>
                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeUpReveal>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3"
                animate={{ y: [0, 10, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/40 to-transparent" />
                <span className="text-white/50 text-[8px] uppercase tracking-[0.3em] font-semibold">
                    Scroll
                </span>
            </motion.div>
        </div>
    );
}
