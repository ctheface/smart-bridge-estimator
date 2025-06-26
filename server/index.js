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
    const inputData = req.body;

    // Send to FastAPI
    const response = await axios.post('http://127.0.0.1:8000/predict', inputData);
    const { predicted_stress, predicted_strain, predicted_tensile_strength, collapse_risk, confidence } = response.data;
    console.log('📦 Received response from FastAPI:', response.data);
    // Save all to MongoDB
    const newEntry = new BridgeInput({
      ...inputData,
      predicted_stress,
      predicted_strain,
      predicted_tensile_strength,
      collapse_risk,
      confidence
    });

    await newEntry.save();

    // Return predictions to React
    res.json({ predicted_stress, predicted_strain, predicted_tensile_strength, collapse_risk, probability_of_collapse });

  } catch (error) {
    console.error('❌ Error calling ML API:', error.message);
    res.status(500).json({ error: 'ML prediction failed' });
  }
});






app.get('/', (req, res) => {
  res.send('Smart Bridge API running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
