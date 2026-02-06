import { ReactNode } from "react";
import { usePage, Link } from "@inertiajs/react";
import { SharedData } from "@/types";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
    children: ReactNode;
    showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isUnverified = user && user.verification_status !== 'verified';

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans overflow-x-hidden selection:bg-secondary selection:text-white">
            <AnimatePresence>
                {isUnverified && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-red-500/10 border-b border-red-500/20"
                    >
                        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 dark:bg-red-900/30 p-1.5 rounded-full">
                                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                </div>
                                <p className="text-sm font-medium text-red-800 dark:text-red-200">
                                    <span className="opacity-75">Identity Verification Required:</span>
                                    <span className="ml-1">You must verify your identity before picking up your vehicle.</span>
                                </p>
                            </div>
                            <Link
                                href="/account/verification"
                                className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-700 hover:text-red-800 dark:text-red-300 dark:hover:text-red-200 transition-colors"
                            >
                                Verify Now <ChevronRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            {showFooter && <Footer />}
        </div>
    );
}
