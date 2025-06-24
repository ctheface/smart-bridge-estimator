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
  let predicted_max_load; // declare it before the try block

  try {
    // This is the form data from React
    const inputData = req.body;

    // Send it to FastAPI running at port 8000
    const response = await axios.post('http://127.0.0.1:8000/predict', inputData);
    


    console.log("📦 Response from FastAPI:", response.data);
    // FastAPI returns: { predicted_max_load: ... }
    

    
    // Extract predicted_max_load from response
    predicted_max_load = response.data.predicted_max_load;
    

    const t = inputData.traffic_volume;

    
    // Derive failure_probability and maintenance_urgency
    let failure_probability = 0;
    let maintenance_urgency = "Low";


    if (predicted_max_load < t * 2) {
      failure_probability = 1;
      maintenance_urgency = "High";
    } else if (predicted_max_load < t * 3) {
      failure_probability = 0.5;
      maintenance_urgency = "Medium";
    }

    // Save all values to MongoDB
    const newEntry = new BridgeInput({
      ...inputData,
      predicted_max_load,
      failure_probability,
      maintenance_urgency
    });

    await newEntry.save();

    

    //  Send all predictions back to frontend
    res.json({ predicted_max_load, failure_probability, maintenance_urgency });

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
