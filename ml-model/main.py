from fastapi import FastAPI
from pydantic import BaseModel

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

@app.post("/predict")
def predict(data: InputData):
    # Simple dummy scoring formula
    base_score = (
        data.length * 2 +
        data.width * 1.5 +
        data.height * 0.5 +
        data.traffic_volume * 0.01 -
        data.age * 0.8 -
        data.water_flow_rate * 0.2
    )

    # Adjust based on material
    material_factor = {
        "Steel": 1.2,
        "Concrete": 1.0,
        "Wood": 0.7
    }.get(data.material, 1.0)

    # Adjust based on weather
    weather_penalty = {
        "Sunny": 0,
        "Cloudy": -2,
        "Rainy": -5
    }.get(data.weather_conditions, 0)

    predicted_max_load = base_score * material_factor + weather_penalty

    return {
        "predicted_max_load": round(predicted_max_load, 2)
    }
