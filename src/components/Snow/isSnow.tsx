import React, { useEffect, useState } from "react";

const SnowIndicator = ({ lat, lng }: { lat: number; lng: number }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data.weather[0].main);
      })
      .catch((error) => console.error(error));
  }, [lat, lng]);

  return (
    <div>
      {weather === "Snow" ? (
        <img
          src={`${process.env.PUBLIC_URL}/SnowIcon.png`}
          alt="Snow Icon"
          className="snow-icon"
        />
      ) : (
        <img
          src={`${process.env.PUBLIC_URL}/noSnowIcon.png`}
          alt="No Snow Icon"
          className="snow-icon"
        />
      )}
    </div>
  );
};

export default SnowIndicator;
