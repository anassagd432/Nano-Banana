# Nano Banana 🍌🤖

**Nano Banana** is an AI-powered toy generator that turns your selfies into collectible 3D action figures.

Built with **Vite**, **React**, and **Google Gemini 2.5** (via the new `@google/genai` SDK), it creates personalized, high-quality toy concepts in seconds.

## ✨ Features

- **Personalized Action Figures**: Upload a selfie, and our AI analyzes your features to create a custom toy that *actually looks like you*.
- **Retro Packaging**: Every toy comes in a generated 90s-style blister pack with a unique theme (e.g., Space Explorer, Rock Star).
- **Dual-Model Architecture**:
  - **Gemini 2.5 Pro**: Analyzes facial features and generates witty character metadata (Name, Tagline).
  - **Gemini 2.5 Flash Image**: Generates the final high-fidelity 3D image using text-to-image + image-to-image editing for maximum likeness.
- **My Collection**: Save your favorite creations to a local gallery.
- **Rate Limiting**: Protected against API abuse with intelligent IP-based rate limiting.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Vite
- **Backend**: Vercel Serverless Functions (`api/`)
- **AI**: Google `@google/genai` SDK
  - Model 1: `gemini-2.5-pro` (Multimodal Analysis)
  - Model 2: `gemini-2.5-flash-image` (Image Generation/Editing)

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- A [Google Gemini API Key](https://aistudio.google.com/)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/anassagd432/Nano-Banana.git
    cd Nano-Banana
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure Environment Variables:
    Create a `.env` file in the root directory:
    ```env
    gemini_api_key=YOUR_GOOGLE_API_KEY
    ```

4.  Start the Development Server:
    ```bash
    npm run dev
    ```

### Running the API (Local)

To test the backend functions locally, use Vercel CLI:
```bash
npm i -g vercel
vercel dev
```

## 🔒 API Usage & Limits

The API is rate-limited to **5 requests per minute** per IP address to ensure fair usage and prevent quota exhaustion.

## 🤝 Contributing

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

*Nano Banana is a demo application showcasing the power of multimodal AI.*
