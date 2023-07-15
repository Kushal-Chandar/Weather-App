import getWeather from "./(apis)/api";
import WeatherBox from "@/components/weather_box";

export default async function App() {
  const initialData = await getWeather(12, 12);
  return <WeatherBox initialData={initialData} />;
}
