import React from "react";

export default function Temperature(props: {
  temperature: number;
  is_celsius: boolean;
  classname?: string;
}) {
  const temperature = Math.round(props.temperature);
  return (
    <div>
      <p className={props.classname}>
        {props.is_celsius
          ? temperature
          : Math.round((temperature * 9) / 5) + 32}
        °
      </p>
    </div>
  );
}
