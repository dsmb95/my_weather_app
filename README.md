# 🌤️ The Weather App
A simple weather app that displays the weather in your area. This web application is built using the react framework with some incorporation of MUI components to produce a clean display.

## 🔎 Features:
✏️ Accepts inputs and searches the weather by city name.\
✏️ Fetches the current weather based on the city selected.\
✏️ Displays a short weather description for what to expect.\
✏️ Allows the user to flip through data (i.e. temperature, "feels like", humidity) using a carousel.\
✏️ Allows the user to display data in Celsius or Fahrenheit.\
✏️ Displays error validation to ensure proper input.

## 📋 Requirements:
✔️ Node.js v25.2.1\
✔️ Create an account on https://home.openweathermap.org/ and use the API key provided.\
✔️ Create a .env file and place your API key with the following variable name:
```js
VITE_WEATHER_API_KEY=<YOUR_API_KEY>
```

## ⚙️ Install & Start:
On your terminal, type the following to switch your directory to the my-weather-app folder and install the dependencies:
```bash
cd my-weather-app
npm install
```
After having all the dependencies installed type the following to start the app:
```bash
npm run dev
```

## 🏁 Usage:
Go on your browser and type this url to access the app:
```bash
http://localhost:5173/
```

## 📝 Summary:

The process of building this project was a rewarding challenge. The React framework significantly reduced the complexity of the development process compared to my previous projects. I particularly enjoyed the modularity of components, which allowed for a much more organized and maintainable codebase.

The incorporation of Vite was a game-changer for my workflow, the ability to use preconfigured environment instantly saved a lot of time on the setup. The use of Material UI also provided a solid foundation for the UI, though there are still some features that could be added like a carousel component. Since MUI doesn't offer a native carousel, I had to rely on CSS to build it. It was a challenging hurdle to go back to the basics but a really great learning experience. Overall, this project has cemented my preferencce for React, and I'm excited to explore it further in future builds.
