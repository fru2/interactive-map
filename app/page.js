"use client"; // Force this page to be a client component
import { Button } from "@/components/ui/button";
import Image from "next/image";
import githubLogo from "@/public/github.svg";

import MapComponent from "../components/MapComponent";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <div>
      <MapComponent />
      <div className="fixed top-0 right-0 z-[10000]">
        <Toaster />
      </div>

      <Button variant="outline" className="fixed top-3 right-3 z-[999] w-50 rounded-lg bg-[#27272a] text-zinc-200">
        <a href="https://github.com/fru2" target="_blank" rel="noopener noreferrer" className="flex gap-2">
          <Image src={githubLogo} alt="GitHub" width={20} height={20} /> GitHub
        </a>
      </Button>
    </div>
  );
}
