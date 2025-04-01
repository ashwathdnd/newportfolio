import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { gsap } from 'gsap';

const skills = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'JavaScript', 'SQL']
  },
  {
    category: 'Frameworks',
    items: ['ReactJS', 'NodeJS', 'Flask', 'PyTorch']
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'Docker', 'AWS', 'Linux']
  },
  {
    category: 'Libraries & Databases',
    items: ['PostgreSQL', 'MongoDB', 'TensorFlow', 'OpenCV']
  }
];

const Skills = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const spheresRef = useRef([]);
  const mousePositionRef = useRef({ x: 0, y: 0 });

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
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create skill spheres
    const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
      wireframe: true
    });

    const spheres = [];
    const radius = 8;
    const totalSpheres = skills.reduce((acc, cat) => acc + cat.items.length, 0);
    let currentIndex = 0;

    skills.forEach((category, categoryIndex) => {
      category.items.forEach((skill, skillIndex) => {
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial.clone());
        const angle = (currentIndex / totalSpheres) * Math.PI * 2;
        const height = (categoryIndex - 1.5) * 2;
        
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.y = height;
        sphere.position.z = Math.sin(angle) * radius;
        
        sphere.userData = { skill, category };
        spheres.push(sphere);
        scene.add(sphere);
        currentIndex++;
      });
    });

    spheresRef.current = spheres;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mousePositionRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate all spheres
      spheresRef.current.forEach((sphere, index) => {
        const time = Date.now() * 0.001;
        const baseRotation = time * 0.2;
        const individualRotation = index * (Math.PI / spheresRef.current.length);
        
        sphere.rotation.x = baseRotation + individualRotation;
        sphere.rotation.y = baseRotation + individualRotation;

        // Mouse interaction
        const targetX = mousePositionRef.current.x * 2;
        const targetY = mousePositionRef.current.y * 2;
        
        gsap.to(sphere.position, {
          x: sphere.position.x + targetX * 0.1,
          y: sphere.position.y + targetY * 0.1,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      // Camera movement
      const cameraTarget = {
        x: mousePositionRef.current.x * 2,
        y: mousePositionRef.current.y * 2,
        z: 15
      };

      gsap.to(camera.position, {
        x: cameraTarget.x,
        y: cameraTarget.y,
        z: cameraTarget.z,
        duration: 0.5,
        ease: "power2.out"
      });

      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section id="skills" className="section-padding relative">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="heading text-center">Technical Skills</h2>
          <p className="subheading text-center">
            A comprehensive overview of my technical expertise and capabilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-tertiary p-6 rounded-lg"
            >
              <h3 className="text-xl font-semibold mb-4">{category.category}</h3>
              <ul className="space-y-2">
                {category.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="text-textSecondary flex items-center">
                    <svg
                      className="w-4 h-4 mr-2 text-secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
      <div ref={containerRef} className="absolute inset-0 -z-10" />
    </section>
  );
};

export default Skills; 