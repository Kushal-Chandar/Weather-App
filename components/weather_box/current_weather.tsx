import { CurrentWeatherType } from "@/app/(apis)/weather_api";
import getCityName from "@/app/(apis)/geocoding_api";
import { useQuery } from "@tanstack/react-query";
import Error from "../utilities/error";
import { AxiosError } from "axios";

function CurrentWeather(props: { data: CurrentWeatherType }) {
  const {
    temperature,
    temperature_max,
    temperature_min,
    weathercode,
    is_day,
    latitude,
    longitude,
  } = props.data;
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["city", { latitude, longitude }],
    queryFn: () => getCityName(latitude, longitude),
    refetchInterval: 1000 * 60 * 15, // automatically update every 15 mins
    // remove this
    refetchIntervalInBackground: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    // remove this
    staleTime: 1000 * 60 * 10, // data is made stale every 10 mins, will refetch if user on site
  });
  if (isError) {
    return <Error error={error as AxiosError} />;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <div>{data.address.city}</div>
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
