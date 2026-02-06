import { Layout } from '@/components/frontend/layout';
import { AvailabilityCalendar } from '@/components/ui/availability-calendar';
import { Button } from '@/components/ui/button';
import { CompareButton } from '@/components/ui/compare-mode';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Head, Link } from '@inertiajs/react';
import { Check, ChevronLeft, ChevronRight, Fuel, Heart, Phone, Settings, Shield, Sparkles, Users } from 'lucide-react';
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

interface CarData {
    id: number;
    name: string;
    brand: string;
    type: string;
    year: number;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
    image: string;
    description?: string;
    engine?: string;
    power?: string;
    topSpeed?: string;
    acceleration?: string;
    features?: string[];
    images?: string[];
}

interface BookedDateRange {
    start: string;
    end: string;
}

interface CarShowProps {
    car: CarData;
    relatedCars?: CarData[];
    bookedDates?: BookedDateRange[];
}

export default function CarShow({ car, relatedCars, bookedDates = [] }: CarShowProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const [wishlisted, setWishlisted] = useState(false);

    // Use car images or fallback to default
    const displayImages =
        car.images && car.images.length > 0
            ? car.images
            : [
                  car.image,
                  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1600',
                  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600',
              ];

    return (
        <Layout>
            <Head title={`${car.name} - MCRENTALCARS`} />
            <div className="min-h-screen bg-background text-foreground">
                {/* Hero Section with Gallery */}
                <div className="relative bg-black">
                    <div className="mx-auto max-w-[1440px] px-6 pt-24 pb-12">
                        {/* Breadcrumb */}
                        <nav className="mb-8 flex items-center gap-2 text-xs tracking-widest text-white/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/cars" className="transition-colors hover:text-white">
                                Fleet
                            </Link>
                            <span>/</span>
                            <span className="font-bold text-white">{car.name}</span>
                        </nav>

                        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
                            {/* Left: Title & Quick Info */}
                            <div className="space-y-8">
                                <FadeUpReveal>
                                    <div className="mb-4 flex items-center gap-3">
                                        <span className="rounded-full bg-secondary/20 px-3 py-1 text-xs font-bold tracking-widest text-secondary uppercase">
                                            {car.type}
                                        </span>
                                        <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold tracking-widest text-green-400 uppercase">
                                            Available Now
                                        </span>
                                    </div>
                                </FadeUpReveal>

                                <div>
                                    <p className="mb-2 text-sm font-black tracking-[0.3em] text-secondary uppercase">{car.brand}</p>
                                    <h1 className="text-5xl leading-[0.9] font-black tracking-tight text-white uppercase md:text-7xl">
                                        <TextReveal delay={0.1}>{car.name}</TextReveal>
                                    </h1>
                                    <p className="mt-2 text-2xl font-light text-white/40">{car.year}</p>
                                </div>

                                <FadeUpReveal delay={0.3}>
                                    <p className="max-w-md text-lg leading-relaxed text-white/60 italic">
                                        "{car.description || `Experience the ultimate in luxury and performance with the ${car.name}.`}"
                                    </p>
                                </FadeUpReveal>

                                {/* Quick Specs */}
                                <FadeUpReveal delay={0.4}>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
                                            <Users className="mx-auto mb-2 h-6 w-6 text-secondary" />
                                            <p className="font-bold text-white">{car.seats}</p>
                                            <p className="text-xs tracking-widest text-white/40 uppercase">Seats</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
                                            <Settings className="mx-auto mb-2 h-6 w-6 text-secondary" />
                                            <p className="font-bold text-white">{car.transmission}</p>
                                            <p className="text-xs tracking-widest text-white/40 uppercase">Gearbox</p>
                                        </div>
                                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-md">
                                            <Fuel className="mx-auto mb-2 h-6 w-6 text-secondary" />
                                            <p className="font-bold text-white">{car.fuel}</p>
                                            <p className="text-xs tracking-widest text-white/40 uppercase">Fuel</p>
                                        </div>
                                    </div>
                                </FadeUpReveal>

                                {/* Price & CTA */}
                                <FadeUpReveal delay={0.5}>
                                    <div className="flex items-end gap-6">
                                        <div>
                                            <p className="text-sm tracking-widest text-white/40 uppercase">From</p>
                                            <p className="text-4xl font-black text-white">
                                                €{car.price.toLocaleString()}
                                                <span className="text-lg font-normal text-white/40">/day</span>
                                            </p>
                                        </div>

                                        <div className="flex gap-3">
                                            <Link href={`/booking/create?car_id=${car.id}`}>
                                                <MagneticButton className="h-14 rounded-xl bg-secondary px-8 font-bold tracking-widest text-white uppercase">
                                                    <Sparkles className="mr-2 h-4 w-4" />
                                                    Book Now
                                                </MagneticButton>
                                            </Link>
                                            <button
                                                onClick={() => setWishlisted(!wishlisted)}
                                                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all ${
                                                    wishlisted ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
                                                }`}
                                            >
                                                <Heart className={`h-6 w-6 ${wishlisted ? 'fill-current' : ''}`} />
                                            </button>
                                        </div>
                                    </div>
                                </FadeUpReveal>

                                {/* Compare */}
                                <FadeUpReveal delay={0.6}>
                                    <div className="flex items-center gap-4 border-t border-white/10 pt-4">
                                        <CompareButton car={car} />
                                    </div>
                                </FadeUpReveal>
                            </div>

                            {/* Right: Gallery */}
                            <div className="space-y-4">
                                <div className="space-y-4">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-card">
                                        <img src={displayImages[currentImage]} alt={car.name} className="h-full w-full object-cover" />
                                        <div className="absolute right-4 bottom-4 left-4 flex justify-between">
                                            <button
                                                onClick={() => setCurrentImage((p) => (p === 0 ? displayImages.length - 1 : p - 1))}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
                                            >
                                                <ChevronLeft className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => setCurrentImage((p) => (p + 1) % displayImages.length)}
                                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white"
                                            >
                                                <ChevronRight className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-2">
                                        {displayImages.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setCurrentImage(i)}
                                                className={`aspect-video overflow-hidden rounded-lg border-2 ${
                                                    currentImage === i ? 'border-secondary' : 'border-transparent opacity-60'
                                                }`}
                                            >
                                                <img src={img} alt="" className="h-full w-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Sections */}
                <div className="mx-auto max-w-[1440px] px-6 py-16">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Main Content */}
                        <div className="space-y-12 lg:col-span-2">
                            {/* Specs & Features Tabs */}
                            <Tabs defaultValue="specs" className="w-full">
                                <TabsList className="h-12 w-full justify-start gap-8 rounded-none border-b border-border bg-transparent p-0">
                                    <TabsTrigger
                                        value="specs"
                                        className="rounded-none border-b-2 border-transparent text-xs font-bold tracking-widest text-muted-foreground uppercase data-[state=active]:border-secondary data-[state=active]:bg-transparent"
                                    >
                                        Performance
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="features"
                                        className="rounded-none border-b-2 border-transparent text-xs font-bold tracking-widest text-muted-foreground uppercase data-[state=active]:border-secondary data-[state=active]:bg-transparent"
                                    >
                                        Features
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="specs" className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
                                    {[
                                        { label: 'Engine', value: car.engine || '3.0L' },
                                        { label: 'Power', value: car.power || '350 HP' },
                                        { label: 'Top Speed', value: car.topSpeed || '250 km/h' },
                                        { label: '0-100 km/h', value: car.acceleration || '5.0s' },
                                    ].map((spec, i) => (
                                        <div key={i}>
                                            <p className="mb-1 text-[10px] font-black tracking-widest text-secondary uppercase">{spec.label}</p>
                                            <p className="text-2xl font-black">{spec.value}</p>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="features" className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                                    {(car.features || ['Leather Interior', 'GPS Navigation', 'Premium Sound']).map((f, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <Check className="h-4 w-4 text-secondary" />
                                            <span className="text-sm">{f}</span>
                                        </div>
                                    ))}
                                </TabsContent>
                            </Tabs>

                            {/* Trust */}
                            <div className="flex items-center gap-6 rounded-2xl border border-border bg-muted/50 p-6">
                                <Shield className="h-12 w-12 text-secondary" />
                                <div>
                                    <h4 className="text-lg font-bold">Platinum Protection Included</h4>
                                    <p className="text-muted-foreground">
                                        Full insurance coverage, 24/7 roadside assistance, and free cancellation up to 24h before pickup.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Calendar & Contact */}
                        <div className="space-y-6">
                            <AvailabilityCalendar basePrice={car.price} bookedDates={bookedDates} className="sticky top-24" />

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="h-14 text-xs font-black uppercase">
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call Agent
                                </Button>
                                <Button className="h-14 bg-green-600 text-xs font-black text-white uppercase hover:bg-green-700">
                                    <FaWhatsapp className="mr-2 h-5 w-5" />
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
