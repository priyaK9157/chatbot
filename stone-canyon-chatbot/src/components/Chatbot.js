import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const res = await axios.post('http://localhost:5000/api/generate-text', { prompt });
      setResponse(res.data.generatedText);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to generate text. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <h2>Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Type your prompt here..."
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Text'}
        </button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
