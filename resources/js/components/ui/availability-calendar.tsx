import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Calendar as CalendarIcon,
    Sparkles,
    TrendingDown,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Price multipliers for different day types
const getPriceMultiplier = (date: Date): number => {
    const day = date.getDay();
    const month = date.getMonth();

    // Weekend premium
    if (day === 5 || day === 6) return 1.3;
    // Holiday season (Dec)
    if (month === 11) return 1.5;
    // Summer (Jun-Aug)
    if (month >= 5 && month <= 7) return 1.2;
    // Midweek discount
    if (day >= 1 && day <= 3) return 0.85;
    return 1;
};

const getPriceColor = (multiplier: number): string => {
    if (multiplier <= 0.85) return "bg-green-500";
    if (multiplier <= 1) return "bg-green-400";
    if (multiplier <= 1.2) return "bg-yellow-400";
    if (multiplier <= 1.3) return "bg-orange-400";
    return "bg-red-500";
};

interface BookedDateRange {
    start: string;
    end: string;
}

interface AvailabilityCalendarProps {
    basePrice?: number;
    bookedDates?: BookedDateRange[];
    onDateSelect?: (date: Date) => void;
    className?: string;
    compact?: boolean;
    value?: Date | null;
    showHeader?: boolean;
    minDate?: Date | null;
}

