import axios from "axios";

export default async function getSearchOptions(name: string, count?: number) {
  var response;
  if (name.length >= 2) {
    response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: name,
          count: count ? count : 100,
        },
      }
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } else {
    response = {
      data: {},
    };
  }
  return response.data;
}
