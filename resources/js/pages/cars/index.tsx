import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
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
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const carBrands = ["BMW", "Mercedes", "Bentley", "Porsche", "Audi", "Rolls Royce"];
const carTypes = ["Sedan", "SUV", "Sports", "Luxury", "Convertible", "Coupe"];

const cars = [
    {
        id: 1,
        name: "BMW 7 Series",
        brand: "BMW",
        type: "Sedan",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        price: 450,
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
        price: 500,
        seats: 5,
        fuel: "Petrol",
        transmission: "Automatic",
    },
    {
        id: 3,
        name: "Bentley Bentayga",
        brand: "Bentley",
        type: "SUV",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=800",
        price: 650,
        seats: 7,
        fuel: "Petrol",
        transmission: "Automatic",
    },
    {
        id: 4,
        name: "Porsche 911",
        brand: "Porsche",
        type: "Sports",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800",
        price: 550,
        seats: 2,
        fuel: "Petrol",
        transmission: "Automatic",
    },
    {
        id: 5,
        name: "Range Rover Sport",
        brand: "Land Rover",
        type: "SUV",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800",
        price: 500,
        seats: 7,
        fuel: "Diesel",
        transmission: "Automatic",
    },
    {
        id: 6,
        name: "Audi RS7",
        brand: "Audi",
        type: "Sports",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
        price: 480,
        seats: 4,
        fuel: "Petrol",
        transmission: "Automatic",
    },
];

export default function CarsIndex() {
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 1000]);

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
                                className="pl-12 h-14 rounded-xl border-border bg-card text-base"
                            />
                        </div>
                        <Button
                            onClick={() => setShowFilters(true)}
                            variant="outline"
                            className="lg:hidden h-14 px-6 rounded-xl gap-2"
                        >
                            <Filter className="w-5 h-5" /> Filters
                        </Button>
                        <Select defaultValue="featured">
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
                                    onValueChange={setPriceRange}
                                    min={0}
                                    max={1000}
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
                                <div className="space-y-3">
                                    {carBrands.map((brand) => (
                                        <div key={brand} className="flex items-center space-x-3">
                                            <Checkbox id={brand} className="rounded" />
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

                            {/* Body Type Filter */}
                            <Card className="p-6 rounded-2xl border-border">
                                <h4 className="font-semibold text-foreground mb-4">Body Type</h4>
                                <div className="space-y-3">
                                    {carTypes.map((type) => (
                                        <div key={type} className="flex items-center space-x-3">
                                            <Checkbox id={type} className="rounded" />
                                            <Label
                                                htmlFor={type}
                                                className="text-sm text-muted-foreground hover:text-foreground cursor-pointer"
                                            >
                                                {type}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            <Button
                                className="w-full h-12 rounded-xl bg-secondary text-secondary-foreground lg:hidden"
                                onClick={() => setShowFilters(false)}
                            >
                                Apply Filters
                            </Button>
                        </aside>

                        {/* Car Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <p className="text-muted-foreground">
                                    Showing <span className="text-foreground font-semibold">{cars.length}</span> vehicles
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {cars.map((car, index) => (
                                    <motion.div
                                        key={car.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card className="group overflow-hidden rounded-2xl border-border hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
                                            {/* Image */}
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

                                            {/* Content */}
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

                                                {/* Specs */}
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

                                                {/* Price & Actions */}
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

                                                {/* Contact Buttons */}
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

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-12">
                                <Button variant="outline" className="rounded-lg" disabled>
                                    Previous
                                </Button>
                                <Button variant="outline" className="w-10 h-10 rounded-lg bg-secondary text-secondary-foreground border-0">
                                    1
                                </Button>
                                <Button variant="outline" className="w-10 h-10 rounded-lg">
                                    2
                                </Button>
                                <Button variant="outline" className="w-10 h-10 rounded-lg">
                                    3
                                </Button>
                                <Button variant="outline" className="rounded-lg">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
