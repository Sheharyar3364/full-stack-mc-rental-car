import { useState, useEffect } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

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
        if (locationId) params.location_id = locationId;

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

    const goToPage = (page: number) => {
        const params: any = { page };
        if (search) params.search = search;
        if (selectedBrands.length) params.brands = selectedBrands;
        if (selectedCategories.length) params.categories = selectedCategories;
        if (priceRange[0] > 0) params.min_price = priceRange[0];
        if (priceRange[1] < 2000) params.max_price = priceRange[1];
        if (sortBy !== "featured") params.sort = sortBy;
        if (pickupDate) params.pickup_date = pickupDate;
        if (dropoffDate) params.dropoff_date = dropoffDate;
        if (locationId) params.location_id = locationId;

        router.get("/cars", params, {
            preserveScroll: true,
        });
    };

    return (
        <Layout>
            <Head title="Our Fleet - MC Rental Cars" />
            <div className="bg-background min-h-screen">
                {/* Hero Header */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
                    <div className="container mx-auto px-6 py-16 md:py-24">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-foreground font-medium">Our Fleet</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
                            Find Your <span className="text-secondary">Perfect</span> Ride
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            Browse our curated collection of premium vehicles. Experience luxury, performance, and style.
                        </p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-6 py-12">
                    {/* Search & Filter Bar */}
                    <div className="flex flex-col lg:flex-row gap-4 mb-12">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <Input
                                placeholder="Search by model, brand..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && applyFilters()}
                                className="pl-12 h-14 rounded-xl border-border bg-card text-base"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <Select value={String(locationId)} onValueChange={setLocationId}>
                                <SelectTrigger className="h-14 rounded-xl border-border bg-card">
                                    <SelectValue placeholder="Select Location" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="none">All Locations</SelectItem>
                                    {locations.map(loc => (
                                        <SelectItem key={loc.id} value={String(loc.id)}>{loc.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <div className="flex flex-1 gap-2">
                                <Input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                    className="h-14 rounded-xl border-border bg-card text-base flex-1"
                                />
                                <Input
                                    type="date"
                                    value={dropoffDate}
                                    onChange={(e) => setDropoffDate(e.target.value)}
                                    className="h-14 rounded-xl border-border bg-card text-base flex-1"
                                />
                            </div>
                        </div>
                        <Button
                            onClick={() => setShowFilters(true)}
                            variant="outline"
                            className="lg:hidden h-14 px-6 rounded-xl gap-2"
                        >
                            <Filter className="w-5 h-5" /> Filters
                        </Button>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="h-14 w-full lg:w-48 rounded-xl border-border bg-card">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest First</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button
                            onClick={applyFilters}
                            className="h-14 px-8 rounded-xl bg-secondary text-white hover:bg-secondary/90"
                        >
                            Apply Filters
                        </Button>
                    </div>

                    <div className="flex gap-12">
                        {/* Sidebar Filters */}
                        <aside
                            className={`${showFilters
                                ? "fixed inset-0 z-[100] bg-background p-6 overflow-y-auto"
                                : "hidden"
                                } lg:block lg:w-72 shrink-0 space-y-8`}
                        >
                            <div className="flex items-center justify-between lg:hidden mb-6">
                                <span className="text-xl font-bold text-foreground">Filters</span>
                                <Button variant="ghost" size="icon" onClick={() => setShowFilters(false)}>
                                    <X className="w-6 h-6" />
                                </Button>
                            </div>

                            {/* Price Range */}
                            <Card className="p-6 rounded-2xl border-border">
                                <h4 className="font-semibold text-foreground mb-4">Price Range</h4>
                                <Slider
                                    value={priceRange}
                                    onValueChange={(value) => setPriceRange(value as [number, number])}
                                    min={0}
                                    max={2000}
                                    step={50}
                                    className="mb-4"
                                />
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>€{priceRange[0]}/day</span>
                                    <span>€{priceRange[1]}/day</span>
                                </div>
                            </Card>

                            {/* Brand Filter */}
                            <Card className="p-6 rounded-2xl border-border">
                                <h4 className="font-semibold text-foreground mb-4">Brand</h4>
                                <div className="space-y-3 max-h-64 overflow-y-auto">
                                    {brands.map((brand) => (
                                        <div key={brand} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={brand}
                                                checked={selectedBrands.includes(brand)}
                                                onCheckedChange={() => toggleBrand(brand)}
                                                className="rounded"
                                            />
                                            <Label
                                                htmlFor={brand}
                                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                            >
                                                {brand}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {/* Category Filter */}
                            <Card className="p-6 rounded-2xl border-border">
                                <h4 className="font-semibold text-foreground mb-4">Category</h4>
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <div key={category.id} className="flex items-center space-x-3">
                                            <Checkbox
                                                id={`cat-${category.id}`}
                                                checked={selectedCategories.includes(category.id)}
                                                onCheckedChange={() => toggleCategory(category.id)}
                                                className="rounded"
                                            />
                                            <Label
                                                htmlFor={`cat-${category.id}`}
                                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                            >
                                                {category.name}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Button
                                className="w-full h-12 rounded-xl bg-secondary text-secondary-foreground lg:hidden"
                                onClick={() => {
                                    applyFilters();
                                    setShowFilters(false);
                                }}
                            >
                                Apply Filters
                            </Button>
                        </aside>

                        {/* Car Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-muted-foreground">
                                    Showing <span className="text-foreground font-semibold">{pagination.from || 0}-{pagination.to || 0}</span> of <span className="text-foreground font-semibold">{pagination.total}</span> vehicles
                                </p>
                            </div>

                            {cars.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {cars.map((car, index) => (
                                        <motion.div
                                            key={car.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Card className="group overflow-hidden rounded-2xl border-border hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                                                <Link href={`/cars/${car.id}`}>
                                                    <div className="relative aspect-[4/3] overflow-hidden cursor-pointer">
                                                        <img
                                                            src={car.image}
                                                            alt={car.name}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute top-4 left-4">
                                                            <span className="px-3 py-1.5 text-xs font-semibold bg-background/90 backdrop-blur-sm rounded-full text-foreground">
                                                                {car.type}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>

                                                <div className="p-5">
                                                    <div className="mb-3">
                                                        <p className="text-xs font-medium text-secondary uppercase tracking-wider mb-1">
                                                            {car.brand}
                                                        </p>
                                                        <Link href={`/cars/${car.id}`}>
                                                            <h3 className="text-lg font-bold text-foreground group-hover:text-secondary transition-colors cursor-pointer">
                                                                {car.name}
                                                            </h3>
                                                        </Link>
                                                    </div>

                                                    <div className="flex items-center gap-4 py-4 border-y border-border">
                                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                                            <Users className="w-4 h-4" />
                                                            <span className="text-xs">{car.seats}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                                            <Gauge className="w-4 h-4" />
                                                            <span className="text-xs">{car.transmission}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                                            <Fuel className="w-4 h-4" />
                                                            <span className="text-xs">{car.fuel}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center justify-between pt-4">
                                                        <div>
                                                            <p className="text-2xl font-bold text-foreground">
                                                                €{car.price}
                                                                <span className="text-sm font-normal text-muted-foreground">/day</span>
                                                            </p>
                                                        </div>
                                                        <Link href={`/cars/${car.id}`}>
                                                            <Button className="h-10 px-4 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3 mt-4">
                                                        <Button
                                                            variant="outline"
                                                            className="h-11 rounded-lg border-border gap-2"
                                                        >
                                                            <Phone className="w-4 h-4" /> Call
                                                        </Button>
                                                        <Button
                                                            className="h-11 rounded-lg bg-green-600 hover:bg-green-700 text-white gap-2"
                                                        >
                                                            <FaWhatsapp className="w-4 h-4" /> WhatsApp
                                                        </Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center py-24 bg-card rounded-3xl border border-dashed border-border"
                                >
                                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                                        <Search className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">No vehicles found</h3>
                                    <p className="text-muted-foreground text-center max-w-md px-6">
                                        We couldn't find any vehicles matching your current filters. Try adjusting your search or clearing some filters.
                                    </p>
                                    <Button
                                        variant="link"
                                        className="mt-4 text-secondary"
                                        onClick={() => router.get('/cars')}
                                    >
                                        Clear all filters
                                    </Button>
                                </motion.div>
                            )}

                            {/* Pagination */}
                            {pagination.last_page > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12">
                                    <Button
                                        variant="outline"
                                        className="rounded-lg"
                                        disabled={pagination.current_page === 1}
                                        onClick={() => goToPage(pagination.current_page - 1)}
                                    >
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Previous
                                    </Button>

                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1)
                                        .filter(page => {
                                            const current = pagination.current_page;
                                            return page === 1 || page === pagination.last_page || (page >= current - 1 && page <= current + 1);
                                        })
                                        .map((page, idx, arr) => {
                                            const prevPage = arr[idx - 1];
                                            return (
                                                <>
                                                    {prevPage && page - prevPage > 1 && (
                                                        <span key={`ellipsis-${page}`} className="px-2 text-muted-foreground">...</span>
                                                    )}
                                                    <Button
                                                        key={page}
                                                        variant={pagination.current_page === page ? "default" : "outline"}
                                                        className={`w-10 h-10 rounded-lg ${pagination.current_page === page ? "bg-secondary text-secondary-foreground" : ""}`}
                                                        onClick={() => goToPage(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </>
                                            );
                                        })}

                                    <Button
                                        variant="outline"
                                        className="rounded-lg"
                                        disabled={pagination.current_page === pagination.last_page}
                                        onClick={() => goToPage(pagination.current_page + 1)}
                                    >
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
