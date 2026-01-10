/**
 * Client-side toy generation using Google Gemini API
 * Runs entirely in the browser - no backend needed!
 * Uses Gemini 2.5 Flash for both analysis and image generation
 */

import { GoogleGenAI } from '@google/genai';

export interface GeneratedToy {
    image: string;
    name: string;
    tagline: string;
}

export async function generateToy(
    apiKey: string,
    imageBase64: string,
    theme: string
): Promise<GeneratedToy> {
    // Initialize the Gemini client with user's API key
    const genAI = new GoogleGenAI({ apiKey });

    // Remove data:image/...;base64, prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    // Step 1: Analyze image and generate metadata using Gemini Flash
    const textPrompt = `You are a creative toy designer.
1. Analyze this selfie image to understand the person's key facial features (hair style/color, facial structure, glasses, expression, beard, etc.) VERY CLOSELY.
2. Create a fun, retro 3D action figure concept that LOOKS EXACTLY LIKE THE PERSON in the photo, but in a toy style. Use the theme: "${theme}".
3. Generate a cool Character Name and a witty Tagline.
4. Write a short, vivid visual prompt to generate the actual toy image. This prompt should describe:
   - A 3D action figure of [Person's Description] inside plastic blister packaging.
   - CRITICAL: The face MUST resemble the person in the cropped image. Mention specific features (e.g. "figure has distinct curly brown hair and glasses just like the subject").
   - The packaging should be retro 90s style, colorful, with the theme "${theme}".
   - High quality, 3D render, vibrant, plastic texture.

Return STRICT JSON format: { "name": "...", "tagline": "...", "visualPrompt": "..." }`;

    console.log('[Nano Banana] Analyzing image with Gemini Flash...');

    const textResult = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        contents: {
            parts: [
                { text: textPrompt },
                { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
        }
    });

    const textResponse = textResult.text || "";
    const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');

    console.log('[Nano Banana] Analysis complete:', cleanJson);

    let metadata = {
        name: "Mystery Figure",
        tagline: "Collect them all!",
        visualPrompt: `A 3D action figure of a hero, theme ${theme}, blister packaging, retro style.`
    };

    try {
        metadata = JSON.parse(cleanJson);
    } catch (e) {
        console.warn('[Nano Banana] Failed to parse metadata, using defaults:', e);
    }

    // Step 2: Generate the toy image using Gemini Flash
    console.log('[Nano Banana] Generating image with Gemini Flash...');

    const imageResult = await genAI.models.generateContent({
        model: "gemini-2.5-flash-preview-05-20",
        contents: {
            parts: [
                { text: metadata.visualPrompt },
                { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
        },
        config: {
            responseModalities: ["image", "text"],
        }
    });

    let finalImageBase64 = "";

    if (imageResult?.candidates?.[0]?.content?.parts) {
        for (const part of imageResult.candidates[0].content.parts) {
            if (part.inlineData) {
                finalImageBase64 = part.inlineData.data || "";
                break;
            }
        }
    }

    if (!finalImageBase64) {
        throw new Error("No image data returned from Gemini. Please try again.");
    }

    console.log('[Nano Banana] Image generated successfully!');

    return {
        image: `data:image/png;base64,${finalImageBase64}`,
        name: metadata.name,
        tagline: metadata.tagline
    };
}
