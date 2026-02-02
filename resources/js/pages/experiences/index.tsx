import { Link } from "@inertiajs/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { ArrowRight, Mountain, Crown, Users, Compass } from "lucide-react";
import { useRef } from "react";

const experiences = [
    {
        id: "grand-tour",
        title: "The Grand Tour",
        subtitle: "Long-distance luxury",
        description: "Cross countries in supreme comfort. Mercedes S-Class, BMW 7 Series, and Audi A8 await your journey.",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200",
        icon: <Compass className="w-8 h-8" />,
        gradient: "from-blue-900 to-slate-900",
        accent: "#3b82f6",
        cars: ["Mercedes S-Class", "BMW 7 Series", "Audi A8"],
    },
    {
        id: "alpine-adventure",
        title: "Alpine Adventure",
        subtitle: "Conquer any terrain",
        description: "Mountains call for power. Range Rover, Porsche Cayenne, and Mercedes G-Class are ready for the expedition.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
        icon: <Mountain className="w-8 h-8" />,
        gradient: "from-emerald-900 to-slate-900",
        accent: "#10b981",
        cars: ["Range Rover", "Porsche Cayenne", "Mercedes G-Class"],
    },
    {
        id: "red-carpet",
        title: "Red Carpet Arrival",
        subtitle: "Make an entrance",
        description: "For moments that demand attention. Rolls Royce, Bentley, and Lamborghini for unforgettable arrivals.",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200",
        icon: <Crown className="w-8 h-8" />,
        gradient: "from-red-900 to-slate-900",
        accent: "#ef4444",
        cars: ["Rolls Royce Ghost", "Bentley Continental", "Lamborghini Huracán"],
    },
    {
        id: "family-voyage",
        title: "Family Voyage",
        subtitle: "Space meets safety",
        description: "Create memories together. Spacious, safe, and comfortable vehicles for the whole family.",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200",
        icon: <Users className="w-8 h-8" />,
        gradient: "from-amber-900 to-slate-900",
        accent: "#f59e0b",
        cars: ["BMW X7", "Mercedes GLS", "Volvo XC90"],
    },
];

export function ExperienceCard({ experience, index }: { experience: typeof experiences[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <motion.div
            ref={ref}
            className="relative h-[80vh] min-h-[600px] overflow-hidden group"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* Background */}
            <motion.div className="absolute inset-0" style={{ y }}>
                <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-[120%] object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${experience.gradient} opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-2xl">
                        <FadeUpReveal delay={0.1}>
                            <div
                                className="inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6"
                                style={{ backgroundColor: `${experience.accent}20`, color: experience.accent }}
                            >
                                {experience.icon}
                                <span className="text-sm font-bold uppercase tracking-widest">
                                    {experience.subtitle}
                                </span>
                            </div>
                        </FadeUpReveal>

                        <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] text-white mb-6">
                            <TextReveal delay={0.2}>{experience.title}</TextReveal>
                        </h2>

                        <FadeUpReveal delay={0.4}>
                            <p className="text-xl text-white/70 leading-relaxed mb-8 max-w-lg">
                                {experience.description}
                            </p>
                        </FadeUpReveal>

                        <FadeUpReveal delay={0.5}>
                            <div className="flex flex-wrap gap-2 mb-10">
                                {experience.cars.map((car, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium backdrop-blur-sm"
                                    >
                                        {car}
                                    </span>
                                ))}
                            </div>
                        </FadeUpReveal>

                        <FadeUpReveal delay={0.6}>
                            <Link href={`/experiences/${experience.id}`}>
                                <MagneticButton
                                    className="h-16 px-10 text-white font-black uppercase tracking-widest rounded-none group/btn"
                                    style={{ backgroundColor: experience.accent }}
                                >
                                    Explore Collection
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                                </MagneticButton>
                            </Link>
                        </FadeUpReveal>
                    </div>
                </div>
            </div>

            {/* Index number */}
            <div className="absolute bottom-10 right-10 text-9xl font-black text-white/5">
                0{index + 1}
            </div>
        </motion.div>
    );
}

export default function ExperiencesPage() {
    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-black overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-secondary text-sm font-black uppercase tracking-[0.4em] mb-6"
                    >
                        Beyond Transportation
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase text-white leading-[0.85]">
                        <TextReveal delay={0.3}>Choose Your</TextReveal>
                        <br />
                        <TextReveal className="italic" delay={0.4}>Experience</TextReveal>
                    </h1>
                </div>
            </div>

            {/* Experience Cards */}
            <div className="bg-black">
                {experiences.map((exp, i) => (
                    <ExperienceCard key={exp.id} experience={exp} index={i} />
                ))}
            </div>
        </Layout>
    );
}
