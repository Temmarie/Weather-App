import React, { useState } from 'react';
import axios from 'axios';

const ChatBoxComponent = ({ location, weather }) => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleChat = async () => {
        try {
            const res = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: `Given the weather in ${location} which is ${weather.main.temp} degrees with ${weather.weather[0].description}, what are some recommended activities?`,
                max_tokens: 100,
                n: 1,
                stop: null,
                temperature: 0.7,
            }, {
                headers: {
                    'Authorization': `Bearer YOUR_OPENAI_API_KEY`
                }
            });
            setResponse(res.data.choices[0].text);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Activity Recommendations</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleChat}>Get Recommendations</button>
            <p>{response}</p>
        </div>
    );
};

export default ChatBoxComponent;
