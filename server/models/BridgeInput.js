const mongoose = require('mongoose');

const BridgeInputSchema = new mongoose.Schema({
  age: Number,
  material: String,
  length: Number,
  width: Number,
  height: Number,
  traffic_volume: Number,
  weather_conditions: String,
  water_flow_rate: Number,
  predicted_max_load: Number,
  failure_probability: Number,
  maintenance_urgency: String,
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('BridgeInput', BridgeInputSchema);
