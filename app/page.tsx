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
    <>
      <SearchBar setPlaceSearched={setPlaceSearched} setPlace={setPlace} />
      <WeatherBox placeSearched={placeSearched} place={place} />
    </>
  );
}
