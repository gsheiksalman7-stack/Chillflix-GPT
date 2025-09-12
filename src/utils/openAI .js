import { GEMINIAPI_KEY } from "./constants";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(GEMINIAPI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export {model}