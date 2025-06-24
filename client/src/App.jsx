import {useState} from 'react';


function App(){
  const [form, setForm] = useState({
    age: '',
    material: '',
    length: '',
    width: '',
    height: '',
    traffic_volume: '',
    weather_conditions: '',
    water_flow_rate: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [result, setResult] = useState(null);

  

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload

    try {
      // Call /api/predict to get predicted load
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      console.log("📦 Result from Express:", data);

    //  Show the prediction
      setResult(data);


  } catch (err) {
    console.error(" Error submitting data:", err);
  }
};



  return (
    <div>
      <h1>Bridge Load Estimator</h1>
      <form onSubmit={handleSubmit}>
      <label>
        Age (years):
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Material:
        <select name="material" value={form.material} onChange={handleChange} required>
          <option value="">--Select Material--</option>
          <option value="Steel">Steel</option>
          <option value="Concrete">Concrete</option>
          <option value="Wood">Wood</option>
        </select>
      </label>
      <br />

      <label>
        Length (m):
        <input
          type="number"
          name="length"
          value={form.length}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Width (m):
        <input
          type="number"
          name="width"
          value={form.width}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Height (m):
        <input
          type="number"
          name="height"
          value={form.height}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Traffic Volume (vehicles/day):
        <input
          type="number"
          name="traffic_volume"
          value={form.traffic_volume}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Weather Conditions:
        <select name="weather_conditions" value={form.weather_conditions} onChange={handleChange} required>
          <option value="">--Select Weather--</option>
          <option value="Sunny">Sunny</option>
          <option value="Rainy">Rainy</option>
          <option value="Cloudy">Cloudy</option>
        </select>
      </label>
      <br />

      <label>
        Water Flow Rate (m³/s):
        <input
          type="number"
          name="water_flow_rate"
          value={form.water_flow_rate}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <button type="submit">Predict & Save</button>
    </form>

    {result && (
      <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid gray" }}>
        <h2>🔮 Prediction Result</h2>
        <p><strong>Predicted Max Load:</strong> {result.predicted_max_load} tonnes</p>
        <p><strong>Failure Probability:</strong> {result.failure_probability * 100}%</p>
        <p><strong>Maintenance Urgency:</strong> {result.maintenance_urgency} !</p>
      </div>
    )}


    </div>
  );
}

export default App;

