import { CurrentWeatherType } from "@/app/(apis)/weather";

function CurrentWeather(props: { data: CurrentWeatherType; place: string }) {
  const { temperature, temperature_max, temperature_min, weathercode, is_day } =
    props.data;

  return (
    <div className="flex flex-col justify-center items-center">
      <div>{props.place}</div>
      <div>{is_day}</div>
      <div>{temperature} degree C</div>
      <div>{weathercode} image</div>
      <div>{weathercode} description</div>
      <div className="flex flex-row">
        <div className="mx-2">{temperature_max}</div>
        <div className="mx-2">{temperature_min}</div>
      </div>
    </div>
  );
}

export default CurrentWeather;
