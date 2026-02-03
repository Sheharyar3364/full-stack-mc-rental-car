import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { TextReveal, FadeUpReveal } from "@/components/ui/text-reveal";
import { Clock, ArrowUpRight, BookOpen, Newspaper } from "lucide-react";

const articles = [
    {
        id: "ardennes-drive",
        title: "The Ultimate Belgian Ardennes Drive",
        subtitle: "A journey through forests, valleys, and winding roads",
        author: "MC Rental Cars Owner",
        date: "January 15, 2026",
        readTime: "8 min read",
        heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920",
        category: "Road Trips",
    },
    {
        id: "lamborghini-day",
        title: "24 Hours with the Lamborghini Huracán",
        subtitle: "An unforgettable day with Italian engineering excellence",
        author: "MC Rental Cars Owner",
        date: "December 28, 2025",
        readTime: "6 min read",
        heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920",
        category: "Car Stories",
    },
    {
        id: "winter-driving",
        title: "Winter Driving: A Guide to the Mountains",
        subtitle: "Essential tips for your alpine adventure",
        author: "MC Rental Cars Owner",
        date: "November 10, 2025",
        readTime: "10 min read",
        heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
        category: "Tips & Guides",
    },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <Link href={`/journal/${article.id}`} className="block">
                <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden mb-8 shadow-2xl">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                    {/* Hover Technical Reveal */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-secondary animate-scan shadow-[0_0_15px_#1a73e8]" />
                        <div className="absolute top-8 right-8 text-[8px] font-mono text-white/40 tracking-widest uppercase">
                            Entry_{article.id.substring(0, 4).toUpperCase()}
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 p-2">
                        <span className="px-5 py-1.5 rounded-full bg-secondary text-white text-[10px] font-black uppercase tracking-[0.3em] shadow-xl">
                            {article.category}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="space-y-4 px-2">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden border border-white/10 ring-2 ring-white/5 ring-offset-2 ring-offset-[#050505]">
                            <img src="/logo.png" alt="Owner" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-secondary">{article.author}</span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime}
                    </span>
                </div>

                <Link href={`/journal/${article.id}`} className="block">
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-secondary transition-colors duration-500">
                        {article.title}
                    </h3>
                </Link>

                <p className="text-white/40 text-base leading-relaxed line-clamp-2 pb-6 border-b border-white/5">
                    {article.subtitle}
                </p>

                <Link href={`/journal/${article.id}`} className="inline-flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.4em] group/link hover:text-secondary transition-colors">
                    Read Narrative <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </Link>
            </div>
        </motion.article>
    );
}

export default function JournalPage() {
    return (
        <Layout>
            <div className="bg-[#050505] min-h-screen">
                {/* Editorial Hero */}
                <div className="relative h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
                    <div
                        className="absolute inset-0 bg-cover bg-center grayscale-[0.5] opacity-30 transform scale-110"
                        style={{
                            backgroundImage: `url('/images/gallery/journal_bg.png')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

                    <div className="relative z-10 text-center px-6 max-w-5xl">
                        <FadeUpReveal>
                            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-secondary text-[10px] font-black uppercase tracking-[0.5em] mb-10">
                                <BookOpen className="w-4 h-4" /> The Master Archive
                            </div>
                        </FadeUpReveal>

                        <h1 className="text-7xl md:text-[10rem] font-black uppercase text-white leading-[0.85] tracking-tighter mb-12">
                            <TextReveal>The</TextReveal> <br />
                            <span className="text-white/10 italic tracking-[-0.05em]"><TextReveal delay={0.3}>Journal</TextReveal></span>
                        </h1>

                        <FadeUpReveal delay={0.6}>
                            <p className="text-white/40 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-10">
                                Exploring the intersection of high-performance engineering and the art of the drive. Insights from the private stable.
                            </p>
                        </FadeUpReveal>
                    </div>
                </div>

                {/* Articles Hub */}
                <div className="container mx-auto px-6 py-32">
                    <div className="flex items-center justify-between mb-20">
                        <div className="space-y-1">
                            <h2 className="text-white font-black uppercase text-2xl tracking-tighter flex items-center gap-4">
                                <Newspaper className="text-secondary w-6 h-6" /> Recent Narratives
                            </h2>
                            <p className="text-white/20 text-[10px] font-mono tracking-widest uppercase">
                                STATUS: {articles.length} ENTRIES COMMITTED TO MEMORY
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                        {articles.map((article, i) => (
                            <ArticleCard key={article.id} article={article} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 4s linear infinite;
                }
            `}} />
        </Layout>
    );
}
