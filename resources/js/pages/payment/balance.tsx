import { Head, useForm } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CreditCard, Car, Calendar, MapPin, CheckCircle, AlertCircle } from "lucide-react";

interface BookingData {
    id: number;
    booking_number: string;
    status: string;
    status_label: string;
    car: {
        id: number;
        name: string;
        image: string;
    };
    customer: {
        name: string;
        email: string;
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
}

interface BalancePaymentProps {
    booking: BookingData;
    balanceDue: number;
    token: string;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
    };
}

export default function BalancePayment({ booking, balanceDue, token, flash }: BalancePaymentProps) {
    const { post, processing } = useForm({});

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/payment/balance/${token}/process`);
    };

    return (
        <Layout>
            <Head title={`Pay Balance - ${booking.booking_number}`} />
            <div className="bg-background min-h-screen">
                <div className="max-w-4xl mx-auto px-6 py-24">
                    {/* Flash Messages */}
                    {flash?.success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            {flash.success}
                        </div>
                    )}
                    {flash?.error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-600">
                            <AlertCircle className="w-5 h-5" />
                            {flash.error}
                        </div>
                    )}
                    {flash?.warning && (
                        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex items-center gap-3 text-yellow-600">
                            <AlertCircle className="w-5 h-5" />
                            {flash.warning}
                        </div>
                    )}

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
                            Complete Your Payment
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Pay the remaining balance for your booking
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Booking Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card border border-border rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold mb-6">Booking Details</h2>

                            {/* Car Info */}
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                                <img
                                    src={booking.car.image}
                                    alt={booking.car.name}
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                                <div>
                                    <p className="font-bold">{booking.car.name}</p>
                                    <p className="text-sm text-muted-foreground">
                                        Booking #{booking.booking_number}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-secondary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Rental Period</p>
                                        <p className="font-medium">
                                            {booking.pickup_date} → {booking.dropoff_date}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {booking.total_days} days
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Pickup</p>
                                        <p className="font-medium">{booking.pickup_location}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <MapPin className="w-5 h-5 text-secondary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Dropoff</p>
                                        <p className="font-medium">{booking.dropoff_location}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Payment Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-card border border-border rounded-2xl p-6"
                        >
                            <h2 className="text-xl font-bold mb-6">Payment Summary</h2>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Amount</span>
                                    <span className="font-medium">${booking.total_amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Deposit Paid</span>
                                    <span className="font-medium text-green-600">
                                        -${booking.total_paid.toLocaleString()}
                                    </span>
                                </div>
                                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                                    <span>Balance Due</span>
                                    <span className="text-secondary">${balanceDue.toLocaleString()}</span>
                                </div>
                            </div>

                            <form onSubmit={handlePayment}>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full h-14 bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest"
                                >
                                    {processing ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            Pay ${balanceDue.toLocaleString()}
                                        </>
                                    )}
                                </Button>
                            </form>

                            <p className="text-xs text-center text-muted-foreground mt-4">
                                Secure payment powered by Stripe
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
