import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Image
        src={`tail-spin.svg`}
        alt={`Image of tail-spin`}
        className="scale-150 m-10"
        width={27}
        height={27}
      ></Image>
    </div>
  );
}
