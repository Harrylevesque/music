import { useState, useEffect, useRef, useCallback } from 'react';
import Intro from './components/Intro';
import CategoryPage from './components/CategoryPage';
import SongPage from './components/SongPage';
import BackgroundMesh from './components/BackgroundMesh';

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

const categories: Category[] = [
  {
    id: 'intro',
    title: 'Intro',
    subtext: 'Introduction to Music',
    accentColor: '#f54242',
    songs: [
      { 
        id: 'intro1', 
        videoId: 'fGfgYXemKz4', 
        title: 'Car Rehearsal',
        subtext: 'iTromboni',
        image: 'https://i.ytimg.com/vi/fGfgYXemKz4/maxresdefault.jpg'
      },
      { 
        id: 'intro2', 
        videoId: 'CblZS-lz6X8', 
        title: 'Carnaval of the Animals',
        subtext: 'Ecole de Musique Alain Caron',
        image: 'https://i.ytimg.com/vi/CblZS-lz6X8/maxresdefault.jpg',
        start: 3396
      }
    ]
  },
  {
    id: 'influence',
    title: 'Influence',
    subtext: 'Music Influence on my Life',
    accentColor: '#f58742',
    songs: [
      { 
        id: 'inf1', 
        videoId: 'ROL6aJeCFjw', 
        title: 'Piano',
        subtext: 'Harry',
        image: 'https://i.ytimg.com/vi/ROL6aJeCFjw/maxresdefault.jpg'
      },
      { 
        id: 'inf2', 
        videoId: '2fD37Eg2tb8', 
        title: 'Sweden',
        subtext: 'C418',
        image: 'https://i.ytimg.com/vi/2fD37Eg2tb8/maxresdefault.jpg'
      }
    ]
  },
  {
    id: 'newborn',
    title: 'Newborn',
    subtext: 'Ages 0-2',
    accentColor: '#f5d742',
    songs: [
      { 
        id: 'nb1', 
        videoId: 'Nd-A-iiPoLg', 
        title: 'Naked as We Come',
        subtext: 'Iron and Wine',
        image: 'https://f4.bcbits.com/img/a3748599813_2.jpg'
      },
      { 
        id: 'nb2', 
        videoId: 'kORRidv-p0Y', 
        title: 'Deck the Halls',
        subtext: 'Nat King Cole',
        image: 'https://i.scdn.co/image/ab67616d0000b2737e0f75b5aca8deff6e3b4f15'
      }
    ]
  },
  {
    id: 'toddler',
    title: 'Toddler',
    subtext: 'Ages 2-4',
    accentColor: '#42f56c',
    songs: [
      { 
        id: 'tod1', 
        videoId: 'FEzxchU4RUY', 
        title: 'Sing After Me',
        subtext: 'Sesame Street',
        image: 'https://i5.walmartimages.com/asr/ffd6dde5-3d5a-41b5-98bc-737a8213f856_1.8b45680893d8806042b29b1ea6646538.jpeg'
      },
      { 
        id: 'tod2', 
        videoId: 'cyVzjoj96vs', 
        title: 'What I Am',
        subtext: 'Sesame Street',
        image: 'https://i5.walmartimages.com/asr/ffd6dde5-3d5a-41b5-98bc-737a8213f856_1.8b45680893d8806042b29b1ea6646538.jpeg'
      }
    ]
  },
  {
    id: 'child',
    title: 'Child',
    subtext: 'Ages 4-6',
    accentColor: '#42bff5',
    songs: [
      { 
        id: 'ch1', 
        videoId: 'z0AdQl1XOiY', 
        title: 'Our Town',
        subtext: 'Cars',
        image: 'https://static.wikia.nocookie.net/logopedia/images/8/88/Cars_logo.png'
      },
      { 
        id: 'ch2', 
        videoId: 'Taoc4K8SSLg', 
        title: 'We Are Young',
        subtext: 'Jake Coco',
        image: 'https://i.discogs.com/uTyXDK74XB4tnKLaLz-wRmi99JObFUxF_UGkxGVoHK8/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNTQz/MzI1LTE0OTk1ODI0/ODYtNDcyMi5qcGVn.jpeg'
      }
    ]
  },
  {
    id: 'preteen',
    title: 'PreTeen',
    subtext: 'Ages 6-10',
    accentColor: '#4242f5',
    songs: [
      { 
        id: 'pt1', 
        videoId: '47dtFZ8CFo8', 
        title: 'Safe and Sound',
        subtext: 'Capital Cities',
        image: 'https://i.ytimg.com/vi/47dtFZ8CFo8/maxresdefault.jpg'
      },
      { 
        id: 'pt2', 
        videoId: 'k85mRPqvMbE', 
        title: 'Axel F',
        subtext: 'Harold Faltermeyer',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdBwWsqT2iL51LIlqT32RNHHWiATbRwv8Fafvv89valoWD5bV6Sy5433ZYIXEL8rj54O7aW2q2MHceFWbEaUYnR8YyjAChnOmcxXRiG7bMDtmzjYiPjbnx3okH9QApejU&s=10'
      }
    ]
  },
  {
    id: 'teen',
    title: 'Teen',
    subtext: 'Ages 10-14',
    accentColor: '#f542e9',
    songs: [
      { 
        id: 'teen1', 
        videoId: 'aBkTkxKDduc', 
        title: 'Sweden',
        subtext: 'C418',
        image: 'https://i.ytimg.com/vi/aBkTkxKDduc/maxresdefault.jpg'
      },
      { 
        id: 'teen2', 
        videoId: 'MoU2rJ29CzY', 
        title: 'Im Doing Fine',
        subtext: 'Marino',
        image: 'https://i.ytimg.com/vi/yzNXsn68lGs/hq720.jpg'
      }
    ]
  }
];

