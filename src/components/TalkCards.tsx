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

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {paginatedSpeakers.map((speaker, index) => (
          <motion.div
            key={speaker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="space-y-6"
          >
            {/* 嘉宾信息头部 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-gray-600">{speaker.role}</p>
                </div>
                <div className="flex gap-2">
                  {speaker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium text-blue-600 
                               bg-blue-100 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 分享概要 */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
              <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                分享概要
              </h4>
              <p className="text-gray-700 leading-relaxed">{speaker.talk.one_liner}</p>
            </div>
            
            {/* 关键观点 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  关键观点
                </h4>
                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                  {speaker.talk.highlights.length} 项
                </span>
              </div>
              <div className="space-y-3">
                {speaker.talk.highlights.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* 实用技巧 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  实用技巧
                </h4>
                <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                  {speaker.talk.tips.length} 项
                </span>
              </div>
              <div className="space-y-3">
                {speaker.talk.tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 leading-relaxed">
                      {tip}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center pt-6 border-t border-gray-200"
        >
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>上一页</span>
          </button>
          
          <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            第 {currentPage + 1} 页，共 {totalPages} 页
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              currentPage === totalPages - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
            }`}
          >
            <span>下一页</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      )}

      {/* 键盘提示 */}
      {totalPages > 1 && (
        <div className="text-center text-xs text-gray-500 bg-gray-50 p-2 rounded-lg">
          💡 提示：使用键盘 ← → 键可以翻页
        </div>
      )}
    </div>
  );
}
