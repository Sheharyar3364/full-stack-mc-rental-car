import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { Layout } from "@/components/frontend/layout";
import { TextReveal } from "@/components/ui/text-reveal";
import { Clock } from "lucide-react";

const articles = [
    {
        id: "ardennes-drive",
        title: "The Ultimate Belgian Ardennes Drive",
        subtitle: "A journey through forests, valleys, and winding roads",
        author: "James Morrison",
        date: "January 15, 2026",
        readTime: "8 min read",
        heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920",
        category: "Road Trips",
        content: [
            {
                type: "text",
                content:
                    "There's something magical about the Belgian Ardennes in autumn. The way the morning mist clings to the valleys, the roads that twist and turn through ancient forests, and the villages that seem frozen in time. This is the definitive guide to experiencing it all from behind the wheel of a luxury vehicle.",
            },
            {
                type: "image",
                url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1600",
                caption: "The Porsche 911 handles the winding roads with precision",
            },
            {
                type: "text",
                content:
                    "We started our journey in Brussels, picking up a Porsche 911 Carrera S – the perfect companion for the roads ahead. The E411 motorway took us south, but the real adventure began when we exited at Marche-en-Famenne.",
            },
            {
                type: "pullquote",
                content:
                    "The roads here aren't just asphalt – they're an invitation to drive the way driving was meant to be experienced.",
            },
            {
                type: "text",
                content:
                    "The N86 towards La Roche-en-Ardenne is where the magic truly begins. Sweeping corners, dramatic elevation changes, and views that demand you pull over and breathe it all in. We stopped at a small café in Hotton for coffee and watched the morning light paint the hillsides gold.",
            },
        ],
    },
    {
        id: "lamborghini-day",
        title: "24 Hours with the Lamborghini Huracán",
        subtitle: "An unforgettable day with Italian engineering excellence",
        author: "Sarah Chen",
        date: "December 28, 2025",
        readTime: "6 min read",
        heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920",
        category: "Car Stories",
        content: [],
    },
    {
        id: "winter-driving",
        title: "Winter Driving: A Guide to the Mountains",
        subtitle: "Essential tips for your alpine adventure",
        author: "Marcus Berg",
        date: "November 10, 2025",
        readTime: "10 min read",
        heroImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1920",
        category: "Tips & Guides",
        content: [],
    },
];

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <Link href={`/journal/${article.id}`}>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 cursor-pointer">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-widest">
                            {article.category}
                        </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-secondary transition-colors">
                            {article.title}
                        </h3>
                    </div>
                </div>
            </Link>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="font-medium">{article.author}</span>
                <span>•</span>
                <span>{article.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                </span>
            </div>

            <p className="mt-3 text-muted-foreground">{article.subtitle}</p>
        </motion.article>
    );
}

export default function JournalPage() {
    return (
        <Layout>
            {/* Hero */}
            <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-black overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920')`,
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-secondary text-sm font-black uppercase tracking-[0.4em] mb-4"
                    >
                        Stories & Adventures
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase text-white leading-[0.85]">
                        <TextReveal delay={0.2}>The Journal</TextReveal>
                    </h1>
                </div>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {articles.map((article, i) => (
                        <ArticleCard key={article.id} article={article} index={i} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}
