import { useEffect, useState } from 'react';
import { Ghost, LogOut } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { store, type User } from '../lib/store';

export function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setUser(store.getUser());
    }, []);

    const handleLogout = () => {
        store.logout();
        setUser(null);
        navigate('/');
    };

    return (
        <nav className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
            <Link to="/" className="flex items-center gap-2 transform hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-nano-pink p-2 border-2 border-black shadow-retro rounded-lg">
                    <Ghost className="w-6 h-6 text-white" />
                </div>
                <span className="font-display text-2xl tracking-tighter text-black">
                    NANO<span className="text-pink-600">BANANA</span>
                </span>
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <span className="hidden md:inline font-bold text-sm">HEY, {user.name.toUpperCase()}</span>
                        {location.pathname !== '/gallery' && (
                            <Link to="/gallery" className="font-bold underline hover:text-pink-600">MY TOYS</Link>
                        )}
                        <button onClick={handleLogout} className="p-2 border-2 border-black hover:bg-gray-100" title="Logout">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </>
                ) : (
                    <>
                        {location.pathname !== '/login' && location.pathname !== '/signup' && (
                            <Link to="/login" className="px-4 py-2 bg-nano-yellow border-2 border-black shadow-retro font-bold hover:translate-y-1 hover:shadow-none transition-all">
                                Login
                            </Link>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}
