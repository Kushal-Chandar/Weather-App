"use client";

import WeatherBox from "@/components/weather_box";
import SearchBar from "@/components/search_bar";
import { useState } from "react";

export default function App() {
  const [placeSearched, setPlaceSearched] = useState(false);
  const [place, setPlace] = useState({
    lat: 37.7749,
    lon: -122.4194,
    place: "",
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue-300 max-w-md shadow-md rounded-lg mx-auto p-6">
        <SearchBar setPlaceSearched={setPlaceSearched} setPlace={setPlace} />
        <WeatherBox placeSearched={placeSearched} place={place} />
      </div>
    </div>
  );
}
