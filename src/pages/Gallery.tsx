import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { store, type Toy } from '../lib/store';
import { Plus } from 'lucide-react';

export function Gallery() {
    const [toys, setToys] = useState<Toy[]>([]);

    useEffect(() => {
        setToys(store.getToys());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-yellow-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex items-center justify-between mb-12">
                    <h1 className="font-display text-4xl">MY COLLECTION</h1>
                    <Link to="/" className="bg-nano-pink text-white px-4 py-2 border-2 border-black shadow-retro font-bold hover:shadow-none hover:translate-y-1 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> MINT NEW
                    </Link>
                </div>

                {toys.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-400 bg-white/50">
                        <p className="text-2xl font-bold text-gray-400 mb-4">YOUR SHELVES ARE EMPTY</p>
                        <Link to="/" className="underline text-nano-pink font-bold text-xl">Start your collection now</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {toys.map((toy) => (
                            <div key={toy.id} className="bg-white border-2 border-black p-4 shadow-retro hover:scale-[1.02] transition-transform">
                                <div className="aspect-square bg-gray-100 border-2 border-black mb-4 overflow-hidden relative">
                                    <img src={toy.image} alt={toy.name} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-2 left-2 bg-nano-yellow border-2 border-black px-2 py-1 text-xs font-bold uppercase">
                                        {toy.theme}
                                    </div>
                                </div>
                                <h3 className="font-display text-xl mb-1 truncate">{toy.name}</h3>
                                <p className="text-sm text-gray-600 italic truncate">"{toy.tagline}"</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
