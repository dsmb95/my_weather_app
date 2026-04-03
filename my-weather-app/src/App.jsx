import './App.css'
import { useState } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import WeatherCelsius from './components/WeatherCelsius.jsx';
import WeatherFahrenheit from './components/WeatherFahrenheit.jsx';
import weatherImg from "./assets/weather.png";

function App() {
  const [show, setShow] = useState(true);
  return (
    <>
      <a href="/" className="home">
        <div className="page-head">
          <h1>The Weather App</h1>
          <img src={weatherImg} alt="Weather icon" />
        </div>
      </a>  

    {show && <div>
        <p className="welcome">Welcome to the weather app.</p>
        <p className="instructions">To begin, choose a unit to display your data. </p>
    </div>}

      <nav className="nav-links">
        <NavLink to="/celsius" className="nav-link" onClick={() => setShow(false)}>°C</NavLink>
        <NavLink to="/fahrenheit" className="nav-link" onClick={() => setShow(false)}>°F</NavLink>
      </nav>

      <Routes>
        <Route path="/celsius" element={<WeatherCelsius />}></Route>
        <Route path="/fahrenheit" element={<WeatherFahrenheit />}></Route>
      </Routes>
    </>
  )
}

export default App;
