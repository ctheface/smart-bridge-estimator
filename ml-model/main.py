from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class InputData(BaseModel):
    span_length: float
    material: str
    num_lanes: int
    traffic_load: float

@app.post("/predict")
def predict(data: InputData):
    # Dummy logic – replace with real model later
    score = (
        data.span_length * 0.5 +
        (1 if data.material == "steel" else 0.8) * 20 +
        data.num_lanes * 5 +
        data.traffic_load * 0.1
    )
    return {"predicted_max_load": round(score, 2)}
