import React from "react";
import Image from "next/image";

export default function TemperateUnit(props: { is_celsius: boolean }) {
  return (
    <Image
      src={props.is_celsius ? "celsius.svg" : "fahrenheit.svg"}
      alt={
        "An image of " + (props.is_celsius ? "celsius" : "fahrenheit") + "unit"
      }
      onError={() => {
        console.log("couldn't load image");
      }}
      className="-m-5"
      width={75}
      height={75}
    ></Image>
  );
}
