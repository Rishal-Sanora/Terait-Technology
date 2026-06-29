import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

/**
 * Real 3D animated IT background: rotating wireframe icosphere
 * (network) + orbiting nodes + particle dust. Light-theme friendly.
 */
export function ThreeBackground({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Wireframe globe (network sphere)
    const globeGeo = new THREE.IcosahedronGeometry(2.2, 3);
    const globeMat = new THREE.MeshBasicMaterial({
      color: 0x0f5132, // Dark Green
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    group.add(globe);

    // Inner red wire (smaller)
    const innerGeo = new THREE.IcosahedronGeometry(1.55, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x997300, // Dark Yellow
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Glowing nodes on outer sphere
    const nodeCount = 80;
    const nodeGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const nodeRed = new THREE.MeshBasicMaterial({ color: 0x997300 });
    const nodeBlue = new THREE.MeshBasicMaterial({ color: 0x0f5132 });
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.25;
      const m = new THREE.Mesh(nodeGeo, i % 2 ? nodeRed : nodeBlue);
      m.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      );
      group.add(m);
      nodes.push(m);
    }

    // Particle dust
    const dustCount = 500;
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const r = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0x0f5132,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.005, 8, 200);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x997300,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.004, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0x0f5132, transparent: true, opacity: 0.3 }),
    );
    ring2.rotation.x = Math.PI / 1.8;
    scene.add(ring2);

    // Mouse parallax
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMove);

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      group.rotation.y = t * 0.12 + mouse.x;
      group.rotation.x = Math.sin(t * 0.2) * 0.1 + mouse.y;
      inner.rotation.y = -t * 0.18;
      inner.rotation.x = t * 0.1;
      dust.rotation.y = t * 0.02;
      ring.rotation.z = t * 0.1;
      ring2.rotation.z = -t * 0.08;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      globeGeo.dispose();
      innerGeo.dispose();
      nodeGeo.dispose();
      dustGeo.dispose();
      ringGeo.dispose();
      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}

/** Light-theme aurora wash */
export function AuroraBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand-red), transparent 70%)" }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--brand-blue), transparent 70%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,40,.9) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,40,.9) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

export function ElegantBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0 bg-transparent">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: ["0%", "5%", "0%"],
          y: ["0%", "5%", "0%"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand-blue) 0%, transparent 60%)" }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
          x: ["0%", "-5%", "0%"],
          y: ["0%", "-5%", "0%"],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] rounded-full opacity-15 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--brand-red) 0%, transparent 60%)" }}
      />

      {/* The rotating 3D networking globe */}
      <ThreeBackground className="opacity-[0.25]" />

      <FloatingParticles />
      <LightBeams />

      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay noise" />
    </div>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 30 }).map((_, i) => {
    const size = Math.random() * 8 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 20;
    const xDrift = (Math.random() - 0.5) * 150;
    const isRed = i % 2 === 0;

    return (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          background: isRed ? "var(--brand-red)" : "var(--brand-blue)",
          width: size + "px",
          height: size + "px",
          left: left + "%",
          bottom: "-5%",
          filter: "blur(2px)",
        }}
        initial={{ y: 0, x: 0, opacity: 0 }}
        animate={{
          y: "-110vh",
          x: xDrift,
          opacity: [0, 0.4, 0],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          delay: delay,
          ease: "linear",
        }}
      />
    );
  });

  return <div className="absolute inset-0 pointer-events-none">{particles}</div>;
}

function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.35]">
      <motion.div
        animate={{ x: ["-100%", "150%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 -left-1/4 w-[150%] h-[15vh] -rotate-12"
        style={{
          background: "linear-gradient(90deg, transparent, var(--brand-red), transparent)",
          filter: "blur(40px)",
        }}
      />
      <motion.div
        animate={{ x: ["150%", "-100%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-1/4 -right-1/4 w-[150%] h-[20vh] rotate-[15deg]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--brand-blue), transparent)",
          filter: "blur(50px)",
        }}
      />
      <motion.div
        animate={{ y: ["-100%", "200%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/3 -top-1/4 w-[10vw] h-[150%] rotate-12"
        style={{
          background: "linear-gradient(180deg, transparent, var(--brand-red), transparent)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
