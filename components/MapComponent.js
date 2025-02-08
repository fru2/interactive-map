"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

let L;

const markers = [
  { id: 1, lat: 28.6139, lng: 77.2090, name: "Delhi" },
  { id: 2, lat: 19.0760, lng: 72.8777, name: "Mumbai" },
  { id: 3, lat: 12.9716, lng: 77.5946, name: "Bangalore" },
];

const FlyToMarker = ({ selectedMarker }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedMarker && map) {
      map.flyTo([selectedMarker.lat, selectedMarker.lng], 10, { animate: true }); 
    }
  }, [selectedMarker, map]);

  return null;
};

const MapComponent = () => {
  const [customIcon, setCustomIcon] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      L = leaflet;
      setCustomIcon(
        new L.Icon({
          iconUrl: "/location_on.svg",
          iconSize: [30, 45],
          iconAnchor: [15, 45],
          popupAnchor: [0, -40],
        })
      );
    });
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Locations</h2>
        {markers.map((marker) => (
          <button
            key={marker.id}
            className="block w-full text-left px-4 py-2 mb-2 bg-gray-700 hover:bg-gray-600 rounded"
            onClick={() => setSelectedMarker(marker)}
          >
            {marker.name}
          </button>
        ))}
      </div>

      <div className="w-3/4">
        <MapContainer
          style={{ height: "100vh", width: "100%" }}
          zoom={5}
          center={[20.5937, 78.9629]} 
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {customIcon &&
            markers.map((marker) => (
              <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
                <Popup>
                  <h3>{marker.name}</h3>
                  <p>Latitude: {marker.lat}</p>
                  <p>Longitude: {marker.lng}</p>
                </Popup>
              </Marker>
            ))}

          {selectedMarker && <FlyToMarker selectedMarker={selectedMarker} />}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
