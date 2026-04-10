import { useMemo } from 'react';
import { motion } from 'framer-motion';

interface BackgroundMeshProps {
  accentColor?: string;
}

const BackgroundMesh: React.FC<BackgroundMeshProps> = ({ accentColor = '#8b5cf6' }) => {
  const orbs = useMemo(() => [
    { x: '15%', y: '25%', size: '900px', duration: 40 },
    { x: '80%', y: '35%', size: '800px', duration: 45 },
    { x: '50%', y: '75%', size: '850px', duration: 42 },
    { x: '25%', y: '85%', size: '700px', duration: 48 },
  ], []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-black" />
      
      <svg className="absolute inset-0 w-full h-full opacity-[0.015]">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${accentColor}15 0%, transparent 60%)`,
            transform: 'translate(-50%, -50%)'
          }}
          animate={{
            x: [0, 100, -60, 50, 0],
            y: [0, -80, 60, -40, 0],
            scale: [1, 1.15, 0.9, 1.08, 1]
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}

      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.012) 1px, transparent 0)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${accentColor}08 0%, transparent 50%)`
        }}
      />
    </div>
  );
};

export default BackgroundMesh;
