import {
  BufferGeometry,
  Float32BufferAttribute,
  Points,
  PointsMaterial,
} from "three";

export default function StarField() {
  // Buffer geometry for a large number of vertices (stars).
  const vertices: number[] = [];

  // Radius of starfield sphere
  const radius = 2000;

  // Generate random vertices for the starfield sphere
  for (let i = 0; i < 1000; i++) {
    const theta = 2 * Math.PI * Math.random(); // Random value between [0, 2PI]
    const phi = Math.acos(2 * Math.random() - 1); // Random value between [0, PI]

    // Convert spherical coordinates to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    // Add the Cartesian coordinates to the vertices array
    vertices.push(x, y, z);
  }

  // Buffer geometry for a large number of vertices (stars).
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));

  // Material for stars, setting color and size of each star/point
  const material = new PointsMaterial({
    color: 0xffffff,
    size: 2,
    transparent: true,
    opacity: 0.8,
  });

  // Return a points mesh with the geometry and material
  return <points geometry={geometry} material={material} />;
}
