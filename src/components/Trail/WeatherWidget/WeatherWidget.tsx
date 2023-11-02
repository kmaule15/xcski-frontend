import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

interface WeatherWidgetProps {
  lat: number;
  lng: number;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ lat, lng }) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

  useEffect(() => {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [lat, lng]);

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="8" lg="6" xl="4">
          <MDBCard>
            <MDBCardBody>
              {weatherData && (
                <>
                  <div className="d-flex">
                    <MDBTypography tag="h6" className="flex-grow-1">
                      {weatherData.name}
                    </MDBTypography>
                    <MDBTypography tag="h6">
                      {new Date(weatherData.dt * 1000).toLocaleTimeString()}
                    </MDBTypography>
                  </div>

                  <div className="d-flex flex-column text-center mt-5 mb-4">
                    <MDBTypography tag="h6" className="display-4 mb-0 font-weight-bold">
                      {Math.round(weatherData.main.temp)*9/5+32}°F
                    </MDBTypography>
                    <span className="small">{weatherData.weather[0].description}</span>
                  </div>

                  <div className="d-flex align-items-center">
                    <div className="flex-grow-1" style={{ fontSize: "1rem" }}>
                      <div>
                        <MDBIcon fas icon="wind fa-fw" />{" "}
                        <span className="ms-1">{weatherData.wind.speed} km/h</span>
                      </div>
                      <div>
                        <MDBIcon fas icon="tint fa-fw" />{" "}
                        <span className="ms-1">{weatherData.main.humidity}%</span>
                      </div>
                      <div>
                        <MDBIcon fas icon="sun fa-fw" />{" "}
                        <span className="ms-1">
                          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                      />
                    </div>
                  </div>
                </>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default WeatherWidget;
