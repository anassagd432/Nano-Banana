import { Download, Share2, RefreshCw } from 'lucide-react';
import { ThreeDTiltCard } from './ThreeDTiltCard';

interface ResultCardProps {
    image: string;
    tagline: string;
    characterName: string;
    onReset: () => void;
}

export function ResultCard({ image, tagline, characterName, onReset }: ResultCardProps) {
    const handleDownload = async () => {
        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${characterName.replace(/\s+/g, '_')}_toy.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
            // Fallback for simple data URIs if fetch fails
            const link = document.createElement('a');
            link.href = image;
            link.download = `${characterName.replace(/\s+/g, '_')}_toy.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8" style={{ perspective: "1000px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                {/* Image Side */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-black opacity-20 transform translate-x-4 translate-y-4 rounded-lg blur-sm"></div>
                    <ThreeDTiltCard className="relative bg-white p-2 border-2 border-black rounded-lg shadow-retro-lg overflow-hidden cursor-pointer" intensity={20}>
                        <img src={image} alt="Generated Toy" className="w-full h-auto rounded border border-gray-200" />
                        <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                            <div className="inline-block bg-white/80 px-2 py-1 rounded text-black text-xs font-bold border border-black/10">
                                3D FIGURE
                            </div>
                        </div>
                    </ThreeDTiltCard>
                </div>

                {/* Text Side */}
                <div className="md:ml-4 text-center md:text-left">
                    <div className="inline-block bg-nano-yellow border-2 border-black px-4 py-1 mb-4 transform -rotate-2">
                        <span className="font-display font-bold text-sm tracking-widest">NEW ARRIVAL</span>
                    </div>

                    <h2 className="font-display text-4xl md:text-5xl mb-2 text-nano-pink drop-shadow-[2px_2px_0_rgba(0,0,0,1)] stroke-black">
                        {characterName}
                    </h2>

                    <p className="font-bold text-xl md:text-2xl mb-6 italic text-gray-800">
                        "{tagline}"
                    </p>

                    <div className="bg-gray-100 p-4 border-2 border-black mb-8 text-sm font-mono text-gray-600">
                        Warning: May cause extreme nostalgia. Choking hazard: Small parts (mostly digital pixels).
                    </div>

                    <div className="flex flex-col gap-3">
                        <button onClick={handleDownload} className="w-full py-3 bg-nano-cyan border-2 border-black font-bold shadow-retro hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-2">
                            <Download className="w-5 h-5" /> DOWNLOAD BOX ART
                        </button>
                        <button className="w-full py-3 bg-white border-2 border-black font-bold shadow-retro hover:shadow-none hover:translate-y-1 transition-all flex items-center justify-center gap-2">
                            <Share2 className="w-5 h-5" /> SHARE ON SOCIALS
                        </button>
                        <button onClick={onReset} className="mt-4 underline text-gray-500 hover:text-black flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4" /> MAKE ANOTHER
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
