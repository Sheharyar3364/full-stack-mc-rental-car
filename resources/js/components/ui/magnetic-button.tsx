import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    magnetStrength?: number;
    onClick?: () => void;
}

export function MagneticButton({
    children,
    className,
    magnetStrength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        setPosition({
            x: distanceX * magnetStrength,
            y: distanceY * magnetStrength,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative inline-flex items-center justify-center overflow-hidden transition-colors",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
        >
            <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
                transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            >
                {children}
            </motion.span>
        </motion.button>
    );
}

// Variant with fill animation
export function MagneticButtonFill({
    children,
    className,
    magnetStrength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        setPosition({
            x: distanceX * magnetStrength,
            y: distanceY * magnetStrength,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setIsHovered(false);
    };

    return (
        <motion.button
            ref={ref}
            className={cn(
                "relative inline-flex items-center justify-center overflow-hidden group",
                className
            )}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
        >
            {/* Background fill animation */}
            <motion.div
                className="absolute inset-0 bg-secondary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: isHovered ? 1.5 : 0,
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                style={{ borderRadius: "inherit", originX: 0.5, originY: 0.5 }}
            />

            <motion.span
                className="relative z-10 flex items-center gap-2 transition-colors duration-300"
                animate={{ x: position.x * 0.3, y: position.y * 0.3 }}
                transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.5 }}
            >
                {children}
            </motion.span>
        </motion.button>
    );
}
