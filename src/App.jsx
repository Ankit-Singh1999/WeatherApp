import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "2c19d92e2881dc468832c12b4705b666";
  // const api_Key = "2c19d92e2881dc468832c12b4705b666";
  
  useEffect(()=>{
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(async (position)=>{
        const lati=position.coords.latitude.toFixed(3);
        const longi=position.coords.longitude.toFixed(3);
        try{
            const response = await axios.get( `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=${apiKey}&units=metric`)
            setWeather(response.data)
        }catch(err){
    console.log(err);
    
        }       
      })
    }
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      );

      if (response) {
        setWeather(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-700 flex justify-center items-center p-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-xl rounded-3xl p-6 w-full max-w-md text-white">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-6">🌦 Weather App</h1>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg text-black outline-none bg-blue-100"
          />

          <button
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            onClick={fetchWeather}
          >
            Search
          </button>
        </div>

        {/* Weather Card */}
        <div className="text-center">
          <div className="text-7xl mb-3">☀️</div>

          <h2 className="text-3xl font-bold">
            { weather?.name}
          </h2>

          <p className="text-5xl font-bold mt-3">
            {weather?.main?.temp}°C
          </p>

          <p className="text-xl mt-2">{weather?.weather?.[0]?.description}</p>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-white/10 rounded-xl p-4 text-center">
            <h3 className="font-semibold">💧 Humidity</h3>
            <p className="text-2xl"> {weather?.main?.humidity} %</p>
          </div>

          <div className="bg-white/10 rounded-xl p-4 text-center">
            <h3 className="font-semibold">🌬 Wind</h3>
            <p className="text-2xl"> {weather ? (weather.wind.speed*3.6).toFixed(2) : ""} km/h</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
