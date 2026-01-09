import { useRef } from 'react'; // Added useRef
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

export function Hero({ onStart }: { onStart: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 50, damping: 20 });

    function handleMouseMove(event: React.MouseEvent) {
        if (!containerRef.current) return;
        const { width, height } = containerRef.current.getBoundingClientRect();
        x.set(event.clientX / width - 0.5); // -0.5 to 0.5
        y.set(event.clientY / height - 0.5);
    }

    // Transform values for elements
    const moveX1 = useTransform(mouseX, [-0.5, 0.5], [20, -20]); // Opposite movement
    const moveY1 = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

    const moveX2 = useTransform(mouseX, [-0.5, 0.5], [-40, 40]);
    const moveY2 = useTransform(mouseY, [-0.5, 0.5], [-40, 40]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-4"
        >
            <div className="max-w-7xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ x: moveX1, y: moveY1 }} // Gentle float
                    className="inline-block mb-4 px-4 py-1 bg-white border-2 border-black shadow-retro rounded-full rotate-[-2deg]"
                >
                    <span className="font-bold text-sm tracking-widest uppercase text-nano-pink flex items-center gap-2">
                        <Sparkles className="w-4 h-4" /> Power up your nostalgia
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6 text-black"
                >
                    TURN YOURSELF INTO A <br />
                    <motion.span
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="inline-block text-stroke-3 text-transparent bg-clip-text bg-gradient-to-r from-nano-cyan to-nano-pink"
                        style={{ WebkitTextStroke: '2px black' }}
                    >
                        ACTION FIGURE
                    </motion.span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-700 max-w-2xl mx-auto mb-10 font-bold"
                >
                    Upload a selfie, pick a theme, and get a realistic 3D toy package of YOU.
                    Witty tagline included.
                </motion.p>

                <motion.button
                    onClick={onStart}
                    whileHover={{ scale: 1.05, rotate: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-black border-2 border-black shadow-retro-lg hover:shadow-none hover:translate-y-2 transition-all"
                >
                    <span className="mr-2">MAKE MY TOY</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 border-2 border-white opacity-20 pointer-events-none"></div>
                </motion.button>
            </div>

            {/* Decorative Elements with Parallax */}
            <motion.div
                style={{ x: moveX2, y: moveY2 }}
                className="absolute top-20 left-10 w-16 h-16 bg-nano-yellow border-2 border-black rounded-full opacity-50 hidden md:block"
            />
            <motion.div
                style={{ x: moveX1, y: moveY1 }}
                className="absolute bottom-10 right-10 w-24 h-24 bg-nano-cyan border-2 border-black transform rotate-12 opacity-50 hidden md:block"
            />
            <motion.div
                style={{ x: moveX2, y: moveY1 }}
            >
                <Zap className="absolute top-40 right-20 w-12 h-12 text-nano-pink animate-pulse hidden md:block" />
            </motion.div>
        </div>
    );
}
