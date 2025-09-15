import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './TextOverlay.css'; // Make sure to create this CSS file

function Medical() {
  const MedicalRef = useRef();
  const { scene } = useGLTF('/medical3d.glb'); // Update with your actual model path

  // Animate the Medical (rotate the Medical)
  useFrame(() => {
    if (MedicalRef.current) {
      MedicalRef.current.rotation.y += 0.01; // Rotate along Y axis
    }
  });

  return <primitive ref={MedicalRef} object={scene} scale={[0.5, 0.5, 0.5]} />;
}

export function MedicalAnimation() {
  return (
    <>
      <div className="overlay">
        <h1 className="title">Medical  Service</h1>
        <p className="description">STAY HEALTHY WITH UTURN PRODUCTS!</p>
      </div>
      <Canvas camera={{ position: [0.5, 3, 5], fov: 1 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <OrbitControls />
        <Medical />
        {/* Optional: Floor or ground plane
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color={'#808080'} />
        </mesh> */}
      </Canvas>
    </>
  );
}
