import { useState, useEffect } from 'react';
import { Key, X, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (apiKey: string) => void;
}

const STORAGE_KEY = 'nano_banana_api_key';

export function ApiKeyModal({ isOpen, onClose, onSubmit }: ApiKeyModalProps) {
    const [apiKey, setApiKey] = useState('');
    const [saveKey, setSaveKey] = useState(true);

    useEffect(() => {
        // Load saved key if exists
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            setApiKey(saved);
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (apiKey.trim()) {
            if (saveKey) {
                localStorage.setItem(STORAGE_KEY, apiKey.trim());
            }
            onSubmit(apiKey.trim());
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-yellow-50 border-4 border-black shadow-retro-lg max-w-md w-full p-6 md:p-8 transform rotate-[-0.5deg]">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 bg-red-500 text-white p-2 border-2 border-black rounded-full hover:scale-110 transition-transform"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-block bg-nano-pink p-3 border-2 border-black shadow-retro rounded-lg mb-4">
                        <Key className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl text-black">
                        ENTER YOUR API KEY
                    </h2>
                    <p className="mt-2 text-gray-600 font-bold text-sm">
                        This app runs 100% in your browser.<br />
                        Your key stays on your device.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-bold mb-2 text-sm uppercase tracking-wide">
                            Google Gemini API Key
                        </label>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            className="w-full p-3 border-2 border-black bg-white focus:bg-nano-yellow/20 focus:outline-none focus:shadow-retro transition-all font-mono text-sm"
                            required
                        />
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={saveKey}
                            onChange={(e) => setSaveKey(e.target.checked)}
                            className="w-5 h-5 border-2 border-black accent-nano-pink"
                        />
                        <span className="font-bold text-sm group-hover:text-nano-pink transition-colors">
                            Remember my key (stored locally)
                        </span>
                    </label>

                    <button
                        type="submit"
                        className="w-full py-3 bg-nano-cyan text-black font-bold border-2 border-black shadow-retro hover:shadow-none hover:translate-y-1 transition-all uppercase tracking-widest"
                    >
                        Start Creating
                    </button>
                </form>

                {/* Help link */}
                <div className="mt-6 pt-4 border-t-2 border-gray-200 text-center">
                    <a
                        href="https://aistudio.google.com/api-keys"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-nano-pink transition-colors"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Get your FREE API key from Google AI Studio
                    </a>
                </div>
            </div>
        </div>
    );
}

// Helper to get saved API key
export function getSavedApiKey(): string | null {
    return localStorage.getItem(STORAGE_KEY);
}

// Helper to clear saved API key
export function clearSavedApiKey(): void {
    localStorage.removeItem(STORAGE_KEY);
}
