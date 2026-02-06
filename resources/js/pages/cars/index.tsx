import { Layout } from '@/components/frontend/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Head, Link, router } from '@inertiajs/react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Filter, Fuel, LayoutGrid, MapPin, Search, SlidersHorizontal, Users, X, Zap } from 'lucide-react';
import { useState } from 'react';

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
    const [search, setSearch] = useState(filters.search || '');
    const [selectedBrands, setSelectedBrands] = useState<string[]>(filters.brands || []);
    const [selectedCategories, setSelectedCategories] = useState<number[]>(filters.categories || []);
    const [priceRange, setPriceRange] = useState<[number, number]>([filters.min_price || 0, filters.max_price || 2000]);
    const [sortBy, setSortBy] = useState(filters.sort || 'featured');
    const [pickupDate, setPickupDate] = useState(filters.pickup_date || '');
    const [dropoffDate, setDropoffDate] = useState(filters.dropoff_date || '');
    const [locationId, setLocationId] = useState(filters.location_id || '');

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
        if (sortBy !== 'featured') params.sort = sortBy;
        if (pickupDate) params.pickup_date = pickupDate;
        if (dropoffDate) params.dropoff_date = dropoffDate;
        if (locationId && locationId !== 'none') params.location_id = locationId;

        router.get('/cars', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    };

    const toggleCategory = (categoryId: number) => {
        setSelectedCategories((prev) => (prev.includes(categoryId) ? prev.filter((c) => c !== categoryId) : [...prev, categoryId]));
    };

    return (
        <Layout>
            <Head title="Exclusive Fleet - MCRENTALCARS" />

            <div className="min-h-screen bg-[#050505]">
                {/* Cinematic Header */}
                <div className="relative flex h-[60vh] items-center justify-center overflow-hidden md:h-[70vh]">
                    <motion.div style={{ y: headerY, opacity: headerOpacity }} className="absolute inset-0">
                        <img src="/images/gallery/fleet_bg.png" alt="Fleet Background" className="h-full w-full object-cover grayscale-[0.3]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#050505]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />
                    </motion.div>

                    <div className="relative z-10 container mx-auto px-6 text-center">
                        <FadeUpReveal>
                            <span className="mb-6 block text-[10px] font-black tracking-[0.5em] text-secondary uppercase">Premium Discovery</span>
                        </FadeUpReveal>
                        <h1 className="mb-8 text-6xl leading-none font-black tracking-tighter text-white uppercase md:text-9xl">
                            <TextReveal>Elite</TextReveal> <br />
                            <TextReveal className="text-white/20">Collection</TextReveal>
                        </h1>
                        <FadeUpReveal delay={0.4}>
                            <p className="mx-auto mt-8 max-w-2xl border-t border-white/10 pt-8 text-lg leading-relaxed font-medium text-white/40 md:text-xl">
                                Exceptional machines for exceptional individuals. Discover our stable of meticulously curated luxury assets.
                            </p>
                        </FadeUpReveal>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="relative z-20 container mx-auto -mt-20 px-6 pb-40">
                    {/* High-Tech Search & Actions Bar */}
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-16 flex flex-col items-stretch gap-4 rounded-[2.5rem] border border-white/5 bg-[#0A0A0A]/80 p-4 shadow-2xl backdrop-blur-3xl md:p-6 xl:flex-row"
                    >
                        <div className="group relative flex-1">
                            <Search className="absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-secondary" />
                            <input
                                placeholder="Search our stable..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                className="h-16 w-full rounded-2xl border border-white/5 bg-white/[0.03] pr-6 pl-16 text-sm text-white transition-all focus:border-secondary/40 focus:ring-4 focus:ring-secondary/5 focus:outline-none"
                            />
                        </div>

                        <div className="grid flex-[1.5] grid-cols-2 gap-4 md:grid-cols-4">
                            <Select value={String(locationId)} onValueChange={setLocationId}>
                                <SelectTrigger className="h-16 rounded-2xl border-white/5 bg-white/[0.03] text-xs font-bold tracking-widest text-white/60 uppercase">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-secondary" /> <SelectValue placeholder="City" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-white/10 bg-zinc-900 text-white">
                                    <SelectItem value="none">All Locations</SelectItem>
                                    {locations.map((loc) => (
                                        <SelectItem key={loc.id} value={String(loc.id)}>
                                            {loc.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="h-16 rounded-2xl border-white/5 bg-white/[0.03] text-xs font-bold tracking-widest text-white/60 uppercase">
                                    <div className="flex items-center gap-2">
                                        <SlidersHorizontal className="h-4 w-4 text-secondary" /> <SelectValue placeholder="Sort" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-white/10 bg-zinc-900 text-white">
                                    <SelectItem value="featured">Featured First</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest Fleet</SelectItem>
                                </SelectContent>
                            </Select>

                            <button
                                onClick={() => setShowFilters(true)}
                                className="flex h-16 items-center justify-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] text-xs font-bold tracking-widest text-white/60 uppercase transition-all hover:bg-white/5 lg:hidden"
                            >
                                <Filter className="h-4 w-4 text-secondary" /> Filters
                            </button>

                            <button
                                onClick={applyFilters}
                                className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-secondary text-[10px] font-black tracking-[0.3em] text-white uppercase shadow-[0_15px_30px_rgba(26,115,232,0.2)] transition-all hover:bg-secondary/90"
                            >
                                Sync Results
                            </button>
                        </div>
                    </motion.div>

                    <div className="flex items-start gap-12">
                        {/* Advanced Desktop Filters Sidebar */}
                        <aside className="sticky top-32 hidden w-80 shrink-0 space-y-8 lg:block">
                            <div>
                                <h3 className="mb-8 flex items-center gap-3 text-xs font-black tracking-[0.4em] text-white uppercase">
                                    <div className="h-4 w-1 bg-secondary" /> Navigation
                                </h3>
                                <div className="space-y-6">
                                    {/* Price Range */}
                                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                                        <Label className="mb-6 block text-[10px] font-black tracking-widest text-white/40 uppercase">
                                            Rate / Day
                                        </Label>
                                        <Slider
                                            value={priceRange}
                                            onValueChange={(value) => setPriceRange(value as [number, number])}
                                            min={0}
                                            max={2000}
                                            step={50}
                                            className="mb-6"
                                        />
                                        <div className="flex justify-between font-mono text-[11px] text-secondary">
                                            <span>€{priceRange[0]}</span>
                                            <span>€{priceRange[1]}</span>
                                        </div>
                                    </div>

                                    {/* Brand Multi-Select */}
                                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                                        <Label className="mb-6 block text-[10px] font-black tracking-widest text-white/40 uppercase">
                                            Manufacturers
                                        </Label>
                                        <div className="custom-scrollbar max-h-64 space-y-4 overflow-y-auto pr-2">
                                            {brands.map((brand) => (
                                                <div
                                                    key={brand}
                                                    className="group flex cursor-pointer items-center"
                                                    onClick={() => toggleBrand(brand)}
                                                >
                                                    <div
                                                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded-md border transition-all ${selectedBrands.includes(brand) ? 'border-secondary bg-secondary text-white' : 'border-white/10 bg-white/5 text-transparent'}`}
                                                    >
                                                        <ChevronRight className="h-3 w-3" />
                                                    </div>
                                                    <span
                                                        className={`text-sm font-bold tracking-tight transition-colors ${selectedBrands.includes(brand) ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}
                                                    >
                                                        {brand}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Category Multi-Select */}
                                    <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8">
                                        <Label className="mb-6 block text-[10px] font-black tracking-widest text-white/40 uppercase">Car Type</Label>
                                        <div className="space-y-4">
                                            {categories.map((cat) => (
                                                <div
                                                    key={cat.id}
                                                    className="group flex cursor-pointer items-center"
                                                    onClick={() => toggleCategory(cat.id)}
                                                >
                                                    <div
                                                        className={`mr-4 flex h-5 w-5 items-center justify-center rounded-md border transition-all ${selectedCategories.includes(cat.id) ? 'border-secondary bg-secondary text-white' : 'border-white/10 bg-white/5 text-transparent'}`}
                                                    >
                                                        <ChevronRight className="h-3 w-3" />
                                                    </div>
                                                    <span
                                                        className={`text-sm font-bold tracking-tight transition-colors ${selectedCategories.includes(cat.id) ? 'text-white' : 'text-white/30 group-hover:text-white/60'}`}
                                                    >
                                                        {cat.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Elite Listing Grid */}
                        <div className="flex-1">
                            <div className="mb-12 flex items-center justify-between">
                                <div className="space-y-1">
                                    <h2 className="text-xl font-black tracking-tight text-white uppercase">Available Assets</h2>
                                    <p className="font-mono text-[10px] tracking-widest text-white/30">
                                        NODE_SYNC: {pagination.total} ENTITIES DISCOVERED
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-white">
                                        <LayoutGrid className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-8 ring-0 outline-none xl:grid-cols-2">
                                <AnimatePresence mode="popLayout">
                                    {cars.map((car, i) => (
                                        <motion.div
                                            key={car.id}
                                            layout
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                            className="group relative h-[500px] overflow-hidden rounded-[3rem] bg-zinc-900 shadow-2xl md:h-[600px]"
                                        >
                                            <Link href={`/cars/${car.id}`} className="absolute inset-0">
                                                <img
                                                    src={car.image}
                                                    alt={car.name}
                                                    className="h-full w-full object-cover grayscale-[0.5] transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />
                                            </Link>

                                            {/* Badge */}
                                            <div className="absolute top-8 left-8 flex gap-2">
                                                <div className="rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-[9px] font-black tracking-widest text-white uppercase shadow-lg backdrop-blur-xl">
                                                    {car.brand}
                                                </div>
                                                <div className="rounded-full border border-secondary/30 bg-secondary/20 px-4 py-1.5 text-[9px] font-black tracking-widest text-secondary uppercase shadow-lg backdrop-blur-xl">
                                                    {car.type}
                                                </div>
                                            </div>

                                            {/* Technical Overlay on Hover */}
                                            <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-10">
                                                <div className="animate-scan absolute top-1/2 left-0 h-[1px] w-full bg-white shadow-[0_0_15px_white]" />
                                                <div className="absolute top-0 right-0 space-y-1 p-8 font-mono text-[8px] text-white">
                                                    <div>ID: {car.id.toString(16).toUpperCase()}</div>
                                                    <div>PRICE: €{car.price}</div>
                                                    <div>GEO_LOCK: {car.brands ? 'EN_A2' : 'GLOBAL'}</div>
                                                </div>
                                            </div>

                                            {/* Content Block */}
                                            <div className="pointer-events-none absolute inset-x-10 bottom-10">
                                                <div className="mb-4 overflow-hidden">
                                                    <motion.h3 className="text-4xl leading-none font-black tracking-tighter text-white uppercase transition-colors duration-500 group-hover:text-secondary md:text-5xl">
                                                        {car.name}
                                                    </motion.h3>
                                                </div>

                                                <div className="mb-8 flex flex-wrap items-center gap-4 opacity-60 transition-opacity group-hover:opacity-100">
                                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white uppercase">
                                                        <Users className="h-3.5 w-3.5 text-secondary" /> {car.seats} Capacity
                                                    </div>
                                                    <div className="h-1 w-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white uppercase">
                                                        <Zap className="h-3.5 w-3.5 text-secondary" /> {car.transmission}
                                                    </div>
                                                    <div className="h-1 w-1 rounded-full bg-white/20" />
                                                    <div className="flex items-center gap-2 text-[10px] font-black tracking-widest text-white uppercase">
                                                        <Fuel className="h-3.5 w-3.5 text-secondary" /> {car.fuel}
                                                    </div>
                                                </div>

                                                <div className="pointer-events-auto flex items-center justify-between">
                                                    <div className="space-y-1">
                                                        <span className="block text-[10px] font-bold tracking-widest text-white/30 uppercase">
                                                            Investment
                                                        </span>
                                                        <div className="text-3xl font-black text-white">
                                                            €{car.price.toLocaleString()}
                                                            <span className="ml-2 text-xs font-light text-white/30">/24H</span>
                                                        </div>
                                                    </div>
                                                    <Link href={`/cars/${car.id}`} className="group/btn flex items-center gap-4">
                                                        <div className="flex h-16 transform items-center justify-center rounded-2xl bg-white px-8 text-[10px] font-black tracking-widest text-black uppercase transition-all group-hover/btn:translate-x-2">
                                                            View Masterpiece
                                                        </div>
                                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 text-white transition-all group-hover/btn:rotate-45 group-hover/btn:bg-white group-hover/btn:text-black">
                                                            <ArrowUpRight className="h-6 w-6" />
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
                                <div className="mt-24 flex items-center justify-center gap-4">
                                    <button
                                        disabled={pagination.current_page === 1}
                                        onClick={() => router.get('/cars', { page: pagination.current_page - 1 }, { preserveScroll: true })}
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-white transition-all hover:border-secondary disabled:opacity-20"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>

                                    <div className="flex gap-2">
                                        {Array.from({ length: pagination.last_page }).map((_, i) => (
                                            <button
                                                key={i + 1}
                                                onClick={() => router.get('/cars', { page: i + 1 }, { preserveScroll: true })}
                                                className={`h-14 w-14 rounded-2xl border text-xs font-black transition-all ${pagination.current_page === i + 1 ? 'border-secondary bg-secondary text-white shadow-xl shadow-secondary/30' : 'border-white/10 text-white/40 hover:text-white'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        disabled={pagination.current_page === pagination.last_page}
                                        onClick={() => router.get('/cars', { page: pagination.current_page + 1 }, { preserveScroll: true })}
                                        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 text-white transition-all hover:border-secondary disabled:opacity-20"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </div>
                            )}

                            {cars.length === 0 && (
                                <div className="py-40 text-center">
                                    <div className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-full border border-dashed border-white/20 bg-white/5">
                                        <Search className="h-10 w-10 text-white/20" />
                                    </div>
                                    <h3 className="mb-4 text-3xl font-black tracking-tighter text-white uppercase">No Assets Found</h3>
                                    <p className="mb-10 text-white/40">We couldn't locate any vehicles matching your current sync parameters.</p>
                                    <Button
                                        onClick={() => router.get('/cars')}
                                        className="h-16 rounded-2xl bg-white px-12 font-black tracking-widest text-black uppercase"
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
                <div className="fixed inset-0 z-[100] overflow-y-auto bg-black p-8 lg:hidden">
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="text-2xl font-black tracking-tighter text-white uppercase">System Filters</h2>
                        <button
                            onClick={() => setShowFilters(false)}
                            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                    {/* Mobile filter content would go here, mimicking the desktop sidebar style */}
                    <p className="mb-8 font-mono text-xs text-white/40">
                        Desktop filters are optimized for larger screens. Use the search and city selector for quick results.
                    </p>
                    <div className="space-y-8">
                        <button
                            onClick={() => {
                                applyFilters();
                                setShowFilters(false);
                            }}
                            className="h-20 w-full rounded-2xl bg-secondary font-black tracking-[0.4em] text-white uppercase"
                        >
                            Confirm Sync
                        </button>
                    </div>
                </div>
            )}

            <style
                dangerouslySetInnerHTML={{
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
            `,
                }}
            />
        </Layout>
    );
}
