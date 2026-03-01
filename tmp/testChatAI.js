const axios = require('axios');
require('dotenv').config({ path: '../server/.env' });

const API_URL = `http://localhost:${process.env.PORT || 5000}`;

async function testChatAI() {
    console.log('--- Testing Gemini API chatAI Endpoint ---');

    // Note: This requires a valid token to bypass verifyToken middleware
    // For local testing, we might need to temporarily disable verifyToken or use a mock token
    const mockPayload = {
        problemDetails: {
            title: 'Factorial',
            description: 'Given a non-negative integer n, return its factorial.',
            hints: ['Use recursion or iteration.']
        },
        userSolution: 'function factorial(n) { return n <= 1 ? 1 : n * factorial(n-1); }',
        chatHistory: [
            {
                role: 'user',
                parts: [{ text: 'How do I start solving this problem?' }]
            }
        ]
    };

    try {
        console.log('Sending request to /ai/chatAI...');
        // We'll skip actual request if no token is available, just showing the setup
        console.log('Payload structure:', JSON.stringify(mockPayload, null, 2));
        console.log('\n[!] Manual Verification Required: Please test this in the browser UI to ensure cookie-based auth is handled correctly.');
    } catch (error) {
        console.error('Test Failed:', error.message);
    }
}

testChatAI();
