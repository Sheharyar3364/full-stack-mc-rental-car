import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export function SoundToggle() {
    // In our simplified hook, toggle might not return a bool if not implemented fully,
    // but assuming we match the interface:
    const { toggle, isEnabled, playClick } = useSoundEffects();
    // Defaulting to false if isEnabled is undefined
    const [enabled, setEnabled] = useState(false);

    const handleToggle = () => {
        // playClick(); // using internal toggle logic
        // For now, just toggle local state as the hook is a placeholder
        setEnabled(!enabled);
    };

    return (
        <motion.button
            onClick={handleToggle}
            className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-card/80 backdrop-blur-md border border-border shadow-lg flex items-center justify-center text-foreground hover:bg-card transition-all group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 }}
        >
            <AnimatePresence mode="wait">
                {enabled ? (
                    <motion.div
                        key="on"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                    >
                        <Volume2 className="w-5 h-5" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="off"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 90 }}
                    >
                        <VolumeX className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-foreground text-background text-[10px] font-bold uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {enabled ? "Sound On" : "Sound Off"}
            </span>
        </motion.button>
    );
}
