import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, ChevronRight, ArrowLeft, CreditCard } from "lucide-react";

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
    total_amount: number;
    total_paid: number;
    balance_due: number;
    payment_token: string;
    created_at: string;
}

interface BookingsIndexProps {
    bookings: BookingData[];
}

export default function BookingsIndex({ bookings }: BookingsIndexProps) {
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
            <Head title="My Bookings" />
            <div className="bg-background min-h-screen">
                <div className="max-w-5xl mx-auto px-6 py-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link href="/account" className="inline-flex items-center text-secondary hover:underline mb-4">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            Back to Account
                        </Link>
                        <h1 className="text-3xl font-black">My Bookings</h1>
                        <p className="text-muted-foreground">View and manage all your rental bookings</p>
                    </motion.div>

                    {/* Bookings List */}
                    {bookings.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-card border border-border rounded-2xl p-12 text-center"
                        >
                            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-xl font-bold mb-2">No Bookings Yet</h2>
                            <p className="text-muted-foreground mb-6">
                                You haven't made any bookings yet. Start exploring our premium fleet!
                            </p>
                            <Link href="/cars">
                                <Button className="bg-secondary hover:bg-secondary/90">
                                    Browse Our Fleet
                                </Button>
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            {bookings.map((booking, index) => (
                                <motion.div
                                    key={booking.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card border border-border rounded-xl overflow-hidden"
                                >
                                    <div className="flex flex-col md:flex-row">
                                        {/* Car Image */}
                                        <div className="md:w-48 h-32 md:h-auto">
                                            <img
                                                src={booking.car.image}
                                                alt={booking.car.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Booking Details */}
                                        <div className="flex-1 p-4 md:p-6">
                                            <div className="flex items-start justify-between mb-3">
                                                <div>
                                                    <p className="text-xs text-muted-foreground mb-1">
                                                        Booking #{booking.booking_number}
                                                    </p>
                                                    <h3 className="font-bold text-lg">{booking.car.name}</h3>
                                                </div>
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status_color)}`}>
                                                    {booking.status_label}
                                                </span>
                                            </div>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Pickup</p>
                                                    <p className="font-medium">{booking.pickup_date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Dropoff</p>
                                                    <p className="font-medium">{booking.dropoff_date}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Total</p>
                                                    <p className="font-medium">${booking.total_amount.toLocaleString()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Balance</p>
                                                    <p className={`font-medium ${booking.balance_due > 0 ? 'text-orange-500' : 'text-green-500'}`}>
                                                        {booking.balance_due > 0 ? `$${booking.balance_due.toLocaleString()}` : 'Paid'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <Link href={`/account/bookings/${booking.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        View Details <ChevronRight className="w-4 h-4 ml-1" />
                                                    </Button>
                                                </Link>
                                                {booking.balance_due > 0 && (
                                                    <Link href={`/payment/balance/${booking.payment_token}`}>
                                                        <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                                                            <CreditCard className="w-4 h-4 mr-1" />
                                                            Pay Balance
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
