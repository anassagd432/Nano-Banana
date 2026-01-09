import { useState, useRef } from 'react';
import { Upload, X, Zap } from 'lucide-react';
import clsx from 'clsx';
// import { motion } from 'framer-motion';

const themes = [
    { id: '90s-toy', label: '90s Toy', icon: '🎸', color: 'bg-pink-500' },
    { id: 'space-explorer', label: 'Space Explorer', icon: '🚀', color: 'bg-indigo-600' },
    { id: 'superhero', label: 'Superhero', icon: '⚡', color: 'bg-yellow-500' },
    { id: 'rock-star', label: 'Rock Star', icon: '🎤', color: 'bg-red-600' },
    { id: 'movie-poster', label: 'Blockbuster', icon: '🎬', color: 'bg-purple-600' },
];

interface UploadFormProps {
    onSubmit: (file: File, theme: string) => void;
    isLoading: boolean;
}

export function UploadForm({ onSubmit, isLoading }: UploadFormProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [selectedTheme, setSelectedTheme] = useState(themes[0].id);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 4 * 1024 * 1024) {
                alert("File too large. Please upload an image under 4MB.");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.size > 4 * 1024 * 1024) {
                alert("File too large. Please upload an image under 4MB.");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const clearFile = () => {
        setSelectedFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="bg-white border-2 border-black p-6 md:p-8 shadow-retro-lg">
                <h2 className="font-display text-3xl mb-6 text-center">CUSTOMIZE YOUR TOY</h2>

                {/* Theme Selection */}
                <div className="mb-8">
                    <label className="block font-bold mb-3 text-lg">1. CHOOSE YOUR THEME</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {themes.map((theme) => (
                            <button
                                key={theme.id}
                                onClick={() => setSelectedTheme(theme.id)}
                                className={clsx(
                                    "p-3 border-2 text-left flex items-center gap-2 transition-all",
                                    selectedTheme === theme.id
                                        ? "border-black bg-nano-yellow shadow-retro translate-x-[-2px] translate-y-[-2px]"
                                        : "border-gray-200 hover:border-black"
                                )}
                            >
                                <span className="text-xl">{theme.icon}</span>
                                <span className="font-bold text-sm">{theme.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* File Upload */}
                <div className="mb-8">
                    <label className="block font-bold mb-3 text-lg">2. UPLOAD YOUR SELFIE</label>
                    <div
                        className="relative border-2 border-dashed border-gray-400 bg-gray-50 p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        {!preview ? (
                            <div className="flex flex-col items-center text-gray-500">
                                <Upload className="w-12 h-12 mb-2" />
                                <p className="font-bold">Click to upload or drag & drop</p>
                                <p className="text-sm">JPG/PNG (Max 4MB)</p>
                            </div>
                        ) : (
                            <div className="relative inline-block border-2 border-black">
                                <img src={preview} alt="Preview" className="max-h-64 object-contain" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); clearFile(); }}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white p-1 border-2 border-black rounded-full hover:scale-110 transition-transform"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Submit */}
                <div className="text-center">
                    <button
                        onClick={() => selectedFile && onSubmit(selectedFile, selectedTheme)}
                        disabled={!selectedFile || isLoading}
                        className={clsx(
                            "w-full py-4 font-bold text-xl uppercase tracking-widest border-2 border-black transition-all flex items-center justify-center gap-2",
                            !selectedFile || isLoading
                                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                : "bg-nano-pink text-white shadow-retro hover:shadow-none hover:translate-y-1"
                        )}
                    >
                        {isLoading ? (
                            <>
                                <Zap className="w-6 h-6 animate-spin" /> MINTING...
                            </>
                        ) : (
                            <>
                                GENERATE TOY <Zap className="w-6 h-6" />
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}
