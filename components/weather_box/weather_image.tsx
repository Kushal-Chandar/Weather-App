import React from "react";
import Image from "next/image";
import { weather_conditions } from "@/app/(apis)/weather";

export default function WeatherImage(props: {
  is_day?: boolean;
  weathercode: number;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  const imagePath = () => {
    var fixed_path: string = `/weather-icons/${
      weather_conditions[props.weathercode].image
    }`;
    if (props.is_day !== undefined) {
      fixed_path += `${props.is_day ? "-day" : "-night"}`;
    }
    return fixed_path + ".svg";
  };
  return (
    <Image
      src={imagePath()}
      alt={weather_conditions[props.weathercode].description}
      className={props.className}
      width={props.width}
      height={props.height}
      priority={props.priority}
    ></Image>
  );
}
