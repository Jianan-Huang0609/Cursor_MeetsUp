import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { SidebarTimeline } from './components/SidebarTimeline';
import { HeaderChips } from './components/HeaderChips';
import { TalkCards } from './components/TalkCards';
import { PracticeBoard } from './components/PracticeBoard';
import { PhotoGallery } from './components/PhotoGallery';
import { MeetupData } from './lib/types';
import meetupData from './data/meetup.json';

function App() {
  const [data] = useState<MeetupData>(meetupData);
  const [selectedSpeaker, setSelectedSpeaker] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 左侧时间轴 - 桌面端 */}
      <div className="hidden lg:block">
        <SidebarTimeline 
          speakers={data.speakers} 
          eventDate={data.event.date} 
        />
      </div>

      {/* 主内容区域 */}
      <div className="lg:ml-64">
        {/* 顶部嘉宾选择 */}
        <HeaderChips
          speakers={data.speakers}
          onSpeakerSelect={setSelectedSpeaker}
          selectedSpeaker={selectedSpeaker}
        />

        {/* 主要内容 */}
        <div className="container mx-auto px-6 py-8">
          {/* 活动信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">{data.event.title}</h1>
            <p className="text-xl text-muted-foreground mb-2">
              {data.event.date} · {data.event.place}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {data.event.agenda.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 桌面端两栏布局 */}
          <div className="hidden lg:grid lg:grid-cols-3 lg:gap-8">
            {/* 左侧：演讲卡片 */}
            <div className="lg:col-span-2">
              <TalkCards
                speakers={data.speakers}
                selectedSpeaker={selectedSpeaker}
              />
            </div>

            {/* 右侧：实践面板 */}
            <div className="lg:col-span-1">
              <PracticeBoard
                speakers={data.speakers}
                selectedSpeaker={selectedSpeaker}
              />
            </div>
          </div>

          {/* 移动端单列布局 */}
          <div className="lg:hidden space-y-8">
            <TalkCards
              speakers={data.speakers}
              selectedSpeaker={selectedSpeaker}
            />
            <PracticeBoard
              speakers={data.speakers}
              selectedSpeaker={selectedSpeaker}
            />
          </div>

          {/* 照片画廊 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16"
          >
            <PhotoGallery
              albums={data.albums}
              speakers={data.speakers}
            />
          </motion.div>
        </div>
      </div>

      {/* 返回顶部按钮 */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
