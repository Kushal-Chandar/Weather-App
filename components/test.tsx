"use client";

import getWeather from "@/app/(apis)/api";
import { useQuery } from "@tanstack/react-query";

export default function Test(props: { initialData: number }) {
  const lat = 17.375;
  const long = 78.5;
  const { data, isError, isLoading } = useQuery({
    queryKey: ["weather", { lat, long }],
    queryFn: () => getWeather(lat, long),
    refetchInterval: 1000 * 60 * 5, // every 5 mins?
  });
  if (isError) {
    return <div>Something went wrong</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return <div>{JSON.stringify(data)}</div>;
}
