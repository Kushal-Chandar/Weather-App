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
  return response.data;
  // setTimeout(() => {}, 1000);
  // return 100;
}
