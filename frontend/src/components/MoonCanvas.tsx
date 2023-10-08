import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const MOON_MODEL_RADIUS = 865.6653264873212; 

const Moon = () => {
  const model = useGLTF("/moon.glb");
  return <primitive object={model.scene} />;
};

const Marker: React.FC<{ }> = () => {
  // Provided the latitude and longitude, convert to radians
  const latitude = -3.00942 * (Math.PI / 180);
  const longitude = -23.42458 * (Math.PI / 180);

  const phi = Math.PI / 2 - latitude;
  const theta = Math.PI + longitude;

  // The marker radius is a percentage of the moon radius
  const markerRadiusOffset = MOON_MODEL_RADIUS * 0.01;
  const r = MOON_MODEL_RADIUS-365;

  const x = -r * Math.sin(phi) * Math.sin(theta);
  const y = r * Math.cos(phi);
  const z = r * Math.sin(phi) * Math.cos(theta);

  return (
    <mesh position={[x, y, z]}>
      <sphereGeometry args={[markerRadiusOffset, 16, 16]} />
      <meshBasicMaterial color="red" />
    </mesh>
  );
};

export default function MoonCanvas() {

  return (
    <Canvas camera={{ position: [0, 0, 1000] }}>
      {/* Allow the user to control the camera with the mouse. */}
      <OrbitControls />

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

      {/* The marker to indicate the central station. */}
      <Marker/>
    </Canvas>
  );
}
