"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MoonCanvas = dynamic(() => import("@/components/MoonCanvas"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

import MoonQuakeFilter from "@/components/MoonQuakeFilter";
import Menu from "@/components/Menu";

export default function Home() {
    const [showWorldAxes, setShowWorldAxes] = useState(false);
     const [showLatitudeLongitude, setShowLatitudeLongitude] = useState(false);
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
<MoonCanvas showWorldAxes={showWorldAxes} showLatitudeLongitude={showLatitudeLongitude}/>
        <MoonQuakeFilter />
        <Menu
          showWorldAxes={showWorldAxes}
          onToggleWorldAxes={() => setShowWorldAxes((prev) => !prev)}
          showLatitudeLongitude={showLatitudeLongitude}
          onToggleLatitudeLongitude={() => setShowLatitudeLongitude((prev) => !prev)}
        />
      </div>
    </>
  );
}
