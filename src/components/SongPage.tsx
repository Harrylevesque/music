import { motion, AnimatePresence } from 'framer-motion';
import VinylRecord from './VinylRecord';

interface Song {
  id: string;
  videoId: string;
  title?: string;
  subtext?: string;
  image?: string;
  start?: number;
}

interface Category {
  id: string;
  title: string;
  subtext?: string;
  accentColor: string;
  songs: Song[];
}

interface SongPageProps {
  song: Song;
  category: Category;
  isActive: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const SongPage: React.FC<SongPageProps> = ({
  song,
  category,
  isActive,
  isPlaying,
  onTogglePlay
}) => {
  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        {isPlaying && (
          <motion.div
            key="video-bg"
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${song.videoId}?autoplay=1&loop=1&playlist=${song.videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3${song.start ? `&start=${song.start}` : ''}`}
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
              allow="autoplay; encrypted-media; fullscreen"
            />
            <div 
              className="absolute inset-0" 
              style={{ 
                background: `linear-gradient(135deg, ${category.accentColor}50 0%, transparent 40%, ${category.accentColor}40 100%)`,
              }} 
            />
            <div className="absolute inset-0 bg-black/55" />
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        className="absolute inset-0 z-0"
        style={{
          background: isPlaying ? 'transparent' : `radial-gradient(ellipse at 70% 50%, ${category.accentColor}12 0%, transparent 50%)`
        }}
      />

      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl px-20 gap-16">
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -40 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="space-y-12">
            <motion.span
              className="font-mono text-xs tracking-[0.5em] uppercase"
              style={{ color: category.accentColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 0.5 : 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {category.title}
            </motion.span>

            <motion.h2
              className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-wide text-white leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {song.title}
            </motion.h2>

            {song.subtext && (
              <motion.p
                className="text-lg text-white/50 font-light tracking-[0.3em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: isActive ? 0.6 : 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {song.subtext}
              </motion.p>
            )}

            <motion.div
              className="w-40 h-px"
              style={{
                background: `linear-gradient(90deg, ${category.accentColor}50, transparent)`
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isActive ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            />

            <motion.p
              className="text-base text-white/35 font-light max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: isActive ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Tap the vinyl to {isPlaying ? 'pause' : 'play'} the track
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 60 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
        >
          <VinylRecord
            size={320}
            isPlaying={isPlaying}
            onToggle={onTogglePlay}
            image={song.image}
            accentColor={category.accentColor}
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ opacity: isActive && !isPlaying ? 0.4 : 0 }}
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

      {isPlaying && (
        <motion.button
          className="absolute bottom-8 right-8 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          whileHover={{ opacity: 0.8 }}
          onClick={onTogglePlay}
        >
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          </div>
        </motion.button>
      )}
    </div>
  );
};

export default SongPage;
