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
    <div className="space-y-6">
      <div className="space-y-6">
        {paginatedSpeakers.map((speaker) => (
          <div
            key={speaker.id}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 
                     transition-all duration-300 hover:shadow-md"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {speaker.name}
                  </h3>
                  <p className="text-sm text-gray-500">{speaker.role}</p>
                </div>
                <div className="flex gap-2">
                  {speaker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs font-medium bg-gray-100 
                               text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 italic">"{speaker.talk.one_liner}"</p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">关键观点</span>
                  <span className="text-xs text-gray-500">
                    ({speaker.talk.highlights.length}项)
                  </span>
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {speaker.talk.highlights.map((point, index) => (
                    <li key={index} className="text-gray-700 hover:text-gray-900 
                                             transition-colors">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <span className="mr-2">实用技巧</span>
                  <span className="text-xs text-gray-500">
                    ({speaker.talk.tips.length}项)
                  </span>
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  {speaker.talk.tips.map((tip, index) => (
                    <li key={index} className="text-gray-700 hover:text-gray-900 
                                             transition-colors">
                      {tip}
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
