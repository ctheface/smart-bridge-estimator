const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const axios = require('axios');  // allows HTTP requests from Express to FastAPI


const app = express();
app.use(cors());
app.use(express.json()); // allows Express to read JSON bodies from React

mongoose.connect(process.env.MONGO_URI)

.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

const BridgeInput = require('./models/BridgeInput');

app.post('/api/predict', async (req, res) => {
  try {
    // This is the form data from React
    const inputData = req.body;

    // Send it to FastAPI running at port 8000
    const response = await axios.post('http://127.0.0.1:8000/predict', inputData);

    // FastAPI returns: { predicted_max_load: ... }
    const prediction = response.data;

    // Send that prediction back to React
    res.json(prediction);
  } catch (error) {
    console.error('❌ Error calling ML API:', error.message);
    res.status(500).json({ error: 'ML prediction failed' });
  }
});


app.post('/api/submit', async (req, res) => {
  try {
    const input = new BridgeInput(req.body);
    await input.save();
    res.json({ message: '✅ Data saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Failed to save data' });
  }
});



app.get('/', (req, res) => {
  res.send('Smart Bridge API running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
