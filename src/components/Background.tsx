import { useEffect, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { NetworkParticles } from "./NetworkParticles";

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
      color: 0x003d7a,
      wireframe: true,
      transparent: true,
      opacity: 0.28,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    group.add(globe);

    // Inner red wire (smaller)
    const innerGeo = new THREE.IcosahedronGeometry(1.55, 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xc8102e,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // Glowing nodes on outer sphere
    const nodeCount = 80;
    const nodeGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const nodeRed = new THREE.MeshBasicMaterial({ color: 0xc8102e });
    const nodeBlue = new THREE.MeshBasicMaterial({ color: 0x003d7a });
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
      color: 0x003d7a,
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
      color: 0xc8102e,
      transparent: true,
      opacity: 0.35,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(3.6, 0.004, 8, 200),
      new THREE.MeshBasicMaterial({ color: 0x003d7a, transparent: true, opacity: 0.3 }),
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

import { useLocation } from "@tanstack/react-router";
import teraitBgVideo from "../assets/terait-bg-1080p-16x9.mp4";
import { ThreeGlobe } from "./ThreeGlobe";

export function VideoBackground() {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const isAltVideo = path.includes("/services") || path.includes("/products");
  const isAboutPage = path.includes("about");

  let videoSrc = "/background-video.mp4";
  if (isAltVideo) videoSrc = "/terait-loop-1080p-fast.mp4";
  if (isAboutPage) videoSrc = teraitBgVideo;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Gentle Animated Globs synchronized across pages */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-20 mix-blend-multiply">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: ["-10%", "5%", "-10%"],
            y: ["-5%", "10%", "-5%"]
          }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-0 left-0 h-[800px] w-[800px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(253,224,71,0.4) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: ["10%", "-5%", "10%"],
            y: ["10%", "-5%", "10%"]
          }}
          transition={{ duration: 25, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-1/4 right-0 h-[900px] w-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,114,182,0.4) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: ["0%", "-10%", "0%"],
            y: ["10%", "-5%", "10%"]
          }}
          transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
          className="absolute bottom-0 left-1/3 h-[700px] w-[1000px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4) 0%, transparent 70%)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 z-0 pointer-events-none opacity-80"
        >
          <ThreeGlobe />
        </motion.div>
      </div>
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover z-10 opacity-100"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 z-20"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, rgba(240,245,255,0.7) 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-20 opacity-[0.03]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Interactive Neural Network Particles */}
      <NetworkParticles />
    </div>
  );
}
