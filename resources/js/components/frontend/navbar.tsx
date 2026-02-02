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
                ? "bg-background/95 backdrop-blur-xl border-b border-border/50 py-3 shadow-lg"
                : "bg-black/50 backdrop-blur-md py-4"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/">
                    <motion.div
                        className="flex items-center gap-3 group cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                    >
                        <div className={`rounded-full overflow-hidden ${!isScrolled ? "bg-white" : ""}`}>
                            <img
                                src="/logo.png"
                                alt="MC Rental Cars"
                                className="h-10 w-auto"
                            />
                        </div>
                        <span className={`font-bold text-lg hidden sm:block ${isScrolled ? "text-foreground" : "text-white"
                            }`}>
                            MC Rental Cars
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <div
                            key={link.href}
                            className="relative"
                            onMouseEnter={() => link.hasDropdown && setIsExperiencesOpen(true)}
                            onMouseLeave={() => link.hasDropdown && setIsExperiencesOpen(false)}
                        >
                            <Link href={link.href}>
                                <motion.div
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1 cursor-pointer ${isActive(link.href)
                                        ? "text-secondary"
                                        : isScrolled
                                            ? "text-foreground hover:text-secondary hover:bg-muted"
                                            : "text-white hover:text-secondary"
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    onClick={() => playClick()}
                                >
                                    {link.label}
                                    {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
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
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
                                        >
                                            <div className="p-2">
                                                {experiences.map((exp) => (
                                                    <Link key={exp.id} href={`/experiences/${exp.id}`}>
                                                        <motion.div
                                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors cursor-pointer text-foreground"
                                                            whileHover={{ x: 4 }}
                                                        >
                                                            <div
                                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                                style={{ backgroundColor: `${exp.color}20`, color: exp.color }}
                                                            >
                                                                {exp.icon}
                                                            </div>
                                                            <span className="font-medium">{exp.label}</span>
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

                    <div className={`w-px h-6 mx-4 ${isScrolled ? "bg-border" : "bg-white/30"}`} />

                    <div className="mr-4">
                        <ModeToggle className={isScrolled ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/20"} />
                    </div>

                    <Link href="/cars">
                        <MagneticButton
                            className={`h-11 px-6 rounded-xl font-bold text-sm uppercase tracking-widest transition-all ${isScrolled
                                ? "bg-secondary text-white hover:bg-secondary/90"
                                : "bg-white text-black hover:bg-white/90"
                                }`}
                            onClick={() => playClick()}
                        >
                            Book Now
                        </MagneticButton>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className={`lg:hidden w-12 h-12 rounded-xl flex items-center justify-center border ${isScrolled
                        ? "bg-muted text-foreground border-border"
                        : "bg-white/20 text-white border-white/30"
                        }`}
                    onClick={() => {
                        setIsMobileMenuOpen(!isMobileMenuOpen);
                        playClick();
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-border overflow-hidden lg:hidden shadow-xl"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`text-xl font-bold py-3 block transition-colors ${isActive(link.href)
                                            ? "text-secondary"
                                            : "text-foreground hover:text-secondary"
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
                                className="pt-4 mt-4 border-t border-border"
                            >
                                <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                                    <MagneticButton
                                        className="w-full h-14 bg-secondary text-white font-bold uppercase tracking-widest rounded-xl"
                                    >
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
