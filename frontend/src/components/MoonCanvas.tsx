"use client";
import { useState, useEffect, useRef } from "react";
import { PolarGridHelper, Color } from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Starfield from "@/components/Starfield";
import * as THREE from "three";
import { Grid } from "@tremor/react";

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
  showLatitudeLongitude: boolean;
  directionalLightIntensity: number;
  ambientLightIntensity: number;
  hemisphereLightIntensity: number;
  pointLightIntensity: number;
}

// Main component to display the moon model and markers
export default function MoonCanvas({
  showWorldAxes,
  showLatitudeLongitude,
  directionalLightIntensity,
  ambientLightIntensity,
  hemisphereLightIntensity,
  pointLightIntensity,
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

  //   const { scene } = useThree();
  //   const polarGridHelperRef = useRef<PolarGridHelper>(); // Reference to the helper

  //   useEffect(() => {
  //   if (showLatitudeLongitude) {
  //     const helper = new PolarGridHelper(
  //       MOON_MODEL_RADIUS,
  //       10, // Represents longitudes
  //       5,  // Represents latitudes
  //       64,
  //       new Color("red"),
  //       new Color("white")
  //       );

  //     polarGridHelperRef.current = helper;
  //     scene.add(helper);
  //   } else if (polarGridHelperRef.current) {
  //     // If it's already in the scene and the prop changes to hide it, remove it
  //     scene.remove(polarGridHelperRef.current);
  //   }

  //   // Cleanup function to remove the helper when the component unmounts
  //   return () => {
  //     if (polarGridHelperRef.current) {
  //       scene.remove(polarGridHelperRef.current);
  //     }
  //   };
  // }, [showLatitudeLongitude, scene]); // Make sure the effect runs when `showLatitudeLongitude` changes

  return (
    <Canvas
      camera={{ position: cameraPosition, fov: 75, near: 0.1, far: 4000 }}
    >
      {/* Option to show world axes */}
      {showWorldAxes && <axesHelper args={[MOON_MODEL_RADIUS * 2]} />}

      {/* Option to show latitude and longitude */}
      {/* {showLatitudeLongitude && (
  <PolarGridHelper 
          radius={MOON_MODEL_RADIUS}
          radials={10}  // Represents longitudes
          circles={5}   // Represents latitudes
          divisions={64}
          color1="red"
          color2="white"
        />
      )} */}

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

      {/* Test markers with various latitudes, longitudes, and magnitudes. */}
      <Marker latitude={-8.00942} longitude={-50.42458} magnitude={3} />
      <Marker latitude={-3.20942} longitude={-63.62458} magnitude={2} />
      <Marker latitude={-3.30942} longitude={-43.32458} magnitude={4} />
      <Marker latitude={10} longitude={10} magnitude={8} />
    </Canvas>
  );
}
