import { motion } from 'framer-motion';
import GlassSurface from './GlassSurface';
import YouTubeEmbed from './YouTubeEmbed';

interface Video {
  id: string;
  videoId: string;
  title: string;
}

interface MusicSectionProps {
  id?: string;
  title: string;
  description?: string;
  titleImage?: string;
  videos: Video[];
  reverse?: boolean;
}

const MusicSection: React.FC<MusicSectionProps> = ({
  id,
  title,
  description,
  titleImage,
  videos,
  reverse = false
}) => {
  return (
    <section id={id} className="py-48 px-12 relative">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-start`}>
        <motion.div
          className="flex-1 space-y-10"
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <GlassSurface
            width="100%"
            height="auto"
            borderRadius={48}
            backgroundOpacity={0.025}
            opacity={0.97}
            blur={25}
            displace={0.4}
            saturation={1.8}
            distortionScale={-200}
            borderWidth={0.015}
            mixBlendMode="screen"
            className="p-16 lg:p-20"
          >
            <div className="space-y-8">
              {titleImage && (
                <motion.img
                  src={titleImage}
                  alt=""
                  className="w-full h-64 object-cover rounded-2xl opacity-80"
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 0.8, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />
              )}

              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {title}
              </motion.h2>

              {description && (
                <motion.p
                  className="text-lg text-white/40 leading-relaxed max-w-lg font-light"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {description}
                </motion.p>
              )}

              <motion.div
                className="w-32 h-px bg-gradient-to-r from-white/30 via-white/10 to-transparent"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 128, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </GlassSurface>
        </motion.div>

        <motion.div
          className="flex-1 grid grid-cols-1 gap-10 w-full"
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-150px' }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.15 }}
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <YouTubeEmbed
                videoId={video.videoId}
                title={video.title}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.008] rounded-full blur-[250px] -z-10 pointer-events-none"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      />
    </section>
  );
};

export default MusicSection;
