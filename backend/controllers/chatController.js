const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Load .env variables

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Chatbot API Controller
exports.getAIResponse = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ error: "Message is required" });

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(message);

        console.log("AI Response:", result); // Debugging: check API response structure

        const aiReply = result.response?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand.";
        
        res.status(200).json({ reply: aiReply });
    } catch (error) {
        console.error("AI Chatbot Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
