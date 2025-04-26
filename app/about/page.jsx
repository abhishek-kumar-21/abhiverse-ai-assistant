const About = () => {
    return (
        <div className="container mx-auto p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-6">About AbhiVerse AI Assistant</h1>

            {/* Introduction Section */}
            <section className="bg-background/50 border rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-3">What is AbhiVerse AI Assistant?</h2>
                <p className="text-lg">
                    Welcome to <span className="font-bold">AbhiVerse AI Assistant</span>! Powered by Google&apos;s <span className="font-bold">Gemini Flash 2.0</span> API,
                    this intelligent assistant delivers fast, real-time responses through advanced streaming technology, offering an experience similar to ChatGPT and Gemini.
                </p>
            </section>

            {/* Features Section */}
            <section className="bg-background/50 border rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-3">Core Features</h2>
                <p className="text-lg">
                    AbhiVerse AI Assistant is built to feel intuitive, dynamic, and conversational:
                </p>
                <ul className="list-disc list-inside mt-3 text-lg">
                    <li>⚡ Real-time streaming responses for a natural conversation flow.</li>
                    <li>🧠 Powered by <span className="font-bold">Gemini Flash 2.0</span>, one of the fastest and most capable AI models.</li>
                    <li>🛠️ Seamless and smooth UI/UX for an immersive chat experience.</li>
                    <li>🌍 Designed to assist in coding, learning, and exploring creative ideas.</li>
                </ul>
            </section>

            {/* Technology Section */}
            <section className="bg-background/50 border rounded-lg p-6 shadow-md mb-6">
                <h2 className="text-2xl font-semibold mb-3">Tech Stack Behind the Magic</h2>
                <p className="text-lg">
                    AbhiVerse AI Assistant is built using a modern and powerful tech stack:
                </p>
                <ul className="list-disc list-inside mt-3 text-lg">
                    <li>Frontend: Next.js, React.js, TailwindCSS</li>
                    <li>Backend: Node.js, Gemini Flash 2.0 API Integration</li>
                    <li>Real-Time Streaming: Server-Sent Events (SSE) and Web APIs</li>
                    <li>Other Tools: Git, GitHub, Vercel Deployment</li>
                </ul>
            </section>

            {/* Future Vision Section */}
            <section className="bg-background/50 border rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-semibold mb-3">The Road Ahead</h2>
                <p className="text-lg">
                    This is just the beginning! I plan to enhance <span className="font-bold">AbhiVerse AI Assistant</span> with features like memory,
                    user customization, and advanced multi-turn conversation capabilities.
                    Stay tuned for more innovations and updates!
                </p>
            </section>
        </div>
    );
};

export default About;

export const metadata = {
    title: "About - AbhiVerse AI Assistant",
    description: "Learn more about AbhiVerse AI Assistant powered by Gemini Flash 2.0, delivering real-time streaming AI responses.",
};
