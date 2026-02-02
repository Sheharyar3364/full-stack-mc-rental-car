import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Menu, X, ChevronDown, Sparkles, Mountain, Crown, Users } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const experiences = [
    { id: "grand-tour", label: "The Grand Tour", icon: <Sparkles className="w-4 h-4" />, color: "#3b82f6" },
    { id: "alpine-adventure", label: "Alpine Adventure", icon: <Mountain className="w-4 h-4" />, color: "#10b981" },
    { id: "red-carpet", label: "Red Carpet", icon: <Crown className="w-4 h-4" />, color: "#ef4444" },
    { id: "family-voyage", label: "Family Voyage", icon: <Users className="w-4 h-4" />, color: "#f59e0b" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
    const { url } = usePage();

    const [location, setLocation] = useState(url);
    const { playClick } = useSoundEffects();

    useEffect(() => {
        setLocation(url);
    }, [url]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/cars", label: "Fleet" },
        { href: "/experiences", label: "Experiences", hasDropdown: true },
        { href: "/journal", label: "Journal" },
        { href: "/contact", label: "Contact" },
    ];

    const isActive = (href: string) => {
        if (href === "/") return url === "/";
        return url.startsWith(href);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-background/80 backdrop-blur-2xl border-b border-border/30 py-3 shadow-lg shadow-black/5"
                    : "bg-black/30 backdrop-blur-md py-5"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <motion.div
                        className="flex items-center gap-3 group cursor-pointer"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <div className={`rounded-full overflow-hidden ring-2 ring-offset-2 transition-all ${isScrolled
                                ? "ring-secondary/20 ring-offset-background"
                                : "ring-white/20 ring-offset-black/50"
                            }`}>
                            <img
                                src="/logo.png"
                                alt="MC Rental Cars"
                                className="h-11 w-auto"
                            />
                        </div>
                        <span className={`font-black text-lg hidden sm:block tracking-tight ${isScrolled ? "text-foreground" : "text-white"
                            }`}>
                            MC Rental Cars
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <div
                            key={link.href}
                            className="relative"
                            onMouseEnter={() => link.hasDropdown && setIsExperiencesOpen(true)}
                            onMouseLeave={() => link.hasDropdown && setIsExperiencesOpen(false)}
                        >
                            <Link href={link.href}>
                                <motion.div
                                    className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 cursor-pointer group ${isActive(link.href)
                                            ? "text-secondary"
                                            : isScrolled
                                                ? "text-foreground/80 hover:text-foreground"
                                                : "text-white/90 hover:text-white"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playClick()}
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isExperiencesOpen ? "rotate-180" : ""
                                            }`} />
                                    )}
                                    {/* Active indicator */}
                                    {isActive(link.href) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 bg-secondary/10 rounded-xl -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {/* Hover effect */}
                                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 ${isScrolled ? "bg-muted/50" : "bg-white/10"
                                        }`} />
                                </motion.div>
                            </Link>

                            {/* Experiences Dropdown */}
                            {link.hasDropdown && (
                                <AnimatePresence>
                                    {isExperiencesOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="absolute top-full left-0 mt-3 w-72 bg-card/95 backdrop-blur-2xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-3">
                                                {experiences.map((exp, i) => (
                                                    <Link key={exp.id} href={`/experiences/${exp.id}`}>
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="flex items-center gap-4 px-4 py-3.5 rounded-xl hover:bg-muted/50 transition-all cursor-pointer text-foreground group"
                                                            whileHover={{ x: 4 }}
                                                        >
                                                            <div
                                                                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                                                                style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                                                            >
                                                                {exp.icon}
                                                            </div>
                                                            <span className="font-semibold text-sm">{exp.label}</span>
                                                        </motion.div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>
                    ))}

                    <div className={`w-[1px] h-6 mx-3 ${isScrolled ? "bg-border" : "bg-white/20"}`} />

                    <div className="mr-2">
                        <ModeToggle className={isScrolled ? "text-foreground hover:bg-muted/50" : "text-white hover:bg-white/10"} />
                    </div>

                    <Link href="/cars">
                        <MagneticButton
                            className={`relative h-12 px-8 rounded-xl font-black text-sm uppercase tracking-wider transition-all overflow-hidden group ${isScrolled
                                    ? "bg-gradient-to-r from-secondary to-blue-600 text-white shadow-lg shadow-secondary/30"
                                    : "bg-white text-black shadow-xl"
                                }`}
                            onClick={() => playClick()}
                        >
                            <span className="relative z-10">Book Now</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </MagneticButton>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className={`lg:hidden w-12 h-12 rounded-xl flex items-center justify-center border transition-all ${isScrolled
                            ? "bg-muted/50 text-foreground border-border/50"
                            : "bg-white/10 text-white border-white/20 backdrop-blur-md"
                        }`}
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                        playClick();
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isMobileMenuOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-2xl border-b border-border/50 overflow-hidden lg:hidden shadow-2xl"
                    >
                        <div className="container mx-auto px-6 py-8 flex flex-col gap-3">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 24 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`text-2xl font-black py-4 px-4 block transition-all rounded-xl ${isActive(link.href)
                                                ? "text-secondary bg-secondary/10"
                                                : "text-foreground hover:text-secondary hover:bg-muted/50"
                                            }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-6 mt-4 border-t border-border/50"
                            >
                                <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                                    <MagneticButton className="w-full h-16 bg-gradient-to-r from-secondary to-blue-600 text-white font-black uppercase tracking-widest rounded-xl shadow-lg shadow-secondary/30">
                                        Book Your Ride
                                    </MagneticButton>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
