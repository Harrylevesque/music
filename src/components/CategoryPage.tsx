import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';

interface Category {
  id: string;
  title: string;
  subtext?: string;
  accentColor: string;
  songs: { id: string; title?: string; subtext?: string }[];
}

interface CategoryPageProps {
  category: Category;
  isActive: boolean;
  onBegin: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, isActive, onBegin }) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, ${category.accentColor}20 0%, transparent 55%)`
        }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 30 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <GlassSurface
          width="68rem"
          height="auto"
          borderRadius={72}
          backgroundOpacity={0.15}
          opacity={0.95}
          blur={70}
          displace={2.5}
          saturation={1.8}
          distortionScale={-200}
          borderWidth={0.02}
          mixBlendMode="screen"
          className="px-16 py-24"
        >
          <div className="flex flex-col items-center gap-10 text-center">
            <motion.span
              className="font-mono text-xs tracking-[1em] uppercase"
              style={{ color: category.accentColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.6 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {category.title}
            </motion.span>

            <motion.h2
              className="text-8xl md:text-9xl lg:text-[10rem] font-serif tracking-[0.25em] text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              {category.title}
            </motion.h2>

            <motion.div
              className="w-56 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, ${category.accentColor}50, transparent)`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            />

            <motion.p
              className="text-base text-white/35 font-light tracking-[0.5em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {category.subtext || `${category.songs.length} tracks`}
            </motion.p>
          </div>
        </GlassSurface>

        <motion.div
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isActive ? 0.4 : 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.5em] uppercase text-white/40">
            Explore Tracks
          </span>
        </motion.div>

        <motion.button
          onClick={onBegin}
          className="cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <GlassSurface
            width="auto"
            height="auto"
            borderRadius={40}
            backgroundOpacity={0.12}
            opacity={0.85}
            blur={40}
            displace={1.2}
            saturation={1.5}
            borderWidth={0.015}
            mixBlendMode="screen"
            className="px-8 py-4"
          >
            <div className="flex items-center gap-5">
              <span className="text-sm font-mono tracking-[0.5em] uppercase text-white/50">
                View Tracks
              </span>
              <motion.svg
                className="w-4 h-4 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </div>
          </GlassSurface>
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ opacity: isActive ? 0.3 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/30"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CategoryPage;
