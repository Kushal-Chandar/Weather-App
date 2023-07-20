"use client";

import getWeather from "@/app/(apis)/weather";
import { useQuery } from "@tanstack/react-query";
import CurrentWeather from "./weather_box/current_weather";
import HourlyForecast from "./weather_box/hourly_forecast";
import DailyForecast from "./weather_box/daily_forecast";
import Error from "./utilities/error";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import Loading from "./utilities/loading";
import getCityName from "@/app/(apis)/geocoding";

function WeatherBox(props: {
  placeSearched: boolean;
  place: {
    lat: number;
    lon: number;
    place: string;
  };
  is_celsius: boolean;
}) {
  const [nav, setNav] = useState({
    lat: 37.7749,
    lon: -122.4194,
  });
  const [locationEnabled, setLocationEnabled] = useState(false);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setNav({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setLocationEnabled(true);
      },
      () => {
        setLocationEnabled(false);
      }
    );
  }, []);

  const {
    data: city,
    isError: isErrorCity,
    isLoading: isLoadingCity,
    error: errorCity,
    refetch,
  } = useQuery({
    queryKey: ["city", { lat: nav.lat, lon: nav.lon }],
    queryFn: () => getCityName(nav.lat, nav.lon),
    enabled: false,
  });

  useEffect(() => {
    if (!props.placeSearched) {
      refetch();
    }
  }, [props.placeSearched, refetch, nav]);

  const { lat, lon } = props.placeSearched ? props.place : nav;

  const {
    data,
    isError: isErrorData,
    isLoading: isLoadingData,
    error: errorData,
  } = useQuery({
    queryKey: ["weather", { lat: lat, lon: lon }],
    queryFn: () => getWeather(lat, lon),
    refetchInterval: 1000 * 60 * 15, // automatically update every 15 mins
    staleTime: 1000 * 60 * 5, // data is made stale every 10 mins, will refetch if user on site
  });

  if (isErrorData || isErrorCity) {
    return <Error error={errorData as AxiosError} />;
  }
  if (isLoadingData || isLoadingCity) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <CurrentWeather
        data={data.current}
        place={props.placeSearched ? props.place.place : city.address.city}
        is_celsius={props.is_celsius}
      />
      <HourlyForecast data={data.hourly} is_celsius={props.is_celsius} />
      <DailyForecast data={data.daily} is_celsius={props.is_celsius} />
      <div className="text-sm m-5">{"LAST UPDATE: " + data.time}</div>
      {!locationEnabled && (
        <button
          className="border bg-neutral-200 text-neutral-800 w-full rounded p-1"
          onClick={() => {
            setLocationEnabled(true); // prevents rendering this button, make a new state??
          }}
          title="Click to Close"
        >
          <p className="text-xl"> ⚠ Location Disabled ⚠</p>
          <p className="text-md">
            Please allow location permission for this app to get accurate
            results.
          </p>
          <p className="text-sm hover:text-neutral-600">*Touch to close*</p>
        </button>
      )}
    </div>
  );
}

export default WeatherBox;
