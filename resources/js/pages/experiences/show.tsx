import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { Card } from "@/components/ui/card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { CompareButton } from "@/components/ui/compare-mode";
import { FadeUpReveal, TextReveal } from "@/components/ui/text-reveal";
import {
    ArrowRight,
    ArrowLeft,
    Users,
    Fuel,
    Settings,
    Sparkles,
    Mountain,
    Crown,
    Compass,
} from "lucide-react";

const experiences = [
    {
        id: "grand-tour",
        title: "The Grand Tour",
        subtitle: "Long-distance luxury",
        description: "Cross countries in supreme comfort. These vehicles are engineered for the open road, combining effortless power with unparalleled refinement. Whether it's a weekend escape or a cross-continental journey, arrive refreshed and inspired.",
        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200",
        icon: <Compass className="w-8 h-8" />,
        gradient: "from-blue-900 to-slate-900",
        accent: "#3b82f6",
        cars: [
            {
                id: 1,
                name: "Mercedes S-Class",
                brand: "Mercedes",
                type: "Luxury Sedan",
                image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
                price: 5000,
                seats: 5,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 2,
                name: "BMW 7 Series",
                brand: "BMW",
                type: "Executive Sedan",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
                price: 4500,
                seats: 5,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 3,
                name: "Audi A8",
                brand: "Audi",
                type: "Luxury Sedan",
                image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
                price: 4200,
                seats: 5,
                fuel: "Petrol",
                transmission: "Automatic",
            },
        ],
    },
    {
        id: "alpine-adventure",
        title: "Alpine Adventure",
        subtitle: "Conquer any terrain",
        description: "Mountains call for power. These commanding SUVs combine rugged capability with luxurious comfort. From snow-covered passes to rocky trails, dominate any landscape while surrounded by premium amenities.",
        image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
        icon: <Mountain className="w-8 h-8" />,
        gradient: "from-emerald-900 to-slate-900",
        accent: "#10b981",
        cars: [
            {
                id: 4,
                name: "Range Rover",
                brand: "Land Rover",
                type: "Luxury SUV",
                image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800",
                price: 5500,
                seats: 5,
                fuel: "Diesel",
                transmission: "Automatic",
            },
            {
                id: 5,
                name: "Porsche Cayenne",
                brand: "Porsche",
                type: "Performance SUV",
                image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
                price: 4800,
                seats: 5,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 6,
                name: "Mercedes G-Class",
                brand: "Mercedes",
                type: "Luxury Off-Road",
                image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800",
                price: 6000,
                seats: 5,
                fuel: "Petrol",
                transmission: "Automatic",
            },
        ],
    },
    {
        id: "red-carpet",
        title: "Red Carpet Arrival",
        subtitle: "Make an entrance",
        description: "For moments that demand attention. These supercars and ultra-luxury vehicles are designed to make statements. Whether it's a gala, a wedding, or a special celebration, arrive in a way that will be remembered.",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200",
        icon: <Crown className="w-8 h-8" />,
        gradient: "from-red-900 to-slate-900",
        accent: "#ef4444",
        cars: [
            {
                id: 7,
                name: "Rolls Royce Ghost",
                brand: "Rolls Royce",
                type: "Ultra Luxury",
                image: "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800",
                price: 12000,
                seats: 4,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 8,
                name: "Lamborghini Huracán",
                brand: "Lamborghini",
                type: "Supercar",
                image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
                price: 8000,
                seats: 2,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 9,
                name: "Bentley Continental",
                brand: "Bentley",
                type: "Grand Tourer",
                image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800",
                price: 7500,
                seats: 4,
                fuel: "Petrol",
                transmission: "Automatic",
            },
        ],
    },
    {
        id: "family-voyage",
        title: "Family Voyage",
        subtitle: "Space meets safety",
        description: "Create memories together. These spacious, safe, and comfortable vehicles are perfect for family adventures. Room for everyone, entertainment for the kids, and peace of mind for the parents.",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200",
        icon: <Users className="w-8 h-8" />,
        gradient: "from-amber-900 to-slate-900",
        accent: "#f59e0b",
        cars: [
            {
                id: 10,
                name: "BMW X7",
                brand: "BMW",
                type: "Luxury SUV",
                image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
                price: 4000,
                seats: 7,
                fuel: "Petrol",
                transmission: "Automatic",
            },
            {
                id: 11,
                name: "Mercedes GLS",
                brand: "Mercedes",
                type: "Full-Size SUV",
                image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800",
                price: 4500,
                seats: 7,
                fuel: "Diesel",
                transmission: "Automatic",
            },
            {
                id: 12,
                name: "Volvo XC90",
                brand: "Volvo",
                type: "Premium SUV",
                image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=800",
                price: 3500,
                seats: 7,
                fuel: "Hybrid",
                transmission: "Automatic",
            },
        ],
    },
];

