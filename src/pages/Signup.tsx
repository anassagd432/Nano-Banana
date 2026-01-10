import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { store } from '../lib/store';
import { Navbar } from '../components/Navbar';

export function Signup() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const pendingToy = location.state?.pendingToy;
    const pendingGeneration = location.state?.pendingGeneration;

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim()) {
            // Demo signup - just save name locally
            store.login(name.trim());

            if (pendingToy) {
                store.saveToy({
                    name: pendingToy.name,
                    tagline: pendingToy.tagline,
                    image: pendingToy.image,
                    theme: 'Custom'
                });
                navigate('/gallery');
            } else if (pendingGeneration) {
                // Return to home to trigger generation
                navigate('/', { state: { pendingGeneration } });
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50">
            <Navbar />
            <div className="max-w-md mx-auto mt-20 p-8 bg-white border-2 border-black shadow-retro-lg">
                <h2 className="font-display text-3xl mb-2 text-center">JOIN THE SQUAD</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Pick a name to start your collection
                </p>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-2">CHOOSE A NAME</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-retro transition-all"
                            placeholder="Action Hero"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-nano-cyan text-black font-bold border-2 border-black shadow-retro hover:shadow-none hover:translate-y-1 transition-all">
                        START COLLECTING
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already have a name? <Link to="/login" className="underline font-bold">Login here</Link>
                </p>
                <p className="mt-2 text-center text-xs text-gray-400">
                    This is a demo - data is stored locally in your browser
                </p>
            </div>
        </div>
    );
}
