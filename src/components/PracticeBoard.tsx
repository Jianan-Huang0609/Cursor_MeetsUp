import { useState } from 'react';
import type { Speaker } from '../lib/types';

interface PracticeBoardProps {
  speakers: Speaker[];
  selectedSpeaker: string | null;
}

export default function PracticeBoard({ speakers, selectedSpeaker }: PracticeBoardProps) {
  const [copiedTimeout, setCopiedTimeout] = useState<number | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const displaySpeakers = selectedSpeaker
    ? speakers.filter(s => s.id === selectedSpeaker)
    : speakers;

  const handleCopy = () => {
    const text = displaySpeakers
      .map(s => `# ${s.name} 的实践总结\n\n${s.practice.map(p => `- ${p}`).join('\n')}`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    
    // 显示复制成功提示
    if (copiedTimeout) {
      clearTimeout(copiedTimeout);
    }
    const timeout = window.setTimeout(() => {
      setCopiedTimeout(null);
    }, 2000);
    setCopiedTimeout(timeout);
  };

  const toggleExpand = (speakerId: string) => {
    setExpandedItems(prev => 
      prev.includes(speakerId)
        ? prev.filter(id => id !== speakerId)
        : [...prev, speakerId]
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      {/* 顶部标题栏 */}
      <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">实践与思考</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {displaySpeakers.length} 位嘉宾的实践总结
          </span>
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
            {copiedTimeout ? '✓ 已复制' : '复制为 Markdown'}
          </button>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="divide-y divide-gray-100">
        {displaySpeakers.map((speaker) => (
          <div key={speaker.id} className="p-6">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleExpand(speaker.id)}
            >
              <h3 className="text-sm font-medium text-gray-900 flex items-center gap-2">
                <span>{speaker.name}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500">{speaker.role}</span>
              </h3>
              <button className="text-gray-400 hover:text-gray-600">
                {expandedItems.includes(speaker.id) ? '收起' : '展开'}
              </button>
            </div>

            <div className={`mt-4 space-y-3 overflow-hidden transition-all duration-300
              ${expandedItems.includes(speaker.id) ? 'max-h-96' : 'max-h-0'}`}>
              <ul className="space-y-3">
                {speaker.practice.map((item, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-gray-700 
                             hover:text-gray-900 transition-colors"
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 
                                   flex-shrink-0" />
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
              
              {/* 关联标签 */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                {speaker.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs bg-gray-50 text-gray-600 
                             rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 底部提示 */}
      <div className="px-6 py-4 bg-gray-50 text-sm text-gray-500 rounded-b-lg">
        点击每个分享可以展开查看详细内容
      </div>
    </div>
  );
}
