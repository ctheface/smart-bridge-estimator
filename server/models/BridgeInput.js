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
  rainfall: Number,
  material_composition: String,
  bridge_design: String,
  construction_quality: String,
  temperature: Number,
  humidity: Number,

  // Predicted values (from FastAPI)
  predicted_stress: Number,
  predicted_strain: Number,
  predicted_tensile_strength: Number,
  collapse_risk: Number,
  probability_of_collapse: Number,

  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BridgeInput', BridgeInputSchema);
