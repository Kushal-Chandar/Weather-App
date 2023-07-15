"use client";

import getWeather from "@/app/(apis)/api";
import { useQuery } from "@tanstack/react-query";
import {
  CurrentWeather,
  HourlyForecast,
  DailyForecast,
} from "@/app/(apis)/api";

interface WeatherBoxProps {
  initialData: {
    current: CurrentWeather;
    hourly: HourlyForecast;
    daily: DailyForecast;
  };
}

const WeatherBox: React.FC<WeatherBoxProps> = ({ initialData }) => {
  const lat = 17.375;
  const long = 78.5;
  const { data, isError, isLoading } = useQuery({
    queryKey: ["weather", { lat, long }],
    queryFn: () => getWeather(lat, long),
    initialData: initialData,
    // refetchInterval: 1000 * 60 * 5, // every 5 mins?
  });
  if (isError) {
    return <div>Something went wrong</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <p>Working?</p>
      <div>Current: {JSON.stringify(data.current)}</div>
      <div>Hourly: {JSON.stringify(data.hourly)}</div>
      <div>Daily: {JSON.stringify(data.daily)}</div>
    </>
  );
};

export default WeatherBox;
