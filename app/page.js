"use client"; // Force this page to be a client component

import MapComponent from "../components/MapComponent";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div>
      <MapComponent />
      <div className="fixed top-0 right-0 z-[10000]">
        <Toaster />
      </div>
    </div>
  );
}
