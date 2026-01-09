import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { store } from '../lib/store';
import { Navbar } from '../components/Navbar';

export function Signup() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const pendingToy = location.state?.pendingToy;
    const [error, setError] = useState<string | null>(null);

    const isBusinessEmail = (email: string) => {
        const publicDomains = [
            'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com',
            'aol.com', 'icloud.com', 'protonmail.com', 'zoho.com',
            'mail.com', 'gmx.com', 'yandex.com'
        ];
        const domain = email.split('@')[1];
        return domain && !publicDomains.includes(domain.toLowerCase());
    };

    const pendingGeneration = location.state?.pendingGeneration;

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!isBusinessEmail(email)) {
            setError("Access Restricted: Please use a valid work email address (e.g. name@company.com). Public domains like Gmail are not allowed.");
            return;
        }

        if (email) {
            store.login(email);

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
                <h2 className="font-display text-3xl mb-6 text-center">JOIN THE SQUAD</h2>
                {error && (
                    <div className="bg-red-100 border-2 border-red-500 text-red-700 p-3 mb-4 text-sm font-bold">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-2">EMAIL ADDRESS</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border-2 border-black bg-gray-50 focus:bg-white focus:outline-none focus:shadow-retro transition-all"
                            placeholder="future.legend@example.com"
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-nano-cyan text-black font-bold border-2 border-black shadow-retro hover:shadow-none hover:translate-y-1 transition-all">
                        START COLLECTING
                    </button>
                </form>
                <p className="mt-4 text-center text-sm">
                    Already a member? <Link to="/login" className="underline font-bold">Login here</Link>
                </p>
            </div>
        </div>
    );
}
