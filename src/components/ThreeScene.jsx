import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeScene = ({ type = 'particles', color = '#ffffff', density = 50, speed = 0.5 }) => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create objects based on type
    if (type === 'particles') {
      createParticles();
    } else if (type === 'wave') {
      createWaveMesh();
    } else if (type === 'floating') {
      createFloatingMesh();
    }

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        if (type === 'particles') {
          particlesRef.current.rotation.y += 0.001;
          particlesRef.current.rotation.x += 0.001;
        } else if (type === 'wave') {
          animateWave();
        } else if (type === 'floating') {
          animateFloating();
        }
      }
      
      renderer.render(scene, camera);
    };

    // Create particles
    function createParticles() {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      
      for (let i = 0; i < density; i++) {
        vertices.push(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
      }
      
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      
      const material = new THREE.PointsMaterial({
        color: color,
        size: 0.05,
        transparent: true,
        opacity: 0.8,
      });
      
      const particles = new THREE.Points(geometry, material);
      scene.add(particles);
      particlesRef.current = particles;
    }

    // Create wave mesh
    function createWaveMesh() {
      const geometry = new THREE.PlaneGeometry(10, 10, 50, 50);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 3;
      scene.add(mesh);
      particlesRef.current = mesh;
    }

    // Create floating mesh
    function createFloatingMesh() {
      const geometry = new THREE.IcosahedronGeometry(1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.8,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      particlesRef.current = mesh;

      // Add floating animation
      gsap.to(mesh.rotation, {
        x: Math.PI * 2,
        y: Math.PI * 2,
        duration: 20,
        ease: "none",
        repeat: -1
      });

      gsap.to(mesh.position, {
        y: 0.5,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Wave animation
    function animateWave() {
      const positions = particlesRef.current.geometry.attributes.position;
      const time = Date.now() * speed * 0.001;
      
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        positions.setZ(i, Math.sin(x + time) * 0.5 + Math.cos(y + time) * 0.5);
      }
      
      positions.needsUpdate = true;
    }

    // Floating animation
    function animateFloating() {
      if (particlesRef.current) {
        particlesRef.current.rotation.x += 0.002;
        particlesRef.current.rotation.y += 0.003;
      }
    }

    // Handle resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      mount.removeChild(renderer.domElement);
      scene.remove(particlesRef.current);
      geometry.dispose();
      material.dispose();
    };
  }, [type, color, density, speed]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default ThreeScene; 