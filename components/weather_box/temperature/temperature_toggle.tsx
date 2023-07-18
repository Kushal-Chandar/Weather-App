import React, { MouseEventHandler } from "react";
import Image from "next/image";

function UnitImage(props: { image: string }) {
  return (
    <Image
      src={`${props.image}.svg`}
      alt={`An image of ${props.image} unit`}
      className="scale-[200%]"
      width={50}
      height={50}
    ></Image>
  );
}

export default function TemperatureToggle(props: {
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  is_celsius: boolean;
}) {
  return (
    <div className="flex flex-row justify-normal items-center">
      <button
        title="Toggle Unit"
        onClick={props.onClick}
        className="border rounded hover:bg-blue-400 h-9 w-9 shadow overflow-hidden p-0"
      >
        <UnitImage image={props.is_celsius ? "celsius" : "fahrenheit"} />
      </button>
    </div>
  );
}
