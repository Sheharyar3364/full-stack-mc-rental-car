import { Link } from "@inertiajs/react";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ArrowRight,
    CreditCard,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
    company: [
        { label: "Our Fleet", href: "/fleet" },
        { label: "Services", href: "/services" },
        { label: "Contact Us", href: "/contact" },
    ],
    carTypes: [
        { label: "Sports Cars", href: "/cars?type=sports" },
        { label: "Luxury Cars", href: "/cars?type=luxury" },
        { label: "SUVs", href: "/cars?type=suv" },
        { label: "Sedans", href: "/cars?type=sedan" },
    ],
};

const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
    return (
        <footer className="bg-[#0a0a0a] text-white overflow-hidden w-full">
            {/* Newsletter Section */}
            <div className="relative border-b border-white/5 bg-gradient-to-br from-[#0f0f0f] to-[#080808] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase leading-tight mb-3 sm:mb-4">
                                Join The <span className="text-secondary italic">Elite</span>
                            </h2>
                            <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
                                Get exclusive access to our newest fleet additions and special
                                member-only rates.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto lg:mx-0 w-full">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="flex-grow bg-white/5 border border-white/10 px-4 sm:px-6 py-3.5 sm:py-4 text-sm rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all placeholder:text-gray-500"
                            />
                            <Button className="bg-secondary hover:bg-secondary/90 text-white px-6 sm:px-8 py-3.5 sm:py-4 h-auto rounded-xl font-bold uppercase text-xs tracking-widest transition-all shrink-0 shadow-lg shadow-secondary/20 hover:shadow-secondary/30">
                                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Decorative gradient blob */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                    {/* Brand & Social */}
                    <div className="col-span-2 sm:col-span-2 lg:col-span-1 space-y-5 sm:space-y-6 text-center sm:text-left">
                        <Link href="/" className="inline-block">
                            <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-white">
                                MC<span className="text-secondary">Rental</span>
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
                            Redefining the standard of luxury mobility in Belgium. Every
                            journey is crafted for excellence.
                        </p>
                        <div className="flex items-center justify-center sm:justify-start gap-2 sm:gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all group"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="text-center sm:text-left">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-6 text-secondary">
                            Company
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href}>
                                        <span className="text-gray-400 text-sm font-medium hover:text-white transition-colors inline-block">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center sm:text-left">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-5 sm:mb-6 text-secondary">
                            Categories
                        </h4>
                        <ul className="space-y-3 sm:space-y-4">
                            {footerLinks.carTypes.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href}>
                                        <span className="text-gray-400 text-sm font-medium hover:text-white transition-colors inline-block">
                                            {link.label}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-2 sm:col-span-1 space-y-5 sm:space-y-6 text-center sm:text-left">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary">
                            Contact
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 justify-center sm:justify-start">
                                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                                <span className="text-gray-400 text-sm">
                                    3638 MC Rental Car,
                                    <br />
                                    Brussels, Belgium
                                </span>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <Phone className="w-4 h-4 text-secondary shrink-0" />
                                <a
                                    href="tel:+920000525"
                                    className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
                                >
                                    + (92) 0000525
                                </a>
                            </li>
                            <li className="flex items-center gap-3 justify-center sm:justify-start">
                                <Mail className="w-4 h-4 text-secondary shrink-0" />
                                <a
                                    href="mailto:info@mcrental.com"
                                    className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
                                >
                                    info@mcrental.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/5 bg-black/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-gray-600 text-[10px] sm:text-xs font-medium tracking-wide text-center sm:text-left">
                            © {new Date().getFullYear()} MC Rental Car. All rights reserved.
                        </p>

                        {/* Trust badges */}
                        <div className="flex items-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] sm:text-xs">
                                <Shield className="w-3.5 h-3.5" />
                                <span>SSL Secured</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500 text-[10px] sm:text-xs">
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Secure Payment</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 sm:gap-6">
                            <Link href="/contact">
                                <span className="text-gray-500 text-[10px] sm:text-xs font-medium hover:text-secondary transition-colors">
                                    Privacy
                                </span>
                            </Link>
                            <Link href="/contact">
                                <span className="text-gray-500 text-[10px] sm:text-xs font-medium hover:text-secondary transition-colors">
                                    Terms
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
