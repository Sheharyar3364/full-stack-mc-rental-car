import { useRef, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { MapPin, Calendar, ArrowRight, Star, Sparkles, ShieldCheck, Zap } from "lucide-react";

export function Hero({ locations = [] }: { locations?: { id: number; name: string }[] }) {
    const [locationId, setLocationId] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleSearch = () => {
        const params: any = {};
        if (locationId) params.location_id = locationId;
        if (pickupDate) params.pickup_date = pickupDate;
        if (dropoffDate) params.dropoff_date = dropoffDate;
        router.get("/cars", params);
    };

    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 800], [0, 300]);
    const opacity = useTransform(scrollY, [0, 500], [1, 0]);
    const scale = useTransform(scrollY, [0, 800], [1, 1.1]);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-[110vh] flex items-center justify-center overflow-hidden bg-[#050505]"
        >
            {/* Cinematic Background Layer */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{ y, scale }}
            >
                <img
                    src="/images/gallery/hero_bg.png"
                    alt="Luxury Car Background"
                    className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                />

                {/* Advanced Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(26,115,232,0.15)_0%,transparent_50%)] z-10" />

                {/* Digital Grain/Noise */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-10" />
            </motion.div>

            {/* Main Content Container */}
            <motion.div
                className="container relative z-30 flex flex-col lg:flex-row items-center justify-between gap-16 px-6 pt-24 pb-32"
                style={{ opacity }}
            >
                {/* Left Side: Editorial Branding */}
                <div className="flex-1 w-full max-w-4xl">
                    <FadeUpReveal delay={0.2}>
                        <div className="flex flex-wrap items-center gap-4 mb-12">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 40 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-px bg-secondary"
                            />
                            <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em]">
                                Est. 2026 • Private Collection
                            </span>
                            <div className="flex gap-1 items-center px-3 py-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                                <ShieldCheck className="w-3 h-3 text-secondary" />
                                <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Verified Luxury</span>
                            </div>
                        </div>
                    </FadeUpReveal>

                    <h1 className="font-black uppercase leading-[0.8] tracking-tighter mb-12">
                        <div className="overflow-hidden">
                            <TextReveal
                                className="text-white block text-[clamp(4rem,12vw,9rem)]"
                                delay={0.3}
                            >
                                DEFINING
                            </TextReveal>
                        </div>
                        <div className="flex items-center gap-6 overflow-hidden">
                            <TextReveal
                                className="text-secondary block text-[clamp(4rem,12vw,9rem)] drop-shadow-[0_0_40px_rgba(26,115,232,0.4)]"
                                delay={0.4}
                            >
                                MASTER
                            </TextReveal>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                                className="h-2 w-32 bg-white/10 origin-left hidden lg:block"
                            />
                        </div>
                        <div className="overflow-hidden">
                            <TextReveal
                                className="text-white block text-[clamp(4rem,12vw,9rem)]"
                                delay={0.5}
                            >
                                PIECES
                            </TextReveal>
                        </div>
                    </h1>

                    <FadeUpReveal delay={0.6}>
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-16">
                            <p className="text-white/40 text-lg md:text-xl font-medium max-w-md leading-relaxed tracking-tight border-l-2 border-secondary/50 pl-6">
                                Not just a rental service. An exclusive gateway to the world's most desired engineering marvels.
                            </p>
                            <div className="hidden md:block transition-transform hover:rotate-12">
                                <Sparkles className="w-8 h-8 text-secondary/30" />
                            </div>
                        </div>
                    </FadeUpReveal>

                    <FadeUpReveal delay={0.8}>
                        <div className="flex flex-wrap items-center gap-6">
                            <Link href="/cars" className="group">
                                <MagneticButton className="h-20 px-14 bg-white text-black font-black uppercase text-xs tracking-[0.3em] rounded-full overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-secondary/20 transition-all duration-500">
                                    <span className="relative z-10 flex items-center gap-3">
                                        Explore Fleet <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                    </span>
                                </MagneticButton>
                            </Link>
                            <div className="flex -space-x-3 items-center group cursor-pointer">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center overflow-hidden transition-transform group-hover:translate-x-1">
                                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                    </div>
                                ))}
                                <div className="pl-6">
                                    <div className="text-white font-bold text-sm tracking-tight">Trusted by 5,000+</div>
                                    <div className="flex gap-0.5 text-secondary">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 fill-current" />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeUpReveal>
                </div>

                {/* Right Side: High-Tech Booking Terminal */}
                <FadeUpReveal delay={0.9} className="w-full lg:max-w-[440px]">
                    <div
                        className={`relative transition-all duration-700 ${isFocused ? 'scale-[1.02]' : 'scale-100'}`}
                        onMouseEnter={() => setIsFocused(true)}
                        onMouseLeave={() => setIsFocused(false)}
                    >
                        {/* Plasma Aura Effect */}
                        <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 via-blue-500/10 to-purple-500/20 rounded-[3rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                        <div className="relative bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-[0_40px_100px_rgba(0,0,0,0.6)] overflow-hidden">
                            {/* Technical Details Overlay */}
                            <div className="absolute top-0 right-0 p-6 opacity-20 pointer-events-none">
                                <div className="text-[8px] font-mono text-white/50 space-y-1">
                                    <div>AUTH_NODE: 0xFF12</div>
                                    <div>ENCRYPT: AES-256</div>
                                    <div>LAT: 45.4642° N</div>
                                </div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <Zap className="w-6 h-6 text-secondary group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black uppercase tracking-[0.2em] text-[10px] mb-1">Instant Access</h3>
                                        <div className="h-1 w-12 bg-secondary/60 rounded-full" />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    {/* Location Input */}
                                    <div className="group/field relative">
                                        <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 block">Pick-up Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/field:text-secondary transition-colors" />
                                            <select
                                                value={locationId}
                                                onChange={(e) => setLocationId(e.target.value)}
                                                className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-6 py-5 text-white text-sm focus:bg-white/[0.07] focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 transition-all outline-none appearance-none cursor-pointer"
                                            >
                                                <option value="" className="bg-zinc-900">Select City</option>
                                                {locations.map(loc => <option key={loc.id} value={loc.id} className="bg-zinc-900">{loc.name}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Date Range */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="group/field relative">
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 block">From</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/field:text-secondary transition-colors pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={pickupDate}
                                                    onChange={(e) => setPickupDate(e.target.value)}
                                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-4 py-5 text-white text-[11px] focus:bg-white/[0.07] focus:border-secondary/40 transition-all outline-none [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>
                                        <div className="group/field relative">
                                            <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 block">To</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within/field:text-secondary transition-colors pointer-events-none" />
                                                <input
                                                    type="date"
                                                    value={dropoffDate}
                                                    onChange={(e) => setDropoffDate(e.target.value)}
                                                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl pl-14 pr-4 py-5 text-white text-[11px] focus:bg-white/[0.07] focus:border-secondary/40 transition-all outline-none [color-scheme:dark]"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Action */}
                                    <button
                                        onClick={handleSearch}
                                        className="relative w-full h-20 bg-secondary hover:bg-secondary/90 text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl transition-all duration-500 shadow-[0_20px_50px_rgba(26,115,232,0.3)] hover:shadow-secondary/50 overflow-hidden flex items-center justify-center gap-4 group/btn"
                                    >
                                        <span className="relative z-10">Check Availability</span>
                                        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeUpReveal>
            </motion.div>

            {/* Side Coordinates Decoration */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-24 hidden xl:block text-[10px] font-mono text-white/10 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
                <span>Global Discovery Hub</span>
                <span>Active 24/7/365</span>
            </div>

            <div className="absolute right-10 top-1/2 -translate-y-1/2 space-y-24 hidden xl:block text-[10px] font-mono text-white/10 uppercase tracking-[0.5em] [writing-mode:vertical-lr] rotate-180">
                <span>Secure Terminal 0.1v</span>
                <span>Automated Sync</span>
            </div>
        </div>
    );
}
