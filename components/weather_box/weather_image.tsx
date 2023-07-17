import React from "react";
import Image from "next/image";
import { weather_conditions } from "@/app/(apis)/weather";

export default function WeatherImage(props: {
  is_day?: boolean;
  weathercode: number;
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
  console.log(imagePath());
  return (
    <Image
      src={imagePath()}
      alt={weather_conditions[props.weathercode].description}
      onError={() => {
        console.log("couldn't load image");
      }}
      width={100}
      height={100}
    ></Image>
  );
}
