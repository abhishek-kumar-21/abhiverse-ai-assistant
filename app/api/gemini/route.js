import { streamText, Message } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { initialMessage } from "@/lib/data";

const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
});

export const runtime = "edge"; // for working in "edge" browser

const generateId = () => Math.random().toString(36).slice(2, 15);

const buildGoogleGenAIPrompt = (messages) => [
    {
        id: generateId(),
        role: "user",
        content: initialMessage.content
    },
    ...messages.map((message) => ({
        id: message.id || generateId(),
        role: message.role,
        content: message.content
    })),
];

export async function POST(request) {
    const { messages } = await request.json();

    // return response as stream of text to display while generating
    const stream = await streamText({
        model: google("gemini-2.0-flash"),
        messages: buildGoogleGenAIPrompt(messages),
        temperature: 0.7,
    });

    return stream?.toDataStreamResponse();
}
