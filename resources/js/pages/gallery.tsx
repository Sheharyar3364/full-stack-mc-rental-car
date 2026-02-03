import { Layout } from '@/components/frontend/layout';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Head } from '@inertiajs/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

// Static Gallery Data with relative paths
const galleryItems = [
    {
        id: 1,
        title: 'Urban Stealth',
        price: '€1,200/day',
        image: '/images/gallery/luxury_suv_gallery_1770125084892.png',
        description: 'The ultimate expression of power and presence. Designed for those who demand the boardroom follows them to the street.',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        id: 2,
        title: 'Alpine Explorer',
        price: '€850/day',
        image: '/images/gallery/sports_car_mountain_road_1770125099659.png',
        description: 'Conquering high-altitude terrains with unmatched elegance and twin-turbo performance.',
        className: 'md:col-span-1 md:row-span-1',
    },
    {
        id: 3,
        title: 'Classic Riviera',
        price: '€1,500/day',
        image: '/images/gallery/classic_car_european_street_1770125114528.png',
        description: 'Timeless beauty on the open road. A celebration of heritage and hand-stitched leather.',
        className: 'md:col-span-1 md:row-span-2',
    },
    {
        id: 4,
        title: 'The Cockpit',
        price: 'Experience',
        image: '/images/gallery/luxury_interior_car_1770125281695.png',
        description: 'Where technology meets artisanal craftsmanship. Every surface is an invitation to luxury.',
        className: 'md:col-span-1 md:row-span-1',
    },
    {
        id: 5,
        title: 'Neon Nights',
        price: '€2,400/day',
        image: '/images/gallery/supercar_night_city_1770125298388.png',
        description: 'The peak of performance under city lights. Aggressive aerodynamics meet futuristic soul.',
        className: 'md:col-span-2 md:row-span-1',
    },
    {
        id: 6,
        title: 'Tropical Escape',
        price: '€950/day',
        image: '/images/gallery/luxury_cabriolet_beach_1770125324274.png',
        description: 'Sun-drenched freedom. The perfect companion for coastal drifts and sunset horizons.',
        className: 'md:col-span-1 md:row-span-1',
    },
];

export default function Gallery() {
    const [index, setIndex] = useState(-1);
    const { scrollYProgress } = useScroll();
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

    const slides = galleryItems.map((item) => ({ src: item.image, title: item.title, description: item.description }));

    return (
        <Layout>
            <Head title="Premium Gallery - MC Rental Cars" />

            <div className="relative min-h-screen bg-black">
                {/* Parallax Hero Background */}
                <motion.div style={{ y: backgroundY }} className="absolute inset-0 opacity-40 grayscale">
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-black via-transparent to-black" />
                    <img src="/images/gallery/supercar_night_city_1770125298388.png" alt="Background" className="h-full w-full object-cover" />
                </motion.div>

                <section className="relative z-20 pt-40 pb-32">
                    <div className="container mx-auto px-6">
                        {/* Header */}
                        <div className="mb-24 max-w-5xl">
                            <FadeUpReveal>
                                <div className="mb-6 flex items-center gap-2 text-secondary">
                                    <Sparkles className="h-5 w-5 fill-current" />
                                    <span className="text-xs font-black tracking-[0.4em] uppercase">The Private Collection</span>
                                </div>
                            </FadeUpReveal>
                            <h1 className="mb-8 text-6xl leading-[0.85] font-black tracking-tighter text-white uppercase md:text-9xl">
                                <TextReveal>World-Class</TextReveal> <br />
                                <TextReveal className="text-white/30">Curated</TextReveal> <TextReveal className="text-secondary">Fleet</TextReveal>
                            </h1>
                            <FadeUpReveal delay={0.4}>
                                <div className="flex flex-col justify-between gap-12 md:flex-row md:items-end">
                                    <p className="max-w-xl text-xl leading-relaxed text-white/50">
                                        We don't just rent cars; we deliver masterpieces. Explore our vision of automotive excellence through a lens
                                        of pure luxury and performance.
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-black text-white">50+</div>
                                            <div className="text-[10px] tracking-widest text-white/40 uppercase">Vehicles</div>
                                        </div>
                                        <div className="h-10 w-px bg-white/20" />
                                        <div className="text-center">
                                            <div className="text-4xl font-black text-white">24/7</div>
                                            <div className="text-[10px] tracking-widest text-white/40 uppercase">Concierge</div>
                                        </div>
                                    </div>
                                </div>
                            </FadeUpReveal>
                        </div>

                        {/* Creative Bento Grid */}
                        <div className="grid auto-rows-[350px] grid-cols-1 gap-6 md:grid-cols-4">
                            {galleryItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                    className={`group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 ${item.className}`}
                                    onClick={() => setIndex(i)}
                                >
                                    {/* Image */}
                                    <motion.img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover opacity-80 transition-all duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
                                    />

                                    {/* Overlay Content */}
                                    <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/20 to-transparent p-10">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                {/* <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    className="inline-block px-3 py-1 rounded-full bg-secondary/20 backdrop-blur-md border border-secondary/30 text-secondary text-[10px] font-bold uppercase tracking-widest mb-4"
                                                >
                                                    {item.price}
                                                </motion.div> */}
                                                <h3 className="text-3xl font-black tracking-tight text-white uppercase transition-colors duration-300 group-hover:text-secondary">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <div className="flex h-12 w-12 transform items-center justify-center rounded-full border border-white/20 text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                                                <ArrowUpRight className="h-6 w-6" />
                                            </div>
                                        </div>

                                        {/* Expandable Description on Hover (Desktop) */}
                                        <div className="mt-4 h-0 overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:h-auto group-hover:opacity-100">
                                            <p className="max-w-sm text-sm leading-relaxed text-white/60">{item.description}</p>
                                        </div>
                                    </div>

                                    {/* Scanning Effect Overlay */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10">
                                        <div className="animate-scan absolute top-1/2 left-0 h-1 w-full bg-white shadow-[0_0_15px_white]" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lightbox */}
                <Lightbox
                    index={index}
                    open={index >= 0}
                    close={() => setIndex(-1)}
                    slides={slides}
                    styles={{ container: { backgroundColor: 'rgba(0, 0, 0, .95)' } }}
                />

                {/* Bottom Footer Section */}
                <section className="border-t border-white/5 py-24">
                    <div className="container mx-auto flex flex-col items-center justify-between gap-12 px-6 md:flex-row">
                        <div className="flex items-center gap-6">
                            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10">
                                <Camera className="h-8 w-8 text-white/20" />
                            </div>
                            <div>
                                <h4 className="mb-1 text-xl font-black text-white uppercase">Own the Moment.</h4>
                                <p className="text-sm text-white/40">Unrivaled cars. Zero hassle. 100% luxury.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-16 rounded-full bg-white px-12 text-xs font-black tracking-widest text-black uppercase transition-all duration-500 hover:bg-secondary hover:text-white"
                            >
                                Contact Sales
                            </motion.button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Global Animation Utility */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `,
                }}
            />
        </Layout>
    );
}
