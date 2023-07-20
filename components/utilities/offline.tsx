import Image from "next/image";

export default function Offline() {
  return (
    <div className="flex flex-col h-screen items-center">
      <div className="flex flex-col items-center justify-center bg-cyan-600 max-w-md shadow-md rounded-lg m-auto p-6 w-screen">
        <Image
          src={"/offline.svg"}
          alt={"App Offline"}
          width={100}
          height={100}
          className="my-2"
        ></Image>
        <p>App Offline.</p>
        <p>No Internet Connection.</p>
      </div>
    </div>
  );
}
