"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChevronUp, ChevronDown, Map, MapPin } from "lucide-react";
import Image from "next/image";

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
    <div className="w-full sm:w-1/4 sm:min-w-60 sm:max-w-80 bg-[#1b1b1b] text-zinc-200 p-4 h-fit sm:h-screen max-h-screen relative flex flex-col justify-between">
      <div>
        <div className="flex gap-2 sm:justify-center items-center mb-4">
          <Map />
          <h2 className="text-xl font-extralight">Lookal</h2>
        </div>
        <span className="w-full block text-center text-secondary text-sm">Sort by:</span>
        <div className="flex space-x-2 mt-2 mb-4 w-full">
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-[#27272a] hover:bg-[#313135]"
            onClick={() => {
              setNameSortAsc(nameSortAsc === null ? true : !nameSortAsc);
              setDateSortAsc(null);
            }}
          >
            Name {nameSortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full bg-[#27272a] hover:bg-[#313135]"
            onClick={() => {
              setDateSortAsc(dateSortAsc === null ? true : !dateSortAsc);
              setNameSortAsc(null);
            }}
          >
            Newest {dateSortAsc ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
        </div>

        {/* Scrollable Marker List */}
        <div className="space-y-2 overflow-y-auto sm:h-[calc(100vh-250px)] mr-[-0.5rem] pr-2">
          {sortedMarkers.map((marker) => (
            <div key={marker.id} className="flex justify-between items-center border sm:p-2 rounded hover:bg-[#27272a] duration-150">

              <Button
                variant="ghost"
                className="w-full justify-start text-zinc-200 truncate"
                onClick={() => setSelectedMarker(marker)}
              >
                {marker.name}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeMarker(marker.id)}
              >
                ✖
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Search Input & Add Marker Button */}
      <div className="flex mb-4 mt-4 flex-col gap-2">
        <Input
          type="text"
          placeholder="Search location..."
          className="w-full border-zinc-600 text-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button size="sm" onClick={() => searchLocation(searchQuery)}>Add Marker</Button>
      </div>
    </div>

  );
};

export default SideNav;

