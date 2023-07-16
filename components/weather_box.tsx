"use client";

import getWeather from "@/app/(apis)/weather_api";
import { useQuery } from "@tanstack/react-query";
import CurrentWeather from "./weather_box/current_weather";
import HourlyForecast from "./weather_box/hourly_forecast";
import DailyForecast from "./weather_box/daily_forecast";
import Error from "./utilities/error";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";

function WeatherBox() {
  const [coords, setCoords] = useState({ lat: 37.7749, lon: -122.4194 });

  try {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  } catch (error) {
    console.log(error);
    console.log("Using fall back location: " + coords.lat + ", " + coords.lon);
  }

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["weather", { lat: coords.lat, lon: coords.lon }],
    queryFn: () => getWeather(coords.lat, coords.lon),
    refetchInterval: 1000 * 60 * 15, // automatically update every 15 mins
    // remove this
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // remove this
    staleTime: 1000 * 60 * 10, // data is made stale every 10 mins, will refetch if user on site
  });
  if (isError) {
    return <Error error={error as AxiosError} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <CurrentWeather data={data.current} />
      <HourlyForecast data={data.hourly} />
      <DailyForecast data={data.daily} />
    </>
  );
}

export default WeatherBox;
