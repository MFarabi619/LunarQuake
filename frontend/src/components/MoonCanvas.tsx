"use client";
import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Starfield from "@/components/Starfield";
import { Quake } from "./DataTable";

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
  date: string;
  label: string;
}

// Component to display a marker on the moon's surface based on the latitude, longitude, and magnitude
const Marker: React.FC<MarkerProps> = ({
  latitude,
  longitude,
  magnitude,
  date,
  label,
}) => {
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

  const tooltipContent = `
    Latitude: ${latitude}
    Longitude: ${longitude}
    Magnitude: ${magnitude}
    Date: ${date}
    Label: ${label}
  `;

  return (
    // <div className="tooltip" data-tip={tooltipContent}>
    // {/* Create a marker sphere at the Cartesian coordinates */}
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[markerRadiusOffset, 16, 16]} />

      {/* Material for the marker with transparency for visibility */}
      <meshBasicMaterial color="red" opacity={0.5} transparent={true} />
    </mesh>
    // {/* </div> */}
  );
};

interface MoonCanvasProps {
  showWorldAxes: boolean;
  showLatitudeLongitude: boolean;
  directionalLightIntensity: number;
  ambientLightIntensity: number;
  hemisphereLightIntensity: number;
  pointLightIntensity: number;
  selectedQuake: Quake | null;
  setSelectedQuake: React.Dispatch<React.SetStateAction<Quake | null>>;
}

// Main component to display the moon model and markers
export default function MoonCanvas({
  showWorldAxes,
  showLatitudeLongitude,
  directionalLightIntensity,
  ambientLightIntensity,
  hemisphereLightIntensity,
  pointLightIntensity,
  selectedQuake,
  setSelectedQuake,
}: MoonCanvasProps) {
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
  const MIN_ZOOM = MOON_DIAMETER - 400;

  interface Quake {
    lat: number;
    lng: number;
    magnitude: number;
    date: string;
    label: string;
  }

  // For rendering the data from the json file
  const [quakeData, setQuakeData] = useState<Quake[]>([]);

  useEffect(() => {
    fetch("/quake_locations.json")
      .then((response) => response.json())
      .then((data) => setQuakeData(data));
  }, []);

  // For navigating to the selected quake when data point is clicked on the table
  useEffect(() => {
    if (selectedQuake) {
      const phi = Math.PI / 2 - selectedQuake.lat * (Math.PI / 180);
      const theta = Math.PI + selectedQuake.lng * (Math.PI / 180);
      const r =
        MOON_MODEL_RADIUS + MOON_MODEL_RADIUS * 0.01 * selectedQuake.magnitude; // Adjust if needed

      const x = -r * Math.sin(phi) * Math.sin(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.cos(theta);

      // Update the cameraPosition state
      setCameraPosition([x * 2, y * 2, z * 2]);
    }
  }, [selectedQuake]);

  return (
    <Canvas
      key={cameraPosition.join(",")}
      camera={{ position: cameraPosition, fov: 75, near: 0.1, far: 4000 }}
    >
      {/* Option to show world axes */}
      {showWorldAxes && <axesHelper args={[MOON_MODEL_RADIUS * 2]} />}

      {/* Starfield background. */}
      <Starfield />

      {/* Allow the user to control the camera with the mouse. */}
      <OrbitControls minDistance={MIN_ZOOM} maxDistance={MAX_ZOOM} />

      {/* Ambient light affects all objects in the scene globally. */}
      <ambientLight intensity={ambientLightIntensity} />

      {/* Directional light acts like the sun, providing parallel light rays. */}
      <directionalLight
        intensity={directionalLightIntensity}
        position={[2, 2, 2]}
      />

      {/* Point lights emit light in every direction from a single point. */}
      {/* <pointLight intensity={pointLightIntensity} position={[100, 0, 0]} /> */}

      {/* Hemisphere light to softly illuminate the scene and give a more natural look. */}
      <hemisphereLight intensity={hemisphereLightIntensity} />

      {/* The moon model. */}
      <Moon />

      {/* Render markers dynamically based on the fetched data */}
      {quakeData.map((quake, index) => (
        <Marker
          key={index}
          latitude={quake.lat}
          longitude={quake.lng}
          magnitude={quake.magnitude}
          date={quake.date}
          label={quake.label}
        />
      ))}
    </Canvas>
  );
}
