import { CurrentWeatherType } from "@/app/(apis)/weather";
import { weather_conditions } from "@/app/(apis)/weather";
import WeatherImage from "./weather_image";
import Temperature from "./temperature";

function CurrentWeather(props: { data: CurrentWeatherType; place: string }) {
  const { temperature, temperature_max, temperature_min, weathercode, is_day } =
    props.data;

  return (
    <div className="flex flex-col justify-center items-center">
      <div>{props.place}</div>
      <Temperature
        className="ml-2.5"
        temperature={temperature}
        is_celsius={true}
      />
      <div>
        <WeatherImage is_day={is_day} weathercode={weathercode} />
      </div>
      <div>{weather_conditions[weathercode].description}</div>
      <div className="flex flex-row justify-center items-center ml-2.5">
        <p className="pr-1">H:</p>
        <Temperature temperature={temperature_max} is_celsius={true} />
        <p className="pr-1">L:</p>
        <Temperature temperature={temperature_max} is_celsius={true} />
      </div>
    </div>
  );
}

export default CurrentWeather;
