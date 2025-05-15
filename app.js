require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views'))); // Serve HTML files

// Telegram Bot Config
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/submit', async (req, res) => {
  try {
    const { name, phone, username, knowFrom, giveaway } = req.body;
    
    // Format message for Telegram
    const message = `
        🎉 *New Giveaway Entry* 🎁
        --------------------------
        *Name:* ${name}
        *Username:* ${username}
        *Phone:* ${phone}
        *Know From:* ${knowFrom}
        *Selected Giveaway:* ${giveaway}
        --------------------------
        🚀 *Iconic Tech Giveaway* 🚀
        `;
    
    // Send to Telegram
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    
    res.sendFile(path.join(__dirname, 'views', 'success.html'));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error submitting form');
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});