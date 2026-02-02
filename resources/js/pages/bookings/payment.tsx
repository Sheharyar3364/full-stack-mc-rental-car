import { useEffect } from "react";
import { Head } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { CreditCard, Lock, Shield } from "lucide-react";
import { motion } from "framer-motion";

interface BookingData {
    id: number;
    booking_number: string;
    car: {
        name: string;
        image: string;
        type: string;
    };
    customer: {
        name: string;
        email: string;
    };
    pickup_date: string;
    dropoff_date: string;
    pickup_location: {
        name: string;
    };
    dropoff_location: {
        name: string;
    };
    total_days: number;
    daily_rate: number;
    subtotal: number;
    tax_amount: number;
    total_amount: number;
    deposit_amount: number;
}

interface PaymentProps {
    booking: BookingData;
    stripePublicKey: string;
    stripeSessionId: string;
    stripeCheckoutUrl: string;  // Add this
}

export default function Payment({ booking, stripePublicKey, stripeSessionId, stripeCheckoutUrl }: PaymentProps) {
    useEffect(() => {
        // Debug logging
        console.log('Payment component mounted');
        console.log('Stripe Session ID:', stripeSessionId);
        console.log('Stripe Checkout URL:', stripeCheckoutUrl);

        // Redirect to Stripe Checkout
        if (stripeCheckoutUrl) {
            console.log('Redirecting to Stripe Checkout...');
            // Use a slight delay to ensure the page renders before redirect
            const timeoutId = setTimeout(() => {
                window.location.href = stripeCheckoutUrl;
            }, 1000);

            return () => clearTimeout(timeoutId);
        } else {
            console.error('No checkout URL provided');
            alert('Payment initialization failed. Please try again.');
        }
    }, [stripeCheckoutUrl, stripeSessionId]);

    return (
        <Layout>
            <Head title="Processing Payment" />
            <div className="bg-background min-h-screen">
                <div className="max-w-2xl mx-auto px-6 py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-2xl p-8 text-center"
                    >
                        {/* Loading Animation */}
                        <div className="w-20 h-20 mx-auto mb-6 relative">
                            <div className="absolute inset-0 border-4 border-secondary/20 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                            <CreditCard className="w-8 h-8 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>

                        <h1 className="text-3xl font-black mb-4">Redirecting to Payment</h1>
                        <p className="text-muted-foreground mb-8">
                            Please wait while we securely redirect you to our payment processor...
                        </p>

                        {/* Booking Summary */}
                        <div className="bg-muted/50 rounded-xl p-6 mb-6 text-left">
                            <div className="flex items-start gap-4">
                                <img
                                    src={booking.car.image}
                                    alt={booking.car.name}
                                    className="w-24 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <p className="text-xs text-secondary font-bold uppercase tracking-widest mb-1">
                                        {booking.car.type}
                                    </p>
                                    <p className="font-bold">{booking.car.name}</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {new Date(booking.pickup_date).toLocaleDateString()} - {new Date(booking.dropoff_date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-border space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Booking Number</span>
                                    <span className="font-medium">{booking.booking_number}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Total Amount</span>
                                    <span className="font-medium">${booking.total_amount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm font-bold">
                                    <span>Deposit Due Now</span>
                                    <span className="text-secondary">${booking.deposit_amount.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Badges */}
                        <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                <span>Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4" />
                                <span>SSL Encrypted</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
}
