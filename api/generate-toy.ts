
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import type { VercelRequest, VercelResponse } from '@vercel/node';

dotenv.config();

// Unified SDK Instance
const genAI = new GoogleGenAI({ key: process.env.GEMINI_API_KEY || '' });

export default async function handler(request: VercelRequest, response: VercelResponse) {
    if (request.method !== 'POST') {
        return response.status(405).send('Method Not Allowed');
    }

    if (!process.env.GEMINI_API_KEY) {
        console.error("GEMINI_API_KEY is missing in environment variables");
        return response.status(500).json({ error: "Configuration Error: GEMINI_API_KEY is missing." });
    }

    try {
        const { image, theme } = request.body || {};

        if (!image || !theme) {
            return response.status(400).send('Missing image or theme');
        }

        // Parse Base64 Image (Remove data:image/...;base64, prefix if present)
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        // 1. Analyze Image & Generate Metadata (Name, Tagline, Visual Description)
        // Using "gemini-2.5-pro" as strictly requested for high-quality multimodal analysis

        const textPrompt = `You are a creative toy designer.
        1. Analyze this selfie image to understand the person's key features (hair, glasses, expression, etc.).
        2. Create a fun, retro 3D action figure concept based on this person and the theme: "${theme}".
        3. Generate a cool Character Name and a witty Tagline.
        4. Write a short, vivid visual prompt to generate the actual toy image. This prompt should describe:
           - A 3D action figure of this person (stylized but recognizable) inside plastic blister packaging.
           - The packaging should be retro 90s style, colorful, with the theme "${theme}".
           - High quality, 3D render, vibrant.
        
        Return STRICT JSON format: { "name": "...", "tagline": "...", "visualPrompt": "..." }`;

        // Using explicit parts structure for the new SDK
        const textResult = await genAI.models.generateContent({
            model: "gemini-2.5-pro",
            contents: {
                parts: [
                    { text: textPrompt },
                    { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
                ]
            }
        });

        const textResponse = textResult.text || "";
        const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        console.log("Analysis Result:", cleanJson);

        let metadata = {
            name: "Mystery Figure",
            tagline: "Collect them all!",
            visualPrompt: `A 3D action figure of a hero, theme ${theme}, blister packaging, retro style.`
        };

        try {
            metadata = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse JSON from analysis step", e);
        }

        // 2. Generate Image with Gemini 2.5 Flash Image
        console.log("Generating Image with prompt:", metadata.visualPrompt);

        const imageResult = await genAI.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: metadata.visualPrompt,
        });

        let finalImageBase64 = "";

        if (imageResult?.candidates?.[0]?.content?.parts) {
            for (const part of imageResult.candidates[0].content.parts) {
                if (part.inlineData) {
                    finalImageBase64 = part.inlineData.data;
                    break;
                }
            }
        }

        if (!finalImageBase64) {
            throw new Error("No image data returned from generator");
        }

        const finalDataUri = `data:image/png;base64,${finalImageBase64}`;

        return response.status(200).json({
            image: finalDataUri,
            name: metadata.name,
            tagline: metadata.tagline
        });

    } catch (error: any) {
        console.error("Error generating toy:", error);
        return response.status(500).json({
            error: "Failed to generate toy. " + (error.message || "")
        });
    }
}
