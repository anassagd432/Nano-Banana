import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Examples } from './components/Examples';
import { UploadForm } from './components/UploadForm';
import { ResultCard } from './components/ResultCard';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Gallery } from './pages/Gallery';
import { store } from './lib/store';

// Wrapper for the Landing/Home interaction logic
function Home() {
  const [showUpload, setShowUpload] = useState(false);
  const [result, setResult] = useState<{ image: string, name: string, tagline: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async (file: File, theme: string) => {
    setLoading(true);
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64Image = reader.result;

        try {
          const response = await fetch('/api/generate-toy', {
            method: 'POST',
            body: JSON.stringify({ image: base64Image, theme }),
            headers: { 'Content-Type': 'application/json' }
          });

          if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.error || 'Generation failed');
          }

          const data = await response.json();
          setResult({
            image: data.image,
            name: data.name,
            tagline: data.tagline
          });

          // Auto save if logged in? Or ask user to save.
          // For now, let's just show it.

        } catch (error: any) {
          console.error("API Call failed", error);
          alert(`Error: ${error.message}`);
        } finally {
          setLoading(false);
          setShowUpload(false);
        }
      };
    } catch (e) {
      console.error("Error preparing upload", e);
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (result) {
      if (!store.getUser()) {
        // Redirect to signup seamlessly, passing the result to save later
        navigate('/signup', { state: { pendingToy: result } });
        return;
      }

      store.saveToy({
        name: result.name,
        tagline: result.tagline,
        image: result.image,
        theme: 'Custom' // Or derive from UI if we tracked it better
      });
      alert("Toy saved to collection!");
      navigate('/gallery');
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50 selection:bg-nano-pink selection:text-white pb-20">
      <Navbar />

      {!showUpload && !result ? (
        <>
          <Hero onStart={() => setShowUpload(true)} />
          <Examples />
        </>
      ) : result ? (
        <div className="max-w-6xl mx-auto px-4 py-12">
          <button onClick={() => { setResult(null); setShowUpload(true); }} className="mb-8 font-bold underline hover:text-pink-600">
            &larr; Back to Editor
          </button>
          <ResultCard
            image={result.image}
            characterName={result.name}
            tagline={result.tagline}
            onReset={() => { setResult(null); setShowUpload(false); }}
          />
          <div className="text-center mt-8">
            <button onClick={handleSave} className="inline-block bg-black text-white px-8 py-3 font-bold border-2 border-white shadow-retro hover:shadow-none hover:translate-y-1 transition-all">
              SAVE TO MY COLLECTION
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button onClick={() => setShowUpload(false)} className="mb-4 font-bold underline hover:text-pink-600">
            &larr; Back to Home
          </button>
          <UploadForm
            onSubmit={handleGenerate}
            isLoading={loading}
          />
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/gallery" element={<Gallery />} />
    </Routes>
  );
}

export default App;
