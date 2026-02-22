const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// YouTube Data API endpoint
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY; // Get API key from environment variable

// Serve static files from the 'public' directory

// Serve index.html by default when visiting the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/search', async (req, res) => {
  const query = req.query.q; // Get search query from frontend
  if (!query) {
    return res.status(400).json({ error: 'Search query is required' });
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=5&key=${YOUTUBE_API_KEY}`
    );
    res.json(response.data.items); // Send search results to frontend
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
});

module.exports = app;
