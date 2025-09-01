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
    <div className="relative" ref={timelineRef}>
      <div className="space-y-6">
        {/* 背景时间线 */}
        <div
          ref={lineRef}
          className="absolute left-[52px] w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
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
                scale: isSelected ? 1.02 : 1
              }}
              whileHover={{ scale: isSelected ? 1.02 : 1.01 }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              className={`group relative cursor-pointer`}
              onClick={() => onSelect(speaker.id === selected ? null : speaker.id)}
            >
              {/* 时间和点 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center">
                  <motion.div 
                    className="text-sm text-gray-400 mb-3 w-20 text-right font-medium"
                    animate={{ color: isSelected ? '#06b6d4' : '#9ca3af' }}
                  >
                    {date.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </motion.div>
                  <motion.div
                    className="timeline-point w-8 h-8 rounded-full border-4 relative z-20 bg-gray-800"
                    animate={{
                      scale: isSelected ? 1.25 : 1,
                      backgroundColor: isSelected ? '#06b6d4' : '#1f2937',
                      borderColor: isSelected ? '#06b6d4' : '#4b5563',
                      boxShadow: isSelected ? '0 0 0 4px rgba(6, 182, 212, 0.2), 0 0 15px rgba(6, 182, 212, 0.5)' : '0 0 0 0px rgba(6, 182, 212, 0)'
                    }}
                    whileHover={{
                      scale: isSelected ? 1.25 : 1.1,
                      borderColor: isSelected ? '#06b6d4' : '#06b6d4',
                      boxShadow: isSelected ? '0 0 0 4px rgba(6, 182, 212, 0.2), 0 0 15px rgba(6, 182, 212, 0.5)' : '0 0 0 2px rgba(6, 182, 212, 0.3), 0 0 8px rgba(6, 182, 212, 0.3)'
                    }}
                  />
                </div>

                {/* 内容区域 */}
                <motion.div 
                  className="flex-1"
                  animate={{
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
                  }}
                >
                  <div className="pl-4 py-3 rounded-xl transition-all duration-200">
                    <motion.h3
                      className="text-lg font-semibold mb-2"
                      animate={{
                        color: isSelected ? '#06b6d4' : '#f3f4f6'
                      }}
                    >
                      {speaker.name}
                    </motion.h3>
                    <p className="text-sm text-gray-400 mb-3">{speaker.role}</p>
                    
                    {/* 标签云 */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {speaker.tags.map(tag => (
                        <motion.span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md font-medium"
                          animate={{
                            backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.2)' : 'rgba(75, 85, 99, 0.3)',
                            color: isSelected ? '#06b6d4' : '#d1d5db'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* 一句话总结 */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-3 p-3 bg-gray-800/50 rounded-lg border border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        >
                          <p className="text-sm text-gray-300 leading-relaxed">
                            {speaker.talk.one_liner}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* 选中状态指示器 */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-2 right-2 w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
