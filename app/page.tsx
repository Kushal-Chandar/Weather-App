import WeatherBox from "@/components/weather_box";
import SearchBar from "@/components/search_bar";

export default async function App() {
  return (
    <>
      <SearchBar />
      <WeatherBox />
    </>
  );
}
