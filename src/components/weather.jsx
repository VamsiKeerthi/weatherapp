import { useEffect, useState } from "react";
import Search from "./search";
import getVideoByWeatherId from "./vidcom";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);
    try {
      setVideoSrc(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=f5c19312ccf1d1220f18cf3967229ea7`
      );

      const data = await res.json();
      if (data) {
        setLoading(false);
        setWeatherData(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      fetchWeatherData("rajahmundry");
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }
  console.log(weatherData);

  useEffect(() => {
    fetchWeatherData("Bengaluru");
  }, []);

  const kelvin = weatherData?.main?.temp;
  const temperature = kelvin ? Math.round(kelvin - 273.15) : null;

  const feels = weatherData?.main?.feels_like;
  const feelsLike = feels ? Math.round(feels - 273.15) : null;

  const visible = weatherData?.visibility;
  const visibility = Math.round(visible / 1000);

  useEffect(() => {
    if (weatherData) {
      const weatherId = weatherData.weather[0].id;
      const newVideoSrc = getVideoByWeatherId(weatherId);
      setVideoSrc(newVideoSrc);
    }
  }, [weatherData]);

  return (
    <div className="weather-container">
      {videoSrc && (
        <video autoPlay loop muted className="background-video">
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      <div className="container">
        <div className="title">
          <h1>Weather App</h1>
          <p>Please find your desired location's weather</p>
        </div>
        <Search
          search={search}
          setSearch={setSearch}
          handleSearch={handleSearch}
        />
        {weatherData && (
          <>
            <div>
              <h1>
                {weatherData.name} <span>{weatherData.sys.country}</span>
              </h1>
              <h1 style={{ fontSize: "40px" }}>{temperature} °C</h1>
              <h3>{weatherData.weather[0].description}</h3>
            </div>
            <div className="details">
              <div className="box">
                <h1>Feels</h1>
                <h2>{feelsLike} °C</h2>
              </div>
              <div className="box">
                <h1>Humidity</h1>
                <h2>{weatherData.main.humidity}%</h2>
              </div>
              <div className="box">
                <h1>Wind</h1>
                <h2>{weatherData.wind.speed}m/sec</h2>
              </div>
              <div className="box">
                <h1>Visibilty</h1>
                <h2>{visibility}km</h2>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
