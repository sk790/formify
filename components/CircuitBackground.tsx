"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CircuitBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate random data beams flowing through the grid - Reduced count for performance
  const beams = Array.from({ length: 12 }).map((_, i) => {
    const isHorizontal = Math.random() > 0.5;
    const position = Math.floor(Math.random() * 100);
    const delay = Math.random() * 5;
    const duration = 4 + Math.random() * 4;
    return { id: i, isHorizontal, position, delay, duration };
  });

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Flowing Data Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className={`absolute will-change-transform ${beam.isHorizontal
              ? "h-[2px] w-1/4 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
              : "w-[2px] h-1/4 bg-gradient-to-b from-transparent via-teal-500 to-transparent"
            }`}
          style={{
            top: beam.isHorizontal ? `${beam.position}%` : "-25%",
            left: beam.isHorizontal ? "-25%" : `${beam.position}%`,
            // box-shadow removed to prevent massive paint lag
          }}
          initial={{
            x: beam.isHorizontal ? "-100vw" : 0,
            y: beam.isHorizontal ? 0 : "-100vh",
            opacity: 0,
          }}
          animate={{
            x: beam.isHorizontal ? "100vw" : 0,
            y: beam.isHorizontal ? 0 : "100vh",
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: beam.duration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Soft Glow Orbs for ambient lighting */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0) 70%)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[20%] w-[60%] h-[60%] rounded-full will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(217, 70, 239, 0.3) 0%, rgba(217, 70, 239, 0) 70%)' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.05, 1], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] left-[20%] w-[60%] h-[60%] rounded-full will-change-transform" 
          style={{ background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(6, 182, 212, 0) 70%)' }}
        />
      </div>
    </div>
  );
}
