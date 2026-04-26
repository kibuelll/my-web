"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050505");

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true }); // disable antialias for particles to save GPU
    // Cap pixel ratio to 1.5 for performance on Retina displays
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Particles setup
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500; // Reduced from 5000 for better performance
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      // Create points in a sphere
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: "#8b5cf6",
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lights for 3D Objects
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 50, 100);
    pointLight.position.set(2, 3, 4);
    scene.add(pointLight);

    // Fancy Transparent Cubes
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);

    // Top-Right Cube (Bigger)
    const glassMaterial1 = new THREE.MeshPhysicalMaterial({
      color: "#8b5cf6", // Secondary accent color
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.2,
      side: THREE.DoubleSide
    });
    const cube1 = new THREE.Mesh(boxGeometry, glassMaterial1);
    cube1.scale.set(1.8, 1.8, 1.8);
    // Positioned at top-right
    cube1.position.set(5, 3, -4);
    scene.add(cube1);

    // Bottom-Left Cube (Smaller)
    const glassMaterial2 = new THREE.MeshPhysicalMaterial({
      color: "#8b5cf6", // Secondary accent color
      metalness: 0.3,
      roughness: 0.1,
      transparent: true,
      opacity: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide
    });
    const cube2 = new THREE.Mesh(boxGeometry, glassMaterial2);
    cube2.scale.set(0.9, 0.9, 0.9);
    // Positioned at bottom-left
    cube2.position.set(-2.5, -2, 1);
    scene.add(cube2);

    // Animation loop
    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 12000; // Animasi berjalan selama 12 detik lalu berhenti

    const renderScene = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Efek easing (melambat secara perlahan)
      const speedMultiplier = 1 - Math.pow(progress, 3);

      if (speedMultiplier > 0.001) {
        particlesMesh.rotation.y += 0.002 * speedMultiplier;
        particlesMesh.rotation.x += 0.001 * speedMultiplier;

        // Animate the cubes
        cube1.rotation.x += 0.003 * speedMultiplier;
        cube1.rotation.y += 0.004 * speedMultiplier;

        cube2.rotation.x -= 0.005 * speedMultiplier;
        cube2.rotation.y += 0.002 * speedMultiplier;

        renderer.render(scene, camera);
        animationFrameId = window.requestAnimationFrame(renderScene);
      } else {
        // Render bingkai terakhir sebelum berhenti total
        renderer.render(scene, camera);
      }
    };

    renderScene();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera); // Pastikan background dirender ulang jika di-resize meski animasi sudah berhenti
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      boxGeometry.dispose();
      glassMaterial1.dispose();
      glassMaterial2.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[-1]" />;
}
