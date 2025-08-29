import { useState, useEffect } from 'react';
import type { Speaker } from '../lib/types';

interface TalkCardsProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export default function TalkCards({ speakers, selectedSpeaker }: TalkCardsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const speakersPerPage = 2;
  
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

  return (
    <div className="space-y-8">
          <div>
            {paginatedSpeakers.map((speaker) => (
              <div
                key={speaker.id}
              >
                {/* 头部信息 */}
                <div className="mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {speaker.name}
                      </h3>
                      <p className="text-gray-500 mt-1">{speaker.role}</p>
                    </div>
                    <div className="flex gap-2">
                      {speaker.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-sm font-medium text-blue-600 
                                   bg-blue-50 rounded-lg"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* 主要内容 */}
                <div className="p-8">
              {/* 一句话总结 */}
              <div className="mb-8">
                <h4 className="text-lg font-medium text-gray-900 mb-3">分享概要</h4>
                <p className="text-gray-600 bg-gray-50 p-4 rounded-lg">{speaker.talk.one_liner}</p>
              </div>
              
              {/* 关键观点 */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-lg font-medium text-gray-900">关键观点</h4>
                  <span className="px-2 py-0.5 text-sm text-gray-500 bg-gray-100 rounded-md">
                    {speaker.talk.highlights.length} 项
                  </span>
                </div>
                <ul className="space-y-4">
                  {speaker.talk.highlights.map((point, index) => (
                    <li key={index} className="flex items-baseline gap-3">
                      <span className="flex-shrink-0 text-sm font-medium text-blue-600">
                        {index + 1}.
                      </span>
                      <span className="text-gray-600">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 实用技巧 */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-lg font-medium text-gray-900">实用技巧</h4>
                  <span className="px-2 py-0.5 text-sm text-gray-500 bg-gray-100 rounded-md">
                    {speaker.talk.tips.length} 项
                  </span>
                </div>
                <ul className="space-y-4">
                  {speaker.talk.tips.map((tip, index) => (
                    <li key={index} className="flex items-baseline gap-3">
                      <span className="flex-shrink-0 text-sm font-medium text-green-600">
                        {index + 1}.
                      </span>
                      <span className="text-gray-600">
                        {tip}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 分页控制 */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${
              currentPage === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            上一页
          </button>
          <span className="text-sm text-gray-600">
            第 {currentPage + 1} 页，共 {totalPages} 页
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className={`px-4 py-2 rounded ${
              currentPage === totalPages - 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            下一页
          </button>
        </div>
      )}
    </div>
  );
}
