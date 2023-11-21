import React, { useState, useEffect } from "react";
import axios from "axios";
import { parseString } from "xml2js";

interface SnowQualityProps {
  /** The name of the location */
  location: string;
  /** The date in YYYY-MM-DD format */
  date: string;
  /** The weight for snow depth */
  depthWeight: number;
  /** The weight for snow density */
  densityWeight: number;
  /** The weight for snow temperature */
  temperatureWeight: number;
  /** The time since the last snowfall in hours */
  timeSinceSnowfall: number;
  /** Whether it's currently snowing */
  isSnowing: boolean;
}

// A function that converts millimeters to inches
const mmToInches = (mm: number) => mm / 25.4;

// A function that calculates the snow depth based on the precipitation data
const calculateSnowDepth = (precipitation: number, timeSinceSnowfall: number, isSnowing: boolean) => {
  // Assume that 1 inch of rain equals 10 inches of snow
  let snowDepth = precipitation * 10;
  
  // If it's currently snowing, increase the snow depth
  if (isSnowing) {
    snowDepth += 1; // Increase by 1 inch for simplicity
  }

  // If it's been more than 24 hours since the last snowfall, decrease the snow depth
  if (timeSinceSnowfall > 24) {
    snowDepth -= 1; // Decrease by 1 inch for simplicity
  }

  // Return the snow depth in inches
  return snowDepth;
};

// A function that calculates the snow density based on the wind and humidity data
const calculateSnowDensity = (wind: number, humidity: number) => {
  // Assume that the snow density is inversely proportional to the wind speed and directly proportional to the humidity
  const snowDensity = (100 / wind) * humidity;
  // Return the snow density in percentage
  return snowDensity;
};

// A function that converts Fahrenheit to Celsius
const fToC = (f: number) => (f - 32) * (5 / 9);

// A function that calculates the snow temperature based on the air temperature data
const calculateSnowTemperature = (airTemperature: number) => {
  // Assume that the snow temperature is equal to the air temperature minus 2 degrees Celsius
  const snowTemperature = airTemperature - 2;
  // Return the snow temperature in Celsius
  return snowTemperature;
};

// A function that calculates the snow quality category based on the snow depth, snow density, and snow temperature
const calculateSnowQualityCategory = (
  snowDepth: number,
  snowDensity: number,
  snowTemperature: number,
  depthWeight: number,
  densityWeight: number,
  temperatureWeight: number,
  airTemperature: number,
  isSnowing: boolean
) => {
  // Check for melting conditions
  if (airTemperature > 0 && !isSnowing) {
    return 'Melting';
  }

  // Check for no snow conditions
  if (airTemperature > 0 && snowDepth === 0) {
    return 'No Snow';
  }

  // Multiply each parameter by its corresponding weight and sum up the results
  const snowQualityScore =
    snowDepth * depthWeight +
    snowDensity * densityWeight +
    snowTemperature * temperatureWeight;
  // Normalize the score to a range of 0 to 100
  const normalizedScore = (snowQualityScore / 300) * 100;

  // Determine the snow quality category based on the normalized score and other factors
  let category;
  if (normalizedScore > 80) {
    category = 'Powder';
  } else if (normalizedScore > 60) {
    category = 'Packed';
  } else if (snowTemperature > 0) {
    category = 'Wet';
  } else {
    category = 'Icy';
  }

  // Return the category
  return category;
};


// The SnowQuality component
const SnowQuality: React.FC<SnowQualityProps> = ({
  location,
  date,
  depthWeight,
  densityWeight,
  temperatureWeight,
  timeSinceSnowfall,
  isSnowing,
}) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [snowDepth, setSnowDepth] = useState<number>(0);
  const [snowDensity, setSnowDensity] = useState<number>(0);
  const [snowTemperature, setSnowTemperature] = useState<number>(0);
  const [airTemperature, setAirTemperature] = useState<number>(0);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_CDO_API_KEY;
    const url = `https://www.ncdc.noaa.gov/cdo-web/api/v2/data?datasetid=GHCND&locationid=${location}&startdate=${date}&enddate=${date}&limit=1000&units=standard`;

    axios
      .get(url, {
        headers: {
          token: apiKey,
        },
      })
      .then((response) => {
        parseString(response.data, (err: any, result: any) => {
          if (err) {
            console.error(err);
          } else {
            setWeatherData(result);
          }
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, [location, date]);

  useEffect(() => {
    if (weatherData) {
      let precipitation = 0;
      let wind = 0;
      let humidity = 0;

      weatherData.results.forEach((item: any) => {
        switch (item.datatype[0]) {
          case "PRCP":
            precipitation = mmToInches(item.value[0]);
            break;
          case "AWND":
            wind = item.value[0];
            break;
          case "RHUM":
            humidity = item.value[0];
            break;
          case "TAVG":
            setAirTemperature(fToC(item.value[0]));
            break;
          default:
            break;
        }
      });

      const depth = calculateSnowDepth(precipitation, timeSinceSnowfall, isSnowing);
      setSnowDepth(depth);

      const density = calculateSnowDensity(wind, humidity);
      setSnowDensity(density);

      const temperature = calculateSnowTemperature(airTemperature);
      setSnowTemperature(temperature);
    }
  }, [weatherData]);

  return (
    <div>
      <h1>Snow Quality for {location} on {date}</h1>
      <p>Snow Depth: {snowDepth.toFixed(2)} inches</p>
      <p>Snow Density: {snowDensity.toFixed(2)} %</p>
      <p>Snow Temperature: {snowTemperature.toFixed(2)} °C</p>
      <p>Snow Quality: {calculateSnowQualityCategory(snowDepth, snowDensity, snowTemperature, depthWeight, densityWeight, temperatureWeight, airTemperature, isSnowing)}</p>
    </div>
  );
};

export default SnowQuality;