
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: "imagen-3.0-generate-002" });

console.log("Model methods:", Object.keys(Object.getPrototypeOf(model) || {}));
console.log("Model:", model);

// Check if 'generateImages' or similar exists
// If not, we might need a specific import or it's not supported in this version
