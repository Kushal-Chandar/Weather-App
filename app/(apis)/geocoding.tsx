import axios from "axios";

export default async function getCityName(lat: number, lon: number) {
  const response = await axios.get("https://geocode.maps.co/reverse", {
    params: {
      lat: lat,
      lon: lon,
    },
  });
  return response.data;
}
