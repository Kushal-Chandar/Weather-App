import { DailyForecastType } from "@/app/(apis)/weather";
import WeatherImage from "./weather_image";
import Temperature from "./temperature";
import { BsCalendar3 } from "react-icons/bs";
import Image from "next/image";

function DailyForecast(props: {
  data: DailyForecastType;
  is_celsius: boolean;
}) {
  const {
    time,
    weathercode,
    temperature_max,
    temperature_min,
    uv_index_max,
    precipitation_probability_max,
  } = props.data;
  return (
    <div className="mt-5 max-w-sm w-full p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg drop-shadow-lg">
      <p className="-mt-2 pb-2 text-xs text-neutral-400">
        <BsCalendar3 className="inline-block -mt-0.5 mr-1" /> {time.length}
        -DAY FORECAST
      </p>
      <table className="border-collapse table-auto w-full">
        <thead className="hidden">
          <tr>
            <th>Day</th>
            <th>Weather Code + stuff</th>
            <th>Temperature, UV Index</th>
          </tr>
        </thead>
        <tbody key={"DailyForecastTable"}>
          {time.map((_, idx) => {
            return (
              <tr
                key={"DailyForecast" + idx.toString()}
                className="border-t border-collapse"
              >
                <td
                  key={"DailyForecast" + idx.toString() + "1"}
                  className="h-11"
                >
                  {time[idx]}
                </td>
                <td key={"DailyForecast" + idx.toString() + "2"}>
                  <div className="flex flex-col justify-center items-center -mt-0.5">
                    <WeatherImage
                      width={24}
                      height={24}
                      className="scale-150"
                      weathercode={weathercode[idx]}
                    />
                    <div className="text-xs">
                      {precipitation_probability_max[idx] != -Infinity &&
                      precipitation_probability_max[idx] != 0
                        ? precipitation_probability_max[idx] + "%"
                        : ""}
                    </div>
                  </div>
                </td>
                <td
                  key={"DailyForecast" + idx.toString() + "3"}
                  className="flex flex-row m-2 justify-center items-center"
                >
                  <div className="flex flex-row mr-6">
                    <p>H:</p>
                    <Temperature
                      classname="pl-1"
                      temperature={temperature_max[idx]}
                      is_celsius={props.is_celsius}
                    />
                  </div>
                  <div className="flex flex-row -mr-6">
                    <p>L:</p>
                    <Temperature
                      classname="pl-1"
                      temperature={temperature_min[idx]}
                      is_celsius={props.is_celsius}
                    />
                  </div>
                </td>
                <td>
                  <Image
                    src={`uv-index-${uv_index_max[idx]}.svg`}
                    alt={`Image of uv-index-${uv_index_max[idx]}`}
                    className="scale-150"
                    width={27}
                    height={27}
                  ></Image>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DailyForecast;
