// activitySuggestions.js

// Function to suggest activities based on weather conditions
async function suggestActivities(weather) {
  try {
     // Construct prompt
     const prompt = `The weather in your location is ${weather.weather[0].description} with a temperature of ${weather.main.temp}°C and humidity of ${weather.main.humidity}%. Based on this weather, suggest some activities.`;

    // Fetch activity suggestions from OpenAI API based on weather conditions
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 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',
      },
      body: JSON.stringify({
        weather: weather.weather[0].main,
        temperature: weather.main.temp,
        humidity: weather.main.humidity,
        prompt,
        // You can include additional weather data or user preferences here
      }),
    });
    const activitySuggestions = await response.json();
    return activitySuggestions;
  } catch (error) {
    console.error('Error fetching activity suggestions:', error);
    // Handle error
    return [];
  }
}

// Update the function to handle activity suggestions
function handleActivitySuggestions(activitySuggestions) {
  // Get the container for activity suggestions
  const actContainer = document.querySelector('.act');
  
  // Clear any existing activity suggestions
  actContainer.innerHTML = '';

  // Loop through the activity suggestions and create HTML elements for each suggestion
  activitySuggestions.forEach(suggestion => {
    const activityDiv = document.createElement('div');
    activityDiv.classList.add('activities');

    // Construct the HTML for each activity suggestion
    activityDiv.innerHTML = `
      <img src="../src/images/activity-placeholder.jpg" class="activity-img">
      <div class="activityinfo">
        <h5 class="activity-name">${suggestion.name}</h5>
        <small class="time-rec">Recommended time: ${suggestion.time}</small>
        <p class="activity-desc">${suggestion.description}</p>
      </div>
    `;

    // Append the activity suggestion to the container
    actContainer.appendChild(activityDiv);
  });
}

// Call the function to handle activity suggestions
const activitySuggestions = [
  {
    name: 'Activity 1',
    time: 'Morning',
    description: 'Description of Activity 1'
  },
  {
    name: 'Activity 2',
    time: 'Afternoon',
    description: 'Description of Activity 2'
  },
  // Add more activity suggestions as needed
];

handleActivitySuggestions(activitySuggestions);


// Export the function to make it available for import in other files
// eslint-disable-next-line import/prefer-default-export
export { suggestActivities };

// const openai = require('openai');

// const openaiClient = new openai.OpenAIApiClient({
//   apiKey: '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',
// });

// // Import the ChatGPT library
// const { GPT } = require('gpt-4.0-js');

// // Initialize a ChatGPT instance
// const gpt = new GPT({
//   apiKey: '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',
//   language: 'en', // Specify the language
//   temperature: 0.7, // Control the creativity of the responses (0.7 is a balanced value)
//   maxTokens: 150, // Control the maximum number of tokens generated in the response
// });

// // Function to handle user messages and generate activity recommendations using ChatGPT
// async function handleUserMessage(message, location, weatherCondition) {
//   try {
//     // Generate activity recommendations using ChatGPT
//     const response = await gpt.completePrompt(message, {
//       stop: ['User:', 'AI:'], // Stop generating tokens when reaching the prompts
//       context: {
//         location: location,
//         weather: weatherCondition,
//       },
//     });
//     return response.choices[0].text.trim(); // Return the generated response
//   } catch (error) {
//     console.error('Error generating activity recommendations:', error);
//     return 'Sorry, I encountered an error while generating activity recommendations.';
//   }
// }

// // Example usage:
// const userMessage = 'What activities can I do?'; // User's message requesting activity recommendations
// const location = 'New York'; // Example location (replace with actual location)
// const weatherCondition = 'Clear'; // Example weather condition (replace with actual weather condition)

// handleUserMessage(userMessage, location, weatherCondition)
//   .then((response) => {
//     console.log(response); // Display the generated activity recommendations to the user
//   })
//   .catch((error) => {
//     console.error('Error handling user message:', error);
//   });
