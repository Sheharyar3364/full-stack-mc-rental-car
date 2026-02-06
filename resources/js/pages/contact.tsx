import { Layout } from '@/components/frontend/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { FormEventHandler } from 'react';

export default function Contact() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/contact');
    };

    return (
        <Layout>
            <Head title="Contact Us - MCRENTALCARS" />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-black py-24 md:py-32">
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-transparent opacity-50" />
                <div className="relative z-10 container mx-auto px-6">
                    <FadeUpReveal>
                        <div className="mb-6 flex items-center gap-2 text-[10px] font-black tracking-[0.4em] text-white/50 uppercase">
                            <Link href="/" className="transition-colors hover:text-white">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-white">Contact</span>
                        </div>
                    </FadeUpReveal>
                    <h1 className="text-4xl leading-[0.9] font-black text-white uppercase md:text-7xl">
                        <TextReveal delay={0.1}>Get In</TextReveal>
                        <br />
                        <TextReveal className="text-secondary italic" delay={0.2}>
                            Touch
                        </TextReveal>
                    </h1>
                </div>
            </section>

            <div className="container mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <FadeUpReveal delay={0.3}>
                        <div className="space-y-8">
                            <div>
                                <h2 className="mb-2 text-2xl font-black uppercase">Send Us a Message</h2>
                                <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-xs font-bold tracking-widest text-foreground uppercase">
                                        Full Name *
                                    </Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Enter your full name"
                                        className="h-14 rounded-xl border-border bg-muted/50 focus:border-secondary"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-xs font-bold tracking-widest text-foreground uppercase">
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="Enter your email"
                                            className="h-14 rounded-xl border-border bg-muted/50 focus:border-secondary"
                                            required
                                        />
                                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="text-xs font-bold tracking-widest text-foreground uppercase">
                                            Phone
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                            placeholder="Enter your phone number"
                                            className="h-14 rounded-xl border-border bg-muted/50 focus:border-secondary"
                                        />
                                        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="subject" className="text-xs font-bold tracking-widest text-foreground uppercase">
                                        Subject
                                    </Label>
                                    <Input
                                        id="subject"
                                        value={data.subject}
                                        onChange={(e) => setData('subject', e.target.value)}
                                        placeholder="Subject of your inquiry"
                                        className="h-14 rounded-xl border-border bg-muted/50 focus:border-secondary"
                                    />
                                    {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message" className="text-xs font-bold tracking-widest text-foreground uppercase">
                                        Message *
                                    </Label>
                                    <textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Tell us about your inquiry..."
                                        className="h-32 w-full resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground focus:border-secondary focus:outline-none"
                                        required
                                    />
                                    {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="h-14 w-full rounded-xl bg-secondary px-10 font-bold tracking-widest text-white uppercase hover:bg-secondary/90 md:w-auto"
                                >
                                    <Send className="mr-2 h-4 w-4" />
                                    {processing ? 'Sending...' : 'Send Message'}
                                </Button>
                            </form>
                        </div>
                    </FadeUpReveal>

                    {/* Contact Info & Map */}
                    <FadeUpReveal delay={0.4}>
                        <div className="space-y-8">
                            {/* Contact Card */}
                            <Card className="border-border bg-card">
                                <CardContent className="space-y-6 p-8">
                                    <h3 className="text-xl font-black uppercase">Contact Information</h3>

                                    <div className="space-y-5">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                                                <MapPin className="h-5 w-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Our Location</p>
                                                <p className="text-muted-foreground">3638 MC Rental Car, Brussels, Belgium</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                                                <Mail className="h-5 w-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Email Us</p>
                                                <a
                                                    href="mailto:info@mcrental.be"
                                                    className="text-muted-foreground transition-colors hover:text-secondary"
                                                >
                                                    info@mcrental.be
                                                </a>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-secondary/10">
                                                <Phone className="h-5 w-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-foreground">Call Us</p>
                                                <a href="tel:+3200000525" className="text-muted-foreground transition-colors hover:text-secondary">
                                                    +32 (0) 000 0525
                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-4">
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
                            <div className="h-[400px] overflow-hidden rounded-2xl border border-border">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.6955686556776!2d4.3516889!3d50.8503396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUxJzAxLjIiTiA0wrAyMScwNi4xIkU!5e0!3m2!1sen!2sbe!4v1629789000000!5m2!1sen!2sbe"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
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
