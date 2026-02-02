import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
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
    Award,
    Clock,
    Phone,
    Sparkles,
    Mountain,
    Crown,
    Search,
    CalendarCheck,
    CarFront,
    Star,
    MapPin,
    Headphones,
} from "lucide-react";

const featuredCars = [
    {
        id: 1,
        name: "BMW 7 Series",
        brand: "BMW",
        type: "Sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        price: 4500,
        seats: 5,
        fuel: "Petrol",
        transmission: "Automatic",
    },
    {
        id: 2,
        name: "Mercedes S-Class",
        brand: "Mercedes",
        type: "Luxury",
        image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
        price: 5000,
        seats: 5,
        fuel: "Petrol",
        transmission: "Automatic",
    },
    {
        id: 3,
        name: "Porsche 911",
        brand: "Porsche",
        type: "Sports",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
        price: 5500,
        seats: 2,
        fuel: "Petrol",
        transmission: "Automatic",
    },
];

const experiences = [
    {
        id: "grand-tour",
        title: "Grand Tour",
        subtitle: "Long-distance luxury",
        icon: <Sparkles className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600",
        color: "#3b82f6",
    },
    {
        id: "alpine-adventure",
        title: "Alpine Adventure",
        subtitle: "Conquer terrain",
        icon: <Mountain className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600",
        color: "#10b981",
    },
    {
        id: "red-carpet",
        title: "Red Carpet",
        subtitle: "Make an entrance",
        icon: <Crown className="w-6 h-6" />,
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600",
        color: "#ef4444",
    },
];

const howItWorks = [
    {
        step: "01",
        icon: <Search className="w-7 h-7" />,
        title: "Browse & Select",
        description: "Explore our premium fleet and find your perfect match",
    },
    {
        step: "02",
        icon: <CalendarCheck className="w-7 h-7" />,
        title: "Book Online",
        description: "Choose your dates with instant confirmation",
    },
    {
        step: "03",
        icon: <CarFront className="w-7 h-7" />,
        title: "Drive Away",
        description: "Pick up at your preferred location and enjoy",
    },
];

const trustSignals = [
    {
        icon: <Shield className="w-7 h-7" />,
        title: "Full Insurance",
        desc: "Comprehensive coverage included",
        stat: "100%",
    },
    {
        icon: <Headphones className="w-7 h-7" />,
        title: "24/7 Support",
        desc: "Always here when you need us",
        stat: "24/7",
    },
    {
        icon: <Star className="w-7 h-7" />,
        title: "Premium Fleet",
        desc: "Only the finest vehicles",
        stat: "50+",
    },
    {
        icon: <MapPin className="w-7 h-7" />,
        title: "Easy Pickup",
        desc: "Multiple convenient locations",
        stat: "10+",
    },
];

