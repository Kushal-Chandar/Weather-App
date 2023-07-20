import Offline from "@/components/utilities/offline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offline",
};

export default function Page() {
  return <Offline />;
}
