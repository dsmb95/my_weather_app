import { useState, useEffect } from 'react';

function Index() {
        const [weather, setWeather] = useState(null);
    const [inputLoc, setInputLoc] = useState('');
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState(null);
    const [lon, setLon] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        if (!location.trim() || !apiKey) {
            return;
        }

        setLoading(true);
        setError(null);

        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`)
            .then((response) => response.json())
            .then((locationData) => {
                if (!locationData.length) {
                    throw new Error('Location not found.');
                }

                setLat(locationData[0].lat);
                setLon(locationData[0].lon);
                console.log(`${lat} & ${lon}`)
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [apiKey, lat, location, lon]);

    useEffect(() => {
        if (lat === null || lon === null || !apiKey) {
            return;
        }

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
            .then((response) => response.json())
            .then((weatherData) => {
                if (!weatherData.main) {
                    throw new Error('Weather data is unavailable right now.');
                }

                setWeather({
                    temp: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    uvi: weatherData.main.uvi,
                    feels_like: weatherData.main.feels_like,
                    description: weatherData.weather[0].description,
                    weather_icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [apiKey, lat, lon]);

    return (
        <>
            <h1>Welcome to Weather App</h1>

            <form onSubmit={(e) => {
                e.preventDefault();
                setLocation(inputLoc);
                }}>
                <input
                    value={inputLoc}
                    onChange={({target}) => setInputLoc(target.value)}
                    placeholder="Enter a city"
                />
                <button type='submit'>Search</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}

            {weather && (
                <div>
                    <h3>{location.charAt(0).toUpperCase() + location.slice(1)}</h3>
                    <img src={weather.weather_icon} alt='Weather Icon' />
                    <p>You will experience {weather.description}.</p>
                    <p>Temperature: {weather.temp}</p>
                    <p>Feels like: {weather.feels_like}</p>
                    <p>Humidity: {weather.humidity}</p>
                </div>
            )}
        </>
    )
}

export default Index;
