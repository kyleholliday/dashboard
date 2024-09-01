import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const apiKey = 'c66757901117465a86e41520243108';
  const [city, setCity] = useState(localStorage.getItem('city') || null); // Check local storage for city
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityAndWeather = async () => {
      try {
        if (!city) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              async (position) => {
                const { latitude, longitude } = position.coords;
                const response = await axios.get(
                  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`
                );
                const cityName = response.data.location.name;
                setCity(cityName);
                localStorage.setItem('city', cityName);
                setWeather(response.data);
              },
              (error) => {
                setError(
                  'Failed to get your location. Please allow location access.'
                );
                console.error('Geolocation Error:', error);
              }
            );
          } else {
            setError('Geolocation is not supported by your browser.');
          }
        } else {
          const response = await axios.get(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5&aqi=no&alerts=no`
          );
          setWeather(response.data);
        }
      } catch (error) {
        setError('Failed to fetch weather data. Please try again later.');
        console.error('Error:', error);
      }
    };

    fetchCityAndWeather();
  }, [city, apiKey]);

  // convert dates to days of the week
  const getDayOfWeek = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div className="weather-widget max-h-72 overflow-y-auto bg-white rounded-xl shadow-xl py-6 px-6 mb-4">
      {error ? (
        <p>{error}</p>
      ) : weather ? (
        <div>
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 mr-1"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="font-medium">
              {weather.location.name}, {weather.location.region}
            </h2>
          </span>
          <div className="divide-y divide-gray-300/50">
            <div className="flex">
              <div className="w-48">
                <p className="text-9xl font-bold mt-3 flex">
                  <span>{Math.round(weather.current.temp_f)}</span>
                  <span className="text-lg font-bold">&deg; F</span>
                </p>
              </div>
              <div className="flex-grow items-center flex flex-col justify-center">
                {/* <img
                  src={weather.current.condition.icon}
                  alt={weather.current.condition.text}
                /> */}
                <p className="font-medium">{weather.current.condition.text}</p>
                <span className="flex mt-2 rounded-xl p-2 border-blue-200 border">
                  <p className="flex items-center font-medium">
                    <span>↑</span>
                    {Math.round(weather.forecast.forecastday[0]?.day.maxtemp_f)}
                    &deg;
                  </p>
                  <p className="flex ml-2 items-center font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                      />
                    </svg>
                    {Math.round(weather.forecast.forecastday[0].day.mintemp_f)}
                    &deg;
                  </p>
                </span>
              </div>
            </div>
            {/* bottom  */}
            <div className="flex justify-evenly pt-2 mt-4">
              <div className="flex flex-col items-center">
                <p>{getDayOfWeek(weather.forecast.forecastday[1].date)}</p>
                <p className="font-bold">
                  <span className="text-slate-400">
                    {Math.round(weather.forecast.forecastday[1].day.mintemp_f)}
                    &deg;
                  </span>
                  <span className="ml-1">
                    {Math.round(weather.forecast.forecastday[1].day.maxtemp_f)}
                    &deg;
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p>{getDayOfWeek(weather.forecast.forecastday[2].date)}</p>
                <p className="font-bold">
                  <span className="text-slate-400">
                    {Math.round(weather.forecast.forecastday[2].day.mintemp_f)}
                    &deg;
                  </span>
                  <span className="ml-1">
                    {Math.round(weather.forecast.forecastday[2].day.maxtemp_f)}
                    &deg;
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p>{getDayOfWeek(weather.forecast.forecastday[3].date)}</p>
                <p className="font-bold">
                  <span className="text-slate-400">
                    {Math.round(weather.forecast.forecastday[3].day.mintemp_f)}
                    &deg;
                  </span>
                  <span className="ml-1">
                    {Math.round(weather.forecast.forecastday[3].day.maxtemp_f)}
                    &deg;
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
