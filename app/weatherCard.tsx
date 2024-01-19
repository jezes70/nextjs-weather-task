import React from "react";

type WeatherCardProps = {
  location: string;
  temperature: number;
  unit: string;
  windSpeed: number;
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  location,
  temperature,
  unit,
  windSpeed,
}) => {
  return (
    <div>
      <h2>{location}</h2>
      <p>
        Temperature: {temperature}°{unit}
      </p>
      <p>
        Wind Speed: {windSpeed} {unit === "C" ? "m/s" : "mph"}
      </p>
    </div>
  );
};

export default WeatherCard;
