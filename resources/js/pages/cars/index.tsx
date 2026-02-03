import { useState, useEffect, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Users,
    Fuel,
    Gauge,
    Phone,
    Search,
    Filter,
    X,
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Zap,
    MapPin,
    ArrowUpRight,
    Calendar,
    LayoutGrid,
    SlidersHorizontal
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FadeUpReveal, TextReveal } from "@/components/ui/text-reveal";

interface Car {
    id: number;
    name: string;
    brand: string;
    type: string;
    image: string;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
}

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface Pagination {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

interface Filters {
    search?: string;
    brands?: string[];
    categories?: number[];
    min_price?: number;
    max_price?: number;
    pickup_date?: string;
    dropoff_date?: string;
    location_id?: number | string;
    sort?: string;
}

interface CarsIndexProps {
    cars: Car[];
    categories: Category[];
    brands: string[];
    locations: { id: number; name: string }[];
    pagination: Pagination;
    filters: Filters;
}

export default function CarsIndex({ cars, categories, brands, locations, pagination, filters }: CarsIndexProps) {
    const [showFilters, setShowFilters] = useState(false);
    const [search, setSearch] = useState(filters.search || "");
    const [selectedBrands, setSelectedBrands] = useState<string[]>(filters.brands || []);
    const [selectedCategories, setSelectedCategories] = useState<number[]>(filters.categories || []);
    const [priceRange, setPriceRange] = useState<[number, number]>([
        filters.min_price || 0,
        filters.max_price || 2000,
    ]);
    const [sortBy, setSortBy] = useState(filters.sort || "featured");
    const [pickupDate, setPickupDate] = useState(filters.pickup_date || "");
    const [dropoffDate, setDropoffDate] = useState(filters.dropoff_date || "");
    const [locationId, setLocationId] = useState(filters.location_id || "");

    const { scrollY } = useScroll();
    const headerY = useTransform(scrollY, [0, 500], [0, 150]);
    const headerOpacity = useTransform(scrollY, [0, 400], [1, 0]);

    const applyFilters = () => {
        const params: any = {};
        if (search) params.search = search;
        if (selectedBrands.length) params.brands = selectedBrands;
        if (selectedCategories.length) params.categories = selectedCategories;
        if (priceRange[0] > 0) params.min_price = priceRange[0];
        if (priceRange[1] < 2000) params.max_price = priceRange[1];
        if (sortBy !== "featured") params.sort = sortBy;
        if (pickupDate) params.pickup_date = pickupDate;
        if (dropoffDate) params.dropoff_date = dropoffDate;
        if (locationId && locationId !== "none") params.location_id = locationId;

        router.get("/cars", params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev =>
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId) ? prev.filter(c => c !== categoryId) : [...prev, categoryId]
        );
    };

    return (
        <Layout>
            <Head title="Exclusive Fleet - MC Rental Cars" />

            <div className="bg-[#050505] min-h-screen">
                {/* Cinematic Header */}
                <div className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
                    <motion.div
                        style={{ y: headerY, opacity: headerOpacity }}
                        className="absolute inset-0"
                    >
                        <img
                            src="/images/gallery/fleet_bg.png"
                            alt="Fleet Background"
                            className="w-full h-full object-cover grayscale-[0.3]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
                    </motion.div>

                    <div className="container relative z-10 px-6 mx-auto text-center">
                        <FadeUpReveal>
                            <span className="text-secondary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Premium Discovery</span>
                        </FadeUpReveal>
                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none mb-8">
                            <TextReveal>Elite</TextReveal> <br />
                            <TextReveal className="text-white/20">Collection</TextReveal>
                        </h1>
                        <FadeUpReveal delay={0.4}>
                            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed border-t border-white/10 pt-8 mt-8">
                                Exceptional machines for exceptional individuals. Discover our stable of meticulously curated luxury assets.
                            </p>
                        </FadeUpReveal>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="container mx-auto px-6 -mt-20 relative z-20 pb-40">
                    {/* High-Tech Search & Actions Bar */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-[#0A0A0A]/80 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-4 md:p-6 mb-16 shadow-2xl flex flex-col xl:flex-row gap-4 items-stretch"
                    >
                        <div className="relative flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-secondary transition-colors" />
                            <input
                                placeholder="Search our stable..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                                className="w-full h-16 bg-white/[0.03] border border-white/5 rounded-2xl pl-16 pr-6 text-white text-sm focus:outline-none focus:border-secondary/40 focus:ring-4 focus:ring-secondary/5 transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-[1.5]">
                            <Select value={String(locationId)} onValueChange={setLocationId}>
                                <SelectTrigger className="h-16 bg-white/[0.03] border-white/5 rounded-2xl text-white/60 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-secondary" /> <SelectValue placeholder="City" /></div>
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
                                    <SelectItem value="none">All Locations</SelectItem>
                                    {locations.map(loc => <SelectItem key={loc.id} value={String(loc.id)}>{loc.name}</SelectItem>)}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-16 bg-white/[0.03] border-white/5 rounded-2xl text-white/60 text-xs font-bold uppercase tracking-widest">
                                    <div className="flex items-center gap-2"><SlidersHorizontal className="w-4 h-4 text-secondary" /> <SelectValue placeholder="Sort" /></div>
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-white/10 text-white rounded-xl">
                                    <SelectItem value="featured">Featured First</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest Fleet</SelectItem>
                                </SelectContent>
                            </Select>

                            <button
                                onClick={() => setShowFilters(true)}
                                className="h-16 bg-white/[0.03] border border-white/5 rounded-2xl text-white/60 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white/5 transition-all lg:hidden"
                            >
                                <Filter className="w-4 h-4 text-secondary" /> Filters
                            </button>

                            <button
                                onClick={applyFilters}
                                className="h-16 bg-secondary text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-secondary/90 transition-all shadow-[0_15px_30px_rgba(26,115,232,0.2)]"
                            >
                                Sync Results
                            </button>
                        </div>
                    </motion.div>

                    <div className="flex gap-12 items-start">
                        {/* Advanced Desktop Filters Sidebar */}
                        <aside className="hidden lg:block w-80 shrink-0 sticky top-32 space-y-8">
                            <div>
                                <h3 className="text-white text-xs font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3">
                                    <div className="w-1 h-4 bg-secondary" /> Navigation
                                </h3>
                                <div className="space-y-6">
                                    {/* Price Range */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Rate / Day</Label>
                                        <Slider
                                            value={priceRange}
                                            onValueChange={(value) => setPriceRange(value as [number, number])}
                                            min={0}
                                            max={2000}
                                            step={50}
                                            className="mb-6"
                                        />
                                        <div className="flex justify-between text-[11px] font-mono text-secondary">
                                            <span>€{priceRange[0]}</span>
                                            <span>€{priceRange[1]}</span>
                                        </div>
                                    </div>

                                    {/* Brand Multi-Select */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Manufacturers</Label>
                                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                            {brands.map((brand) => (
                                                <div key={brand} className="flex items-center group cursor-pointer" onClick={() => toggleBrand(brand)}>
                                                    <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center mr-4 ${selectedBrands.includes(brand) ? 'bg-secondary border-secondary text-white' : 'bg-white/5 border-white/10 text-transparent'}`}>
                                                        <ChevronRight className="w-3 h-3" />
                                                    </div>
                                                    <span className={`text-sm font-bold tracking-tight transition-colors ${selectedBrands.includes(brand) ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>{brand}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Multi-Select */}
                                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                                        <Label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-6 block">Car Type</Label>
                                        <div className="space-y-4">
                                            {categories.map((cat) => (
                                                <div key={cat.id} className="flex items-center group cursor-pointer" onClick={() => toggleCategory(cat.id)}>
                                                    <div className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center mr-4 ${selectedCategories.includes(cat.id) ? 'bg-secondary border-secondary text-white' : 'bg-white/5 border-white/10 text-transparent'}`}>
                                                        <ChevronRight className="w-3 h-3" />
                                                    </div>
                                                    <span className={`text-sm font-bold tracking-tight transition-colors ${selectedCategories.includes(cat.id) ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}>{cat.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Elite Listing Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-12">
                                <div className="space-y-1">
                                    <h2 className="text-white font-black uppercase text-xl tracking-tight">Available Assets</h2>
                                    <p className="text-white/30 text-[10px] font-mono tracking-widest">
                                        NODE_SYNC: {pagination.total} ENTITIES DISCOVERED
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-white"><LayoutGrid className="w-5 h-5" /></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 ring-0 outline-none">
                                <AnimatePresence mode="popLayout">
                                    {cars.map((car, i) => (
                                        <motion.div
                                            key={car.id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                            className="group relative h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-900 shadow-2xl"
                                        >
                                            <Link href={`/cars/${car.id}`} className="absolute inset-0">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-out"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                            </Link>

                                            {/* Badge */}
                                            <div className="absolute top-8 left-8 flex gap-2">
                                                <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                                                    {car.brand}
                                                </div>
                                                <div className="px-4 py-1.5 rounded-full bg-secondary/20 backdrop-blur-xl border border-secondary/30 text-[9px] font-black uppercase tracking-widest text-secondary shadow-lg">
                                                    {car.type}
                                                </div>
                                            </div>

                                            {/* Technical Overlay on Hover */}
                                            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500 overflow-hidden">
                                                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white animate-scan shadow-[0_0_15px_white]" />
                                                <div className="absolute top-0 right-0 p-8 text-[8px] font-mono text-white space-y-1">
                                                    <div>ID: {car.id.toString(16).toUpperCase()}</div>
                                                    <div>PRICE: €{car.price}</div>
                                                    <div>GEO_LOCK: {car.brands ? "EN_A2" : "GLOBAL"}</div>
                                                </div>
                                            </div>

                                            {/* Content Block */}
                                            <div className="absolute inset-x-10 bottom-10 pointer-events-none">
                                                <div className="overflow-hidden mb-4">
                                                    <motion.h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-secondary transition-colors duration-500">
                                                        {car.name}
                                                    </motion.h3>
                                                </div>

                                                <div className="flex flex-wrap gap-4 items-center mb-8 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                                                        <Users className="w-3.5 h-3.5 text-secondary" /> {car.seats} Capacity
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                                                        <Zap className="w-3.5 h-3.5 text-secondary" /> {car.transmission}
                                                    </div>
                                                    <div className="w-1 h-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white">
                                                        <Fuel className="w-3.5 h-3.5 text-secondary" /> {car.fuel}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pointer-events-auto">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest block">Investment</span>
                                                        <div className="text-3xl font-black text-white">
                                                            €{car.price.toLocaleString()}
                                                            <span className="text-xs font-light text-white/30 ml-2">/24H</span>
                                                        </div>
                                                    </div>
                                                    <Link href={`/cars/${car.id}`} className="flex items-center gap-4 group/btn">
                                                        <div className="h-16 px-8 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center transform group-hover/btn:translate-x-2 transition-all">
                                                            View Masterpiece
                                                        </div>
                                                        <div className="w-16 h-16 rounded-2xl border border-white/20 flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-black group-hover/btn:rotate-45 transition-all">
                                                            <ArrowUpRight className="w-6 h-6" />
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Pagination */}
                            {pagination.last_page > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-24">
                                    <button
                                        disabled={pagination.current_page === 1}
                                        onClick={() => router.get("/cars", { page: pagination.current_page - 1 }, { preserveScroll: true })}
                                        className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-secondary transition-all"
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>

                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }).map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => router.get("/cars", { page: i + 1 }, { preserveScroll: true })}
                                                className={`w-14 h-14 rounded-2xl border font-black text-xs transition-all ${pagination.current_page === i + 1 ? 'bg-secondary border-secondary text-white shadow-xl shadow-secondary/30' : 'border-white/10 text-white/40 hover:text-white'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        disabled={pagination.current_page === pagination.last_page}
                                        onClick={() => router.get("/cars", { page: pagination.current_page + 1 }, { preserveScroll: true })}
                                        className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center text-white disabled:opacity-20 hover:border-secondary transition-all"
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </div>
                            )}

                            {cars.length === 0 && (
                                <div className="py-40 text-center">
                                    <div className="w-24 h-24 rounded-full bg-white/5 border border-dashed border-white/20 flex items-center justify-center mx-auto mb-10">
                                        <Search className="w-10 h-10 text-white/20" />
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase mb-4 tracking-tighter">No Assets Found</h3>
                                    <p className="text-white/40 mb-10">We couldn't locate any vehicles matching your current sync parameters.</p>
                                    <Button
                                        onClick={() => router.get('/cars')}
                                        className="h-16 px-12 bg-white text-black font-black uppercase tracking-widest rounded-2xl"
                                    >
                                        Reset System
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Filter Sheet (Simplified mockup since sheet component varies) */}
            {showFilters && (
                <div className="fixed inset-0 z-[100] bg-black p-8 overflow-y-auto lg:hidden">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-white font-black uppercase text-2xl tracking-tighter">System Filters</h2>
                        <button onClick={() => setShowFilters(false)} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    {/* Mobile filter content would go here, mimicking the desktop sidebar style */}
                    <p className="text-white/40 mb-8 font-mono text-xs">Desktop filters are optimized for larger screens. Use the search and city selector for quick results.</p>
                    <div className="space-y-8">
                        <button onClick={() => { applyFilters(); setShowFilters(false); }} className="w-full h-20 bg-secondary text-white font-black uppercase tracking-[0.4em] rounded-2xl">Confirm Sync</button>
                    </div>
                </div>
            )}

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(26, 115, 232, 0.5);
                }
            `}} />
        </Layout>
    );
}
