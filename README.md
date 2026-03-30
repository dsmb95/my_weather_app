# my_weather_app
A weather app that displays the weather in your area.

```js

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
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [apiKey, location]);

    useEffect(() => {
        if (lat === null || lon === null || !apiKey) {
            return;
        }

        fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${apiKey}`)
            .then((response) => response.json())
            .then((weatherData) => {
                console.log(weatherData.current);
                if (!weatherData.current) {
                    throw new Error('Weather data is unavailable right now.');
                }

                setWeather({
                    temp: weatherData.current.temp,
                    humidity: weatherData.current.humidity,
                    uvi: weatherData.current.uvi,
                    feels_like: weatherData.current.feels_like,
                    weather_icon: `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`
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
                    <h3>{location}</h3>
                    <img src={weather.weather_icon} alt='Weather Icon' />
                    <p>Temperature: {weather.temp}</p>
                    <p>Feels like: {weather.feels_like}</p>
                    <p>Humidity: {weather.humidity}</p>
                    <p>UV Index: {weather.uvi}</p>
                </div>
            )}
```

```js
const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [weather, setWeather] = useState(null);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    
    useEffect(() => {
        if (!location.trim() || !apiKey) {
            return;
        }

        setLoading(true);
        setError(null);
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location},uk&APPID=${apiKey}`)
            .then((response) => response.json())
            .then((weatherData) => {
                if (!weatherData.main || !weatherData.weather?.length) {
                    throw new Error(weatherData.message || 'Weather data is unavailable.');
                }

                setWeather({
                    temp: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    feels_like: weatherData.main.feels_like,
                    icon: `https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`
                });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
                setLoading(false);
            });
    }, [location, apiKey]);

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>

    return(
        <>
            <h1>Welcome to the Weather App</h1>

            <form
            onSubmit={(e) => {
                e.preventDefault();
                setLocation(locationInput);
            }}>
                <input 
                value={locationInput}
                onChange={({target}) => setLocationInput(target.value)}/>
                <button type='submit'>Search</button>
            </form>

            { weather && <div>
                <h3>{location.charAt(0).toUpperCase() + location.slice(1)}</h3>
                <img src={weather.icon} alt='Weather Icon'/>
            </div>
            }
        </>
    );
```
