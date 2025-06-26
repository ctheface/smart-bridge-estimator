from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd


app = FastAPI()


class InputData(BaseModel):
    age: float
    material: str
    length: float
    width: float
    height: float
    traffic_volume: float
    weather_conditions: str
    water_flow_rate: float
    rainfall: float
    material_composition: str
    bridge_design: str
    construction_quality: str
    temperature: float
    humidity: float

# Load the trained models
stress_model = joblib.load("stress_model.pkl")
strain_model = joblib.load("strain_model.pkl")
tensile_model = joblib.load("tensile_model.pkl")
collapse_model = joblib.load("bridge_collapse_model.pkl")

# Load expected column structure
model_columns = joblib.load("model_columns.pkl")  # For stress/strain/tensile
collapse_columns = joblib.load("collapse_columns.pkl")  # For collapse model



@app.post("/predict")
def predict(data: InputData):
    # Step 1: Turn input into a DataFrame
    input_df = pd.DataFrame([data.model_dump()])

    # Step 2: One-hot encode categorical fields
    encoded = pd.get_dummies(input_df)

    # Step 3: Align to model_columns
    for col in model_columns:
        if col not in encoded:
            encoded[col] = 0
    encoded = encoded[model_columns]

    # Step 4: Predict stress, strain, tensile
    stress = stress_model.predict(encoded)[0]
    strain = strain_model.predict(encoded)[0]
    tensile = tensile_model.predict(encoded)[0]

    # Step 5: Add predictions to collapse input
    encoded["predicted_stress"] = stress
    encoded["predicted_strain"] = strain
    encoded["predicted_tensile_strength"] = tensile

    # Step 6: Align to collapse_columns
    for col in collapse_columns:
        if col not in encoded:
            encoded[col] = 0
    encoded = encoded[collapse_columns]

    # Step 7: Predict collapse risk
    collapse_risk = int(collapse_model.predict(encoded)[0])
    confidence = float(collapse_model.predict_proba(encoded)[0][1]) * 100

    # Step 8: Return all results
    print("Predicted:", stress, strain, tensile)

    return {
        "predicted_stress": round(stress, 2),
        "predicted_strain": round(strain, 4),
        "predicted_tensile_strength": round(tensile, 2),
        "collapse_risk": collapse_risk,
        "probability_of_collapse": round(confidence, 2)
    }