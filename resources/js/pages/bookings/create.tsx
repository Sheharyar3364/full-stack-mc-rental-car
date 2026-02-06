import { useState, useEffect } from "react";
import { Head, Link, useForm, router, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, User, Mail, Phone, CreditCard, AlertCircle, CheckCircle2, LogIn, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { format } from "date-fns";
import { AvailabilityCalendar } from "@/components/ui/availability-calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CarData {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    image: string;
    price: number;
    type: string;
}

interface LocationData {
    id: number;
    name: string;
    city: string;
    full_address: string;
    phone: string;
}

interface AuthData {
    isAuthenticated: boolean;
    name: string | null;
    email: string | null;
}

interface BookedDateRange {
    start: string;
    end: string;
}

interface BookingCreateProps {
    car: CarData;
    locations: LocationData[];
    // auth prop is no longer passed from controller, but allow it optionally or remove
    bookedDates?: BookedDateRange[];
}

export default function BookingCreate({ car, locations, bookedDates = [] }: BookingCreateProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    console.log('BookingCreate Auth Debug:', { auth, user });

    const [isChecking, setIsChecking] = useState(false);
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null);

    const [showAuthChoice, setShowAuthChoice] = useState(!user);
    const [pricing, setPricing] = useState({
        days: 0,
        subtotal: 0,
        tax: 0,
        total: 0,
    });

    const [pickupOpen, setPickupOpen] = useState(false);
    const [dropoffOpen, setDropoffOpen] = useState(false);

    // Parse name for authenticated users
    const nameParts = user?.name?.split(' ') || [];
    const defaultFirstName = user ? nameParts[0] || '' : '';
    const defaultLastName = user ? nameParts.slice(1).join(' ') || '' : '';

    const { data, setData, post, processing, errors } = useForm({
        car_id: car.id,
        pickup_date: "",
        dropoff_date: "",
        pickup_location_id: "",
        dropoff_location_id: "",
        first_name: defaultFirstName,
        last_name: defaultLastName,
        email: user?.email || "",
        phone: "",
        drivers_license_number: "",
    });

    // Handle auth state changes (e.g. if user logs in via a modal or different tab)
    useEffect(() => {
        if (user) {
            setData((d) => ({
                ...d,
                first_name: defaultFirstName,
                last_name: defaultLastName,
                email: user.email || d.email,
            }));
        }
    }, [user]);

    // Calculate pricing when dates change
    useEffect(() => {
        if (data.pickup_date && data.dropoff_date) {
            const pickup = new Date(data.pickup_date);
            const dropoff = new Date(data.dropoff_date);
            const days = Math.ceil((dropoff.getTime() - pickup.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            if (days > 0) {
                const subtotal = car.price * days;
                const tax = subtotal * 0.10;
                const total = subtotal + tax;

                setPricing({ days, subtotal, tax, total });
            }
        }
    }, [data.pickup_date, data.dropoff_date, car.price]);

    // Check availability when dates change
    useEffect(() => {
        if (data.pickup_date && data.dropoff_date && pricing.days > 0) {
            checkAvailability();
        }
    }, [data.pickup_date, data.dropoff_date]);

    const checkAvailability = async () => {
        setIsChecking(true);
        try {
            const response = await axios.post('/booking/check-availability', {
                car_id: car.id,
                pickup_date: data.pickup_date,
                dropoff_date: data.dropoff_date,
            });
            setIsAvailable(response.data.available);
        } catch (error) {
            console.error('Availability check failed:', error);
            setIsAvailable(false);
        } finally {
            setIsChecking(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check availability
        if (isAvailable === false) {
            alert('This car is not available for the selected dates.');
            return;
        }

        // Check if locations are selected
        if (!data.pickup_location_id || !data.dropoff_location_id) {
            alert('Please select both pickup and dropoff locations.');
            return;
        }

        // Check if dates are selected
        if (!data.pickup_date || !data.dropoff_date) {
            alert('Please select both pickup and dropoff dates.');
            return;
        }

        // Submit the form
        post('/booking');
    };

    const minDate = new Date().toISOString().split('T')[0];

    return (
        <Layout>
            <Head title={`Book ${car.name}`} />
            <div className="bg-background min-h-screen">
                <div className="max-w-7xl mx-auto px-6 py-24">
                    {/* Header */}
                    <div className="mb-12">
                        <Link href={`/cars/${car.id}`} className="text-secondary hover:underline mb-4 inline-block">
                            ← Back to {car.name}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
                            Book Your Ride
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Complete the details below to reserve your luxury vehicle
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Auth Choice Card for Guests */}
                            <AnimatePresence>
                                {!user && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-card border border-border rounded-2xl p-6 mb-8"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <User className="w-6 h-6 text-secondary" />
                                            <h2 className="text-xl font-bold">Account Required</h2>
                                        </div>
                                        <p className="text-muted-foreground mb-6">
                                            To ensure the security of our luxury fleet, we require all drivers to have a verified account.
                                        </p>
                                        <div className="grid grid-cols-1 gap-4">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="h-16 flex flex-col items-center justify-center gap-1 bg-secondary/10 hover:bg-secondary/20 border-secondary/20"
                                                onClick={() => router.visit('/login')}
                                            >
                                                <LogIn className="w-5 h-5 text-secondary" />
                                                <span className="font-bold text-secondary">Login or Create Account</span>
                                                <span className="text-xs text-muted-foreground">Continue to secure booking</span>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Show form sections only if authenticated */}
                            {user && (
                                <>
                                    {/* Dates Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-card border border-border rounded-2xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <Calendar className="w-6 h-6 text-secondary" />
                                            <h2 className="text-xl font-bold">Rental Period</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="pickup_date">Pickup Date</Label>
                                                <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={`w-full justify-start text-left font-normal h-12 px-4 border-border rounded-xl ${!data.pickup_date && "text-muted-foreground"}`}
                                                        >
                                                            <Calendar className="mr-2 h-4 w-4 text-secondary" />
                                                            {data.pickup_date ? (
                                                                format(new Date(data.pickup_date), "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-2xl" align="start">
                                                        <AvailabilityCalendar
                                                            basePrice={car.price}
                                                            bookedDates={bookedDates}
                                                            showHeader={false}
                                                            compact={true}
                                                            value={data.pickup_date ? new Date(data.pickup_date) : null}
                                                            onDateSelect={(date) => {
                                                                setData('pickup_date', format(date, "yyyy-MM-dd"));
                                                                setPickupOpen(false);
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {errors.pickup_date && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.pickup_date}</p>
                                                )}
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="dropoff_date">Dropoff Date</Label>
                                                <Popover open={dropoffOpen} onOpenChange={setDropoffOpen}>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={`w-full justify-start text-left font-normal h-12 px-4 border-border rounded-xl ${!data.dropoff_date && "text-muted-foreground"}`}
                                                        >
                                                            <Calendar className="mr-2 h-4 w-4 text-secondary" />
                                                            {data.dropoff_date ? (
                                                                format(new Date(data.dropoff_date), "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-2xl" align="start">
                                                        <AvailabilityCalendar
                                                            basePrice={car.price}
                                                            bookedDates={bookedDates}
                                                            showHeader={false}
                                                            compact={true}
                                                            value={data.dropoff_date ? new Date(data.dropoff_date) : null}
                                                            minDate={data.pickup_date ? new Date(data.pickup_date) : null}
                                                            onDateSelect={(date) => {
                                                                setData('dropoff_date', format(date, "yyyy-MM-dd"));
                                                                setDropoffOpen(false);
                                                            }}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                                {errors.dropoff_date && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.dropoff_date}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Availability Status */}
                                        {pricing.days > 0 && (
                                            <div className="mt-4">
                                                {isChecking ? (
                                                    <div className="flex items-center gap-2 text-muted-foreground">
                                                        <div className="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
                                                        <span>Checking availability...</span>
                                                    </div>
                                                ) : isAvailable === true ? (
                                                    <div className="flex items-center gap-2 text-green-600">
                                                        <CheckCircle2 className="w-5 h-5" />
                                                        <span className="font-medium">Available for {pricing.days} days</span>
                                                    </div>
                                                ) : isAvailable === false ? (
                                                    <div className="flex items-center gap-2 text-red-600">
                                                        <AlertCircle className="w-5 h-5" />
                                                        <span className="font-medium">Not available for selected dates</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </motion.div>

                                    {/* Locations Section */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="bg-card border border-border rounded-2xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <MapPin className="w-6 h-6 text-secondary" />
                                            <h2 className="text-xl font-bold">Pickup & Dropoff</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="pickup_location_id">Pickup Location</Label>
                                                <Select
                                                    value={data.pickup_location_id.toString()}
                                                    onValueChange={(value) => setData('pickup_location_id', value)}
                                                >
                                                    <SelectTrigger className="mt-2">
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {locations.map((location) => (
                                                            <SelectItem key={location.id} value={location.id.toString()}>
                                                                {location.name} - {location.city}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.pickup_location_id && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.pickup_location_id}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="dropoff_location_id">Dropoff Location</Label>
                                                <Select
                                                    value={data.dropoff_location_id.toString()}
                                                    onValueChange={(value) => setData('dropoff_location_id', value)}
                                                >
                                                    <SelectTrigger className="mt-2">
                                                        <SelectValue placeholder="Select location" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {locations.map((location) => (
                                                            <SelectItem key={location.id} value={location.id.toString()}>
                                                                {location.name} - {location.city}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.dropoff_location_id && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.dropoff_location_id}</p>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Customer Information */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="bg-card border border-border rounded-2xl p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <User className="w-6 h-6 text-secondary" />
                                            <h2 className="text-xl font-bold">Your Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="first_name">First Name</Label>
                                                <Input
                                                    id="first_name"
                                                    type="text"
                                                    value={data.first_name}
                                                    onChange={(e) => setData('first_name', e.target.value)}
                                                    className="mt-2"
                                                    required
                                                />
                                                {errors.first_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="last_name">Last Name</Label>
                                                <Input
                                                    id="last_name"
                                                    type="text"
                                                    value={data.last_name}
                                                    onChange={(e) => setData('last_name', e.target.value)}
                                                    className="mt-2"
                                                    required
                                                />
                                                {errors.last_name && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="email">Email</Label>
                                                <div className="relative mt-2">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                                {errors.email && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                                )}
                                            </div>

                                            <div>
                                                <Label htmlFor="phone">Phone</Label>
                                                <div className="relative mt-2">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        className="pl-10"
                                                        required
                                                    />
                                                </div>
                                                {errors.phone && (
                                                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                                )}
                                            </div>

                                            <div className="md:col-span-2">
                                                <Label htmlFor="drivers_license_number">Driver's License Number (Optional)</Label>
                                                <Input
                                                    id="drivers_license_number"
                                                    type="text"
                                                    value={data.drivers_license_number}
                                                    onChange={(e) => setData('drivers_license_number', e.target.value)}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </div>

                        {/* Sidebar - Car Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-card border border-border rounded-2xl p-6 sticky top-24 space-y-6"
                            >
                                <div>
                                    <h3 className="text-lg font-bold mb-4">Booking Summary</h3>

                                    {/* Car Image */}
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="w-full h-40 object-cover rounded-xl mb-4"
                                    />

                                    {/* Car Details */}
                                    <div className="mb-6">
                                        <p className="text-secondary text-xs font-bold uppercase tracking-widest mb-1">
                                            {car.type}
                                        </p>
                                        <h4 className="text-xl font-black">{car.name}</h4>
                                        <p className="text-muted-foreground text-sm mt-1">
                                            {car.brand} {car.model} • {car.year}
                                        </p>
                                    </div>

                                    {/* Pricing Breakdown */}
                                    {pricing.days > 0 && (
                                        <div className="space-y-3 border-t border-border pt-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Daily Rate</span>
                                                <span className="font-medium">€{car.price.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Duration</span>
                                                <span className="font-medium">{pricing.days} days</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span className="font-medium">€{pricing.subtotal.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Tax (10%)</span>
                                                <span className="font-medium">€{pricing.tax.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                                                <span>Total</span>
                                                <span className="text-secondary">€{pricing.total.toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Deposit required: €{(pricing.total * 0.3).toFixed(2)} (30%)
                                            </p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        disabled={processing || isAvailable === false || !pricing.days || !data.pickup_location_id || !data.dropoff_location_id}
                                        className="w-full mt-6 h-12 bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest"
                                    >
                                        {processing ? (
                                            <>
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-4 h-4 mr-2" />
                                                Proceed to Payment
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-xs text-center text-muted-foreground mt-4">
                                        Secure payment powered by Stripe
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
}
