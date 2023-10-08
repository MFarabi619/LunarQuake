import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from "three";

const StarField: React.FC = () => {

  // Create buffer geometry for a large number of vertices (stars).
  const vertices: number[] = [];
  
  const radius = 2000; // Set this value so it's larger than the moon's distance from the camera

  for (let i = 0; i < 1000; i++) {
    const theta = 2 * Math.PI * Math.random();  // Random value between [0, 2PI]
    const phi = Math.acos(2 * Math.random() - 1); // Random value between [0, PI]
    
    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    vertices.push(x, y, z);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  // Material for stars, setting color and size of each star/point
  const material = new PointsMaterial({ color: 0xFFFFFF, size: 2, transparent: true, opacity: 0.8 });

  return <points geometry={geometry} material={material} />;
};

export default StarField;
