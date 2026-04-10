import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';

interface IntroProps {
  accentColor?: string;
  onBegin?: () => void;
}

const Intro: React.FC<IntroProps> = ({ accentColor = '#8b5cf6', onBegin }) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${accentColor}25 0%, transparent 55%)`
        }}
      />

      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 300 + i * 120,
              height: 300 + i * 120,
              left: '50%',
              top: '50%',
              background: 'transparent',
              border: `1px solid ${accentColor}`,
              opacity: 0.04 - i * 0.004,
              transform: 'translate(-50%, -50%)'
            }}
            animate={{
              rotate: i % 2 === 0 ? 360 : -360,
            }}
            transition={{
              duration: 40 + i * 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center gap-16 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <GlassSurface
            width="56rem"
            height="auto"
            borderRadius={72}
            backgroundOpacity={0.15}
            opacity={0.95}
            blur={80}
            displace={2.5}
            saturation={2}
            distortionScale={-250}
            borderWidth={0.02}
            mixBlendMode="screen"
            className="px-40 py-24"
          >
            <div className="flex flex-col items-center gap-16 text-center">
              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-serif tracking-wide text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                SONIC
              </motion.h1>

              <motion.div
                className="w-48 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}60, transparent)`
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
              />

              <motion.h1
                className="text-7xl md:text-8xl lg:text-9xl font-serif tracking-wide text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
              >
                JOURNEY
              </motion.h1>
            </div>
          </GlassSurface>
        </motion.div>

        <motion.p
          className="text-sm text-white/35 max-w-md font-light tracking-[0.35em] uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          An Immersive Music Experience
        </motion.p>

        <motion.div
          className="w-px h-20"
          style={{
            background: `linear-gradient(180deg, ${accentColor}50, transparent)`
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        />

        <motion.button
          className="group cursor-pointer"
          onClick={(e) => { e.stopPropagation(); if (onBegin) onBegin(); }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <GlassSurface
            width="auto"
            height="auto"
            borderRadius={40}
            backgroundOpacity={0.15}
            opacity={0.9}
            blur={45}
            displace={1.5}
            saturation={1.8}
            borderWidth={0.02}
            mixBlendMode="screen"
            className="px-10 py-5"
          >
            <div className="flex items-center gap-4">
              <span className="text-sm font-mono tracking-[0.25em] uppercase text-white/50 group-hover:text-white/70 transition-colors">
                Begin
              </span>
              <motion.svg
                className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </div>
          </GlassSurface>
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        animate={{ opacity: 0.4 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Intro;
