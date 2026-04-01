import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import weatherImg from "../assets/weather.png";

function Index() {
  const [weather, setWeather] = useState(null);
  const [inputLoc, setInputLoc] = useState("");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY?.trim();

  /* useEffect to fetch the  latitute and longitude variables to pass into the actual API call for the weather specific to the area. */
  useEffect(() => {
    if (!location.trim() || !apiKey) {
      return;
    }

    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${apiKey}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || "Unable to look up that location right now.",
          );
        }

        return response.json();
      })
      .then((locationData) => {
        if (!locationData.length) {
          throw new Error("Location not found.");
        }

        setLat(locationData[0].lat);
        setLon(locationData[0].lon);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
        setLoading(false);
      });
  }, [location, apiKey]);

  /* useEffect to fetch the actual API call from the weather API. */
  useEffect(() => {
    if (lat === null || lon === null || !apiKey) {
      return;
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`,
    )
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || "Weather data is unavailable right now.",
          );
        }

        return response.json();
      })
      .then((weatherData) => {
        if (!weatherData.main) {
          throw new Error("Weather data is unavailable right now.");
        }

        setWeather({
          temp: weatherData.main.temp,
          humidity: weatherData.main.humidity,
          feels_like: weatherData.main.feels_like,
          description: weatherData.weather[0].description,
          weather_icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setWeather(null);
        setLoading(false);
      });
  }, [apiKey, lat, lon]);

  return (
    <>
      <div className="page-head">
        <h1>The Weather App</h1>
        <img src={weatherImg} alt="Weather icon" />
      </div>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!inputLoc.trim()) {
            setError("Please enter a city.");
            setWeather(null);
            return;
          }

          if (!apiKey) {
            setError("Missing VITE_WEATHER_API_KEY. Add it to a .env file.");
            setWeather(null);
            return;
          }

          setLoading(true);
          setError(null);
          setWeather(null);
          setLat(null);
          setLon(null);
          setLocation(inputLoc);
        }}
      >
        <TextField
          id="outlined-basic"
          label="City"
          variant="outlined"
          value={inputLoc}
          onChange={({ target }) => setInputLoc(target.value)}
          placeholder="Enter a city"
        />
        <Button type="submit" variant="outlined">
          Search
        </Button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {weather && (
        <div className="output">
          {/* Display the first character as a capital letter. */}
          <h3>{location.charAt(0).toUpperCase() + location.slice(1)}</h3>
          <img src={weather.weather_icon} alt="Weather Icon" />
          <p>You will experience {weather.description}.</p>
          <p>Temperature: {weather.temp.toFixed(1)} °C</p>
          <p>Feels like: {weather.feels_like.toFixed(1)} °C</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </>
  );
}

export default Index;
