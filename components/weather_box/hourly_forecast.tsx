import { HourlyForecastType } from "@/app/(apis)/weather";

function HourlyForecast(props: { data: HourlyForecastType }) {
  return (
    <div className="flex flex-row gap-x-5 mt-5">
      {props.data.time.map((_, idx) => {
        return (
          <li key={"HourlyForecast" + idx.toString()} className="list-none">
            <div>{props.data.time[idx]} </div>
            <div>
              {props.data.weathercode[idx] != -Infinity
                ? props.data.weathercode[idx]
                : ""}
              {" image"}
            </div>
            <div>
              {props.data.precipitation_probability[idx] != -Infinity
                ? props.data.precipitation_probability[idx]
                : ""}
            </div>
            <div>
              {props.data.temperature[idx] != -Infinity
                ? props.data.temperature[idx] + "C"
                : props.data.is_day[idx]
                ? "Sunrise"
                : "Sunset"}
            </div>
            <div>{props.data.is_day[idx] ? 1 : 0}</div>
          </li>
        );
      })}
    </div>
  );
}

export default HourlyForecast;
