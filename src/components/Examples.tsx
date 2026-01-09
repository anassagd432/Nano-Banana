import { ThreeDTiltCard } from './ThreeDTiltCard';

const examples = [
    { theme: '90s Rock Star', color: 'bg-nano-pink', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60' }, // Placeholder users
    { theme: 'Space Explorer', color: 'bg-nano-cyan', img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&auto=format&fit=crop&q=60' },
    { theme: 'Retro Superhero', color: 'bg-nano-yellow', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60' },
];

export function Examples() {
    return (
        <div className="py-20 bg-white border-y-2 border-black">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="font-display text-4xl text-center mb-12">COLLECT THEM ALL</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {examples.map((ex, i) => (
                        <div key={i} className="group relative perspective-1000" style={{ perspective: "1000px" }}>
                            <div className={`absolute inset-0 ${ex.color} border-2 border-black transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300 rounded-lg`}></div>
                            <ThreeDTiltCard className="relative bg-white border-2 border-black p-4 flex flex-col items-center cursor-pointer" intensity={15}>
                                <div className="w-full aspect-square bg-gray-100 mb-4 overflow-hidden border-2 border-black">
                                    <img src={ex.img} alt={ex.theme} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300" />
                                    {/* Overlay for fake "toy packaging" look */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white font-bold font-display">{ex.theme}</span>
                                    </div>
                                </div>
                                <div className="bg-black text-white px-3 py-1 font-mono text-sm uppercase transform -rotate-2">
                                    Limited Edition
                                </div>
                            </ThreeDTiltCard>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
