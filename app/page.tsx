"use client";

import WeatherBox from "@/components/weather_box";
import SearchBar from "@/components/search_bar";
import { useEffect, useState } from "react";
import TemperatureToggle from "@/components/weather_box/temperature/temperature_toggle";

export default function App() {
  const [placeSearched, setPlaceSearched] = useState(false);
  const [unitCelsius, setUnitCelsius] = useState(true);
  const [pwaPrompt, setPWAPrompt] = useState(true);
  const [place, setPlace] = useState({
    lat: 37.7749,
    lon: -122.4194,
    place: "",
  });

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setPWAPrompt(false);
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-cyan-600 max-w-md shadow-md rounded-lg mx-auto p-6 w-screen">
        <div className="flex flex-row justify-center items-center w-full gap-x-1">
          <SearchBar setPlaceSearched={setPlaceSearched} setPlace={setPlace} />
          <TemperatureToggle
            onClick={() => setUnitCelsius(!unitCelsius)}
            is_celsius={unitCelsius}
          />
        </div>
        <WeatherBox
          placeSearched={placeSearched}
          place={place}
          is_celsius={unitCelsius}
        />
        {pwaPrompt && (
          <button
            className="max-w-md h-full w-full bg-cyan-900 shadow-md rounded-lg p-6 flex flex-col justify-normal items-center gap-y-3"
            onClick={() => {
              setPWAPrompt(false);
            }}
          >
            <div className="rounded mx-auto border bg-neutral-200 text-neutral-800 p-1">
              Install to your Desktop / Home screen
            </div>
            <p className="text-sm text-center">
              This is a PWA (Progressive Web Application). You can add it to
              your desktop or homescreen to run it like a native application.
            </p>
            <p className="text-xs hover:text-neutral-400">*Touch to close*</p>
          </button>
        )}
      </div>
    </div>
  );
}
