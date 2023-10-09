"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import Starfield from "@/components/Starfield";
import Link from "next/link";

// Component to load and display the first asteroid model
const Asteroid_1 = () => {
  const model = useGLTF("/asteroid_1.glb");
  const meshRef = useRef<THREE.Object3D>(null);

  // Render loop to rotate the asteroid
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001; // Rotate around X-axis
      meshRef.current.rotation.y += 0.005; // Rotate around Y-axis
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={model.scene}
      scale={1.5}
      position={[1200, 205, -800]}
    />
  );
};

const Asteroid_2 = () => {
  const model = useGLTF("/asteroid_2.glb");
  const meshRef = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005; // Rotate around Y-axis
      meshRef.current.rotation.z += 0.002; // Rotate around Z-axis
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={model.scene}
      scale={1250}
      position={[-4000, 700, 0]}
    />
  );
};

const Among_Us_Yellow = () => {
  const model = useGLTF("/among_us_yellow.glb");
  const meshRef = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003; // Rotate around X-axis
      meshRef.current.rotation.y += 0.001; // Rotate around X-axis
      meshRef.current.rotation.z += 0.002; // Rotate around Z-axis
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={model.scene}
      scale={500}
      position={[-2000, 0, 1500]}
    />
  );
};

export default function About() {
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
          <Among_Us_Yellow />
          <Starfield />
        </Canvas>
        <div className="absolute mt-[6rem] flex max-w-screen-2xl justify-center bg-transparent backdrop-blur-[2.5px] border border-slate-300 border-opacity-20 mx-auto p-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              What is Lunar Quake?
            </h2>

            <p className="mb-6">
              Project Lunar Quake processes data collected by lunar seismometers
              from the Apollo 11, 12 and 14-16 missions, presented as a publicly
              accessible interactive web app. The data is visualized as a 3D
              model, with circular markers identifying seismic activity and
              filters based on time, spatial, and visual components which allow
              users to explore both wide and narrow ranges of lunar seismic
              activity. The web page also includes the background on the lunar
              seismometers and their history. Through this web app, we hope to
              provide everyday citizens and other interested parties with an
              easy way to learn more about lunar activity, specific seismic
              events, and find a connection to the moon they see every day.
            </p>

            <h2 className="text-2xl font-semibold mb-4">
              The team behind Lunar Quake:
            </h2>

            <p className="mb-6">
              - Rafi Khan &lt;<Link href={"mailto:rafi@rafikhan.io"}>rafi@rafikhan.io</Link>&gt;: Data Processing
            </p>

            <p className="mb-6">
              - Alif Chowdhury &lt;<Link href={"mailto:chowdhury.alif@gmail.com"}>chowdhury.alif@gmail.com</Link>&gt;:
              Research Anaylyst, Data Processing
            </p>

            <p className="mb-6">
              - Ximing Yu: Data modelling and API integration.
            </p>

            <p className="mb-6">- Mumtahin Farabi &lt;<Link href={"mailto:mfarabi619@gmail.com"}>mfarabi619@gmail.com</Link>&gt;: Front-End Developer</p>

            <h2 className="text-2xl font-semibold mb-4">Links</h2>

            <p className="mb-6">
            - Github Project: https://github.com/MFarabi619/LunarQuake - Live
            </p>

            <p className="mb-6">
            - Demo Link: https://lunar-quake.vercel.app/ - Slide Deck:
            </p>

            <p className="mb-6">
            - https://github.com/MFarabi619/LunarQuake/blob/main/lunar%20quake.pdf
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
