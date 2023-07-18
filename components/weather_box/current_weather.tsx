import { CurrentWeatherType } from "@/app/(apis)/weather";
import { weather_conditions } from "@/app/(apis)/weather";
import WeatherImage from "./weather_image";
import Temperature from "./temperature";

function CurrentWeather(props: {
  data: CurrentWeatherType;
  place: string;
  is_celsius: boolean;
}) {
  const { temperature, temperature_max, temperature_min, weathercode, is_day } =
    props.data;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-2xl">{props.place}</div>
      <Temperature
        classname="text-7xl pl-7"
        temperature={temperature}
        is_celsius={props.is_celsius}
      />
      <div>
        <WeatherImage
          width={50}
          height={50}
          className="scale-150"
          is_day={is_day}
          weathercode={weathercode}
        />
      </div>
      <div>{weather_conditions[weathercode].description}</div>
      <div className="flex flex-row gap-x-2">
        <div className="flex flex-row">
          <p>H:</p>
          <Temperature
            classname="pl-1"
            temperature={temperature_max}
            is_celsius={props.is_celsius}
          />
        </div>
        <div className="flex flex-row">
          <p>L:</p>
          <Temperature
            classname="pl-1"
            temperature={temperature_min}
            is_celsius={props.is_celsius}
          />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