export default function Home() {
    return (
        <Layout>
            <Head title="MC Rental Cars - Premium Car Rentals" />
            <Hero />

            {/* How It Works - New Conversion Section */}
            <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
                <div className="container px-4 sm:px-6 mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <FadeUpReveal>
                            <span className="text-secondary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
                                Simple Process
                            </span>
                        </FadeUpReveal>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight">
                            <TextReveal delay={0.1}>How It</TextReveal>{" "}
                            <TextReveal className="text-secondary" delay={0.2}>Works</TextReveal>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
                        {howItWorks.map((item, i) => (
                            <FadeUpReveal key={i} delay={0.2 + i * 0.1}>
                                <motion.div
                                    className="relative text-center p-6 sm:p-8 rounded-2xl bg-card border border-border hover:border-secondary/30 transition-all group"
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Step number */}
                                    <span className="absolute top-4 right-4 text-[10px] font-black text-muted-foreground/30 tracking-widest">
                                        {item.step}
                                    </span>

                                    {/* Icon */}
                                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-5 group-hover:bg-secondary group-hover:text-white transition-all">
                                        {item.icon}
                                    </div>

                                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                    <p className="text-muted-foreground text-sm">{item.description}</p>

                                    {/* Connector line (desktop only) */}
                                    {i < howItWorks.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-4 w-8 lg:w-8 h-px bg-border" />
                                    )}
                                </motion.div>
                            </FadeUpReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Collection */}
            <section className="py-16 sm:py-24 lg:py-32 bg-background relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-secondary/5 to-transparent pointer-events-none" />

                <div className="container px-4 sm:px-6 mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-8 mb-10 lg:mb-16">
                        <div>
                            <FadeUpReveal>
                                <span className="text-secondary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
                                    Premium Selection
                                </span>
                            </FadeUpReveal>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.95] tracking-tight">
                                <TextReveal delay={0.1}>Featured</TextReveal>
                                <br />
                                <TextReveal className="text-muted-foreground" delay={0.2}>
                                    Collection
                                </TextReveal>
                            </h2>
                        </div>

                        <FadeUpReveal delay={0.3}>
                            <Link href="/cars">
                                <MagneticButton className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-foreground text-foreground font-bold uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-foreground hover:text-background transition-all group">
                                    View All Fleet
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </MagneticButton>
                            </Link>
                        </FadeUpReveal>
                    </div>

                    {/* Cards - Horizontal scroll on mobile */}
                    <div className="relative -mx-4 sm:mx-0">
                        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto sm:overflow-visible px-4 sm:px-0 pb-4 sm:pb-0 snap-x snap-mandatory sm:snap-none scrollbar-hide">
                            {featuredCars.map((car, i) => (
                                <FadeUpReveal key={car.id} delay={0.2 + i * 0.1} className="flex-shrink-0 w-[85%] sm:w-auto snap-center">
                                    <motion.div
                                        whileHover={{ y: -8 }}
                                        transition={{ duration: 0.3 }}
                                        className="group h-full"
                                    >
                                        <Card className="overflow-hidden border-0 bg-card shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-full rounded-2xl">
                                            <Link href={`/cars/${car.id}`}>
                                                <div className="relative aspect-[4/3] overflow-hidden">
                                                    <img
                                                        src={car.image}
                                                        alt={car.name}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                                                        <span className="px-2.5 sm:px-3 py-1 rounded-full bg-secondary text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                                                            {car.type}
                                                        </span>
                                                    </div>
                                                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                                                        <p className="text-white/60 text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                                                            {car.brand}
                                                        </p>
                                                        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
                                                            {car.name}
                                                        </h3>
                                                    </div>
                                                </div>
                                            </Link>

                                            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                                                <div className="flex items-center justify-between text-muted-foreground text-xs sm:text-sm">
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {car.seats}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {car.transmission}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <Fuel className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {car.fuel}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border">
                                                    <div>
                                                        <p className="text-muted-foreground text-[10px] sm:text-xs uppercase tracking-widest">
                                                            From
                                                        </p>
                                                        <p className="text-xl sm:text-2xl font-black">
                                                            €{car.price.toLocaleString()}
                                                            <span className="text-xs sm:text-sm font-normal text-muted-foreground">/day</span>
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <CompareButton car={car} />
                                                        <Link href={`/cars/${car.id}`}>
                                                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center hover:bg-secondary hover:text-white hover:border-secondary transition-all cursor-pointer">
                                                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                </FadeUpReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Categories */}
            <section className="py-16 sm:py-24 lg:py-32 bg-black text-white overflow-hidden">
                <div className="container px-4 sm:px-6 mx-auto">
                    <div className="text-center mb-10 lg:mb-16">
                        <FadeUpReveal>
                            <span className="text-secondary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
                                Beyond Transportation
                            </span>
                        </FadeUpReveal>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black uppercase leading-[0.95]">
                            <TextReveal delay={0.1}>Choose Your</TextReveal>
                            <br />
                            <TextReveal className="italic text-white/80" delay={0.2}>
                                Experience
                            </TextReveal>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                        {experiences.map((exp, i) => (
                            <FadeUpReveal key={exp.id} delay={0.2 + i * 0.1}>
                                <Link href={`/experiences#${exp.id}`}>
                                    <motion.div
                                        className="relative h-[300px] sm:h-[350px] lg:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden group cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <img
                                            src={exp.image}
                                            alt={exp.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div
                                            className="absolute inset-0 opacity-80 group-hover:opacity-70 transition-opacity"
                                            style={{
                                                background: `linear-gradient(to top, ${exp.color}, transparent)`,
                                            }}
                                        />
                                        <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
                                            <div
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4"
                                                style={{ backgroundColor: `${exp.color}40` }}
                                            >
                                                {exp.icon}
                                            </div>
                                            <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-1 sm:mb-2">
                                                {exp.title}
                                            </h3>
                                            <p className="text-white/70 text-sm sm:text-base">{exp.subtitle}</p>
                                        </div>
                                    </motion.div>
                                </Link>
                            </FadeUpReveal>
                        ))}
                    </div>

                    <FadeUpReveal delay={0.5}>
                        <div className="text-center mt-10 lg:mt-12">
                            <Link href="/experiences">
                                <MagneticButton className="h-12 sm:h-14 px-8 sm:px-10 border-2 border-white text-white font-bold uppercase tracking-widest text-xs sm:text-sm rounded-xl hover:bg-white hover:text-black transition-all">
                                    Explore All Experiences
                                </MagneticButton>
                            </Link>
                        </div>
                    </FadeUpReveal>
                </div>
            </section>

            {/* Trust Signals - Premium Redesign */}
            <section className="py-16 sm:py-20 lg:py-24 bg-muted/30 relative overflow-hidden">
                {/* Subtle background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-secondary/5 pointer-events-none" />

                <div className="container px-4 sm:px-6 mx-auto relative z-10">
                    <div className="text-center mb-10 lg:mb-14">
                        <FadeUpReveal>
                            <span className="text-secondary text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] mb-3 block">
                                Why Choose Us
                            </span>
                        </FadeUpReveal>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight">
                            <TextReveal delay={0.1}>Trusted by </TextReveal>
                            <TextReveal className="text-secondary" delay={0.2}>Thousands</TextReveal>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                        {trustSignals.map((signal, i) => (
                            <FadeUpReveal key={i} delay={i * 0.1}>
                                <motion.div
                                    className="relative text-center p-5 sm:p-6 lg:p-8 rounded-2xl bg-background border border-border hover:border-secondary/30 transition-all group"
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Stat badge */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-secondary text-white text-[10px] font-black rounded-full">
                                        {signal.stat}
                                    </div>

                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary group-hover:text-white transition-all">
                                        {signal.icon}
                                    </div>
                                    <h4 className="font-bold text-sm sm:text-base lg:text-lg mb-1">{signal.title}</h4>
                                    <p className="text-muted-foreground text-xs sm:text-sm">{signal.desc}</p>
                                </motion.div>
                            </FadeUpReveal>
                        ))}
                    </div>
                </div>
            </section>
        </Layout>
    );
}
