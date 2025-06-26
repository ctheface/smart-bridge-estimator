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
    water_flow_rate: '',
    rainfall: '',
    material_composition: '',
    bridge_design: '',
    construction_quality: '',
    temperature: '',
    humidity: ''
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
          <option value="Windy">Windy</option>
          <option value="Snowy">Snowy</option>
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
      <label>
        Rainfall (mm):
        <input type="number" 
        name="rainfall" 
        value={form.rainfall} 
        onChange={handleChange} 
        required 
        />
      </label>
      <br />

      <label>
        Material Composition:
        <select name="material_composition" value={form.material_composition} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Steel 70%, Concrete 30%">Steel 70%, Concrete 30%</option>
          <option value="Concrete 80%, Wood 20%">Concrete 80%, Wood 20%</option>
        </select>
      </label>
      <br />

      <label>
        Bridge Design:
        <select name="bridge_design" value={form.bridge_design} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Truss">Truss</option>
          <option value="Arch">Arch</option>
          <option value="Beam">Beam</option>
        </select>
      </label>
      <br />

      <label>
        Construction Quality:
        <select name="construction_quality" value={form.construction_quality} onChange={handleChange} required>
          <option value="">--Select--</option>
          <option value="Good">Good</option>
          
        </select>
      </label>
      <br />

      <label>
        Temperature (°C):
        <input 
        type="number" 
        name="temperature" 
        value={form.temperature} 
        onChange={handleChange} 
        required />
      </label>
      <br />

      <label>
        Humidity (%):
        <input 
        type="number" 
        name="humidity" 
        value={form.humidity} 
        onChange={handleChange} 
        required 
        />
      </label>
      <br />

      <button type="submit">Predict</button>
    </form>

    {result && (
        <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <h2>🔮 Prediction Result</h2>
          <p><strong>Stress:</strong> {result.predicted_stress} MPa</p>
          <p><strong>Strain:</strong> {result.predicted_strain} %</p>
          <p><strong>Tensile Strength:</strong> {result.predicted_tensile_strength} MPa</p>
          <p><strong>Collapse Risk:</strong> {result.collapse_risk === 1 ? "⚠️ Yes" : "✅ No"}</p>
          <p><strong>Probability of Collapse:</strong> {result.probability_of_collapse}%</p>
        </div>
      )}


    </div>
  );
}

export default App;

