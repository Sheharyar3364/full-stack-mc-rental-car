import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, User, CreditCard, Car, Mail, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { confetti } from "@/lib/confetti";
import { useEffect } from "react";

interface BookingData {
    id: number;
    booking_number: string;
    status: string;
    car: {
        id: number;
        name: string;
        image: string;
        type: string;
    };
    customer: {
        name: string;
        email: string;
        phone: string;
    };
    pickup_date: string;
    dropoff_date: string;
    pickup_location: {
        name: string;
        address: string;
    };
    dropoff_location: {
        name: string;
        address: string;
    };
    total_days: number;
    daily_rate: number;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    deposit_amount: number;
    balance_due: number;
    total_paid: number;
}

interface ConfirmationProps {
    booking: BookingData;
}

export default function Confirmation({ booking }: ConfirmationProps) {
    const isPaid = booking.status === 'confirmed' || booking.total_paid > 0;

    useEffect(() => {
        // Trigger confetti on successful booking
        if (isPaid) {
            setTimeout(() => confetti(), 500);
        }
    }, [isPaid]);

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Layout>
            <Head title="Booking Confirmed" />
            <div className="bg-background min-h-screen">
                <div className="max-w-4xl mx-auto px-6 py-24">
                    {/* Success Header */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center mb-12"
                    >
                        <div className="w-20 h-20 mx-auto mb-6 bg-green-500/10 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
                            {isPaid ? 'Booking Confirmed!' : 'Booking Created'}
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {isPaid
                                ? "Your payment has been processed successfully. We've sent a confirmation email with all the details."
                                : "Your booking has been created. Please complete the payment to confirm your reservation."}
                        </p>
                    </motion.div>

                    {/* Booking Number */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-secondary/10 border-2 border-secondary rounded-2xl p-6 mb-8 text-center"
                    >
                        <p className="text-sm text-muted-foreground mb-1">Your Booking Number</p>
                        <p className="text-3xl font-black text-secondary">{booking.booking_number}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Please save this number for your records
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Booking Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Car Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Car className="w-6 h-6 text-secondary" />
                                    <h2 className="text-xl font-bold">Vehicle Details</h2>
                                </div>
                                <div className="flex gap-4">
                                    <img
                                        src={booking.car.image}
                                        alt={booking.car.name}
                                        className="w-32 h-24 object-cover rounded-xl"
                                    />
                                    <div>
                                        <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">
                                            {booking.car.type}
                                        </p>
                                        <p className="text-xl font-black">{booking.car.name}</p>
                                        <Link
                                            href={`/cars/${booking.car.id}`}
                                            className="text-sm text-muted-foreground hover:text-secondary transition-colors mt-2 inline-block"
                                        >
                                            View vehicle details →
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Rental Period */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Calendar className="w-6 h-6 text-secondary" />
                                    <h2 className="text-xl font-bold">Rental Period</h2>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{formatDate(booking.pickup_date)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dropoff</p>
                                        <p className="font-medium">{formatDate(booking.dropoff_date)}</p>
                                    </div>
                                    <div className="pt-3 border-t border-border">
                                        <p className="text-sm text-muted-foreground">Total Duration</p>
                                        <p className="font-bold text-lg">{booking.total_days} days</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Locations */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <MapPin className="w-6 h-6 text-secondary" />
                                    <h2 className="text-xl font-bold">Pickup & Dropoff</h2>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                                        <p className="font-medium">{booking.pickup_location.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.pickup_location.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Dropoff Location</p>
                                        <p className="font-medium">{booking.dropoff_location.name}</p>
                                        <p className="text-sm text-muted-foreground">{booking.dropoff_location.address}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Customer Information */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <User className="w-6 h-6 text-secondary" />
                                    <h2 className="text-xl font-bold">Your Information</h2>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4 text-muted-foreground" />
                                        <span>{booking.customer.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span>{booking.customer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span>{booking.customer.phone}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Sidebar - Price Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border rounded-2xl p-6 sticky top-24"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <CreditCard className="w-6 h-6 text-secondary" />
                                    <h2 className="text-xl font-bold">Payment Summary</h2>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Daily Rate</span>
                                        <span className="font-medium">${booking.daily_rate.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{booking.total_days} days</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">${booking.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">${booking.tax_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                                        <span>Total</span>
                                        <span>${booking.total_amount.toLocaleString()}</span>
                                    </div>

                                    {isPaid ? (
                                        <>
                                            <div className="flex justify-between text-sm text-green-600 bg-green-500/10 rounded-lg p-3">
                                                <span>Paid</span>
                                                <span className="font-bold">${booking.total_paid.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Balance Due</span>
                                                <span className="font-medium">${booking.balance_due.toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-2">
                                                Remaining balance due at pickup
                                            </p>
                                        </>
                                    ) : (
                                        <div className="bg-yellow-500/10 rounded-lg p-3 mt-2">
                                            <p className="text-xs text-yellow-600 font-medium">
                                                Deposit payment required to confirm booking
                                            </p>
                                        </div>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3 mt-6">
                                    <Link href="/cars">
                                        <Button className="w-full" variant="default">
                                            Browse More Cars
                                        </Button>
                                    </Link>
                                    <Link href="/contact">
                                        <Button className="w-full" variant="outline">
                                            Contact Support
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Next Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-muted/50 border border-border rounded-2xl p-6 mt-8"
                    >
                        <h3 className="font-bold text-lg mb-4">What's Next?</h3>
                        <ul className="space-y-3">
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">1.</span>
                                <span className="text-sm">
                                    You'll receive a confirmation email at <strong>{booking.customer.email}</strong> with all booking details
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">2.</span>
                                <span className="text-sm">
                                    Arrive at <strong>{booking.pickup_location.name}</strong> on {new Date(booking.pickup_date).toLocaleDateString()}
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">3.</span>
                                <span className="text-sm">
                                    Bring your driver's license and the remaining balance payment
                                </span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-secondary font-bold">4.</span>
                                <span className="text-sm">
                                    For any questions or changes, contact us at {booking.pickup_location.name}
                                </span>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
