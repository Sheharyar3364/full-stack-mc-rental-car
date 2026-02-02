import { Head, Link } from "@inertiajs/react";
import { Layout } from "@/components/frontend/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { FadeUpReveal, TextReveal } from "@/components/ui/text-reveal";

export default function Contact() {
    return (
        <Layout>
            <Head title="Contact Us - MC Rental Cars" />
            {/* Hero Section */}
            <section className="relative bg-black py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-50" />
                <div className="container mx-auto px-6 relative z-10">
                    <FadeUpReveal>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/50 mb-6">
                            <Link href="/" className="hover:text-white transition-colors">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-white">Contact</span>
                        </div>
                    </FadeUpReveal>
                    <h1 className="text-4xl md:text-7xl font-black uppercase text-white leading-[0.9]">
                        <TextReveal delay={0.1}>Get In</TextReveal>
                        <br />
                        <TextReveal className="text-secondary italic" delay={0.2}>
                            Touch
                        </TextReveal>
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <FadeUpReveal delay={0.3}>
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-2xl font-black uppercase mb-2">Send Us a Message</h2>
                                <p className="text-muted-foreground">
                                    Fill out the form below and we'll get back to you within 24 hours.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-foreground font-bold text-xs uppercase tracking-widest">
                                        First Name *
                                    </Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        className="h-14 bg-muted/50 border-border rounded-xl focus:border-secondary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-foreground font-bold text-xs uppercase tracking-widest">
                                        Last Name *
                                    </Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        className="h-14 bg-muted/50 border-border rounded-xl focus:border-secondary"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground font-bold text-xs uppercase tracking-widest">
                                        Email *
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="h-14 bg-muted/50 border-border rounded-xl focus:border-secondary"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-foreground font-bold text-xs uppercase tracking-widest">
                                        Phone *
                                    </Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        className="h-14 bg-muted/50 border-border rounded-xl focus:border-secondary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground font-bold text-xs uppercase tracking-widest">
                                    Choose a topic
                                </Label>
                                <Select>
                                    <SelectTrigger className="h-14 bg-muted/50 border-border rounded-xl">
                                        <SelectValue placeholder="Select a topic..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rental">Car Rental Inquiry</SelectItem>
                                        <SelectItem value="booking">Booking Issue</SelectItem>
                                        <SelectItem value="feedback">Feedback</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-foreground font-bold text-xs uppercase tracking-widest">
                                    Preferred Contact Method
                                </Label>
                                <RadioGroup defaultValue="email" className="flex flex-wrap gap-6">
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="email" id="contact-email" />
                                        <Label htmlFor="contact-email" className="font-normal text-foreground">
                                            Email
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="phone" id="contact-phone" />
                                        <Label htmlFor="contact-phone" className="font-normal text-foreground">
                                            Phone Call
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="walkin" id="contact-walkin" />
                                        <Label htmlFor="contact-walkin" className="font-normal text-foreground">
                                            Walk In
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-foreground font-bold text-xs uppercase tracking-widest">
                                    Message
                                </Label>
                                <textarea
                                    placeholder="Tell us about your inquiry..."
                                    className="w-full h-32 px-4 py-3 bg-muted/50 border border-border rounded-xl resize-none focus:outline-none focus:border-secondary text-foreground"
                                />
                            </div>

                            <Button className="w-full md:w-auto h-14 px-10 bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-widest rounded-xl">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </div>
                    </FadeUpReveal>

                    {/* Contact Info & Map */}
                    <FadeUpReveal delay={0.4}>
                        <div className="space-y-8">
                            {/* Contact Card */}
                            <Card className="bg-card border-border">
                                <CardContent className="p-8 space-y-6">
                                    <h3 className="text-xl font-black uppercase">Contact Information</h3>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <MapPin className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Our Location</p>
                                                <p className="text-muted-foreground">
                                                    3638 MC Rental Car, Brussels, Belgium
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <Mail className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Email Us</p>
                                                <a
                                                    href="mailto:info@mcrental.be"
                                                    className="text-muted-foreground hover:text-secondary transition-colors"
                                                >
                                                    info@mcrental.be
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                                <Phone className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Call Us</p>
                                                <a
                                                    href="tel:+3200000525"
                                                    className="text-muted-foreground hover:text-secondary transition-colors"
                                                >
                                                    +32 (0) 000 0525
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <p className="text-sm text-muted-foreground">
                                            <span className="font-bold text-foreground">Business Hours:</span>
                                            <br />
                                            Mon - Fri: 9:00 AM - 6:00 PM
                                            <br />
                                            Sat: 10:00 AM - 4:00 PM
                                            <br />
                                            Sun: Closed
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map */}
                            <div className="rounded-2xl overflow-hidden h-[400px] border border-border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.6955686556776!2d4.3516889!3d50.8503396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUxJzAxLjIiTiA0wrAyMScwNi4xIkU!5e0!3m2!1sen!2sbe!4v1629789000000!5m2!1sen!2sbe"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "grayscale(100%) invert(92%) contrast(83%)" }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="MC Rental Car Location"
                                />
                            </div>
                        </div>
                    </FadeUpReveal>
                </div>
            </div>
        </Layout>
    );
}
