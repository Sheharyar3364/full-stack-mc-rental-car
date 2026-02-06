import { Head, Link, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Calendar, MapPin, User, CreditCard, Car, Mail, Phone, AlertTriangle, ArrowRight } from "lucide-react";
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
        verification_status: string;
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

function VerificationWarning() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;


    if (user?.verification_status === 'verified') return null;



    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 border-2 border-red-500/20 bg-red-500/5 rounded-2xl p-6 md:p-8"
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="bg-red-100 text-red-600 rounded-2xl p-4 shrink-0">
                    <AlertTriangle className="w-8 h-8" />
                </div>
                <div className="flex-1">

                    <h2 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">
                        Action Required: Verify Your Identity
                    </h2>
                    <p className="text-muted-foreground mb-4 max-w-xl">
                        To comply with our insurance policy and release the vehicle, we require a valid driver's license and ID. This process takes less than 2 minutes.
                    </p>
                    <Link href="/account/verification">
                        <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/20">
                            Complete Verification <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function Confirmation({ booking }: ConfirmationProps) {
    const isPaid = booking.status === 'confirmed' || booking.total_paid > 0;
    const { auth } = usePage<SharedData>().props;

    const user = auth.user;

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

                    {/* Verification Required Warning - Inserted Here */}
                    {/* Access auth via usePage inside component or assume specific logic. Better to use usePage. */}
                    <VerificationWarning />

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
                                        <span className="font-medium">€{booking.daily_rate.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Duration</span>
                                        <span className="font-medium">{booking.total_days} days</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="font-medium">€{booking.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span className="font-medium">€{booking.tax_amount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold border-t border-border pt-3">
                                        <span>Total</span>
                                        <span>€{booking.total_amount.toLocaleString()}</span>
                                    </div>

                                    {isPaid ? (
                                        <>
                                            <div className="flex justify-between text-sm text-green-600 bg-green-500/10 rounded-lg p-3">
                                                <span>Paid</span>
                                                <span className="font-bold">€{booking.total_paid.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Balance Due</span>
                                                <span className="font-medium">€{booking.balance_due.toLocaleString()}</span>
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
                                    {
                                        user?.verification_status !== 'verified' && (
                                            <Link href="/account/verification">
                                                <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-bold shadow-lg">
                                                    Verify Now →
                                                </Button>
                                            </Link>
                                        )
                                    }
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
