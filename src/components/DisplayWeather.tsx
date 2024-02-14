import React, { useState, useEffect, useCallback } from 'react';
import { MainWrapper, WidgetCompactView, BackButton } from './styles.module';
import { TbGps } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { BsFillCloudFog2Fill, BsWind } from "react-icons/bs";
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill } from 'react-icons/bs';
import { IoIosThunderstorm } from "react-icons/io";
import { FaRegSnowflake } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';


interface WeatherDataProps {
  name: string;

  main: {
    temp: number,
    humidity: number,
  },
  sys: {
    country: string;
  },
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  }
}


function DisplayWeather() {

  const api_key = process.env.REACT_APP_API_KEY;
  const api_Endpoint = process.env.REACT_APP_API_ENDPOINT;
  const [lastRequestTime, setLastRequestTime] = useState<number | null>(null);
  const [cachedWeatherData, setCachedWeatherData] = useState<WeatherDataProps | null>(null);
  const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null>(null)
  const [searchCity, setSearchCity] = React.useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [isCompactView, setIsCompactView] = useState(true);
  
  const toggleView = () => {
    setIsCompactView(!isCompactView);
  };

  const convertKmHtoMS = (speedInKmH: number): number => {
    return Math.round(speedInKmH / 3.6);
  };

  const fetchCurrentWeather = useCallback(async (lat: number, lon: number) => {
    const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  }, [api_key, api_Endpoint]);


  const fetchWeatherForCurrentLocation = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const weatherData = await fetchCurrentWeather(latitude, longitude);
        setWeatherData(weatherData);
      } catch (error) {
        console.error("Geolocation error:", error);
      }
    }, (error) => {
      console.error("Error getting geolocation:", error);
    });
  }, [fetchCurrentWeather]);


  const fetchWeatherData = async (city: string) => {
    const currentTime = Date.now();

    // Kontrollerar om det har gått mindre än 60 sekunder sedan den senaste framgångsrika förfrågan
    if (lastRequestTime && (currentTime - lastRequestTime < 60000)) {
      console.log("Använder cachad data på grund av ratelimit.");
      if (cachedWeatherData) {
        setWeatherData(cachedWeatherData);
        return;
      }
    }

    try {
      const response = await axios.get(`${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`);
      setWeatherData(response.data);
      setCachedWeatherData(response.data);
      setLastRequestTime(currentTime);
    } catch (error) {
      console.error("Fel vid hämtning av väderdata:", error);
    }
  };


  const handleSearch = async () => {
    if (!searchCity.trim()) return;
    await fetchWeatherData(searchCity);
  };


  useEffect(() => {
    if (useCurrentLocation) {
      fetchWeatherForCurrentLocation();
    }
  }, [useCurrentLocation]);

  const iconChanger = (weather: string) => {
    let iconElement: React.ReactNode;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <BsFillCloudRainFill />;
        iconColor = "#272829";
        break;

      case "Clear":
        iconElement = <BsFillSunFill />;
        iconColor = "#FFC436";
        break;

      case "Clouds":
        iconElement = <BsCloudyFill />;
        iconColor = "#102C57";
        break;

      case "Mist":
        iconElement = <BsFillCloudFog2Fill />;
        iconColor = "#279EFF";
        break;

      case "Thunderstorm":
        iconElement = <IoIosThunderstorm />;
        iconColor = "#102C57";
        break;

      case "Snow":
        iconElement = <FaRegSnowflake/>;
        iconColor = "#FFFFFF";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#7B2869";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };


  React.useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const [currentWeather] = await Promise.all([fetchCurrentWeather(latitude, longitude)]);
        setWeatherData(currentWeather);
      });
    };

    fetchData();
  }, [fetchCurrentWeather]);

  return (
    <>
      {isCompactView ? (
        <WidgetCompactView onClick={toggleView}>
          {weatherData && (
            <>
              <span className="temp">{weatherData.main.temp.toFixed(0)}°</span>
              <span className="iconWrapper">{iconChanger(weatherData.weather[0].main)}</span>
              <div className="weatherDataName">{weatherData.name}</div>
            </>
          )}
        </WidgetCompactView>
      ) : (
        <MainWrapper>
          <div className="container">
            <div className="searchArea">
              <input
                type="text"
                placeholder="enter a city"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
              />
              <div className="searchCircle">
                <IoMdSearch className="searchIcon" onClick={handleSearch} />
              </div>
              <TbGps className="locationIcon" onClick={() => setUseCurrentLocation(prevState => !prevState)} />
            </div>

            {weatherData && (
              <>
                <div className="weatherArea">
                  <h1>{weatherData.name}</h1>
                  <span>{weatherData.sys.country}</span>
                  <div className="icon">
                    {iconChanger(weatherData.weather[0].main)}
                  </div>
                  <h1>{weatherData.main.temp.toFixed(0)}°</h1>
                  <h2>{weatherData.weather[0].main}</h2>
                </div>

                <div className="bottomInfoArea">
                  <div className="humidityLevel">
                    <WiHumidity className="humidIcon" />
                    <div className="humidInfo">
                      <h2>{weatherData.main.humidity}%</h2>
                      <p>Humidity</p>
                    </div>
                  </div>

                  <div className="wind">
                    <BsWind className="windIcon" />
                    <div className="windInfo">
                      <h2>{convertKmHtoMS(weatherData.wind.speed)} m/s</h2>
                      <p>Wind speed</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            <BackButton onClick={toggleView}>Back to widget</BackButton>
          </div>
        </MainWrapper>
      )}
    </>
  );
}

export default DisplayWeather; 