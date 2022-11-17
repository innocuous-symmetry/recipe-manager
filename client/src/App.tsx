import { useState } from 'react';
import './App.scss'

function App() {
  const [value, setValue] = useState("Waiting for stuff...");

  const getThings = async () => {
    const data = await fetch('http://localhost:8080/hello');
    const json = await data.json();
    setValue(json.message);
  }

  return (
    <div className="App">
      <h1>RECIPE MANAGER</h1>
      <h2>Simple Recipe Management and Sharing for the Home</h2>
      <p>Keep all your most-used recipes handy in your own personal collection.</p>

      <h2>Share Your Recipe Collection</h2>
      <p>Share your personal collection with your friends and family, and subscribe to their collections.</p>

      <h2>Build Shopping Lists Directly from Your Recipes</h2>
      <p>Lay out your meal plan for the week, and let Recipin automatically generate your grocery list, ingredient by ingredient.</p>

      <p>{value}</p>
      <button onClick={getThings}>Do some stuff!</button>
    </div>
  )
}

export default App
