import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Speaker } from '../lib/types';

interface TalkCardsProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export default function TalkCards({ speakers, selectedSpeaker }: TalkCardsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const speakersPerPage = 1; // 每页显示一个嘉宾
  
  const displaySpeakers = selectedSpeaker
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const totalPages = Math.ceil(displaySpeakers.length / speakersPerPage);
  const paginatedSpeakers = displaySpeakers.slice(
    currentPage * speakersPerPage,
    (currentPage + 1) * speakersPerPage
  );

  // 处理键盘导航
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // 添加键盘事件监听
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, totalPages]);

  // 当选中嘉宾改变时，重置页码
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedSpeaker]);

  // 将详细分享内容转换为 bullet points
  const parseTalkContent = (content: string) => {
    // 按分号、句号、换行符分割内容
    const points = content
      .split(/[；。\n]/)
      .map(point => point.trim())
      .filter(point => point.length > 0);
    
    return points;
  };

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {paginatedSpeakers.map((speaker, index) => {
          const talkPoints = parseTalkContent(speaker.talk.one_liner);
          
          return (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="space-y-6"
            >
              {/* 嘉宾信息头部 */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-400">{speaker.role}</p>
                  </div>
                  <div className="flex gap-2">
                    {speaker.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium text-cyan-400 
                                 bg-cyan-500/20 rounded-full border border-cyan-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 一句话总结 */}
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/20">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  一句话总结
                </h4>
                <p className="text-gray-300 leading-relaxed">{speaker.summary}</p>
              </div>
              
              {/* 详细分享内容 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-lg font-semibold text-gray-100 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    详细分享
                  </h4>
                </div>
                
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg border border-cyan-500/20">
                  <div className="space-y-3">
                    {talkPoints.map((point, pointIndex) => (
                      <motion.div
                        key={pointIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: pointIndex * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="flex-shrink-0 w-2 h-2 bg-cyan-400 rounded-full mt-2 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></span>
                        <p className="text-gray-300 leading-relaxed">
                          {point}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>上一个</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  i === currentPage 
                    ? 'bg-cyan-400' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600"
          >
            <span>下一个</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
