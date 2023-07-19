"use client"; // Prevents hitting the API rate limit ???

import axios from "axios";

export default async function getWeather(lat: number, lon: number) {
  const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
    params: {
      latitude: lat,
      longitude: lon,
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
      models: "best_match",
    },
  });
  return {
    time: getTime(response.data),
    current: getCurrentWeather(response.data),
    hourly: getHourlyWeather(response.data),
    daily: getDailyWeather(response.data),
  };
}

export const weather_conditions: Record<
  number,
  { description: string; image: string }
> = {
  0: {
    description: "Clear Sky",
    image: "clear",
  },
  1: {
    description: "Mostly Clear",
    image: "clear",
  },
  2: { description: "Partly Cloudy", image: "partly-cloudy" },
  3: { description: "Overcast", image: "overcast" },
  45: { description: "Fog", image: "fog" },
  48: { description: "Depositing Rime fog", image: "rim-fog" },
  51: { description: "Drizzle", image: "drizzle" },
  53: { description: "Moderate Drizzle", image: "moderate-drizzle" },
  55: { description: "Dense Drizzle", image: "extreme-drizzle" },
  56: { description: "Freezing Drizzle", image: "sleet" },
  57: { description: "Dense Freezing Drizzle", image: "extreme-sleet" },
  61: { description: "Rain", image: "rain" },
  63: { description: "Moderate Rain", image: "moderate-rain" },
  65: { description: "Heavy Rain", image: "extreme-rain" },
  66: { description: "Freezing Rain", image: "sleet" },
  67: { description: "Heavy Freezing Rain", image: "extreme-sleet" },
  71: { description: "Snowfall", image: "snow" },
  73: { description: "Moderate Snowfall", image: "moderate-snow" },
  75: { description: "Heavy Snowfall", image: "extreme-snow" },
  77: { description: "Snow Grains", image: "snowman" },
  80: { description: "Rain Showers", image: "rain" },
  81: { description: "Moderate Rain Showers", image: "moderate-rain" },
  82: { description: "Violent Rain Showers", image: "extreme-rain" },
  85: { description: "Slight Snow Showers", image: "snow" },
  86: { description: "Heavy Snow Showers", image: "extreme-snow" },
  95: { description: "Thunderstorms", image: "thunderstorms" },
  96: {
    description: "Thunderstorms with Slight Hail/Rain",
    image: "thunderstorms-rain",
  },
  99: {
    description: "Thunderstorms with Heavy Hail/Rain",
    image: "extreme-thunderstorms-rain",
  },

  // Default/Fallback value
  [Symbol.for("unknown")]: { description: "N/A", image: "not-available" },
};

export interface CurrentWeatherType {
  temperature: number;
  temperature_max: number;
  temperature_min: number;
  weathercode: number;
  is_day: boolean;
}

export interface HourlyForecastType {
  [key: string]: any;
  time: string[];
  temperature: number[];
  precipitation_probability: number[];
  weathercode: number[];
  is_day: boolean[];
}

export interface DailyForecastType {
  time: string[];
  weathercode: number[];
  temperature_max: number[];
  temperature_min: number[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
}

interface CurrentWeatherInternalType {
  temperature: number;
  weathercode: number;
  is_day: boolean;
  time: string;
}

interface HourlyForecastInternalType {
  [key: string]: any;
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weathercode: number[];
}

interface DailyForecastInternalType {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
}

function getCurrentWeather(data: {
  current_weather: CurrentWeatherInternalType;
  daily: DailyForecastInternalType;
}) {
  const { temperature, weathercode, is_day } = data.current_weather;
  const { temperature_2m_max, temperature_2m_min } = data.daily;
  const [temperature_max] = temperature_2m_max;
  const [temperature_min] = temperature_2m_min;
  return {
    temperature,
    temperature_max,
    temperature_min,
    weathercode,
    is_day,
  };
}

function getTime(data: { current_weather: CurrentWeatherInternalType }) {
  const { time } = data.current_weather;
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  })
    .format(new Date(time))
    .replace(/\s/g, "")
    .replace(/:00/g, "");
}

function getHourlyWeather(data: {
  current_weather: CurrentWeatherInternalType;
  hourly: HourlyForecastInternalType;
  daily: DailyForecastInternalType;
}) {
  const { time: current_time } = data.current_weather;
  const { time: times } = data.hourly;
  const { sunrise, sunset } = data.daily;

  const start = times.findIndex((value) => current_time < value) - 1;
  const end = start + 24;
  var newHourlyData: HourlyForecastType = {
    time: [],
    temperature: [],
    precipitation_probability: [],
    weathercode: [],
    is_day: [],
  };

  for (const key in data.hourly) {
    if (Object.prototype.hasOwnProperty.call(data.hourly, key)) {
      if (key !== "temperature_2m") {
        newHourlyData[key] = data.hourly[key].slice(start, end);
      } else {
        newHourlyData["temperature"] = data.hourly[key].slice(start, end);
      }
    }
  }

  // we will have sunrise(today), sunset(today), sunrise(tom), sunset(tom)
  // ISO8601 format can be sorted as string to get the correct value
  const sun_status = [...sunrise.slice(0, 2), ...sunset.slice(0, 2)].sort();

  var is_sunrise = true;
  const fitted_indicies = [];
  for (const date of sun_status) {
    const idx =
      newHourlyData.time.findLastIndex((value) => {
        return date >= value;
      }) + 1;
    if (idx > 0 && idx < newHourlyData.time.length) {
      fitted_indicies.push(idx);
      newHourlyData.is_day.splice(idx, 0, true);
      newHourlyData.precipitation_probability.splice(idx, 0, -Infinity);
      newHourlyData.temperature.splice(idx, 0, -Infinity);
      newHourlyData.weathercode.splice(idx, 0, -Infinity);
      newHourlyData.time.splice(idx, 0, date);
      for (let i = idx; i < newHourlyData.time.length; i++) {
        newHourlyData.is_day[i] = is_sunrise;
      }
    }
    is_sunrise = !is_sunrise;
  }

  for (let i = 0; i < fitted_indicies[0]; i++) {
    newHourlyData.is_day[i] = !newHourlyData.is_day[fitted_indicies[0]];
  }

  newHourlyData.time = newHourlyData.time.map((value) =>
    new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    })
      .format(new Date(value))
      .replace(/\s/g, "")
      .replace(/:00/g, "")
  );

  newHourlyData.time[0] = "Now";
  newHourlyData.precipitation_probability =
    newHourlyData.precipitation_probability.map(
      (value) => Math.floor(value / 10) * 10
    );

  return newHourlyData;
}

function getDailyWeather(data: { daily: DailyForecastInternalType }) {
  const {
    time,
    weathercode,
    temperature_2m_max: temperature_max,
    temperature_2m_min: temperature_min,
    uv_index_max,
    precipitation_probability_max,
  } = data.daily;
  const new_time = time.map((value) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(value)
    )
  );

  new_time[0] = "Today";
  return {
    time: new_time,
    weathercode,
    temperature_max,
    temperature_min,
    uv_index_max: uv_index_max.map((value) => Math.round(value)),
    precipitation_probability_max: precipitation_probability_max.map(
      (value) => Math.floor(value / 10) * 10
    ),
  };
}
