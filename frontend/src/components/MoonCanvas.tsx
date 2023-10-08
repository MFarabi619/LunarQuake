"use client";
import { useState, useEffect } from "react";
import { AxesHelper } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Starfield from "@/components/Starfield";

// Defined constant for the radius of the moon model
const MOON_MODEL_RADIUS = 500.6653264873212;

// Component to load and display the moon model
const Moon = () => {
  const model = useGLTF("/moon.glb");
  return <primitive object={model.scene} />;
};

// Type interface for Marker
interface MarkerProps {
  latitude: number;
  longitude: number;
  magnitude: number;
}

// Component to display a marker on the moon's surface based on the latitude, longitude, and magnitude
const Marker: React.FC<MarkerProps> = ({ latitude, longitude, magnitude }) => {
  // Convert the latitude and longitude to spherical coordinates
  const phi = Math.PI / 2 - latitude * (Math.PI / 180);
  const theta = Math.PI + longitude * (Math.PI / 180);

  // Calculate the radius of the marker based on the magnitude
  const markerRadiusOffset = MOON_MODEL_RADIUS * 0.01 * magnitude;
  const r = MOON_MODEL_RADIUS;

  // Convert spherical coordinates to Cartesian coordinates
  const x = -r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.cos(theta);

  return (
    // Create a marker sphere at the Cartesian coordinates
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[markerRadiusOffset, 16, 16]} />

      {/* Material for the marker with transparency for visibility */}
      <meshBasicMaterial color="red" opacity={0.5} transparent={true} />
    </mesh>
  );
};

interface MoonCanvasProps {
  showWorldAxes: boolean;
}

// Main component to display the moon model and markers
export default function MoonCanvas({ showWorldAxes }: MoonCanvasProps) {
  // Calculate the diameter of the moon model, so that it can be used to calculate the camera position based on the viewport aspect ratio
  const MOON_DIAMETER = MOON_MODEL_RADIUS * 2;
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([0, 0, 1000]);

  useEffect(() => {
    const adjustCameraPosition = () => {
      const viewportAspect = window.innerWidth / window.innerHeight;
      let cameraZ = MOON_DIAMETER / Math.min(viewportAspect, 1);
      cameraZ = Math.min(cameraZ, 1400); // Ensure it doesn't exceed 1400, as that's the max zoom
      setCameraPosition([0, 0, cameraZ]);
    };

    window.addEventListener("resize", adjustCameraPosition);
    adjustCameraPosition();

    return () => window.removeEventListener("resize", adjustCameraPosition);
  }, [MOON_DIAMETER]);

  // Limit the zoom out so that the starfield sphere is not visible
  const MAX_ZOOM = 2000;

  // Limit the zoom in so that the moon model is not clipped
  const MIN_ZOOM = MOON_DIAMETER-400;

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 75, near: 0.1, far: 4000 }}
    >

{/* Option to show world axes */}
 {showWorldAxes && <axesHelper args={[MOON_MODEL_RADIUS * 2]} />}      

      {/* Starfield background. */}
      <Starfield />

      {/* Allow the user to control the camera with the mouse. */}
      <OrbitControls minDistance={MIN_ZOOM} maxDistance={MAX_ZOOM} />

      {/* Ambient light affects all objects in the scene globally. */}
      <ambientLight intensity={3} />

      {/* Directional light acts like the sun, providing parallel light rays. */}
      <directionalLight intensity={3} position={[2, 2, 2]} />

      {/* Point lights emit light in every direction from a single point. */}
      <pointLight intensity={0.5} position={[-5, 5, -5]} />

      {/* Hemisphere light to softly illuminate the scene and give a more natural look. */}
      <hemisphereLight intensity={0.5} />

      {/* The moon model. */}
      <Moon />

      {/* Test markers with various latitudes, longitudes, and magnitudes. */}
      <Marker latitude={-8.00942} longitude={-50.42458} magnitude={3} />
      <Marker latitude={-3.20942} longitude={-63.62458} magnitude={2} />
      <Marker latitude={-3.30942} longitude={-43.32458} magnitude={4} />
      <Marker latitude={10} longitude={10} magnitude={8} />

    </Canvas>
  );
}
