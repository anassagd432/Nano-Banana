
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from '@google/genai';

async function testFullFlow() {
    try {
        console.log("Starting full flow verification (Pro + Flash Image)...");
        // Unified SDK
        const genAI = new GoogleGenAI({ key: process.env.GEMINI_API_KEY || '' } as any);

        const theme = "Cyberpunk Chef";
        // Minimal valid base64 mock
        const base64Data = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9cADAMBAAIRAxEAPwD3+iiigD//2Q==";

        console.log("1. Analysis Step (Gemini 2.5 Pro)...");

        const textPrompt = `You are a creative toy designer. Return JSON: { "name": "Test", "tagline": "Test", "visualPrompt": "A cute toy robot" }`;

        const textResult = await genAI.models.generateContent({
            model: "gemini-2.5-pro",
            contents: [
                { text: textPrompt },
                { inlineData: { data: base64Data, mimeType: "image/jpeg" } }
            ]
        });

        // Handle text response
        const textResponse = textResult.text || (textResult.candidates && textResult.candidates[0].content.parts[0].text) || "";
        console.log("Analysis Raw Output:", textResponse.substring(0, 50) + "...");

        const jsonStr = textResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        let metadata;
        try {
            metadata = JSON.parse(jsonStr);
            console.log("Metadata Parsed:", metadata);
        } catch (e) {
            console.error("JSON Parse failed on:", jsonStr);
            metadata = { visualPrompt: "A default cute robot" };
        }

        console.log("2. Image Generation Step (Gemini 2.5 Flash Image)...");
        const imageResult = await genAI.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: metadata.visualPrompt,
        });

        if (imageResult?.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
            console.log("SUCCESS! Image data received.");
            console.log("Data length:", imageResult.candidates[0].content.parts[0].inlineData.data.length);
        } else {
            console.error("NO IMAGE DATA RECEIVED");
            if (imageResult.candidates) {
                console.log("Parts:", JSON.stringify(imageResult.candidates[0].content.parts));
            }
        }

    } catch (e: any) {
        console.error("Test failed:", e);
        if (e.response) {
            console.error("API Error Response:", JSON.stringify(e.response, null, 2));
        }
    }
}

testFullFlow();
