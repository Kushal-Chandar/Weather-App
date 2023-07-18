import { HourlyForecastType } from "@/app/(apis)/weather";
import WeatherImage from "./weather_image";
import Temperature from "./temperature";
import Image from "next/image";
import { useRef, useEffect } from "react";
import { LuClock9 } from "react-icons/lu";

export function useHorizontalScroll() {
  const ulRef = useRef<HTMLUListElement | null>(null);
  useEffect(() => {
    const ul = ulRef.current;
    if (ul) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        ul.scrollTo({
          left: ul.scrollLeft + e.deltaY,
          behavior: "auto",
        });
      };
      ul.addEventListener("wheel", onWheel);
      return () => ul.removeEventListener("wheel", onWheel);
    }
  }, []);
  return ulRef;
}

function HourlyForecast(props: {
  data: HourlyForecastType;
  is_celsius: boolean;
}) {
  const containerRef = useHorizontalScroll();

  const { time, temperature, precipitation_probability, weathercode, is_day } =
    props.data;
  return (
    <div className="mt-5 max-w-sm w-full p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
      <p className="-mt-2 pb-2 text-xs text-neutral-400">
        <LuClock9 className="inline-block -mt-0.5" /> HOURLY FORECAST
      </p>
      <ul
        ref={containerRef}
        className="flex flex-row gap-x-5 items-center overflow-x-auto list-none scrollbar"
      >
        {time.map((_, idx) => {
          return (
            <li
              key={"HourlyForecast" + idx.toString()}
              className="flex flex-col justify-evenly items-center text-sm"
            >
              <div className="">{time[idx]}</div>
              <div>
                <div>
                  {weathercode[idx] != -Infinity ? (
                    <WeatherImage
                      width={25}
                      height={25}
                      className="scale-150 pl-.5"
                      is_day={is_day[idx]}
                      weathercode={weathercode[idx]}
                    />
                  ) : (
                    <Image
                      src={is_day ? "sunrise.svg" : "sunset.svg"}
                      alt={"Image of " + (is_day ? "sunrise" : "sunset")}
                      className="scale-[1.75] my-1.5"
                      width={27}
                      height={27}
                    ></Image>
                  )}
                </div>
              </div>
              <div className="text-xs">
                {precipitation_probability[idx] != -Infinity &&
                precipitation_probability[idx] != 0
                  ? precipitation_probability[idx] + "%"
                  : ""}
              </div>
              <div className="text-md">
                {temperature[idx] != -Infinity ? (
                  <Temperature
                    temperature={temperature[idx]}
                    is_celsius={props.is_celsius}
                  />
                ) : is_day[idx] ? (
                  "Sunrise"
                ) : (
                  "Sunset"
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HourlyForecast;