export function AvailabilityCalendar({
    basePrice = 500,
    bookedDates = [],
    onDateSelect,
    className,
    compact = false,
    value = null,
    showHeader = true,
    minDate = null,
}: AvailabilityCalendarProps) {
    const [viewDate, setViewDate] = useState(value || new Date());
    const [selectedDateState, setSelectedDateState] = useState<Date | null>(value);

    // Use controlled value if provided, otherwise internal state
    const selectedDate = value !== undefined ? value : selectedDateState;

    // Sync view date with value if value changes from outside
    useEffect(() => {
        if (value) {
            setViewDate(value);
        }
    }, [value]);

    const [showBestDeal, setShowBestDeal] = useState(false);
    const { playClick } = useSoundEffects();

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startingDay = firstDayOfMonth.getDay();

    const prevMonth = () => {
        playClick();
        setViewDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        playClick();
        setViewDate(new Date(year, month + 1, 1));
    };

    const handleDateClick = (day: number) => {
        const date = new Date(year, month, day);
        const isBeforeMin = minDate ? date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : false;
        if (date < new Date(today.getFullYear(), today.getMonth(), today.getDate()) || isDateBooked(date) || isBeforeMin) return;
        playClick();
        if (value === undefined) {
            setSelectedDateState(date);
        }
        onDateSelect?.(date);
    };

    // Check if a date falls within any booked range
    const isDateBooked = (date: Date): boolean => {
        const checkDate = date.toISOString().split('T')[0];
        return bookedDates.some(range => {
            return checkDate >= range.start && checkDate <= range.end;
        });
    };

    const findBestDeal = () => {
        playClick();
        // Find cheapest day in the next 30 days
        let bestDate = new Date();
        let bestMultiplier = Infinity;

        for (let i = 1; i <= 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);
            const multiplier = getPriceMultiplier(date);
            if (multiplier < bestMultiplier) {
                bestMultiplier = multiplier;
                bestDate = date;
            }
        }

        setViewDate(new Date(bestDate.getFullYear(), bestDate.getMonth(), 1));
        if (value === undefined) {
            setSelectedDateState(bestDate);
        }
        setShowBestDeal(true);
        setTimeout(() => setShowBestDeal(false), 3000);
    };

    const today = new Date();

    return (
        <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`}>
            {/* Header */}
            {showHeader && (
                <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`rounded-xl bg-secondary/10 flex items-center justify-center ${compact ? 'w-8 h-8' : 'w-10 h-10'}`}>
                                <CalendarIcon className={`${compact ? 'w-4 h-4' : 'w-5 h-5'} text-secondary`} />
                            </div>
                            <div>
                                <h3 className={`${compact ? 'text-sm' : 'text-lg'} font-bold`}>{compact ? 'Availability' : 'Availability & Pricing'}</h3>
                                {!compact && <p className="text-muted-foreground text-sm">Select your rental date</p>}
                            </div>
                        </div>
                        {!compact && (
                            <motion.button
                                onClick={findBestDeal}
                                className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-bold hover:bg-green-500/20 transition-colors"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Sparkles className="w-4 h-4" />
                                Find Best Deal
                            </motion.button>
                        )}
                    </div>

                    {/* Month Navigation */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prevMonth}
                            className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full hover:bg-muted flex items-center justify-center transition-colors`}
                        >
                            <ChevronLeft className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                        </button>
                        <h4 className={`${compact ? 'text-lg' : 'text-xl'} font-bold`}>
                            {months[month]} {year}
                        </h4>
                        <button
                            onClick={nextMonth}
                            className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full hover:bg-muted flex items-center justify-center transition-colors`}
                        >
                            <ChevronRight className={`${compact ? 'w-4 h-4' : 'w-5 h-5'}`} />
                        </button>
                    </div>
                </div>
            )}

            {/* Calendar Grid */}
            <div className="p-4">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map((day) => (
                        <div
                            key={day}
                            className="h-10 flex items-center justify-center text-xs font-bold text-muted-foreground uppercase"
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-1">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-16" />
                    ))}

                    {/* Days of month */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const date = new Date(year, month, day);
                        const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                        const isBooked = !isPast && isDateBooked(date);
                        const isSelected = selectedDate?.toDateString() === date.toDateString();
                        const isToday = date.toDateString() === today.toDateString();
                        const multiplier = getPriceMultiplier(date);
                        const price = Math.round(basePrice * multiplier);

                        const isBeforeMin = minDate ? date < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : false;
                        const isDisabled = isPast || isBooked || isBeforeMin;

                        return (
                            <motion.button
                                key={day}
                                onClick={() => !isDisabled && handleDateClick(day)}
                                disabled={isDisabled}
                                className={`relative ${compact ? 'h-10' : 'h-16'} rounded-xl flex flex-col items-center justify-center transition-all ${isPast
                                    ? "opacity-30 cursor-not-allowed"
                                    : isBooked
                                        ? "bg-red-500/20 cursor-not-allowed"
                                        : isSelected
                                            ? "bg-secondary text-white shadow-lg shadow-secondary/30"
                                            : "hover:bg-muted"
                                    } ${isToday && !isSelected ? "ring-2 ring-secondary" : ""}`}
                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                            >
                                <span className={`${compact ? 'text-[10px]' : 'text-sm'} font-bold ${isSelected ? "text-white" : isBooked ? "text-red-400 line-through" : ""}`}>
                                    {day}
                                </span>
                                {!isPast && !compact && (
                                    <div className="flex items-center gap-1 mt-1">
                                        {isBooked ? (
                                            <span className="text-[10px] font-medium text-red-400">Booked</span>
                                        ) : (
                                            <>
                                                <div className={`w-2 h-2 rounded-full ${getPriceColor(multiplier)}`} />
                                                <span
                                                    className={`text-[10px] font-medium ${isSelected ? "text-white/80" : "text-muted-foreground"}`}
                                                >
                                                    €{price}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                )}
                                {!isPast && compact && isBooked && (
                                    <div className="w-1 h-1 rounded-full bg-red-500 mt-0.5" />
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Legend - Hide on compact */}
            {!compact && (
                <div className="px-6 pb-4">
                    <div className="flex items-center justify-center gap-6 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">Best Price</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400" />
                            <span className="text-muted-foreground">Standard</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-muted-foreground">Peak</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Selected Date Summary - Hide on compact */}
            {!compact && (
                <AnimatePresence>
                    {selectedDate && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-t border-border overflow-hidden"
                        >
                            <div className="p-6 bg-muted/50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Selected Date</p>
                                        <p className="text-xl font-bold">
                                            {selectedDate.toLocaleDateString("en-US", {
                                                weekday: "long",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-muted-foreground">Price per day</p>
                                        <p className="text-2xl font-black text-secondary">
                                            €{Math.round(basePrice * getPriceMultiplier(selectedDate))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            {/* Best Deal Toast */}
            <AnimatePresence>
                {showBestDeal && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 20, opacity: 0 }}
                        className="absolute bottom-4 left-4 right-4 bg-green-600 text-white p-4 rounded-xl flex items-center gap-3 shadow-lg"
                    >
                        <TrendingDown className="w-5 h-5" />
                        <span className="font-bold">Best deal found!</span>
                        <button onClick={() => setShowBestDeal(false)} className="ml-auto">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
