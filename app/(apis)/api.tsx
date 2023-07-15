import axios from "axios";

export default async function getWeather(lat: number, long: number) {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: long,
      timezone: "auto",
      current_weather: true,
      hourly: ["temperature_2m", "precipitation_probability", "weathercode"],
      daily: [
        "weathercode",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "uv_index_max",
        "precipitation_probability_max",
      ],
    },
  });
  return {
    current: getCurrentWeather(response.data),
    hourly: getHourlyWeather(response.data),
    daily: getDailyWeather(response.data),
  };
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
}

function getCurrentWeather(data: { current_weather: CurrentWeather }) {
  const { temperature, windspeed, winddirection, weathercode, is_day, time } =
    data.current_weather;
  return { temperature, windspeed, winddirection, weathercode, is_day, time };
}

function getHourlyWeather(data: { hourly: HourlyForecast }) {
  const { time, temperature_2m, precipitation_probability, weathercode } =
    data.hourly;
  return { time, temperature_2m, precipitation_probability, weathercode };
}

function getDailyWeather(data: { daily: DailyForecast }) {
  const {
    time,
    weathercode,
    temperature_2m_max,
    temperature_2m_min,
    sunrise,
    sunset,
    uv_index_max,
    precipitation_probability_max,
  } = data.daily;
  return {
    time,
    weathercode,
    temperature_2m_max,
    temperature_2m_min,
    sunrise,
    sunset,
    uv_index_max,
    precipitation_probability_max,
  };
}
