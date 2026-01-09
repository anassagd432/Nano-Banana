import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { store } from '../lib/store';
import { Navbar } from '../components/Navbar'; // Assuming we refactor/export properly

export function Login() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const pendingToy = location.state?.pendingToy;

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            store.login(email);

            if (pendingToy) {
                store.saveToy({
                    name: pendingToy.name,
                    tagline: pendingToy.tagline,
                    image: pendingToy.image,
                    theme: 'Custom'
                });
            }
            navigate(pendingToy ? '/gallery' : '/');
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50">
            <Navbar />
            <div className="max-w-md mx-auto mt-20 p-8 bg-white border-2 border-black shadow-retro-lg">
                <h2 className="font-display text-3xl mb-6 text-center">MEMBER LOGIN</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-2">EMAIL ADDRESS</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-retro transition-all"
                            placeholder="toy.collector@example.com"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-nano-pink text-white font-bold border-2 border-black shadow-retro hover:shadow-none hover:translate-y-1 transition-all">
                        ENTER THE VAULT
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    New collector? <Link to="/signup" className="underline font-bold">Sign up here</Link>
                </p>
            </div>
        </div>
    );
}
