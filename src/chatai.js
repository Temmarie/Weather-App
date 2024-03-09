const api = {
  key: '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',
  base: 'https://api.openai.com/v1/completions',
};

// Import the ChatGPT library
const { GPT } = require('gpt-3.5-js');

// Initialize a ChatGPT instance
const gpt = new GPT({
  apiKey: 'YOUR_API_KEY', // Replace 'YOUR_API_KEY' with your actual API key
  language: 'en', // Specify the language
  temperature: 0.7, // Control the creativity of the responses (0.7 is a balanced value)
  maxTokens: 150, // Control the maximum number of tokens generated in the response
});

// Function to handle user messages and generate activity recommendations using ChatGPT
async function handleUserMessage(message, location, weatherCondition) {
  try {
    // Generate activity recommendations using ChatGPT
    const response = await gpt.completePrompt(message, {
      stop: ['User:', 'AI:'], // Stop generating tokens when reaching the prompts
      context: {
        location: location,
        weather: weatherCondition,
      },
    });
    return response.choices[0].text.trim(); // Return the generated response
  } catch (error) {
    console.error('Error generating activity recommendations:', error);
    return 'Sorry, I encountered an error while generating activity recommendations.';
  }
}

// Example usage:
const userMessage = 'What activities can I do?'; // User's message requesting activity recommendations
const location = 'New York'; // Example location (replace with actual location)
const weatherCondition = 'Clear'; // Example weather condition (replace with actual weather condition)

handleUserMessage(userMessage, location, weatherCondition)
  .then((response) => {
    console.log(response); // Display the generated activity recommendations to the user
  })
  .catch((error) => {
    console.error('Error handling user message:', error);
  });
