import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompareButton } from "@/components/ui/compare-mode";
import { AvailabilityCalendar } from "@/components/ui/availability-calendar";
import { FadeUpReveal, TextReveal } from "@/components/ui/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
    Users,
    Fuel,
    Settings,
    Phone,
    Shield,
    Check,
    ChevronLeft,
    ChevronRight,
    Heart,
    Sparkles,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Mock data
const carImages = [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600",
    "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
    "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600",
];

const car = {
    id: 1,
    name: "BMW 7 Series",
    brand: "BMW",
    type: "Executive Sedan",
    year: 2023,
    price: 4500,
    seats: 5,
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "3.0L Twin Turbo",
    power: "530 HP",
    topSpeed: "250 km/h",
    acceleration: "4.1s",
    image: carImages[0],
    description:
        "Designed for those who arrive before they're announced. Rear-seat comfort rivaling private jets, with technology that anticipates every move.",
    features: [
        "Leather Interior",
        "Panoramic Sunroof",
        "Massage Seats",
        "360° Camera",
        "Adaptive Cruise Control",
        "Night Vision",
        "Premium Sound System",
        "Wireless Charging",
    ],
};

interface Props {
    car?: typeof car;
}

export default function CarShow({ car: carProp }: Props) {
    const displayCar = carProp || car;
    const [currentImage, setCurrentImage] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);

    return (
        <Layout>
            <Head title={`${displayCar.name} - MC Rental Cars`} />
            <div className="bg-background min-h-screen text-foreground">
                {/* Hero Section with Gallery */}
                <div className="relative bg-black">
                    <div className="max-w-[1440px] mx-auto px-6 pt-24 pb-12">
                        {/* Breadcrumb */}
                        <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 mb-8">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/cars" className="hover:text-white transition-colors">
                                Fleet
                            </Link>
                            <span>/</span>
                            <span className="text-white font-bold">{displayCar.name}</span>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left: Title & Quick Info */}
                            <div className="space-y-8">
                                <FadeUpReveal>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-bold uppercase tracking-widest">
                                            {displayCar.type}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                                            Available Now
                                        </span>
                                    </div>
                                </FadeUpReveal>

                                <div>
                                    <p className="text-secondary text-sm font-black uppercase tracking-[0.3em] mb-2">
                                        {displayCar.brand}
                                    </p>
                                    <h1 className="text-5xl md:text-7xl font-black uppercase text-white leading-[0.9] tracking-tight">
                                        <TextReveal delay={0.1}>{displayCar.name}</TextReveal>
                                    </h1>
                                    <p className="text-white/40 text-2xl font-light mt-2">{displayCar.year}</p>
                                </div>

                                <FadeUpReveal delay={0.3}>
                                    <p className="text-white/60 text-lg leading-relaxed italic max-w-md">
                                        "{displayCar.description}"
                                    </p>
                                </FadeUpReveal>

                                {/* Quick Specs */}
                                <FadeUpReveal delay={0.4}>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                                            <Users className="w-6 h-6 text-secondary mx-auto mb-2" />
                                            <p className="text-white font-bold">{displayCar.seats}</p>
                                            <p className="text-white/40 text-xs uppercase tracking-widest">Seats</p>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                                            <Settings className="w-6 h-6 text-secondary mx-auto mb-2" />
                                            <p className="text-white font-bold">{displayCar.transmission}</p>
                                            <p className="text-white/40 text-xs uppercase tracking-widest">Gearbox</p>
                                        </div>
                                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-center">
                                            <Fuel className="w-6 h-6 text-secondary mx-auto mb-2" />
                                            <p className="text-white font-bold">{displayCar.fuel}</p>
                                            <p className="text-white/40 text-xs uppercase tracking-widest">Fuel</p>
                                        </div>
                                    </div>
                                </FadeUpReveal>

                                {/* Price & CTA */}
                                <FadeUpReveal delay={0.5}>
                                    <div className="flex items-end gap-6">
                                        <div>
                                            <p className="text-white/40 text-sm uppercase tracking-widest">From</p>
                                            <p className="text-4xl font-black text-white">
                                                €{displayCar.price.toLocaleString()}
                                                <span className="text-lg font-normal text-white/40">/day</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Link href={`/payment/${displayCar.id}`}>
                                                <MagneticButton className="h-14 px-8 bg-secondary text-white font-bold uppercase tracking-widest rounded-xl">
                                                    <Sparkles className="w-4 h-4 mr-2" />
                                                    Book Now
                                                </MagneticButton>
                                            </Link>
                                            <button
                                                onClick={() => setWishlisted(!wishlisted)}
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${wishlisted
                                                    ? "bg-red-500 text-white"
                                                    : "bg-white/10 text-white hover:bg-white/20"
                                                    }`}
                                            >
                                                <Heart className={`w-6 h-6 ${wishlisted ? "fill-current" : ""}`} />
                                            </button>
                                        </div>
                                    </div>
                                </FadeUpReveal>

                                {/* Compare */}
                                <FadeUpReveal delay={0.6}>
                                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                                        <CompareButton car={displayCar} />
                                    </div>
                                </FadeUpReveal>
                            </div>

                            {/* Right: Gallery */}
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-card">
                                        <img
                                            src={carImages[currentImage]}
                                            alt={displayCar.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                                            <button
                                                onClick={() =>
                                                    setCurrentImage((p) => (p === 0 ? carImages.length - 1 : p - 1))
                                                }
                                                className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setCurrentImage((p) => (p + 1) % carImages.length)
                                                }
                                                className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {carImages.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentImage(i)}
                                                className={`aspect-video rounded-lg overflow-hidden border-2 ${currentImage === i ? "border-secondary" : "border-transparent opacity-60"
                                                    }`}
                                            >
                                                <img src={img} alt="" className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="max-w-[1440px] mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Specs & Features Tabs */}
                            <Tabs defaultValue="specs" className="w-full">
                                <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-12 p-0 gap-8">
                                    <TabsTrigger
                                        value="specs"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent font-bold uppercase tracking-widest text-xs text-muted-foreground"
                                    >
                                        Performance
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="features"
                                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent font-bold uppercase tracking-widest text-xs text-muted-foreground"
                                    >
                                        Features
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="specs" className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                                    {[
                                        { label: "Engine", value: displayCar.engine },
                                        { label: "Power", value: displayCar.power },
                                        { label: "Top Speed", value: displayCar.topSpeed },
                                        { label: "0-100 km/h", value: displayCar.acceleration },
                                    ].map((spec, i) => (
                                        <div key={i}>
                                            <p className="text-secondary text-[10px] font-black uppercase tracking-widest mb-1">
                                                {spec.label}
                                            </p>
                                            <p className="text-2xl font-black">{spec.value}</p>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="features" className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {displayCar.features.map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check className="w-4 h-4 text-secondary" />
                                            <span className="text-sm">{f}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>

                            {/* Trust */}
                            <div className="flex items-center gap-6 p-6 rounded-2xl bg-muted/50 border border-border">
                                <Shield className="w-12 h-12 text-secondary" />
                                <div>
                                    <h4 className="font-bold text-lg">Platinum Protection Included</h4>
                                    <p className="text-muted-foreground">
                                        Full insurance coverage, 24/7 roadside assistance, and free cancellation up to 24h
                                        before pickup.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Calendar & Contact */}
                        <div className="space-y-6">
                            <AvailabilityCalendar basePrice={displayCar.price} className="sticky top-24" />

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-14 uppercase text-xs font-black">
                                    <Phone className="w-4 h-4 mr-2" />
                                    Call Agent
                                </Button>
                                <Button className="h-14 bg-green-600 hover:bg-green-700 text-white uppercase text-xs font-black">
                                    <FaWhatsapp className="w-5 h-5 mr-2" />
                                    WhatsApp
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
