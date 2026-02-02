import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Sparkles, Car, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface Message {
    id: number;
    type: "bot" | "user";
    content: string;
    suggestions?: string[];
    carRecommendations?: Array<{
        id: number;
        name: string;
        image: string;
        price: number;
    }>;
}

const quickPrompts = [
    { icon: <Car className="w-4 h-4" />, text: "I need a luxury car" },
    { icon: <Calendar className="w-4 h-4" />, text: "Weekend getaway" },
    { icon: <MapPin className="w-4 h-4" />, text: "Airport pickup" },
];

const botResponses: Record<string, Message> = {
    luxury: {
        id: 0,
        type: "bot",
        content: "Excellent choice! For a luxury experience, I'd recommend our flagship vehicles. Here are my top picks:",
        carRecommendations: [
            { id: 1, name: "BMW 7 Series", image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400", price: 4500 },
            { id: 2, name: "Mercedes S-Class", image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=400", price: 5000 },
        ],
        suggestions: ["Tell me more about the BMW", "What's included?", "Book the Mercedes"],
    },
    weekend: {
        id: 0,
        type: "bot",
        content: "A weekend getaway sounds perfect! 🚗 When are you planning to travel, and how many people will be joining?",
        suggestions: ["This weekend", "Next weekend", "Just me", "Couple trip"],
    },
    airport: {
        id: 0,
        type: "bot",
        content: "I can arrange airport pickup! Which airport and what time does your flight land? ✈️",
        suggestions: ["Brussels Airport", "Charleroi Airport", "Morning flight", "Evening flight"],
    },
    default: {
        id: 0,
        type: "bot",
        content: "I'd be happy to help you find the perfect vehicle! Could you tell me more about what you're looking for?",
        suggestions: ["Luxury sedan", "Family SUV", "Sports car", "Best deals"],
    },
};

export function AIConcierge() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: "bot",
            content: "Hello! 👋 I'm your personal concierge. How can I help you find the perfect vehicle today?",
            suggestions: ["Explore luxury cars", "I need recommendations", "Special occasion"],
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { playClick, playWhoosh } = useSoundEffects();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;

        playClick();

        // Add user message
        const userMessage: Message = {
            id: Date.now(),
            type: "user",
            content: text,
        };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");

        // Simulate bot typing
        setIsTyping(true);
        setTimeout(() => {
            const lowerText = text.toLowerCase();
            let response: Message;

            if (lowerText.includes("luxury") || lowerText.includes("bmw") || lowerText.includes("mercedes")) {
                response = { ...botResponses.luxury, id: Date.now() + 1 };
            } else if (lowerText.includes("weekend") || lowerText.includes("getaway")) {
                response = { ...botResponses.weekend, id: Date.now() + 1 };
            } else if (lowerText.includes("airport") || lowerText.includes("pickup")) {
                response = { ...botResponses.airport, id: Date.now() + 1 };
            } else {
                response = { ...botResponses.default, id: Date.now() + 1 };
            }

            setMessages((prev) => [...prev, response]);
            setIsTyping(false);
            playWhoosh();
        }, 1500);
    };

    return (
        <>
            {/* Floating Button */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => {
                            setIsOpen(true);
                            playClick();
                        }}
                        className="fixed bottom-24 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-red-500 text-white shadow-2xl shadow-secondary/40 flex items-center justify-center group"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <MessageCircle className="w-7 h-7" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />

                        {/* Tooltip */}
                        <span className="absolute right-full mr-4 px-4 py-2 bg-foreground text-background text-sm font-bold rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            Need help? Ask me!
                        </span>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-8 right-8 z-50 w-[400px] h-[600px] bg-card border border-border rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-secondary to-red-500 text-white p-5 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold">AI Concierge</h3>
                                    <p className="text-xs text-white/70">Always here to help</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    playClick();
                                }}
                                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Quick Prompts */}
                        <div className="px-4 py-3 border-b border-border flex gap-2 overflow-x-auto shrink-0">
                            {quickPrompts.map((prompt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(prompt.text)}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-secondary hover:text-white text-muted-foreground text-xs font-medium whitespace-nowrap transition-all"
                                >
                                    {prompt.icon}
                                    {prompt.text}
                                </button>
                            ))}
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex gap-3 ${msg.type === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.type === "bot" ? "bg-secondary text-white" : "bg-muted"
                                            }`}
                                    >
                                        {msg.type === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                                    </div>
                                    <div className={`max-w-[80%] ${msg.type === "user" ? "text-right" : ""}`}>
                                        <div
                                            className={`inline-block px-4 py-3 rounded-2xl ${msg.type === "user"
                                                ? "bg-secondary text-white rounded-br-sm"
                                                : "bg-muted rounded-bl-sm"
                                                }`}
                                        >
                                            <p className="text-sm">{msg.content}</p>
                                        </div>

                                        {/* Car Recommendations */}
                                        {msg.carRecommendations && (
                                            <div className="mt-3 space-y-2">
                                                {msg.carRecommendations.map((car) => (
                                                    <div
                                                        key={car.id}
                                                        className="flex items-center gap-3 p-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                                                    >
                                                        <img
                                                            src={car.image}
                                                            alt={car.name}
                                                            className="w-16 h-12 rounded-lg object-cover"
                                                        />
                                                        <div className="flex-1 text-left">
                                                            <p className="font-bold text-sm">{car.name}</p>
                                                            <p className="text-xs text-muted-foreground">€{car.price}/day</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Suggestions */}
                                        {msg.suggestions && msg.type === "bot" && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {msg.suggestions.map((suggestion, i) => (
                                                    <button
                                                        key={i}
                                                        onClick={() => handleSend(suggestion)}
                                                        className="px-3 py-1.5 rounded-full border border-border hover:bg-secondary hover:text-white hover:border-secondary text-xs font-medium transition-all"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center">
                                        <Bot className="w-4 h-4" />
                                    </div>
                                    <div className="px-4 py-3 rounded-2xl bg-muted rounded-bl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                            <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border shrink-0">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
                                    placeholder="Ask me anything..."
                                    className="flex-1 h-12 px-4 rounded-xl bg-muted border-0 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                                />
                                <Button
                                    onClick={() => handleSend(inputValue)}
                                    className="h-12 w-12 rounded-xl bg-secondary hover:bg-secondary/90"
                                >
                                    <Send className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
