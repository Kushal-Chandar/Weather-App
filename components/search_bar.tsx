"use client";

import { AsyncPaginate } from "react-select-async-paginate";
import { Dispatch, SetStateAction } from "react";
import getSearchOptions from "@/app/(apis)/search_autocomplete";

export default function SearchBar(props: {
  setPlaceSearched: Dispatch<SetStateAction<boolean>>;
  setPlace: Dispatch<
    SetStateAction<{ lat: number; lon: number; place: string }>
  >;
}) {
  const onChange = (searchText: any) => {
    props.setPlaceSearched(true);
    props.setPlace(searchText.value);
  };

  const useSearchOptions = async (input: string) => {
    const response = await getSearchOptions(input);
    return {
      options: response.results.map(
        (location: {
          latitude: string;
          longitude: string;
          name: string;
          admin1: string;
          country_code: string;
        }) => {
          return {
            value: {
              lat: location.latitude,
              lon: location.longitude,
              place: `${location.name ? location.name : location.admin1}`,
            },
            label: `${location.name}${
              location.admin1 ? ", " + location.admin1 : ""
            }${location.country_code ? ", " + location.country_code : ""}`,
          };
        }
      ),
    };
  };

  return (
    <AsyncPaginate
      className="w-3/4"
      placeholder="Search location..."
      loadOptions={useSearchOptions}
      debounceTimeout={100}
      value={""}
      onChange={onChange}
    />
  );
}
