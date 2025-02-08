"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import githubLogo from "@/public/github.svg";
import MapComponent from "../components/MapComponent";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <MapComponent />
      <div className="fixed top-0 right-0 z-[10000]">
        <Toaster />
      </div>

      {/* GitHub Button */}
      <Button variant="outline" className="fixed top-3 right-3 z-[999] w-50 rounded-lg bg-[#27272a] text-zinc-200">
        <a href="https://github.com/fru2" target="_blank" rel="noopener noreferrer" className="flex gap-2">
          <Image src={githubLogo} alt="GitHub" width={20} height={20} /> GitHub
        </a>
      </Button>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-[999] p-3 rounded-full bg-[#27272a] text-white shadow-md hover:bg-[#313135] transition-all md:hidden"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
}
