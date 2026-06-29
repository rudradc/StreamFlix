import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform float uMouseX;
  uniform float uMouseY;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    
    vec3 pos = position;
    
    // Wave calculations using sine and cosine waves for an organic flow
    float wave1 = sin(pos.x * 0.08 + uTime * 0.6) * cos(pos.y * 0.08 + uTime * 0.4) * 4.0;
    float wave2 = sin(pos.x * 0.15 - uTime * 0.8) * sin(pos.y * 0.12 + uTime * 0.5) * 2.0;
    float wave3 = cos(pos.x * 0.04 + pos.y * 0.04 + uTime * 0.3) * 3.5;
    
    float elevation = wave1 + wave2 + wave3;
    pos.z += elevation;
    
    // Subtle interactive shift based on mouse
    pos.x += uMouseX * 10.0;
    pos.y += uMouseY * 10.0;
    
    vElevation = elevation;
    
    vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    
    gl_Position = projectedPosition;
    
    // Size attenuation (particles get smaller as they are further away)
    gl_PointSize = (12.0 + elevation * 1.5) * (300.0 / -viewPosition.z);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Round particles with soft glow borders (mathematical alpha mapping - no GPU-heavy discard)
    float dist = distance(gl_PointCoord, vec2(0.5));
    float alpha = smoothstep(0.5, 0.0, dist) * 0.55;

    // Color definitions representing a premium cyber Teal-Aqua-Blue-Violet gradient
    vec3 colorTeal = vec3(0.05, 0.85, 0.61);
    vec3 colorAqua = vec3(0.00, 0.73, 0.92);
    vec3 colorBlue = vec3(0.18, 0.36, 0.91);
    vec3 colorViolet = vec3(0.57, 0.15, 0.93);

    // Dynamic wave-based blending factors
    float mixFactor1 = sin(vElevation * 0.25 + uTime * 0.4) * 0.5 + 0.5;
    float mixFactor2 = cos(vUv.x * 3.14159 + uTime * 0.2) * 0.5 + 0.5;
    
    vec3 col1 = mix(colorTeal, colorAqua, mixFactor1);
    vec3 col2 = mix(colorBlue, colorViolet, mixFactor2);
    
    // Blend vertically down the grid
    vec3 finalColor = mix(col1, col2, vUv.y);
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP
    const scene = new THREE.Scene();

    // 2. CAMERA SETUP
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, -50, 45);
    camera.lookAt(0, 0, 10);

    // 3. RENDERER SETUP
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // Performance Optimization: Cap pixel ratio at 1.2 to prevent high-DPI rendering lag
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 4. MAIN INTERACTIVE GROUP
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 5. GEOMETRY Creation (wavy plane grid)
    const sizeX = 130;
    const sizeY = 130;
    // Performance Optimization: Reduced segments from 100x100 to 60x60 (64% fewer vertices)
    const segmentsX = 60;
    const segmentsY = 60;
    
    const geometry = new THREE.PlaneGeometry(sizeX, sizeY, segmentsX, segmentsY);

    // 6. SHADER MATERIAL
    const uniforms = {
      uTime: { value: 0 },
      uMouseX: { value: 0 },
      uMouseY: { value: 0 }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });

    // 7. POINTS MESH
    const points = new THREE.Points(geometry, material);
    points.rotation.x = Math.PI * 0.22;
    mainGroup.add(points);

    // 8. INTERACTION / MOUSE MOVEMENT
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 9. RESIZE HANDLER
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // 10. PAGE VISIBILITY STATE HANDLER (Performance Optimization)
    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 11. ANIMATION LOOP
    const clock = new THREE.Clock();
    let animationFrameId = null;

    const animate = () => {
      // Pause loop processing when tab is invisible to save device CPU/GPU
      if (isVisible) {
        const elapsedTime = clock.getElapsedTime();
        
        // Update uniforms
        uniforms.uTime.value = elapsedTime;

        // Smooth mouse movement interpolation
        currentMouseX += (targetMouseX - currentMouseX) * 0.05;
        currentMouseY += (targetMouseY - currentMouseY) * 0.05;

        uniforms.uMouseX.value = currentMouseX;
        uniforms.uMouseY.value = currentMouseY;

        // Group rotation responds to mouse ClientX/ClientY coordinates
        mainGroup.rotation.y = currentMouseX * 0.06;
        mainGroup.rotation.x = currentMouseY * 0.05;

        renderer.render(scene, camera);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 12. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose geometry and materials
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0, opacity: 0.75 }}
      aria-hidden="true"
    />
  );
}