interface PageItem {
  type: 'intro' | 'category' | 'song';
  category?: Category;
  song?: Song;
  songIndex?: number;
  categoryIndex?: number;
}

const buildPages = (): PageItem[] => {
  const pages: PageItem[] = [{ type: 'intro' }];
  
  categories.forEach((category, catIndex) => {
    pages.push({ type: 'category', category, categoryIndex: catIndex });
    category.songs.forEach((song, songIndex) => {
      pages.push({ type: 'song', category, song, songIndex, categoryIndex: catIndex });
    });
  });
  
  return pages;
};

const pages = buildPages();

function App() {
  const [activePage, setActivePage] = useState(0);
  const [accentColor, setAccentColor] = useState('#8b5cf6');
  const [playingSong, setPlayingSong] = useState<string | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const updateAccentColor = () => {
      const currentPage = pages[activePage];
      if (currentPage.type === 'intro') {
        setAccentColor('#8b5cf6');
      } else if (currentPage.category) {
        setAccentColor(currentPage.category.accentColor);
      }
    };
    updateAccentColor();
  }, [activePage]);

  const pauseVideo = useCallback(() => {
    setPlayingSong(null);
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      e.preventDefault();
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (e.deltaY > 30 && activePage < pages.length - 1) {
        pauseVideo();
        setActivePage(prev => prev + 1);
      } else if (e.deltaY < -30 && activePage > 0) {
        pauseVideo();
        setActivePage(prev => prev - 1);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    };

    const handleTouchStart = () => {
      pauseVideo();
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      return () => {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
      };
    }
  }, [activePage, isScrolling, pages.length, pauseVideo]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (activePage < pages.length - 1) {
          pauseVideo();
          setActivePage(prev => prev + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (activePage > 0) {
          pauseVideo();
          setActivePage(prev => prev - 1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePage, isScrolling, pages.length, pauseVideo]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.style.transform = `translateY(-${activePage * window.innerHeight}px)`;
      scrollContainerRef.current.style.transition = isScrolling ? 'none' : 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  }, [activePage, isScrolling]);

  const scrollToPage = (index: number) => {
    const clampedIndex = Math.max(0, Math.min(index, pages.length - 1));
    pauseVideo();
    setActivePage(clampedIndex);
  };

  const handlePlaySong = (songId: string) => {
    setPlayingSong(prev => prev === songId ? null : songId);
  };

  return (
    <div className="h-screen w-full overflow-hidden relative bg-black">
      <BackgroundMesh accentColor={accentColor} />

      <div 
        ref={scrollContainerRef}
        className="w-full"
        style={{ 
          height: pages.length * 100 + 'vh',
          transform: `translateY(-${activePage * 100}vh)`,
          transition: isScrolling ? 'none' : 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="h-screen w-full sticky top-0">
          <Intro onBegin={() => scrollToPage(1)} />
        </div>

        {pages.slice(1).map((page, index) => {
          const pageIndex = index + 1;
          const isActive = activePage === pageIndex;
          
          if (page.type === 'category' && page.category) {
            return (
              <div key={page.category.id} className="h-screen w-full sticky top-0">
                <CategoryPage
                  category={page.category}
                  isActive={isActive}
                  onBegin={() => scrollToPage(pageIndex + 1)}
                />
              </div>
            );
          }
          
          if (page.type === 'song' && page.category && page.song) {
            return (
              <div key={page.song.id} className="h-screen w-full sticky top-0">
                <SongPage
                  song={page.song}
                  category={page.category}
                  isActive={isActive}
                  isPlaying={playingSong === page.song.id}
                  onTogglePlay={() => handlePlaySong(page.song!.id)}
                />
              </div>
            );
          }
          
          return null;
        })}

        <div className="h-screen w-full sticky top-0 flex items-center justify-center">
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.95) 100%)'
            }}
          />
          <div className="relative z-10 text-center">
            <p className="font-mono text-xs tracking-[0.3em] text-white/30 uppercase">
              End of Journey
            </p>
            <p className="font-mono text-xs tracking-[0.2em] text-white/20 mt-4">
              {categories.reduce((acc, cat) => acc + cat.songs.length, 0)} tracks
            </p>
          </div>
        </div>
      </div>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {pages.slice(1, -1).map((page, index) => {
          const pageIndex = index + 1;
          const color = page.category?.accentColor || '#8b5cf6';
          const label = page.type === 'category' ? page.category?.title : page.song?.title;
          
          return (
            <button
              key={pageIndex}
              onClick={() => scrollToPage(pageIndex)}
              className={`group relative transition-all duration-300 ${
                activePage === pageIndex 
                  ? 'scale-125' 
                  : 'opacity-40 hover:opacity-80 hover:scale-110'
              }`}
              aria-label={`Go to ${label}`}
            >
              <div 
                className="w-2.5 h-2.5 rounded-full"
                style={{ 
                  backgroundColor: activePage === pageIndex ? color : 'rgba(255,255,255,0.4)'
                }}
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-[10px] text-white/50 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {activePage > 0 && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
          <button
            onClick={() => activePage > 0 && scrollToPage(activePage - 1)}
            disabled={activePage === 0}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all disabled:opacity-20"
          >
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          <span className="font-mono text-[10px] text-white/30">
            {activePage}/{pages.length - 1}
          </span>
          <button
            onClick={() => activePage < pages.length - 1 && scrollToPage(activePage + 1)}
            disabled={activePage === pages.length - 1}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all disabled:opacity-20"
          >
            <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
