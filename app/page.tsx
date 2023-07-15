import Test from "@/components/test";
import getWeather from "./(apis)/api";

export default async function App() {
  const initialData = await getWeather(12, 12);
  return <Test initialData={initialData} />;
}
