import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

interface KineticSceneProps {
  mode?: "neural" | "lattice" | "pulse";
  onNodeHover?: (nodeInfo: string | null) => void;
}

// Interactive Network Graph with Nodes and Real-Time Synaptic Lines
function NetworkMesh({ mode = "neural" }: { mode: "neural" | "lattice" | "pulse" }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const coreGroup = useRef<THREE.Group>(null);
  const ringsGroup = useRef<THREE.Group>(null);

  const { pointer, viewport } = useThree();
  const isMobile = viewport.width < 5;

  // Node counts adapted for mobile performance
  const nodeCount = isMobile ? 85 : 175;
  const maxConnectionsPerNode = 4;
  const connectionDistance = isMobile ? 1.45 : 1.75;

  // Generate initial node positions and velocities
  const [nodes, basePositions, velocities] = useMemo(() => {
    const nodeArray: { x: number; y: number; z: number; ox: number; oy: number; oz: number; phase: number; speed: number }[] = [];
    const basePos = new Float32Array(nodeCount * 3);
    const vels: { vx: number; vy: number; vz: number }[] = [];

    for (let i = 0; i < nodeCount; i++) {
      // Golden spiral / spherical distribution with radial scatter
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const radius = 1.3 + Math.random() * 2.2;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      nodeArray.push({
        x,
        y,
        z,
        ox: x,
        oy: y,
        oz: z,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.8
      });

      vels.push({
        vx: (Math.random() - 0.5) * 0.005,
        vy: (Math.random() - 0.5) * 0.005,
        vz: (Math.random() - 0.5) * 0.005
      });
    }

    return [nodeArray, basePos, vels];
  }, [nodeCount]);

  // Pre-allocate buffers for lines to avoid garbage collection
  const maxLines = nodeCount * maxConnectionsPerNode;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);
  const lineColors = useMemo(() => new Float32Array(maxLines * 6), [maxLines]);

  // Color pallete: subtle cyan (#00f0ff) and amber/gold (#f59e0b) for AI & Computational warmth
  const nodeColors = useMemo(() => {
    const colors = new Float32Array(nodeCount * 3);
    const cyan = new THREE.Color("#00f0ff");
    const amber = new THREE.Color("#f59e0b");
    const white = new THREE.Color("#f4f1eb");

    for (let i = 0; i < nodeCount; i++) {
      const rand = Math.random();
      const col = rand > 0.7 ? cyan : rand > 0.4 ? amber : white;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return colors;
  }, [nodeCount]);

  // Dynamic frame loop
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const currentPoints = pointsRef.current?.geometry.attributes.position;
    const currentLines = linesRef.current?.geometry.attributes.position;
    const currentLineColors = linesRef.current?.geometry.attributes.color;

    if (!currentPoints || !currentLines) return;

    // Mouse influence vector in 3D scene space
    const targetX = (pointer.x * viewport.width) / 3.5;
    const targetY = (pointer.y * viewport.height) / 3.5;

    let lineIndex = 0;

    // Update node positions with harmonic oscillation + mouse responsiveness
    for (let i = 0; i < nodeCount; i++) {
      const n = nodes[i];
      const vel = velocities[i];

      // Natural harmonic organic drift
      const wave = Math.sin(time * n.speed + n.phase);
      const waveCos = Math.cos(time * 0.8 * n.speed + n.phase);

      let px = n.ox + wave * 0.18;
      let py = n.oy + waveCos * 0.18;
      let pz = n.oz + Math.sin(time * 0.5 + n.phase) * 0.15;

      // Mode-specific kinematic modifier
      if (mode === "pulse") {
        const pulseFactor = 1 + Math.sin(time * 2.5) * 0.18;
        px *= pulseFactor;
        py *= pulseFactor;
        pz *= pulseFactor;
      } else if (mode === "lattice") {
        px = Math.round(px * 1.5) / 1.5;
        py = Math.round(py * 1.5) / 1.5;
      }

      // Mouse attractor/repulsor in 3D
      const dx = targetX - px;
      const dy = targetY - py;
      const distSq = dx * dx + dy * dy;

      if (distSq < 4.0) {
        const dist = Math.sqrt(distSq);
        const force = (1 - dist / 2.0) * 0.25;
        px += (dx / (dist || 1)) * force;
        py += (dy / (dist || 1)) * force;
      }

      n.x = px;
      n.y = py;
      n.z = pz;

      currentPoints.setXYZ(i, px, py, pz);
    }

    currentPoints.needsUpdate = true;

    // Compute synaptic connection lines between proximal nodes
    for (let i = 0; i < nodeCount; i++) {
      let connections = 0;
      const ni = nodes[i];

      for (let j = i + 1; j < nodeCount; j++) {
        if (connections >= maxConnectionsPerNode) break;

        const nj = nodes[j];
        const dx = ni.x - nj.x;
        const dy = ni.y - nj.y;
        const dz = ni.z - nj.z;
        const d2 = dx * dx + dy * dy + dz * dz;

        if (d2 < connectionDistance * connectionDistance) {
          const d = Math.sqrt(d2);
          const alpha = 1.0 - d / connectionDistance;

          const baseIdx = lineIndex * 6;
          linePositions[baseIdx] = ni.x;
          linePositions[baseIdx + 1] = ni.y;
          linePositions[baseIdx + 2] = ni.z;
          linePositions[baseIdx + 3] = nj.x;
          linePositions[baseIdx + 4] = nj.y;
          linePositions[baseIdx + 5] = nj.z;

          // Color gradient along synaptic edge
          const isCyanEdge = (i + j) % 3 === 0;
          const r = isCyanEdge ? 0.0 : 0.85;
          const g = isCyanEdge ? 0.94 : 0.62;
          const b = isCyanEdge ? 1.0 : 0.15;

          lineColors[baseIdx] = r * alpha;
          lineColors[baseIdx + 1] = g * alpha;
          lineColors[baseIdx + 2] = b * alpha;
          lineColors[baseIdx + 3] = r * alpha;
          lineColors[baseIdx + 4] = g * alpha;
          lineColors[baseIdx + 5] = b * alpha;

          lineIndex++;
          connections++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      if (linesRef.current.geometry.attributes.color) {
        linesRef.current.geometry.attributes.color.needsUpdate = true;
      }
    }

    // Gyro rotation for central core and orbital rings
    if (coreGroup.current) {
      coreGroup.current.rotation.y += delta * 0.12;
      coreGroup.current.rotation.x += delta * 0.04;
    }

    if (ringsGroup.current) {
      ringsGroup.current.rotation.z += delta * 0.08;
      ringsGroup.current.rotation.y -= delta * 0.05;
    }
  });

  return (
    <group>
      {/* Node Cloud */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[basePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[nodeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isMobile ? 0.045 : 0.055}
          vertexColors
          transparent
          opacity={0.92}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Synaptic Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          linewidth={1}
        />
      </lineSegments>

      {/* Computational Geodesic Core */}
      <group ref={coreGroup}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            wireframe
            color="#00f0ff"
            transparent
            opacity={0.18}
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.7, 0]} />
          <meshBasicMaterial
            wireframe
            color="#f59e0b"
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Core glowing point */}
        <mesh>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Orbital Computational Data Rings */}
      <group ref={ringsGroup}>
        {/* Outer Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[2.85, 0.012, 16, 100]} />
          <meshBasicMaterial
            color="#111114"
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Inclined Cyan Accent Ring */}
        <mesh rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[3.3, 0.008, 16, 100]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Amber Inner Ring */}
        <mesh rotation={[Math.PI / 6, -Math.PI / 4, 0]}>
          <torusGeometry args={[2.1, 0.008, 16, 80]} />
          <meshBasicMaterial
            color="#f59e0b"
            transparent
            opacity={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}

// Camera Rig with Parallax and Scroll Motion
function CameraRig() {
  const { camera, pointer } = useThree();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((_, delta) => {
    // Parallax damping: smooth camera lerp towards pointer position + subtle scroll translation
    const targetX = pointer.x * 0.95;
    const targetY = pointer.y * 0.65;
    const scrollZFactor = Math.min(scrollY * 0.002, 1.8);

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 7.8 + scrollZFactor, 3.0, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export function KineticScene({ mode = "neural" }: KineticSceneProps) {
  return (
    <div className="w-full h-full relative" style={{ minHeight: "420px" }}>
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 42 }}
        dpr={[1, Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={1.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#00f0ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f59e0b" />

        <NetworkMesh mode={mode} />
        <CameraRig />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.5}
        />
      </Canvas>
    </div>
  );
}
