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
      {/* 时间线连接线 */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />
      
      <div className="space-y-6">
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
              <div className="flex items-start gap-4">
                {/* 时间点 */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <motion.div
                    className="w-3 h-3 rounded-full border-2 relative z-10"
                    animate={{
                      backgroundColor: isSelected ? '#1e293b' : '#ffffff',
                      borderColor: isSelected ? '#1e293b' : '#cbd5e1',
                      scale: isSelected ? 1.2 : 1,
                    }}
                    whileHover={{
                      scale: isSelected ? 1.2 : 1.1,
                      borderColor: '#1e293b',
                    }}
                  />
                  
                  {/* 时间标签 */}
                  <motion.div 
                    className="text-xs text-slate-500 mt-2 font-medium"
                    animate={{ 
                      color: isSelected ? '#1e293b' : '#64748b',
                      fontWeight: isSelected ? '600' : '500'
                    }}
                  >
                    {date.toLocaleTimeString('zh-CN', { 
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </motion.div>
                </div>

                {/* 内容卡片 */}
                <motion.div 
                  className="flex-1 min-w-0"
                  animate={{
                    backgroundColor: isSelected ? '#f8fafc' : 'transparent'
                  }}
                >
                  <div className={`p-4 rounded-lg border transition-all duration-200 ${
                    isSelected 
                      ? 'border-slate-300 bg-slate-50 shadow-sm' 
                      : 'border-transparent hover:border-slate-200 hover:bg-slate-50'
                  }`}>
                    {/* 嘉宾姓名 */}
                    <motion.h3
                      className="text-base font-semibold mb-1 truncate"
                      animate={{
                        color: isSelected ? '#1e293b' : '#334155'
                      }}
                    >
                      {speaker.name}
                    </motion.h3>
                    
                    {/* 嘉宾角色 */}
                    <p className="text-sm text-slate-500 mb-3 line-clamp-2">
                      {speaker.role}
                    </p>
                    
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1.5">
                      {speaker.tags.slice(0, 2).map(tag => (
                        <motion.span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-md font-medium"
                          animate={{
                            backgroundColor: isSelected ? '#1e293b' : '#f1f5f9',
                            color: isSelected ? '#ffffff' : '#475569'
                          }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                      {speaker.tags.length > 2 && (
                        <span className="px-2 py-1 text-xs text-slate-400">
                          +{speaker.tags.length - 2}
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
                          className="absolute top-2 right-2 w-2 h-2 bg-slate-900 rounded-full"
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
