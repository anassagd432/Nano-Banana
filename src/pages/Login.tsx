import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { store } from '../lib/store';
import { Navbar } from '../components/Navbar';

export function Login() {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const pendingToy = location.state?.pendingToy;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            // Demo login - just save name locally
            store.login(name.trim());

            if (pendingToy) {
                store.saveToy({
                    name: pendingToy.name,
                    tagline: pendingToy.tagline,
                    image: pendingToy.image,
                    theme: 'Custom'
                });
                navigate('/gallery');
            } else {
                navigate('/');
            }
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50">
            <Navbar />
            <div className="max-w-md mx-auto mt-20 p-8 bg-white border-2 border-black shadow-retro-lg">
                <h2 className="font-display text-3xl mb-2 text-center">WELCOME BACK</h2>
                <p className="text-center text-gray-500 text-sm mb-6">
                    Enter your name to access your collection
                </p>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-2">YOUR NAME</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-retro transition-all"
                            placeholder="Toy Collector"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-nano-pink text-white font-bold border-2 border-black shadow-retro hover:shadow-none hover:translate-y-1 transition-all">
                        ENTER THE VAULT
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    New here? <Link to="/signup" className="underline font-bold">Create a profile</Link>
                </p>
                <p className="mt-2 text-center text-xs text-gray-400">
                    This is a demo - no real account needed!
                </p>
            </div>
        </div>
    );
}
