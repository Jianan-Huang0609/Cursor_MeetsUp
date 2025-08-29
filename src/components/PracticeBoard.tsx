import { useState } from 'react';
import type { Speaker } from '../lib/types';

interface PracticeBoardProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export default function PracticeBoard({ speakers, selectedSpeaker }: PracticeBoardProps) {
  const [copiedTimeout, setCopiedTimeout] = useState<number | null>(null);

  const displaySpeakers = selectedSpeaker
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const handleCopy = () => {
    const text = displaySpeakers
      .map(s => `# ${s.name} 的实践总结\n\n${s.practice.map(p => `- ${p}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    
    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }
    const timeout = window.setTimeout(() => {
      setCopiedTimeout(null);
    }, 2000);
    setCopiedTimeout(timeout);
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      {/* 顶部操作栏 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">个人实践与思考</h2>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 text-sm font-medium rounded-full
            transition-all duration-300 flex items-center gap-2
            ${
              copiedTimeout
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          {copiedTimeout ? (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>已复制</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>复制为 Markdown</span>
            </>
          )}
        </button>
      </div>
      
      {/* 内容区域 */}
      <div className="space-y-8">
        {displaySpeakers.map((speaker) => (
          <div 
            key={speaker.id} 
            className="bg-white"
          >
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900">个人实践与思考</h3>
              <p className="text-sm text-gray-500 mt-1">以下是 {speaker.name} 的观点与思考</p>
            </div>

            <div className="space-y-6">
              {speaker.practice.map((item, index) => (
                <div key={index} className="text-gray-600">
                  {item}
                </div>
              ))}
            </div>
            
            {/* 关联标签 */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
              {speaker.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
