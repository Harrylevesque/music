import { useState } from 'react';
import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';

interface VinylRecordProps {
  size?: number;
  isPlaying?: boolean;
  onToggle?: () => void;
  className?: string;
  image?: string;
  accentColor?: string;
}

const VinylRecord: React.FC<VinylRecordProps> = ({
  size = 200,
  isPlaying = false,
  onToggle,
  className = '',
  image,
  accentColor = '#8b5cf6'
}) => {
  const [imageError, setImageError] = useState(false);
  const showImage = image && !imageError;

  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
    >
      <GlassSurface
        width={size}
        height={size}
        borderRadius={size / 2}
        backgroundOpacity={0.25}
        opacity={0.75}
        blur={60}
        displace={2}
        saturation={1.2}
        distortionScale={-250}
        borderWidth={0.04}
        mixBlendMode="screen"
        className="overflow-hidden"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <radialGradient id="vinylTint" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0.05" />
            </radialGradient>
            
            <clipPath id="vinylImageClip">
              <circle cx="100" cy="100" r="40" />
            </clipPath>
            
            <filter id="vinylGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="100" cy="100" r="98" fill="url(#vinylTint)" />

          <circle cx="100" cy="100" r="40" fill={showImage ? 'transparent' : accentColor} fillOpacity="0.3" filter="url(#vinylGlow)" />

          {showImage && (
            // --- CHANGE HERE: Changed <g> to <motion.g> to allow animations ---
            <motion.g 
              clipPath="url(#vinylImageClip)"
              // Set the origin of rotation to the center of the image
              style={{ transformOrigin: 'center' }}
              // Animate rotation based on isPlaying state
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={isPlaying ? {
                duration: 3, // Seconds per rotation
                repeat: Infinity,
                ease: "linear"
              } : { duration: 0 }}
            >
              <image
                href={image}
                x="60"
                y="60"
                width="80"
                height="80"
                preserveAspectRatio="xMidYMid slice"
                onError={() => setImageError(true)}
              />
              <circle
                cx="100"
                cy="100"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
            </motion.g>
          )}

          {!showImage && (
            <>
              <circle cx="100" cy="100" r="32" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="100" cy="100" r="24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
            </>
          )}

          <circle cx="100" cy="100" r="7" fill="#0a0a0a" stroke={accentColor} strokeWidth="1" opacity="0.9" />
        </svg>
      </GlassSurface>

      {isPlaying && (
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-end gap-0.5 h-5">
            {[1, 1.5, 2, 1.2, 1.7, 1, 1.4].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 rounded-full"
                style={{ backgroundColor: accentColor }}
                animate={{ scaleY: [1, 1.6, 0.6, 1.4, 1] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VinylRecord;
