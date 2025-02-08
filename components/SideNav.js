"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SideNav = ({ markers, setSelectedMarker, searchLocation, removeMarker }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [nameSortAsc, setNameSortAsc] = useState(null);
  const [dateSortAsc, setDateSortAsc] = useState(true);

  const sortedMarkers = markers.slice().sort((a, b) => {
    if (nameSortAsc !== null) {
      return nameSortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return dateSortAsc ? a.id - b.id : b.id - a.id;
  });

  return (
    <div className="w-1/4 min-w-60 max-w-80 bg-[#1b1b1b] text-white p-4 max-h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Locations</h2>
      
      <span className="w-full block text-center">Sort by:</span>
      <div className="flex space-x-2 mb-4 w-full">
        <Button variant="outline" className="w-full"
          onClick={() => {
            setNameSortAsc(nameSortAsc === null ? true : !nameSortAsc);
            setDateSortAsc(null);
          }}
        >
          Name {nameSortAsc ? "▲" : "▼"}
        </Button>

        <Button variant="outline" className="w-full"
          onClick={() => {
            setDateSortAsc(dateSortAsc === null ? true : !dateSortAsc);
            setNameSortAsc(null);
          }}
        >
          Newest {dateSortAsc ? "▲" : "▼"}
        </Button>
      </div>
      <div className="space-y-2">
        {sortedMarkers.map((marker) => (
          <div key={marker.id} className="flex justify-between items-center border p-2 rounded hover:bg-[#27272a] duration-150">
            <Button variant="ghost" className="w-full justify-start text-white truncate" onClick={() => setSelectedMarker(marker)}>
              {marker.name}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => removeMarker(marker.id)}>
              ✖
            </Button>
          </div>
        ))}
      </div>
      <div className="flex mb-4 flex-col gap-2 mt-16">
        <Input type="text" placeholder="Search location..." className="w-full" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Button onClick={() => searchLocation(searchQuery)}>Add Marker</Button>
      </div>
    </div>
  );
};

export default SideNav;

