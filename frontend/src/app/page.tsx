"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const MoonCanvas = dynamic(() => import("@/components/MoonCanvas"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

import MoonQuakeFilter from "@/components/MoonQuakeFilter";
import Menu from "@/components/Menu";
import DataTable from "@/components/DataTable";

export default function Home() {
  const [showWorldAxes, setShowWorldAxes] = useState(false);
  const [showLatitudeLongitude, setShowLatitudeLongitude] = useState(false);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(3);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(3);
  const [hemisphereLightIntensity, setHemisphereLightIntensity] = useState(0.5);
  const [pointLightIntensity, setPointLightIntensity] = useState(0.5);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen">
        <MoonCanvas
          showWorldAxes={showWorldAxes}
          showLatitudeLongitude={showLatitudeLongitude}
          directionalLightIntensity={directionalLightIntensity}
          ambientLightIntensity={ambientLightIntensity}
          hemisphereLightIntensity={hemisphereLightIntensity}
          pointLightIntensity={pointLightIntensity}
        />
        <MoonQuakeFilter />
        <Menu
          showWorldAxes={showWorldAxes}
          onToggleWorldAxes={() => setShowWorldAxes((prev) => !prev)}
          showLatitudeLongitude={showLatitudeLongitude}
          onToggleLatitudeLongitude={() =>
            setShowLatitudeLongitude((prev) => !prev)
          }
          setDirectionalLightIntensity={setDirectionalLightIntensity}
          directionalLightIntensity={directionalLightIntensity}
          setAmbientLightIntensity={setAmbientLightIntensity}
          ambientLightIntensity={ambientLightIntensity}
          setHemisphereLightIntensity={setHemisphereLightIntensity}
          hemisphereLightIntensity={hemisphereLightIntensity}
          setPointLightIntensity={setPointLightIntensity}
          pointLightIntensity={pointLightIntensity}
        />
<DataTable/>
      </div>
    </>
  );
}
