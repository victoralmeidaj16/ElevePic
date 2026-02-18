"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonSliderProps {
    image1: string; // Before image URL
    image2: string; // After image URL
    label1?: string;
    label2?: string;
    className?: string;
}

export function ComparisonSlider({
    image1,
    image2,
    label1 = "Original",
    label2 = "AI Enhanced",
    className,
}: ComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = useCallback(
        (event: MouseEvent | TouchEvent) => {
            if (!isDragging || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const clientX =
                "touches" in event ? event.touches[0].clientX : event.clientX;

            const relativeX = clientX - containerRect.left;
            const percentage = (relativeX / containerRect.width) * 100;

            setSliderPosition(Math.min(Math.max(percentage, 0), 100));
        },
        [isDragging]
    );

    const handleUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMove);
            document.addEventListener("touchmove", handleMove);
            document.addEventListener("mouseup", handleUp);
            document.addEventListener("touchend", handleUp);
        }

        return () => {
            document.removeEventListener("mousemove", handleMove);
            document.removeEventListener("touchmove", handleMove);
            document.removeEventListener("mouseup", handleUp);
            document.removeEventListener("touchend", handleUp);
        };
    }, [isDragging, handleMove, handleUp]);

    const handleMouseDown = () => setIsDragging(true);

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden rounded-xl select-none cursor-ew-resize group border border-white/10 shadow-2xl",
                className
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            {/* Background Image (After) */}
            <img
                src={image2}
                alt="After"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                draggable={false}
            />

            {/* Label After */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full z-10 border border-white/10 uppercase tracking-wider">
                {label2}
            </div>

            {/* Foreground Image (Before) - Clipped */}
            <div
                className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
            >
                <img
                    src={image1}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none" // max-w-none is crucial here to prevent scaling
                    style={{ width: containerRef.current?.offsetWidth || "100%" }} // Ensure inner image matches container width
                    draggable={false}
                />
                {/* Label Before */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full z-20 border border-white/10 uppercase tracking-wider">
                    {label1}
                </div>
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                    <GripVertical className="w-5 h-5 text-black" />
                </div>
            </div>
        </div>
    );
}
