import { useEffect, useState } from 'react';

function App() {
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(setApiMessage);
  }, []);

  return (
    <div>
      <h1>Smart Bridge Load Estimator</h1>
      <p>{apiMessage}</p>
    </div>
  );
}

export default App;

