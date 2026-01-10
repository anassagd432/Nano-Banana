import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Examples } from './components/Examples';
import { UploadForm } from './components/UploadForm';
import { ResultCard } from './components/ResultCard';
import { ApiKeyModal, getSavedApiKey } from './components/ApiKeyModal';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Gallery } from './pages/Gallery';
import { store } from './lib/store';
import { generateToy } from './lib/generateToy';

// Wrapper for the Landing/Home interaction logic
function Home() {
  const [showUpload, setShowUpload] = useState(false);
  const [result, setResult] = useState<{ image: string, name: string, tagline: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [pendingGeneration, setPendingGeneration] = useState<{ image: string, theme: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle pending generation from Signup redirect
  useEffect(() => {
    const pendingGen = location.state?.pendingGeneration;
    if (pendingGen && store.getUser()) {
      // Clear state to avoid loops, then trigger generation
      window.history.replaceState({}, document.title);
      handleGenerateWithKey(pendingGen.image, pendingGen.theme);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleGenerateWithKey = (base64Image: string, theme: string) => {
    const savedKey = getSavedApiKey();
    if (savedKey) {
      // Have a saved key, proceed directly
      triggerGeneration(savedKey, base64Image, theme);
    } else {
      // Need to ask for API key
      setPendingGeneration({ image: base64Image, theme });
      setShowApiKeyModal(true);
    }
  };

  const triggerGeneration = async (apiKey: string, base64Image: string, theme: string) => {
    setLoading(true);
    setShowUpload(true);
    setShowApiKeyModal(false);

    try {
      const toyResult = await generateToy(apiKey, base64Image, theme);
      setResult({
        image: toyResult.image,
        name: toyResult.name,
        tagline: toyResult.tagline
      });
    } catch (error: unknown) {
      console.error("Generation failed:", error);
      const message = error instanceof Error ? error.message : 'Unknown error';

      // Check if it's an API key error
      if (message.includes('API key') || message.includes('401') || message.includes('403')) {
        alert('Invalid API key. Please check your key and try again.');
        setShowApiKeyModal(true);
      } else {
        alert(`Error: ${message}`);
      }
      setShowUpload(false);
    } finally {
      setLoading(false);
      setPendingGeneration(null);
    }
  };

  const handleApiKeySubmit = (apiKey: string) => {
    if (pendingGeneration) {
      triggerGeneration(apiKey, pendingGeneration.image, pendingGeneration.theme);
    }
  };

  const handleGenerate = async (file: File, theme: string) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result as string;
      handleGenerateWithKey(base64Image, theme);
    };
  };

  const handleSave = () => {
    if (result) {
      if (!store.getUser()) {
        navigate('/signup', { state: { pendingToy: result } });
        return;
      }

      store.saveToy({
        name: result.name,
        tagline: result.tagline,
        image: result.image,
        theme: 'Custom'
      });
      alert("Toy saved to collection!");
      navigate('/gallery');
    }
  }

  return (
    <div className="min-h-screen bg-yellow-50 selection:bg-nano-pink selection:text-white pb-20">
      <Navbar />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={showApiKeyModal}
        onClose={() => {
          setShowApiKeyModal(false);
          setPendingGeneration(null);
        }}
        onSubmit={handleApiKeySubmit}
      />

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
