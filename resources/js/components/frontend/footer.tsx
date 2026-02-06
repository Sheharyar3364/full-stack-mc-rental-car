import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Facebook, Instagram, Linkedin, Lock, Mail, MapPin, Phone, ShieldCheck, Sparkles, Twitter } from 'lucide-react';

const footerLinks = {
    legacy: [
        { label: 'Our Story', href: '/contact' },
        { label: 'The Stable', href: '/fleet' },
        { label: 'Bespoke Services', href: '/services' },
        { label: 'Contact Concierge', href: '/contact' },
    ],
    stable: [
        { label: 'Performance Cars', href: '/cars?type=sports' },
        { label: 'Grand Tourers', href: '/cars?type=luxury' },
        { label: 'Elite SUVs', href: '/cars?type=suv' },
        { label: 'Executive Sedans', href: '/cars?type=sedan' },
    ],
};

const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export function Footer() {
    return (
        <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505] text-white">
            {/* Background Texture/Image */}
            <div className="pointer-events-none absolute inset-0 z-0 scale-110 transform opacity-20">
                <img src="/images/gallery/footer_bg.png" alt="Footer Decoration" className="h-full w-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
            </div>

            {/* Massive Background Logo for Editorial Look */}
            <div className="pointer-events-none absolute right-0 bottom-[-5%] left-[-2%] z-0 hidden overflow-hidden select-none lg:block">
                <span className="text-[18vw] leading-none font-black tracking-tighter whitespace-nowrap text-white/[0.02] uppercase">
                    MCRENTALCARS
                </span>
            </div>

            {/* Newsletter Section - "The Membership" */}
            <div className="relative z-10 border-b border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent">
                <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                    <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                        <div className="max-w-xl text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="mb-8 inline-flex items-center gap-3 rounded-full border border-secondary/20 bg-secondary/10 px-4 py-2 text-[10px] font-black tracking-[0.3em] text-secondary uppercase"
                            >
                                <Sparkles className="h-3.5 w-3.5" /> Private Access
                            </motion.div>
                            <h2 className="mb-6 text-4xl leading-[0.9] font-black tracking-tighter uppercase md:text-6xl">
                                Join The <br />
                                <span className="text-secondary italic">Digital Stable</span>
                            </h2>
                            <p className="text-lg leading-relaxed font-medium text-white/40">
                                Curated insights, priority access to new acquisitions, and exclusive membership privileges.
                            </p>
                        </div>

                        <div className="w-full max-w-lg">
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 to-transparent opacity-0 blur transition-opacity group-focus-within:opacity-100" />
                                <div className="relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl sm:flex-row">
                                    <input
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="flex-grow bg-transparent px-6 py-4 text-sm font-medium placeholder:text-white/20 focus:outline-none"
                                    />
                                    <button className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-secondary px-8 text-[10px] font-black tracking-[0.3em] text-white uppercase shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90 hover:shadow-secondary/30">
                                        Subscribe <ArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                            <p className="mt-6 text-center font-mono text-[10px] tracking-widest text-white/20 uppercase lg:text-left">
                                STATUS: ENCRYPTION_ACTIVE | PROTECTED BY MC_SHIELD
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links & Brand */}
            <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:py-32">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24 lg:grid-cols-12">
                    {/* Brand Philosophy */}
                    <div className="space-y-10 lg:col-span-4">
                        <Link href="/">
                            <div className="group flex transform cursor-pointer items-center gap-3 transition-transform hover:scale-105">
                                <div className="overflow-hidden rounded-full ring-2 ring-white/20 ring-offset-2 ring-offset-[#050505] transition-all group-hover:ring-secondary/50">
                                    <img src="/logo.png" alt="MCRENTALCARS" className="h-12 w-auto" />
                                </div>
                                <span className="text-xl font-black tracking-tight text-white">MCRENTALCARS</span>
                            </div>
                        </Link>
                        <p className="max-w-xs text-base leading-relaxed font-medium text-white/40">
                            We deliver more than performance; we deliver unmatched distinction. Brussels' premier destination for automotive
                            excellence.
                        </p>
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] transition-all hover:scale-110 hover:border-secondary hover:bg-secondary"
                                    aria-label={social.label}
                                >
                                    <social.icon className="h-5 w-5 text-white/30 transition-colors group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav Groups */}
                    <div className="space-y-10 lg:col-span-2">
                        <h4 className="text-[11px] font-black tracking-[0.4em] text-secondary uppercase">Legacy</h4>
                        <ul className="space-y-6">
                            {footerLinks.legacy.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="group flex items-center gap-3">
                                        <div className="h-[1px] w-1.5 origin-left scale-x-0 bg-secondary transition-transform group-hover:scale-x-100" />
                                        <span className="text-sm font-bold tracking-widest text-white/30 uppercase transition-colors group-hover:text-white">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-10 lg:col-span-2">
                        <h4 className="text-[11px] font-black tracking-[0.4em] text-secondary uppercase">Stable</h4>
                        <ul className="space-y-6">
                            {footerLinks.stable.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="group flex items-center gap-3 text-left">
                                        <div className="h-[1px] w-1.5 origin-left scale-x-0 bg-secondary transition-transform group-hover:scale-x-100" />
                                        <span className="text-sm font-bold tracking-widest whitespace-nowrap text-white/30 uppercase transition-colors group-hover:text-white">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sync (Contact) Info */}
                    <div className="space-y-10 lg:col-span-4">
                        <h4 className="text-[11px] font-black tracking-[0.4em] text-secondary uppercase">Concierge</h4>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <MapPin className="h-5 w-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="block font-mono text-[10px] tracking-widest text-white/20 uppercase">HQ_LOCATION</span>
                                    <span className="text-sm leading-relaxed font-bold text-white">
                                        Brussels, Belgium <br />
                                        Private Vault Access
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <Phone className="h-5 w-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="block font-mono text-[10px] tracking-widest text-white/20 uppercase">DIRECT_SYNC</span>
                                    <a href="tel:+920000525" className="block text-sm font-bold text-white transition-colors hover:text-secondary">
                                        + (32) 488 000 000
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <Mail className="h-5 w-5 text-white/30" />
                                </div>
                                <div className="space-y-1">
                                    <span className="block font-mono text-[10px] tracking-widest text-white/20 uppercase">SECURE_MAIL</span>
                                    <a
                                        href="mailto:info@mcrentalcars.com"
                                        className="block text-sm font-bold text-white transition-colors hover:text-secondary"
                                    >
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
                <div className="mx-auto max-w-7xl px-6 py-10">
                    <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
                        <div className="flex items-center gap-8">
                            <p className="text-center font-mono text-[10px] tracking-widest text-white/20 uppercase md:text-left">
                                © {new Date().getFullYear()} MCRENTALCARS BELGIUM
                            </p>
                            <div className="hidden items-center gap-6 md:flex">
                                <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-white/10 uppercase">
                                    <ShieldCheck className="h-3 w-3" /> Encrypted Sync
                                </div>
                                <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] text-white/10 uppercase">
                                    <Lock className="h-3 w-3" /> Secure Auth
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-10">
                            <Link
                                href="/contact"
                                className="text-[10px] font-black tracking-widest text-white/20 uppercase transition-colors hover:text-white"
                            >
                                Privacy
                            </Link>
                            <Link
                                href="/contact"
                                className="text-[10px] font-black tracking-widest text-white/20 uppercase transition-colors hover:text-white"
                            >
                                Legal
                            </Link>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                                <span className="font-mono text-[10px] tracking-widest text-white/20 uppercase">SYSTEM_LIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
