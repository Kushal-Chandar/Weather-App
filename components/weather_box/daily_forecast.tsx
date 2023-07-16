import { DailyForecastType } from "@/app/(apis)/weather_api";

function DailyForecast(props: { data: DailyForecastType }) {
  return (
    <table className="border-collapse border border-slate-500 table-auto mx-auto">
      <thead>
        <tr>
          <th>Day</th>
          <th>Weather Code + stuff</th>
          <th>Temperature, UV Index</th>
        </tr>
      </thead>
      <tbody key={"DailyForecastTable"}>
        {props.data.time.map((_, idx) => {
          return (
            <tr key={"DailyForecast" + idx.toString()}>
              <td
                key={"DailyForecast" + idx.toString() + "1"}
                className="border border-slate-700"
              >
                {props.data.time[idx]}
              </td>
              <td
                key={"DailyForecast" + idx.toString() + "2"}
                className="border border-slate-700"
              >
                <div className="flex gap-x-10">
                  <div>{props.data.weathercode[idx]}</div>
                  <div>{props.data.precipitation_probability_max[idx]}</div>
                </div>
              </td>
              <td
                key={"DailyForecast" + idx.toString() + "3"}
                className="border border-slate-700 "
              >
                <div className="flex gap-x-10">
                  <div className="flex-1">
                    {props.data.temperature_max[idx]}
                  </div>
                  <div className="flex-1">
                    {props.data.temperature_min[idx]}
                  </div>
                  <div className="flex-1">{props.data.uv_index_max[idx]}</div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DailyForecast;
