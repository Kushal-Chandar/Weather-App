import { AxiosError } from "axios";

export default function Error(props: { error: AxiosError }) {
  return (
    <div className="flex flex-col justify-center items-center">
      {"Something went wrong " + props.error.message}
    </div>
  );
}
