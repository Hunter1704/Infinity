const ai = require("../../config/ai");
const createSystemInstructionWithContext = require("../../utils/createSystemInstructionWithContext");

const chatAI = async (req, res) => {
    try {
        if (!ai) {
            return res.status(503).send({ error: "AI service is not configured" });
        }

        const { problemDetails, userSolution, chatHistory } = req.body;

        // Ensure we have a username from the payload
        const username = req.payload?.username || "Learner";

        if (!problemDetails || !chatHistory || chatHistory.length === 0) {
            return res.status(400).send({ error: "Missing required fields: problemDetails or chatHistory" });
        }

        const systemInstruction = createSystemInstructionWithContext(username, problemDetails, userSolution);

        // To be safe with this SDK version, let's format the chat history as a single prompt string
        // Since getComplexitiesFromAI.js works with a string.
        let fullPrompt = `${systemInstruction}\n\nHere is the conversation so far:\n\n`;

        chatHistory.forEach(turn => {
            const roleName = turn.role === "user" ? "User" : "AI";
            const textContent = turn.parts?.[0]?.text || "";
            fullPrompt += `${roleName}: ${textContent}\n`;
        });

        fullPrompt += "\nAI:"; // Prompt for the next response

    

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", // Using the model confirmed working by user
            contents: fullPrompt, // Sending as a string since that's what works in complexity analysis
            config: {
                temperature: 0.7,
            },
        });

        
        // The SDK usually returns the text directly or as a method.
        // Let's use the property since getComplexitiesFromAI.js does.
        const text = response.text || (typeof response.text === "function" ? response.text() : "");

        if (!text) {
            console.error("Empty response from AI:", response);
            return res.status(500).send({ error: "Empty response from AI" });
        }

        // Send back the raw text to match frontend expectations: const aiResponseText = data;
        res.status(200).send(text);

    } catch (error) {
        console.error("Chat AI Full Error:", error);
        res.status(500).send({ error: error.message });
    }
};

module.exports = chatAI;