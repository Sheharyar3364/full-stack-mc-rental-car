import { useState, createContext, useContext, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Fuel, Settings, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Car {
    id: number;
    name: string;
    brand: string;
    type: string;
    image: string;
    price: number;
    seats: number;
    fuel: string;
    transmission: string;
    power?: string;
    acceleration?: string;
    features?: string[];
}

interface CompareContextType {
    cars: Car[];
    addCar: (car: Car) => void;
    removeCar: (id: number) => void;
    clearAll: () => void;
    isInCompare: (id: number) => boolean;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: ReactNode }) {
    const [cars, setCars] = useState<Car[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const addCar = (car: Car) => {
        if (cars.length < 3 && !cars.find((c) => c.id === car.id)) {
            setCars([...cars, car]);
            if (cars.length === 0) setIsOpen(true);
        }
    };

    const removeCar = (id: number) => {
        setCars(cars.filter((c) => c.id !== id));
    };

    const clearAll = () => {
        setCars([]);
        setIsOpen(false);
    };

    const isInCompare = (id: number) => cars.some((c) => c.id === id);

    return (
        <CompareContext.Provider
            value={{ cars, addCar, removeCar, clearAll, isInCompare, isOpen, setIsOpen }}
        >
            {children}
        </CompareContext.Provider>
    );
}

export function useCompare() {
    const context = useContext(CompareContext);
    if (!context) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return context;
}

// Compare button for car cards
export function CompareButton({ car }: { car: Car }) {
    const { addCar, removeCar, isInCompare, cars } = useCompare();
    const isAdded = isInCompare(car.id);
    const isFull = cars.length >= 3;

    return (
        <motion.button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isAdded) {
                    removeCar(car.id);
                } else if (!isFull) {
                    addCar(car);
                }
            }}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${isAdded
                ? "bg-secondary text-white"
                : isFull
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : "bg-muted hover:bg-secondary hover:text-white text-muted-foreground"
                }`}
            whileHover={{ scale: isAdded || !isFull ? 1.05 : 1 }}
            whileTap={{ scale: isAdded || !isFull ? 0.95 : 1 }}
        >
            {isAdded ? (
                <>
                    <Check className="w-3 h-3 inline mr-1" />
                    Added
                </>
            ) : (
                "Compare"
            )}
        </motion.button>
    );
}

// Compare drawer
export function CompareDrawer() {
    const { cars, removeCar, clearAll, isOpen, setIsOpen } = useCompare();

    const specRows = [
        { label: "Price/Day", key: "price", format: (v: number) => `€${v.toLocaleString()}` },
        { label: "Seats", key: "seats" },
        { label: "Fuel", key: "fuel" },
        { label: "Transmission", key: "transmission" },
        { label: "Power", key: "power", fallback: "—" },
        { label: "0-100 km/h", key: "acceleration", fallback: "—" },
    ];

    if (cars.length === 0) return null;

    return (
        <>
            {/* Floating indicator */}
            <AnimatePresence>
                {!isOpen && cars.length > 0 && (
                    <motion.button
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-full bg-secondary text-white shadow-2xl shadow-secondary/30 flex items-center gap-3"
                    >
                        <span className="text-sm font-bold">{cars.length} cars to compare</span>
                        <div className="flex -space-x-4">
                            {cars.map((car) => (
                                <img
                                    key={car.id}
                                    src={car.image}
                                    alt={car.name}
                                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                                />
                            ))}
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Full drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 z-50 bg-card border-t border-border shadow-2xl max-h-[80vh] overflow-y-auto"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-card/95 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Compare Vehicles</h3>
                                <p className="text-muted-foreground text-sm">{cars.length}/3 selected</p>
                            </div>
                            <div className="flex gap-3">
                                <Button variant="ghost" onClick={clearAll} className="text-muted-foreground">
                                    Clear All
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Comparison Grid */}
                        <div className="p-6">
                            <div className="grid gap-6" style={{ gridTemplateColumns: `180px repeat(${cars.length}, 1fr)` }}>
                                {/* Car Images Row */}
                                <div />
                                {cars.map((car) => (
                                    <div key={car.id} className="text-center relative group">
                                        <button
                                            onClick={() => removeCar(car.id)}
                                            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-muted">
                                            <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                                        </div>
                                        <p className="text-secondary text-[10px] font-bold uppercase tracking-widest">
                                            {car.brand}
                                        </p>
                                        <h4 className="text-lg font-black uppercase">{car.name}</h4>
                                    </div>
                                ))}

                                {/* Spec Rows */}
                                {specRows.map((row) => (
                                    <>
                                        <div key={row.label} className="flex items-center text-muted-foreground text-sm font-medium py-4 border-t border-border">
                                            {row.label}
                                        </div>
                                        {cars.map((car) => (
                                            <div key={`${car.id}-${row.key}`} className="flex items-center justify-center py-4 border-t border-border font-bold">
                                                {row.format
                                                    ? row.format((car as any)[row.key])
                                                    : (car as any)[row.key] || row.fallback}
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
