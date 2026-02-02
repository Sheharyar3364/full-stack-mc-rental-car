import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

// Word-by-word reveal
export function TextReveal({
    children,
    className,
    delay = 0,
    duration = 0.5,
    once = true,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });
    const words = children.split(" ");

    return (
        <span ref={ref} className={className}>
            {words.map((word, index) => (
                <span key={index} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        animate={isInView ? { y: 0 } : { y: "100%" }}
                        transition={{
                            duration,
                            delay: delay + index * 0.05,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                    {index < words.length - 1 && " "}
                </span>
            ))}
        </span>
    );
}

// Character-by-character reveal
export function CharReveal({
    children,
    className,
    delay = 0,
    duration = 0.3,
    once = true,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-50px" });
    const chars = children.split("");

    return (
        <span ref={ref} className={className}>
            {chars.map((char, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                        duration,
                        delay: delay + index * 0.02,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}

// Line reveal with mask
export function LineReveal({
    children,
    className,
    delay = 0,
    once = true,
}: TextRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    return (
        <div ref={ref} className="overflow-hidden">
            <motion.div
                className={className}
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.33, 1, 0.68, 1],
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Fade up reveal
export function FadeUpReveal({
    children,
    className,
    delay = 0,
    once = true,
}: { children: React.ReactNode } & Omit<TextRevealProps, "children">) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.33, 1, 0.68, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
