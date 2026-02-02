import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MapPin, CreditCard, ArrowLeft, Car, CheckCircle } from "lucide-react";

interface BookingData {
    id: number;
    booking_number: string;
    status: string;
    status_label: string;
    status_color: string;
    car: {
        id: number;
        name: string;
        image: string;
    };
    pickup_location: string;
    dropoff_location: string;
    pickup_date: string;
    dropoff_date: string;
    total_days: number;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    deposit_amount: number;
    total_paid: number;
    balance_due: number;
    payment_token: string;
    created_at: string;
}

interface BookingShowProps {
    booking: BookingData;
}

export default function BookingShow({ booking }: BookingShowProps) {
    const getStatusColor = (color: string) => {
        const colors: Record<string, string> = {
            warning: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
            success: 'bg-green-500/10 text-green-600 border-green-500/20',
            info: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
            danger: 'bg-red-500/10 text-red-600 border-red-500/20',
            gray: 'bg-gray-500/10 text-gray-600 border-gray-500/20',
        };
        return colors[color] || colors.gray;
    };

    return (
        <Layout>
            <Head title={`Booking ${booking.booking_number}`} />
            <div className="bg-background min-h-screen">
                <div className="max-w-4xl mx-auto px-6 py-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link href="/account/bookings" className="inline-flex items-center text-secondary hover:underline mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Bookings
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    Booking #{booking.booking_number}
                                </p>
                                <h1 className="text-3xl font-black">{booking.car.name}</h1>
                            </div>
                            <span className={`px-4 py-2 text-sm font-medium rounded-full border ${getStatusColor(booking.status_color)}`}>
                                {booking.status_label}
                            </span>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Car Image */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card border border-border rounded-2xl overflow-hidden"
                            >
                                <img
                                    src={booking.car.image}
                                    alt={booking.car.name}
                                    className="w-full h-64 object-cover"
                                />
                            </motion.div>

                            {/* Rental Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-secondary" />
                                    Rental Details
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Pickup Date</p>
                                        <p className="font-bold">{booking.pickup_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Dropoff Date</p>
                                        <p className="font-bold">{booking.dropoff_date}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Duration</p>
                                        <p className="font-bold">{booking.total_days} days</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Booked On</p>
                                        <p className="font-bold">{booking.created_at}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Locations */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 }}
                                className="bg-card border border-border rounded-2xl p-6"
                            >
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    Locations
                                </h2>
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Pickup Location</p>
                                        <p className="font-bold">{booking.pickup_location}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Dropoff Location</p>
                                        <p className="font-bold">{booking.dropoff_location}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Payment Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-card border border-border rounded-2xl p-6 sticky top-24"
                            >
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-secondary" />
                                    Payment Summary
                                </h2>

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>${booking.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Tax</span>
                                        <span>${booking.tax_amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-medium border-t border-border pt-3">
                                        <span>Total</span>
                                        <span>${booking.total_amount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="space-y-3 border-t border-border pt-4 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Deposit Paid</span>
                                        <span className="text-green-600">-${booking.deposit_amount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Total Paid</span>
                                        <span className="text-green-600">${booking.total_paid.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-lg border-t border-border pt-3">
                                        <span>Balance Due</span>
                                        <span className={booking.balance_due > 0 ? 'text-orange-500' : 'text-green-500'}>
                                            {booking.balance_due > 0 ? `$${booking.balance_due.toLocaleString()}` : 'Fully Paid'}
                                        </span>
                                    </div>
                                </div>

                                {booking.balance_due > 0 ? (
                                    <Link href={`/payment/balance/${booking.payment_token}`}>
                                        <Button className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold">
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Pay ${booking.balance_due.toLocaleString()}
                                        </Button>
                                    </Link>
                                ) : (
                                    <div className="flex items-center justify-center gap-2 py-3 text-green-600">
                                        <CheckCircle className="w-5 h-5" />
                                        <span className="font-medium">Payment Complete</span>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
