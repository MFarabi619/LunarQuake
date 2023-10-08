import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Moon = () => {
  const model = useGLTF("/moon.glb");
  return <primitive object={model.scene} scale={0.5} />;
};

export default function MoonCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 500] }}>
      <OrbitControls />

      {/* Ambient light affects all objects in the scene globally. */}
      <ambientLight intensity={3} />

      {/* Directional light acts like the sun, providing parallel light rays. */}
      <directionalLight 
        intensity={3}
        position={[2, 2, 2]} 
        castShadow={true}
      />

      {/* Point lights emit light in every direction from a single point. Adding this for additional brightness and highlights. */}
      <pointLight 
        intensity={0.5} 
        position={[-5, 5, -5]}
      />

      {/* Adding a hemisphere light to softly illuminate the scene and give a more natural look. */}
      <hemisphereLight 
        intensity={0.5} 
      />

      <Moon />
    </Canvas>
  );
}
