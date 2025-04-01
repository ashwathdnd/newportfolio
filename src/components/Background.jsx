import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const Background = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const currentSectionRef = useRef('hero');

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 15;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;

      sizes[i] = Math.random() * 0.2 + 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 mousePosition;
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.45, 0.5, dist);
          gl_FragColor = vec4(vColor, alpha * 0.8);
        }
      `,
      transparent: true,
      vertexColors: true
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particlesRef.current = points;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mousePositionRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Section change handler
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      const windowHeight = window.innerHeight;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < windowHeight / 2 && rect.bottom > windowHeight / 2;
          if (isVisible && currentSectionRef.current !== section) {
            currentSectionRef.current = section;
            updateAnimation(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Animation update based on section
    const updateAnimation = (section) => {
      const points = particlesRef.current;
      const positions = points.geometry.attributes.position.array;

      switch (section) {
        case 'hero':
          gsap.to(points.rotation, {
            x: 0,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
          break;
        case 'about':
          gsap.to(points.rotation, {
            x: Math.PI / 4,
            y: Math.PI / 4,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
          break;
        case 'projects':
          gsap.to(points.rotation, {
            x: -Math.PI / 4,
            y: -Math.PI / 4,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
          break;
        case 'skills':
          gsap.to(points.rotation, {
            x: Math.PI / 2,
            y: 0,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
          break;
        case 'contact':
          gsap.to(points.rotation, {
            x: 0,
            y: Math.PI / 2,
            z: 0,
            duration: 1.5,
            ease: "power2.inOut"
          });
          break;
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      const points = particlesRef.current;
      const time = Date.now() * 0.001;

      // Update shader uniforms
      points.material.uniforms.time.value = time;
      points.material.uniforms.mousePosition.value.set(
        mousePositionRef.current.x,
        mousePositionRef.current.y
      );

      // Rotate particles
      points.rotation.x += 0.0005;
      points.rotation.y += 0.0005;

      // Mouse interaction
      const targetX = mousePositionRef.current.x * 3;
      const targetY = mousePositionRef.current.y * 3;

      gsap.to(points.position, {
        x: targetX * 0.1,
        y: targetY * 0.1,
        duration: 0.5,
        ease: "power2.out"
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default Background; 