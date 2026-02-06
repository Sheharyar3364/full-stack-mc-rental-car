import { MagneticButton } from '@/components/ui/magnetic-button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useSoundEffects } from '@/hooks/use-sound-effects';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Crown, Menu, Mountain, Sparkles, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const experiences = [
    { id: 'grand-tour', label: 'The Grand Tour', icon: <Sparkles className="h-4 w-4" />, color: '#3b82f6' },
    { id: 'alpine-adventure', label: 'Alpine Adventure', icon: <Mountain className="h-4 w-4" />, color: '#10b981' },
    { id: 'red-carpet', label: 'Red Carpet', icon: <Crown className="h-4 w-4" />, color: '#ef4444' },
    { id: 'family-voyage', label: 'Family Voyage', icon: <Users className="h-4 w-4" />, color: '#f59e0b' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
    const { url, props } = usePage<SharedData>();
    const { auth } = props;

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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/cars', label: 'Fleet' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/experiences', label: 'Experiences', hasDropdown: true },
        { href: '/journal', label: 'Journal' },
        { href: '/contact', label: 'Contact' },
    ];

    const isActive = (href: string) => {
        if (href === '/') return url === '/';
        return url.startsWith(href);
    };

    return (
        <nav
            className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? 'border-b border-border/30 bg-background/80 py-3 shadow-lg shadow-black/5 backdrop-blur-2xl'
                    : 'bg-black/30 py-5 backdrop-blur-md'
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                {/* Logo */}
                <Link href="/">
                    <motion.div
                        className="group flex cursor-pointer items-center gap-3"
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                    >
                        <div
                            className={`overflow-hidden rounded-full ring-2 ring-offset-2 transition-all ${
                                isScrolled ? 'ring-secondary/20 ring-offset-background' : 'ring-white/20 ring-offset-black/50'
                            }`}
                        >
                            <img src="/logo.png" alt="MCRENTALCARS" className="h-11 w-auto" />
                        </div>
                        <span className={`hidden text-lg font-black tracking-tight sm:block ${isScrolled ? 'text-foreground' : 'text-white'}`}>
                            MCRENTALCARS
                        </span>
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden items-center gap-2 lg:flex">
                    {navLinks.map((link) => (
                        <div
                            key={link.href}
                            className="relative"
                            onMouseEnter={() => link.hasDropdown && setIsExperiencesOpen(true)}
                            onMouseLeave={() => link.hasDropdown && setIsExperiencesOpen(false)}
                        >
                            <Link href={link.href}>
                                <motion.div
                                    className={`group relative flex cursor-pointer items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                                        isActive(link.href)
                                            ? 'text-secondary'
                                            : isScrolled
                                              ? 'text-foreground/80 hover:text-foreground'
                                              : 'text-white/90 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playClick()}
                                >
                                    {link.label}
                                    {link.hasDropdown && (
                                        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isExperiencesOpen ? 'rotate-180' : ''}`} />
                                    )}
                                    {/* Active indicator */}
                                    {isActive(link.href) && (
                                        <motion.div
                                            layoutId="activeNav"
                                            className="absolute inset-0 -z-10 rounded-xl bg-secondary/10"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {/* Hover effect */}
                                    <div
                                        className={`absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity group-hover:opacity-100 ${
                                            isScrolled ? 'bg-muted/50' : 'bg-white/10'
                                        }`}
                                    />
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
                                            transition={{ duration: 0.2, ease: 'easeOut' }}
                                            className="absolute top-full left-0 mt-3 w-72 overflow-hidden rounded-2xl border border-border/50 bg-card/95 shadow-2xl backdrop-blur-2xl"
                                        >
                                            <div className="p-3">
                                                {experiences.map((exp, i) => (
                                                    <Link key={exp.id} href={`/experiences/${exp.id}`}>
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="group flex cursor-pointer items-center gap-4 rounded-xl px-4 py-3.5 text-foreground transition-all hover:bg-muted/50"
                                                            whileHover={{ x: 4 }}
                                                        >
                                                            <div
                                                                className="flex h-10 w-10 items-center justify-center rounded-xl shadow-lg transition-transform group-hover:scale-110"
                                                                style={{ backgroundColor: `${exp.color}15`, color: exp.color }}
                                                            >
                                                                {exp.icon}
                                                            </div>
                                                            <span className="text-sm font-semibold">{exp.label}</span>
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

                    <div className={`mx-3 h-6 w-[1px] ${isScrolled ? 'bg-border' : 'bg-white/20'}`} />

                    <div className="mr-2">
                        <ModeToggle className={isScrolled ? 'text-foreground hover:bg-muted/50' : 'text-white hover:bg-white/10'} />
                    </div>

                    {/* Auth Links */}
                    {auth.user ? (
                        <>
                            <Link href="/account">
                                <motion.div
                                    className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                        isActive('/account')
                                            ? 'bg-secondary/10 text-secondary'
                                            : isScrolled
                                              ? 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                                              : 'text-white/90 hover:bg-white/10 hover:text-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => playClick()}
                                >
                                    My Account
                                </motion.div>
                            </Link>
                            <Link
                                href="/logout"
                                method="post"
                                as="button"
                                className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                    isScrolled
                                        ? 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                                onClick={() => playClick()}
                            >
                                Logout
                            </Link>
                        </>
                    ) : (
                        <Link href="/login">
                            <motion.div
                                className={`cursor-pointer rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                                    isScrolled
                                        ? 'text-foreground/80 hover:bg-muted/50 hover:text-foreground'
                                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => playClick()}
                            >
                                Login
                            </motion.div>
                        </Link>
                    )}

                    <Link href="/cars">
                        <MagneticButton
                            className={`group relative h-12 overflow-hidden rounded-xl px-8 text-sm font-black tracking-wider uppercase transition-all ${
                                isScrolled
                                    ? 'bg-gradient-to-r from-secondary to-blue-600 text-white shadow-lg shadow-secondary/30'
                                    : 'bg-white text-black shadow-xl'
                            }`}
                            onClick={() => playClick()}
                        >
                            <span className="relative z-10">Book Now</span>
                            <div className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
                        </MagneticButton>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-all lg:hidden ${
                        isScrolled ? 'border-border/50 bg-muted/50 text-foreground' : 'border-white/20 bg-white/10 text-white backdrop-blur-md'
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
                                <X className="h-5 w-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu className="h-5 w-5" />
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
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="absolute top-full right-0 left-0 overflow-hidden border-b border-border/50 bg-background/95 shadow-2xl backdrop-blur-2xl lg:hidden"
                    >
                        <div className="container mx-auto flex flex-col gap-3 px-6 py-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`block rounded-xl px-4 py-4 text-2xl font-black transition-all ${
                                            isActive(link.href)
                                                ? 'bg-secondary/10 text-secondary'
                                                : 'text-foreground hover:bg-muted/50 hover:text-secondary'
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            {/* Mobile Auth Links */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: navLinks.length * 0.05, type: 'spring', stiffness: 300, damping: 24 }}
                                className="border-t border-border/50 pt-4"
                            >
                                {auth.user ? (
                                    <>
                                        <Link
                                            href="/account"
                                            className={`block rounded-xl px-4 py-4 text-2xl font-black transition-all ${
                                                isActive('/account')
                                                    ? 'bg-secondary/10 text-secondary'
                                                    : 'text-foreground hover:bg-muted/50 hover:text-secondary'
                                            }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            My Account
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="block w-full rounded-xl px-4 py-4 text-left text-2xl font-black text-foreground transition-all hover:bg-muted/50 hover:text-red-500"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="block rounded-xl px-4 py-4 text-2xl font-black text-foreground transition-all hover:bg-muted/50 hover:text-secondary"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                )}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: (navLinks.length + 1) * 0.05 }}
                                className="mt-4 border-t border-border/50 pt-6"
                            >
                                <Link href="/cars" onClick={() => setIsMobileMenuOpen(false)}>
                                    <MagneticButton className="h-16 w-full rounded-xl bg-gradient-to-r from-secondary to-blue-600 font-black tracking-widest text-white uppercase shadow-lg shadow-secondary/30">
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
