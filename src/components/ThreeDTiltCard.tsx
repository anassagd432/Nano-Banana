import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface ThreeDTiltCardProps {
    children: React.ReactNode;
    className?: string;
    intensity?: number;
}

export function ThreeDTiltCard({ children, className, intensity = 15 }: ThreeDTiltCardProps) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseXPos = e.clientX - rect.left;
        const mouseYPos = e.clientY - rect.top;

        const xPct = mouseXPos / width - 0.5;
        const yPct = mouseYPos / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>

            {/* Shine Effect */}
            <motion.div
                style={{
                    rotateX: useTransform(rotateX, (val) => val * -1), // Counter move light
                    rotateY: useTransform(rotateY, (val) => val * -1),
                    opacity: useTransform(
                        [mouseX, mouseY],
                        ([xVal, yVal]) => Math.abs(Number(xVal)) + Math.abs(Number(yVal))
                    )
                }}
                className="absolute inset-0 z-10 bg-gradient-to-tr from-white/30 to-transparent pointer-events-none rounded-lg mix-blend-overlay"
            />
        </motion.div>
    );
}
