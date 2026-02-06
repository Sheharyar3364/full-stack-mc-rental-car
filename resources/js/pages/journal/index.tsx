import { Layout } from '@/components/frontend/layout';
import { FadeUpReveal, TextReveal } from '@/components/ui/text-reveal';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Clock, Newspaper } from 'lucide-react';

const articles = [
    {
        id: 'ardennes-drive',
        title: 'The Ultimate Belgian Ardennes Drive',
        subtitle: 'A journey through forests, valleys, and winding roads',
        author: 'MCRENTALCARS Owner',
        date: 'January 15, 2026',
        readTime: '8 min read',
        heroImage: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920',
        category: 'Road Trips',
    },
    {
        id: 'lamborghini-day',
        title: '24 Hours with the Lamborghini Huracán',
        subtitle: 'An unforgettable day with Italian engineering excellence',
        author: 'MCRENTALCARS Owner',
        date: 'December 28, 2025',
        readTime: '6 min read',
        heroImage: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920',
        category: 'Car Stories',
    },
    {
        id: 'winter-driving',
        title: 'Winter Driving: A Guide to the Mountains',
        subtitle: 'Essential tips for your alpine adventure',
        author: 'MCRENTALCARS Owner',
        date: 'November 10, 2025',
        readTime: '10 min read',
        heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920',
        category: 'Tips & Guides',
    },
];

function ArticleCard({ article, index }: { article: (typeof articles)[0]; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
        >
            <Link href={`/journal/${article.id}`} className="block">
                <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-[2rem] shadow-2xl">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="h-full w-full object-cover grayscale-[0.3] transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />

                    {/* Hover Technical Reveal */}
                    <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="animate-scan absolute top-1/2 left-0 h-[1px] w-full bg-secondary shadow-[0_0_15px_#1a73e8]" />
                        <div className="absolute top-8 right-8 font-mono text-[8px] tracking-widest text-white/40 uppercase">
                            Entry_{article.id.substring(0, 4).toUpperCase()}
                        </div>
                    </div>

                    <div className="absolute bottom-10 left-10 p-2">
                        <span className="rounded-full bg-secondary px-5 py-1.5 text-[10px] font-black tracking-[0.3em] text-white uppercase shadow-xl">
                            {article.category}
                        </span>
                    </div>
                </div>
            </Link>

            <div className="space-y-4 px-2">
                <div className="flex items-center gap-4 text-[10px] font-black tracking-[0.2em] text-white/30 uppercase">
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 overflow-hidden rounded-full border border-white/10 ring-2 ring-white/5 ring-offset-2 ring-offset-[#050505]">
                            <img src="/logo.png" alt="Owner" className="h-full w-full object-cover" />
                        </div>
                        <span className="text-secondary">{article.author}</span>
                    </div>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5" />
                        {article.readTime}
                    </span>
                </div>

                <Link href={`/journal/${article.id}`} className="block">
                    <h3 className="text-3xl leading-tight font-black tracking-tighter text-white uppercase transition-colors duration-500 group-hover:text-secondary">
                        {article.title}
                    </h3>
                </Link>

                <p className="line-clamp-2 border-b border-white/5 pb-6 text-base leading-relaxed text-white/40">{article.subtitle}</p>

                <Link
                    href={`/journal/${article.id}`}
                    className="group/link inline-flex items-center gap-3 text-[10px] font-black tracking-[0.4em] text-white uppercase transition-colors hover:text-secondary"
                >
                    Read Narrative{' '}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                </Link>
            </div>
        </motion.article>
    );
}

export default function JournalPage() {
    return (
        <Layout>
            <div className="min-h-screen bg-[#050505]">
                {/* Editorial Hero */}
                <div className="relative flex h-[70vh] items-center justify-center overflow-hidden border-b border-white/5">
                    <div
                        className="absolute inset-0 scale-110 transform bg-cover bg-center opacity-30 grayscale-[0.5]"
                        style={{
                            backgroundImage: `url('/images/gallery/journal_bg.png')`,
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] opacity-80" />

                    <div className="relative z-10 max-w-5xl px-6 text-center">
                        <FadeUpReveal>
                            <div className="mb-10 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-black tracking-[0.5em] text-secondary uppercase">
                                <BookOpen className="h-4 w-4" /> The Master Archive
                            </div>
                        </FadeUpReveal>

                        <h1 className="mb-12 text-7xl leading-[0.85] font-black tracking-tighter text-white uppercase md:text-[10rem]">
                            <TextReveal>The</TextReveal> <br />
                            <span className="tracking-[-0.05em] text-white/10 italic">
                                <TextReveal delay={0.3}>Journal</TextReveal>
                            </span>
                        </h1>

                        <FadeUpReveal delay={0.6}>
                            <p className="mx-auto max-w-2xl border-t border-white/5 pt-10 text-lg leading-relaxed font-medium text-white/40 md:text-xl">
                                Exploring the intersection of high-performance engineering and the art of the drive. Insights from the private stable.
                            </p>
                        </FadeUpReveal>
                    </div>
                </div>

                {/* Articles Hub */}
                <div className="container mx-auto px-6 py-32">
                    <div className="mb-20 flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="flex items-center gap-4 text-2xl font-black tracking-tighter text-white uppercase">
                                <Newspaper className="h-6 w-6 text-secondary" /> Recent Narratives
                            </h2>
                            <p className="font-mono text-[10px] tracking-widest text-white/20 uppercase">
                                STATUS: {articles.length} ENTRIES COMMITTED TO MEMORY
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-x-12 gap-y-24 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article, i) => (
                            <ArticleCard key={article.id} article={article} index={i} />
                        ))}
                    </div>
                </div>
            </div>

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
