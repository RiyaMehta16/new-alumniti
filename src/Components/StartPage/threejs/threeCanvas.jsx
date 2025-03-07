import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { DecalGeometry } from "three/examples/jsm/geometries/DecalGeometry.js";
// import chip from "/chip.png";
// import mentorship from "/mentorship.png";
// import new_features from "/new-features.png";
// import online_creation from "/online-creation.png";
// import programming from "/programming.png";
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Set clear color to transparent
    document.body.appendChild(renderer.domElement);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }
    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.2, 10);
    camera.position.z = 2;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
    controls.minDistance = 2; // Minimum zoom-in distance (closer to object)
    controls.maxDistance = 5; // Maximum zoom-out distance (farther from object)
    controls.enableZoom = false;
    // Main Mesh
    const geo = new THREE.IcosahedronGeometry(1.0, 12);
    const mat = new THREE.MeshStandardMaterial({
      //   color: 0xffffff,
      flatShading: true,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Wireframe Overlay
    const wireMat = new THREE.ShaderMaterial({
      //   color: (0xd399e4, 0xffb861),
      wireframe: true,
      vertexColors: false,
      uniforms: {
        color1: { value: new THREE.Color(0x98a4ff) }, // Red
        color2: { value: new THREE.Color(0xd399e4) }, // Blue
      },
      vertexShader: `
    varying float vZ;
    void main() {
      vZ = position.z;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
      fragmentShader: `
    uniform vec3 color1;
    uniform vec3 color2;
    varying float vZ;
    
    void main() {
      float mixFactor = (vZ + 1.0) / 2.0; // Normalize between 0-1
      gl_FragColor = vec4(mix(color1, color2, mixFactor), 1.0);
    }
  `,
    });

    const wireMesh = new THREE.Mesh(geo, wireMat);
    mesh.add(wireMesh);

    // Lighting 0xb6b3ba, 0x343236
    const hemiLight = new THREE.HemisphereLight(0x2a1a3b, 0x2a1a3b);
    scene.add(hemiLight);

    // Load Textures
    const textureLoader = new THREE.TextureLoader();
    const textures = [
      //   chip,
      //   mentorship,
      //   new_features,
      //   online_creation,
      //   programming,
      //   chip,
      //   mentorship,
      //   new_features,
      //   online_creation,
      //   programming,
    ].map((img) => textureLoader.load(img));

    textures.forEach((texture, index) => {
      if (!texture.image) {
        console.error(`Texture ${index} failed to load.`);
      }
    });
    // Fixed positions for decals
    const fixedDecalPositions = [
      new THREE.Vector3(0.5, 0.5, 0.5),
      new THREE.Vector3(-0.5, 0.5, 0.5),
      new THREE.Vector3(0.5, -0.5, 0.5),
      new THREE.Vector3(-0.5, -0.5, 0.5),
      new THREE.Vector3(0.5, 0.5, -0.5),
      new THREE.Vector3(-0.5, 0.5, -0.5),
      new THREE.Vector3(0.5, -0.5, -0.5),
      new THREE.Vector3(-0.5, -0.5, -0.5),
      new THREE.Vector3(0, 0, 0.7),
      new THREE.Vector3(0, 0, -0.7),
    ];

    // Function to add decals
    function addDecals() {
      for (let i = 0; i < textures.length; i++) {
        let position = fixedDecalPositions[i].clone();
        const normal = position.clone().normalize();
        position.addScaledVector(normal, 0.1);

        const quaternion = new THREE.Quaternion();
        quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
        const rotation = new THREE.Euler().setFromQuaternion(quaternion);

        const decalMat = new THREE.MeshBasicMaterial({
          map: textures[i],
          transparent: true,
          depthTest: false,
          depthWrite: false,
          polygonOffset: true,
          polygonOffsetFactor: -10,
        });

        const decalGeo = new DecalGeometry(
          mesh,
          position,
          rotation,
          new THREE.Vector3(0.3, 0.3, 0.3)
        );

        const decal = new THREE.Mesh(decalGeo, decalMat);
        mesh.add(decal);
      }
    }

    addDecals();

    // Animation Loop
    function animate(t = 0) {
      requestAnimationFrame(animate);
      mesh.rotation.y = t * 0.0001;
      renderer.render(scene, camera);
      controls.update();
    }

    animate();

    // Cleanup on Unmount
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ display: "inline-block", width: "50vw", height: "50vh" }}
      className="absolute mb-20 -z-20 -mt-10 text-center"
    />
  );
};

export default ThreeScene;
