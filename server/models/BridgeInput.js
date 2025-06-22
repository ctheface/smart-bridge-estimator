const mongoose = require('mongoose');

const BridgeInputSchema= new mongoose.Schema({
    span_length: Number,
    material: String,
    num_lanes: Number,
    traffic_load: Number,
    predicted_max_load: Number,  // optional field to store model output
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('BridgeInput', BridgeInputSchema);