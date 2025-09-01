import { motion, AnimatePresence } from 'framer-motion';
import type { Speaker } from '../lib/types';

interface SidebarTimelineProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
  onSpeakerSelect: (speakerId: string) => void;
}

export default function SidebarTimeline({ speakers, selectedSpeaker, onSpeakerSelect }: SidebarTimelineProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-6">
        {speakers.map((speaker, index) => {
          const isSelected = selectedSpeaker === speaker.id;
          const date = new Date();
          date.setHours(14 + index, 0, 0, 0); // 从下午2点开始，每个嘉宾间隔1小时
          
          return (
            <motion.div
              key={speaker.id}
              className="relative cursor-pointer"
              onClick={() => onSpeakerSelect(speaker.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 连接线 */}
              {index < speakers.length - 1 && (
                <motion.div
                  className="absolute left-4 top-8 w-0.5 h-16 bg-gradient-to-b from-gray-600 to-gray-800 z-10"
                  animate={{
                    backgroundColor: isSelected ? 'rgba(6, 182, 212, 0.5)' : 'rgba(75, 85, 99, 0.5)'
                  }}
                />
              )}

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
                    <div className="flex flex-wrap gap-1.5">
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
