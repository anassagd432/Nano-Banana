
import dotenv from 'dotenv';
dotenv.config();

async function testRest() {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = 'imagen-3.0-generate-002'; // or 001
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:predict?key=${apiKey}`;

    const payload = {
        instances: [
            { prompt: "A futuristic toy robot" }
        ],
        parameters: {
            sampleCount: 1,
            aspectRatio: "1:1" // or "1:1"
        }
    };

    try {
        console.log("Fetching...", url.replace(apiKey || '', 'API_KEY'));
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            console.error("Error status:", response.status);
            console.error("Error text:", await response.text());
        } else {
            const data = await response.json();
            console.log("Success! Data keys:", Object.keys(data));
            if (data.predictions) {
                console.log("Has predictions. Length:", data.predictions.length);
            }
        }
    } catch (e: any) {
        console.error("Fetch failed:", e.message);
    }
}

testRest();