export default function ExperienceDetailPage({ id }: { id: string }) {
    const experience = experiences.find((e) => e.id === id);

    if (!experience) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-black uppercase mb-4">Experience Not Found</h1>
                        <Link href="/experiences">
                            <MagneticButton className="h-12 px-6">Back to Experiences</MagneticButton>
                        </Link>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={experience.image}
                        alt={experience.title}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${experience.gradient} opacity-80`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <FadeUpReveal>
                                <Link href="/experiences">
                                    <button className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        <span className="text-sm uppercase tracking-widest">All Experiences</span>
                                    </button>
                                </Link>
                            </FadeUpReveal>

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

                            <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.9] mb-6">
                                <TextReveal delay={0.2}>{experience.title}</TextReveal>
                            </h1>

                            <FadeUpReveal delay={0.4}>
                                <p className="text-xl text-white/70 leading-relaxed max-w-2xl">
                                    {experience.description}
                                </p>
                            </FadeUpReveal>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cars Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-4xl font-black uppercase">Curated Selection</h2>
                        <p className="text-muted-foreground mt-2">
                            Hand-picked vehicles for the {experience.title.toLowerCase()} experience
                        </p>
                    </div>
                    <p className="text-muted-foreground">
                        {experience.cars.length} vehicles available
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {experience.cars.map((car, i) => (
                        <FadeUpReveal key={car.id} delay={i * 0.1}>
                            <motion.div whileHover={{ y: -10 }} className="group">
                                <Card className="overflow-hidden border-0 bg-card shadow-xl hover:shadow-2xl transition-all h-full">
                                    <Link href={`/cars/${car.id}`}>
                                        <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            <div className="absolute top-4 left-4">
                                                <span
                                                    className="px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest"
                                                    style={{ backgroundColor: experience.accent }}
                                                >
                                                    {car.type}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                                                    {car.brand}
                                                </p>
                                                <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                                                    {car.name}
                                                </h3>
                                            </div>
                                        </div>
                                    </Link>

                                    <div className="p-6 space-y-4">
                                        <div className="flex items-center justify-between text-muted-foreground text-sm">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4" /> {car.seats}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Settings className="w-4 h-4" /> {car.transmission}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Fuel className="w-4 h-4" /> {car.fuel}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between pt-4 border-t border-border">
                                            <div>
                                                <p className="text-muted-foreground text-xs uppercase tracking-widest">From</p>
                                                <p className="text-2xl font-black">
                                                    €{car.price.toLocaleString()}
                                                    <span className="text-sm font-normal text-muted-foreground">/day</span>
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <CompareButton car={car} />
                                                <Link href={`/cars/${car.id}`}>
                                                    <div
                                                        className="w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer"
                                                        style={{ backgroundColor: `${experience.accent}20`, color: experience.accent }}
                                                    >
                                                        <ArrowRight className="w-5 h-5" />
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

            {/* Other Experiences */}
            <div className="bg-muted/30 py-20">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-black uppercase mb-8">Other Experiences</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {experiences
                            .filter((e) => e.id !== id)
                            .slice(0, 3)
                            .map((exp, i) => (
                                <FadeUpReveal key={exp.id} delay={i * 0.1}>
                                    <Link href={`/experiences/${exp.id}`}>
                                        <motion.div
                                            className="relative h-48 rounded-2xl overflow-hidden group cursor-pointer"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <img
                                                src={exp.image}
                                                alt={exp.title}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div
                                                className="absolute inset-0 opacity-80"
                                                style={{ background: `linear-gradient(to top, ${exp.accent}, transparent)` }}
                                            />
                                            <div className="absolute inset-0 flex items-end p-6">
                                                <div>
                                                    <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                                                        {exp.subtitle}
                                                    </p>
                                                    <h3 className="text-xl font-black text-white uppercase">{exp.title}</h3>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                </FadeUpReveal>
                            ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
