import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { User, Calendar, Car, Clock, ChevronRight } from "lucide-react";

interface Stats {
    total: number;
    upcoming: number;
    completed: number;
    active: number;
}

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
    pickup_date: string;
    dropoff_date: string;
}

interface DashboardProps {
    user: {
        name: string;
        email: string;
        verification_status: string;
    };
    stats: Stats;
    recentBookings: BookingData[];
}

export default function AccountDashboard({ user, stats, recentBookings }: DashboardProps) {
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
            <Head title="My Account" />
            <div className="bg-background min-h-screen">
                <div className="max-w-6xl mx-auto px-6 py-24">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-secondary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black">Welcome back, {user.name.split(' ')[0]}!</h1>
                                <p className="text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
                    >
                        <div className="bg-card border border-border rounded-xl p-6 text-center">
                            <Calendar className="w-6 h-6 text-secondary mx-auto mb-2" />
                            <p className="text-3xl font-black">{stats.total}</p>
                            <p className="text-sm text-muted-foreground">Total Bookings</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 text-center">
                            <Clock className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-3xl font-black">{stats.upcoming}</p>
                            <p className="text-sm text-muted-foreground">Upcoming</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 text-center">
                            <Car className="w-6 h-6 text-green-500 mx-auto mb-2" />
                            <p className="text-3xl font-black">{stats.active}</p>
                            <p className="text-sm text-muted-foreground">Active Rentals</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-6 text-center">
                            <Calendar className="w-6 h-6 text-gray-500 mx-auto mb-2" />
                            <p className="text-3xl font-black">{stats.completed}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                        </div>
                    </motion.div>

                    {/* Recent Bookings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Recent Bookings</h2>
                            <Link href="/account/bookings">
                                <Button variant="ghost" size="sm">
                                    View All <ChevronRight className="w-4 h-4 ml-1" />
                                </Button>
                            </Link>
                        </div>

                        {recentBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-4">No bookings yet</p>
                                <Link href="/cars">
                                    <Button className="bg-secondary hover:bg-secondary/90">
                                        Browse Our Fleet
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <Link
                                        key={booking.id}
                                        href={`/account/bookings/${booking.id}`}
                                        className="flex items-center gap-4 p-4 bg-background rounded-xl hover:bg-muted/50 transition-colors"
                                    >
                                        <img
                                            src={booking.car.image}
                                            alt={booking.car.name}
                                            className="w-20 h-14 object-cover rounded-lg"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold truncate">{booking.car.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {booking.pickup_date} → {booking.dropoff_date}
                                            </p>
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status_color)}`}>
                                            {booking.status_label}
                                        </span>
                                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                        <Link href="/cars">
                            <div className="bg-secondary/10 border border-secondary/20 rounded-xl p-6 hover:bg-secondary/20 transition-colors">
                                <Car className="w-8 h-8 text-secondary mb-3" />
                                <h3 className="font-bold mb-1">Book a New Car</h3>
                                <p className="text-sm text-muted-foreground">
                                    Browse our premium fleet and make a reservation
                                </p>
                            </div>
                        </Link>
                        <Link href="/contact">
                            <div className="bg-muted/50 border border-border rounded-xl p-6 hover:bg-muted transition-colors">
                                <Calendar className="w-8 h-8 text-muted-foreground mb-3" />
                                <h3 className="font-bold mb-1">Need Help?</h3>
                                <p className="text-sm text-muted-foreground">
                                    Contact our support team for assistance
                                </p>
                            </div>
                        </Link>
                        {user.verification_status !== 'verified' && (
                            <Link href="/account/verification">
                                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 hover:bg-blue-500/20 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mb-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                                    </div>
                                    <h3 className="font-bold mb-1">Identity Verification</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Upload documents to unlock premium rentals
                                    </p>
                                </div>
                            </Link>
                        )}
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
