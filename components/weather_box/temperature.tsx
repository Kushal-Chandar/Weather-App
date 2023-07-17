import React from "react";
import TemperateUnit from "./temperature/temperature_unit";
import { twMerge } from "tailwind-merge";

export default function Temperature(props: {
  temperature: number;
  is_celsius: boolean;
  className?: string;
}) {
  const temperature = Math.round(props.temperature);
  return (
    <div className={twMerge(`flex flex-row gap-x-2`, props.className)}>
      <p>
        {props.is_celsius
          ? temperature
          : Math.round((temperature * 9) / 5) + 32}
      </p>
      <TemperateUnit is_celsius={props.is_celsius} />
    </div>
  );
}
