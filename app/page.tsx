"use client";

import WeatherBox from "@/components/weather_box";
import SearchBar from "@/components/search_bar";
import { useState } from "react";
import TemperatureToggle from "@/components/weather_box/temperature/temperature_toggle";

export default function App() {
  const [placeSearched, setPlaceSearched] = useState(false);
  const [unitCelsius, setUnitCelcius] = useState(true);
  const [place, setPlace] = useState({
    lat: 37.7749,
    lon: -122.4194,
    place: "",
  });
  return (
    <div className="flex flex-col">
      <div className="bg-cyan-600 max-w-md shadow-md rounded-lg mx-auto p-6 w-screen">
        <div className="flex flex-row justify-center items-center w-full gap-x-1">
          <SearchBar setPlaceSearched={setPlaceSearched} setPlace={setPlace} />
          <TemperatureToggle
            onClick={() => setUnitCelcius(!unitCelsius)}
            is_celsius={unitCelsius}
          />
        </div>
        <WeatherBox
          placeSearched={placeSearched}
          place={place}
          is_celsius={unitCelsius}
        />
      </div>
    </div>
  );
}
