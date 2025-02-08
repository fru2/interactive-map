"use client"; // Force this page to be a client component

import MapComponent from "../components/MapComponent";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Interactive Map with Custom Markers</h1>
      <MapComponent />
    </div>
  );
}
