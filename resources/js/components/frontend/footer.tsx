import { Link } from "@inertiajs/react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    CreditCard,
    Shield,
    ChevronRight,
    Zap,
    Sparkles,
    ShieldCheck,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const footerLinks = {
    legacy: [
        { label: "Our Story", href: "/contact" },
        { label: "The Stable", href: "/fleet" },
        { label: "Bespoke Services", href: "/services" },
        { label: "Contact Concierge", href: "/contact" },
    ],
    stable: [
        { label: "Performance Cars", href: "/cars?type=sports" },
        { label: "Grand Tourers", href: "/cars?type=luxury" },
        { label: "Elite SUVs", href: "/cars?type=suv" },
        { label: "Executive Sedans", href: "/cars?type=sedan" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="relative bg-[#050505] text-white overflow-hidden w-full border-t border-white/5">
            {/* Background Texture/Image */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 transform scale-110">
                <img
                    src="/images/gallery/footer_bg.png"
                    alt="Footer Decoration"
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            </div>

            {/* Massive Background Logo for Editorial Look */}
            <div className="absolute bottom-[-5%] left-[-2%] right-0 pointer-events-none select-none z-0 overflow-hidden hidden lg:block">
                <span className="text-[18vw] font-black uppercase text-white/[0.02] tracking-tighter whitespace-nowrap leading-none">
                    MC RENTAL CARS
                </span>
            </div>

            {/* Newsletter Section - "The Membership" */}
            <div className="relative z-10 border-b border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
                <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="max-w-xl text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.3em] mb-8"
                            >
                                <Sparkles className="w-3.5 h-3.5" /> Private Access
                            </motion.div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9] mb-6">
                                Join The <br />
                                <span className="text-secondary italic">Digital Stable</span>
                            </h2>
                            <p className="text-white/40 text-lg font-medium leading-relaxed">
                                Curated insights, priority access to new acquisitions, and exclusive membership privileges.
                            </p>
                        </div>

                        <div className="w-full max-w-lg">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 group-focus-within:opacity-100 blur transition-opacity" />
                                <div className="relative flex flex-col sm:flex-row gap-4 p-2 bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-grow bg-transparent px-6 py-4 text-sm font-medium focus:outline-none placeholder:text-white/20"
                                    />
                                    <button className="h-14 px-8 bg-secondary text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.3em] shadow-xl shadow-secondary/20 hover:bg-secondary/90 hover:shadow-secondary/30 transition-all flex items-center justify-center gap-3">
                                        Subscribe <ArrowRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="text-[10px] font-mono text-white/20 mt-6 text-center lg:text-left tracking-widest uppercase">
                                STATUS: ENCRYPTION_ACTIVE | PROTECTED BY MC_SHIELD
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links & Brand */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-24">
                    {/* Brand Philosophy */}
                    <div className="lg:col-span-4 space-y-10">
                        <Link href="/">
                            <div className="flex items-center gap-3 group cursor-pointer transform hover:scale-105 transition-transform">
                                <div className="rounded-full overflow-hidden ring-2 ring-white/20 ring-offset-2 ring-offset-[#050505] transition-all group-hover:ring-secondary/50">
                                    <img
                                        src="/logo.png"
                                        alt="MC Rental Cars"
                                        className="h-12 w-auto"
                                    />
                                </div>
                                <span className="font-black text-xl tracking-tight text-white">
                                    MC Rental Cars
                                </span>
                            </div>
                        </Link>
                        <p className="text-white/40 text-base font-medium leading-relaxed max-w-xs">
                            We deliver more than performance; we deliver unmatched distinction. Brussels' premier destination for automotive excellence.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary hover:scale-110 transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5 text-white/30 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Groups */}
                    <div className="lg:col-span-2 space-y-10">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">
                            Legacy
                        </h4>
                        <ul className="space-y-6">
                            {footerLinks.legacy.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="group flex items-center gap-3">
                                        <div className="w-1.5 h-[1px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                        <span className="text-white/30 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-2 space-y-10">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">
                            Stable
                        </h4>
                        <ul className="space-y-6">
                            {footerLinks.stable.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="group flex items-center gap-3 text-left">
                                        <div className="w-1.5 h-[1px] bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                                        <span className="text-white/30 text-sm font-bold uppercase tracking-widest group-hover:text-white transition-colors whitespace-nowrap">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sync (Contact) Info */}
                    <div className="lg:col-span-4 space-y-10">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-secondary">
                            Concierge
                        </h4>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-5 h-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block">HQ_LOCATION</span>
                                    <span className="text-white font-bold text-sm leading-relaxed">
                                        Brussels, Belgium <br />
                                        Private Vault Access
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-5 h-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block">DIRECT_SYNC</span>
                                    <a href="tel:+920000525" className="text-white font-bold text-sm block hover:text-secondary transition-colors">
                                        + (32) 488 000 000
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-5 h-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block">SECURE_MAIL</span>
                                    <a href="mailto:info@mcrentalcars.com" className="text-white font-bold text-sm block hover:text-secondary transition-colors">
                                        concierge@mcrental.be
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar - Minimalist Intelligence */}
            <div className="relative z-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-8">
                            <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase text-center md:text-left">
                                © {new Date().getFullYear()} MC RENTAL CARS BELGIUM
                            </p>
                            <div className="hidden md:flex items-center gap-6">
                                <div className="flex items-center gap-2 text-white/10 text-[9px] uppercase tracking-[0.2em] font-black">
                                    <ShieldCheck className="w-3 h-3" /> Encrypted Sync
                                </div>
                                <div className="flex items-center gap-2 text-white/10 text-[9px] uppercase tracking-[0.2em] font-black">
                                    <Lock className="w-3 h-3" /> Secure Auth
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <Link href="/contact" className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">Privacy</Link>
                            <Link href="/contact" className="text-[10px] font-black text-white/20 uppercase tracking-widest hover:text-white transition-colors">Legal</Link>
                            <div className="w-px h-4 bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">SYSTEM_LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
