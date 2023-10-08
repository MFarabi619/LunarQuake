import { BufferGeometry, Float32BufferAttribute, Points, PointsMaterial } from 'three';

const Starfield: React.FC = () => {
  // Array to store the positions of the stars
  const vertices = [];

  // Generate 10,000 stars distributed in a space of 5000x5000x5000
  for (let i = 0; i < 10000; i++) {
    // Distribute stars randomly by adjusting their positions
    const x = (Math.random() - 0.5) * 5000; 
    const y = (Math.random() - 0.5) * 5000;
    const z = (Math.random() - 0.5) * 5000;
    
    // Add each star's position to our vertices array
    vertices.push(x, y, z);
  }

  // Create geometry for our starfield using Three.js's BufferGeometry
  const geometry = new BufferGeometry();

  // Add vertices to the geometry as an attribute
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));

  // Define the material for our star points: white color and small size
  const material = new PointsMaterial({ color: 0xFFFFFF, size: 2 });

  // Return a Points object (a series of points/vertices) to represent our starfield
  return <primitive object={new Points(geometry, material)} />;
};

export default Starfield;
