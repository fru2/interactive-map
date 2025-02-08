"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useMap } from "react-leaflet";
import { useToast } from "@/hooks/use-toast";
import SideNav from "@/components/SideNav";
import { fetchLocation } from "@/utils/api";
import "leaflet/dist/leaflet.css";
import LocationDetails from "./LocationDetails";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

let L;

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
  const { toast } = useToast();
  const [customIcon, setCustomIcon] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      L = leaflet;
      setCustomIcon(
        new L.Icon({
          iconUrl: "/location_pin.svg",
          iconSize: [30, 45],
          iconAnchor: [15, 45],
          popupAnchor: [0, -40],
        })
      );
    });

    const savedMarkers = localStorage.getItem("markers");
    if (savedMarkers) {
      setMarkers(JSON.parse(savedMarkers));
    } else {
      import("@/data/markers.json").then((data) => {
        setMarkers(data.default);
        localStorage.setItem("markers", JSON.stringify(data.default));
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("markers", JSON.stringify(markers));
  }, [markers]);

  const searchLocation = async (query) => {
    const newMarker = await fetchLocation(query, toast);
    if (newMarker) {
      setMarkers((prev) => [...prev, newMarker]);
      setSelectedMarker(newMarker);
    }
  };

  const removeMarker = (id) => {
    setMarkers((prev) => prev.filter((marker) => marker.id !== id));
  };

  return (
    <div className="flex h-screen">
      <SideNav markers={markers} setSelectedMarker={setSelectedMarker} searchLocation={searchLocation} removeMarker={removeMarker} />
      <div className="w-full">
        <MapContainer style={{ height: "100vh", width: "100%", borderRadius: "0.8rem", borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }} zoom={5} center={[20.5937, 78.9629]}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          {customIcon &&
            markers.map((marker) => (
              <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
                <Popup minWidth={600}>
                  <LocationDetails name={marker.name} lat={marker.lat} long={marker.lng} />
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
