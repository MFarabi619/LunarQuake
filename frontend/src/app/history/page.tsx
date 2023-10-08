"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import Starfield from "@/components/Starfield";
import Image from "next/image";

// Component to load and display the first asteroid model
const Asteroid_1 = () => {
  const model = useGLTF("/asteroid_1.glb");
   const meshRef = useRef<THREE.Object3D>(null);

  // Use the render loop to rotate the asteroid
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001; // Rotate around X-axis
      meshRef.current.rotation.y += 0.005; // Rotate around Y-axis
    }
  });

  return <primitive ref={meshRef} object={model.scene} scale={1.5} position={[1200, 205, -800]} />;
};

const Asteroid_2 = () => {
  const model = useGLTF("/asteroid_2.glb");
   const meshRef = useRef<THREE.Object3D>(null);

  // Use the render loop to rotate the asteroid
  useFrame(() => {
    if (meshRef.current) {
        meshRef.current.rotation.y += 0.005; // Rotate around Y-axis
        meshRef.current.rotation.z += 0.002; // Rotate around Z-axis
    }
  });

  return <primitive ref={meshRef} object={model.scene} scale={1250} position={[-4000, 700, 0]} />;
};


export default function History() {
  return (
    <>
      <div className="relative flex flex-col justify-center items-center h-screen">
        <Canvas camera={{ position: 1000, fov: 75, near: 0.1, far: 8000 }}>
          <OrbitControls />
          <ambientLight intensity={3} />
          <directionalLight intensity={3} position={[2, 2, 2]} />
          <pointLight intensity={0.5} position={[-5, 5, -5]} />
          <hemisphereLight intensity={0.5} />
          <Asteroid_1 />
          <Asteroid_2 />
          <Starfield />
        </Canvas>
        <div className="absolute mt-[6rem] flex max-w-screen-2xl justify-center bg-transparent backdrop-blur-[2.5px] border border-slate-300 border-opacity-20 mx-auto p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Moon&apos;s Mysteries: Seismic Stories
            </h2>
            <p className="mb-6">
              The Apollo missions, apart from their primary goal of landing
              humans on the Moon, undertook an exceptional scientific endeavor.
              Instruments known as Passive Seismic Experiments (PSE) were
              carefully positioned by astronauts across various lunar
              landscapes. Designed to persevere in the harsh conditions of
              space, these instruments diligently recorded data for over a year
              after the Apollo crew left the lunar surface.
            </p>
            <p className="mb-6">
              Two distinct versions of the PSE were deployed: the Apollo 11
              mission saw the setup of the Early Apollo Surface Experiments
              Package (EASEP) units, showcased in Figure 1. In contrast, the
              Apollo 12, 14, 15, and 16 missions favored the advanced Apollo
              Lunar Surface Experiments Package (ALSEP) units, depicted in
              Figure 2. The heart of these instruments was the seismometer,
              which captured moonquakes, meteoritic impacts, and even man-made
              disturbances. This precious data, sent back to Earth, offers
              invaluable insights even today, presenting a vivid account of the
              Moon&apos;s geological activities.
            </p>
            <p className="mb-6">
              Delving into NASA&apos;s Planetary Data System reveals an updated
              lunar seismic dataset, complete with details such as date, time,
              coordinates, magnitude, and depth. Intriguingly, many moonquakes
              were found to be synchronized with the Moon&apos;s day-night
              cycle, particularly during sunset and sunrise. The rapid
              temperature shifts during these transitions, especially near the
              terminator line, seem to play a role. Moreover, a significant
              portion of these quakes appear to align with the Moon&apos;s known
              fault lines, hinting at an active lunar geology.
            </p>
            <div className="flex justify-evenly mt-[6rem]">
              <figure>
                <Image
                  src="/pse_apparatus_1.jpg"
                  alt="Image of first PSE apparatus"
                  width={445}
                  height={800}
                />
                <figcaption className="text-sm italic mt-2">
                  Figure 1: EASEP Units Deployed by Apollo 11
                </figcaption>
              </figure>
              <figure>
                <Image
                  src="/pse_apparatus_2.jpg"
                  alt="Image of covered PSE apparatus for Apollo 12, 13, 14, and 15"
                  width={350}
                  height={800}
                />
                <figcaption className="text-sm italic mt-2">
                  Figure 2: Advanced ALSEP Units Positioned in Later Apollo
                  Missions
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
