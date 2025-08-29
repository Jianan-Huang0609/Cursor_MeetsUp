import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Speaker } from '../lib/types';

interface SidebarTimelineProps {
  speakers: Speaker[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function SidebarTimeline({ speakers, selected, onSelect }: SidebarTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected && timelineRef.current) {
      const selectedElement = timelineRef.current.querySelector(`[data-id="${selected}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selected]);

  // 动态计算时间线的高度
  useEffect(() => {
    if (lineRef.current && timelineRef.current) {
      const timeline = timelineRef.current;
      const points = timeline.querySelectorAll('.timeline-point');
      if (points.length > 0) {
        const firstPoint = points[0];
        const lastPoint = points[points.length - 1];
        const distance = lastPoint.getBoundingClientRect().bottom - firstPoint.getBoundingClientRect().top;
        lineRef.current.style.height = `${distance}px`;
      }
    }
  }, [speakers.length]);

  return (
    <div className="sticky top-0 max-h-screen overflow-y-auto px-8" ref={timelineRef}>
      <div className="relative space-y-16 py-8">
        {/* 背景时间线 */}
        <div
          ref={lineRef}
          className="absolute left-[52px] w-1 bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200"
          style={{ top: '60px' }}
        />

        {speakers.map((speaker, index) => {
          const isSelected = speaker.id === selected;
          const date = new Date("2025-08-16");
          date.setHours(9 + index * 2);

          return (
            <motion.div
              key={speaker.id}
              data-id={speaker.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                scale: isSelected ? 1.05 : 1
              }}
              whileHover={{ scale: isSelected ? 1.05 : 1.02 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className={`group flex gap-4 items-start cursor-pointer relative z-10`}
              onClick={() => onSelect(speaker.id === selected ? null : speaker.id)}
            >
              {/* 时间和点 */}
              <div className="flex flex-col items-center">
                <motion.div 
                  className="text-xl text-gray-500 mb-3 w-20 text-right font-medium"
                  animate={{ color: isSelected ? '#2563EB' : '#6B7280' }}
                >
                  {date.toLocaleTimeString('zh-CN', { 
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </motion.div>
                <motion.div
                  className="timeline-point w-8 h-8 rounded-full border-4 relative z-20"
                  animate={{
                    scale: isSelected ? 1.25 : 1,
                    backgroundColor: isSelected ? '#2563EB' : '#FFFFFF',
                    borderColor: isSelected ? '#2563EB' : '#D1D5DB'
                  }}
                  whileHover={{
                    scale: isSelected ? 1.25 : 1.1,
                    borderColor: isSelected ? '#2563EB' : '#60A5FA'
                  }}
                />
              </div>

              {/* 内容区域 */}
              <motion.div 
                className="flex-1"
                animate={{
                  backgroundColor: isSelected ? 'rgba(219, 234, 254, 0.3)' : 'transparent'
                }}
              >
                <div className="pl-4 py-2 rounded-xl">
                  <motion.h3
                    className="text-2xl font-medium mb-2"
                    animate={{
                      color: isSelected ? '#2563EB' : '#374151'
                    }}
                  >
                    {speaker.name}
                  </motion.h3>
                  <p className="text-base text-gray-500 mb-4">{speaker.role}</p>
                  
                  {/* 标签云 */}
                  <div className="flex flex-wrap gap-2">
                    {speaker.tags.map(tag => (
                      <motion.span
                        key={tag}
                        className="px-3 py-1.5 text-base rounded-lg"
                        animate={{
                          backgroundColor: isSelected ? 'rgba(219, 234, 254, 0.8)' : 'rgba(243, 244, 246, 0.8)',
                          color: isSelected ? '#1D4ED8' : '#4B5563'
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  {/* 一句话总结 */}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 text-gray-600 line-clamp-2 text-base leading-relaxed"
                      >
                        {speaker.talk.one_liner}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
