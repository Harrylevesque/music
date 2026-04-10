import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import GlassSurface from './GlassSurface';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'Music Video',
  width = '100%',
  height = 320,
  className = ''
}) => {
  const [isActivated, setIsActivated] = useState(false);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '150px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height: isActivated ? height : 'auto' }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
    >
      <GlassSurface
        width="100%"
        height={isActivated ? (typeof height === 'number' ? `${height}px` : height) : '280px'}
        borderRadius={36}
        backgroundOpacity={0.02}
        opacity={0.98}
        blur={30}
        displace={0.5}
        saturation={2}
        distortionScale={-250}
        borderWidth={0.01}
        mixBlendMode="screen"
        className="w-full"
      >
        {!isActivated ? (
          <div
            className="relative w-full h-56 cursor-pointer group"
            onClick={() => setIsActivated(true)}
          >
            {isVisible && (
              <>
                {!thumbnailLoaded && (
                  <div className="absolute inset-0 bg-white/[0.02] animate-pulse" />
                )}
                <img
                  src={thumbnailUrl}
                  alt={title}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    thumbnailLoaded ? 'opacity-90' : 'opacity-0'
                  } group-hover:opacity-60 group-hover:scale-105`}
                  onLoad={() => setThumbnailLoaded(true)}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </>
            )}

            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <div className="w-24 h-24 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/[0.15] group-hover:border-white/20 transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(255,255,255,0.1)]">
                <Play className="w-9 h-9 text-white fill-white ml-1" />
              </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <h3 className="text-xl font-light text-white tracking-wide">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          <motion.div
            className="w-full"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full rounded-2xl"
              style={{ height: typeof height === 'number' ? height - 24 : 296 }}
            />
          </motion.div>
        )}
      </GlassSurface>
    </motion.div>
  );
};

export default YouTubeEmbed;
