import { motion, AnimatePresence } from 'framer-motion';
import type { Speaker } from '../lib/types';

interface SidebarTimelineProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
  onSpeakerSelect: (speakerId: string) => void;
}

export default function SidebarTimeline({ speakers, selectedSpeaker, onSpeakerSelect }: SidebarTimelineProps) {
  return (
    <div className="relative">
      {/* 时间线连接线 - 光感紫粉渐变 */}
      <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 shadow-lg" />
      
      <div className="space-y-8">
        {speakers.map((speaker, index) => {
          const isSelected = selectedSpeaker === speaker.id;
          const date = new Date();
          date.setHours(14 + index, 0, 0, 0); // 从下午2点开始，每个嘉宾间隔1小时
          
          return (
            <motion.div
              key={speaker.id}
              className="relative cursor-pointer group"
              onClick={() => onSpeakerSelect(speaker.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 时间线节点 */}
              <div className="flex items-start gap-6">
                {/* 时间点 - 光感紫粉渐变 */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-4 h-4 rounded-full border-3 relative z-10 shadow-lg"
                    animate={{
                      backgroundColor: isSelected ? '#ec4899' : '#1f2937',
                      borderColor: isSelected ? '#ec4899' : '#4b5563',
                      scale: isSelected ? 1.3 : 1,
                      boxShadow: isSelected ? '0 0 0 4px rgba(236, 72, 153, 0.3), 0 0 20px rgba(236, 72, 153, 0.5)' : '0 0 0 0px rgba(236, 72, 153, 0)'
                    }}
                    whileHover={{
                      scale: isSelected ? 1.3 : 1.2,
                      borderColor: '#ec4899',
                      boxShadow: isSelected ? '0 0 0 4px rgba(236, 72, 153, 0.3), 0 0 20px rgba(236, 72, 153, 0.5)' : '0 0 0 2px rgba(236, 72, 153, 0.3), 0 0 10px rgba(236, 72, 153, 0.3)'
                    }}
                  />
                  
                  {/* 时间标签 - 更明显 */}
                  <motion.div 
                    className="text-sm text-gray-400 mt-3 font-semibold"
                    animate={{ 
                      color: isSelected ? '#ec4899' : '#6b7280',
                      fontWeight: isSelected ? '700' : '600'
                    }}
                  >
                    {date.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </motion.div>
                </div>

                {/* 内容卡片 - 光感效果 */}
                <motion.div 
                  className="flex-1 min-w-0"
                  animate={{
                    backgroundColor: isSelected ? 'rgba(236, 72, 153, 0.1)' : 'transparent'
                  }}
                >
                  <div className={`p-5 rounded-xl border transition-all duration-300 ${
                    isSelected 
                      ? 'border-pink-500/50 bg-gray-900/80 shadow-xl shadow-pink-500/20 backdrop-blur-sm' 
                      : 'border-transparent hover:border-gray-600 hover:bg-gray-900/50'
                  }`}>
                    {/* 嘉宾姓名 */}
                    <motion.h3
                      className="text-lg font-bold mb-2 truncate"
                      animate={{
                        color: isSelected ? '#ec4899' : '#f3f4f6'
                      }}
                    >
                      {speaker.name}
                    </motion.h3>
                    
                    {/* 嘉宾角色 */}
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {speaker.role}
                    </p>
                    
                    {/* 标签 - 光感紫粉渐变 */}
                    <div className="flex flex-wrap gap-2">
                      {speaker.tags.slice(0, 3).map(tag => (
                        <motion.span
                          key={tag}
                          className="px-3 py-1.5 text-xs rounded-lg font-semibold"
                          animate={{
                            backgroundColor: isSelected ? 'rgba(236, 72, 153, 0.2)' : 'rgba(75, 85, 99, 0.3)',
                            color: isSelected ? '#f9a8d4' : '#d1d5db'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {speaker.tags.length > 3 && (
                        <span className="px-3 py-1.5 text-xs text-gray-500 bg-gray-800/50 rounded-lg">
                          +{speaker.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* 选中状态指示器 */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute top-3 right-3 w-3 h-3 bg-pink-500 rounded-full shadow-lg"
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
