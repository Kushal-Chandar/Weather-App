import React from "react";
import { AxiosError } from "axios";

export default function Error(props: { error: AxiosError }) {
  return <div>{"Something went wrong " + props.error.message}</div>;
}
