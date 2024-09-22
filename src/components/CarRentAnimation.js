import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './TextOverlay.css'; // Make sure to create this CSS file

function Car() {
  const carRef = useRef();
  const { scene } = useGLTF('/your_car_model.glb'); // Update with your actual model path

  // Animate the car (rotate the car)
  useFrame(() => {
    if (carRef.current) {
      carRef.current.rotation.y += 0.01; // Rotate along Y axis
    }
  });

  return <primitive ref={carRef} object={scene} scale={[0.5, 0.5, 0.5]} />;
}

export function CarRentAnimation() {
  return (
    <>
      <div className="overlay">
        <h1 className="title">Car Rental Service</h1>
        <p className="description">Find the best vehicles at amazing prices!</p>
      </div>
      <Canvas camera={{ position: [0.5, 3, 5], fov: 20 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <OrbitControls />
        <Car />
        {/* Optional: Floor or ground plane
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={'#808080'} />
        </mesh> */}
      </Canvas>
    </>
  );
}
