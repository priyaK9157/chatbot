require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const huggingFaceApiKey = process.env.HUGGINGFACE_API_KEY; 

// Example route to process text using Hugging Face's text generation API
app.post('/api/generate-text', async (req, res) => {
  const { prompt } = req.body;
  console.log("promt", req.body)

  try {

    console.log("try")
    const response = await axios.post('https://api-inference.huggingface.co/models/gpt2', {
      inputs: prompt, 
    }, {
      headers: {
        Authorization: `Bearer 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`,
        'Content-Type': 'application/json',
      },
    });

    console.log("first", response)

    res.status(200).json({
      message: 'Text generated successfully',
      huggingFaceResponse: response.data,
    });
  } catch (err) {
    console.error('Error with Hugging Face:', err.response ? err.response.data : err.message);
    res.status(500).json({ message: 'Failed to generate text', error: err.response ? err.response.data : err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
