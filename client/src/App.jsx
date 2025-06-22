import {useState} from 'react';


function App(){
  const [form, setForm] = useState({
    span_length: '',
    material: "concrete", //default option
    num_lanes:'',
    traffic_load: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload

    try {
      // Call /api/predict to get predicted load
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const predictionData = await predictionRes.json();
    const predictedLoad = predictionData.predicted_max_load;

    //  Combine form + prediction into one object
    const fullData = { ...form, predicted_max_load: predictedLoad };

    //  Save this to MongoDB via /api/submit
    await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fullData)
    });

    //  Show the prediction
    setPrediction(predictedLoad);
  } catch (err) {
    console.error(" Error submitting data:", err);
  }
};



  return (
    <div>
      <h1>Bridge Load Estimator</h1>
      <form onSubmit={handleSubmit}>
        <label>Span Length (in meters):</label>
        <input 
          type="number"
          name="span_length"
          value={form.span_length}
          onChange={handleChange}
          required
        />
        <br />
        <label>Material:</label>
        <select
          name="material"
          value={form.material}
          onChange={handleChange}
        >
          <option value="concrete">Concrete</option>
          <option value="steel">Steel</option>
        </select>  
        <br />
        <label>Number of Lanes:</label>
        <input
          type="number"
          name="num_lanes"
          value={form.num_lanes}
          onChange={handleChange}
          required
        />
        <br />
        <label>Traffic Load (in tonnes/day):</label>
        <input
          type="number"
          name="traffic_load"
          value={form.traffic_load}
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit">Predict</button>
      </form>
      {prediction && (<p>🔮 Predicted Max Load Capacity: <strong>{prediction}</strong> tonnes</p>
    )}

    </div>
  );
}

export default App;

