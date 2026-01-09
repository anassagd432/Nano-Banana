import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export default async function handler(request: VercelRequest, response: VercelResponse) {
    if (request.method !== 'POST') {
        return response.status(405).send('Method Not Allowed');
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing in environment variables");
        return response.status(500).json({ error: "Configuration Error: GEMINI_API_KEY is missing. Please set it in your .env file." });
    }

    try {
        const { image, theme } = request.body || {};

        if (!image || !theme) {
            return response.status(400).send('Missing image or theme');
        }

        // 1. Generate Tagline with Gemini 1.5 Flash (Faster/Cheaper)
        const textModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const textPrompt = `Write a short, witty, and nostalgic tagline and a cool character name for a 3D action figure based on the theme: "${theme}". 
    The character is based on a real person. Keep it fun and retro. 
    Return JSON format: { "name": "Character Name", "tagline": "The tagline here" }`;

        const textResult = await textModel.generateContent(textPrompt);
        const textResponse = textResult.response.text();
        // Clean up markdown code blocks if present
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        let characterInfo = { name: "Mystery Figure", tagline: "Collect them all!" };
        try {
            characterInfo = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse JSON from text model", e);
        }

        // MOCKING THE IMAGE GENERATION PART
        // In a real Vercel function, timing out might be an issue for long generation, 
        // but for now we follow the existing logic.

        return response.status(200).json({
            image: "https://images.unsplash.com/photo-1593341646782-e0b495cffd32?auto=format&fit=crop&q=80&w=1000", // Placeholder for execution
            name: characterInfo.name,
            tagline: characterInfo.tagline
        });

    } catch (error) {
        console.error("Error:", error);
        return response.status(500).json({ error: "Failed to generate toy" });
    }
}
