# Smart Bridge Estimator

Smart Bridge Estimator is a web application that predicts the structural health and collapse risk of bridges using machine learning.

## Features

- Enter bridge parameters and get instant predictions for stress, strain, tensile strength, and collapse risk.
- User-friendly React frontend.
- Node.js/Express backend API.
- Python FastAPI microservice for ML predictions.
- MongoDB for storing prediction data.

## Project Structure

- `client/` - React frontend (Vite)
- `server/` - Node.js/Express backend
- `ml-model/` - Python FastAPI ML service

## Getting Started

1. **Start the ML model service:**
    ```
    cd ml-model
    pip install -r requirements.txt
    uvicorn main:app --reload
    ```

2. **Start the backend:**
    ```
    cd server
    npm install
    npm start
    ```

3. **Start the frontend:**
    ```
    cd client
    npm install
    npm run dev
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies Used

- React, Vite
- Node.js, Express
- Python, FastAPI, scikit-learn
- MongoDB

## License

For educational use.