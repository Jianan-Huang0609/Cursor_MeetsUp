import { useEffect, useRef } from 'react';
import type { Speaker } from '../lib/types';

interface SidebarTimelineProps {
  speakers: Speaker[];
  selected: string | null;
  onSelect: (id: string | null) => void;
}

export default function SidebarTimeline({ speakers, selected, onSelect }: SidebarTimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);

  // 滚动到选中的嘉宾
  useEffect(() => {
    if (selected && timelineRef.current) {
      const selectedElement = timelineRef.current.querySelector(`[data-id="${selected}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selected]);

  return (
    <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto" ref={timelineRef}>
      <div className="space-y-6 py-2">
        {speakers.map((speaker, index) => {
          const isSelected = speaker.id === selected;
          const date = new Date("2025-08-16"); // 假设都是同一天的不同时间段
          date.setHours(9 + index * 2); // 每个嘉宾间隔2小时

          return (
            <div
              key={speaker.id}
              data-id={speaker.id}
              className={`group flex gap-4 items-start cursor-pointer
                         transition-all duration-300
                         ${isSelected ? 'scale-105' : 'hover:scale-105'}`}
              onClick={() => onSelect(speaker.id === selected ? null : speaker.id)}
            >
              {/* 时间线和点 */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-gray-500 mb-2 w-14 text-right">
                  {date.toLocaleTimeString('zh-CN', { 
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div
                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300
                    ${isSelected
                      ? 'bg-blue-600 border-blue-600 scale-125'
                      : 'bg-white border-gray-300 group-hover:border-blue-400'
                    }`}
                />
                {index < speakers.length - 1 && (
                  <div className={`w-0.5 h-16 transition-colors duration-300
                    ${isSelected ? 'bg-blue-200' : 'bg-gray-200'}`} />
                )}
              </div>

              {/* 内容区域 */}
              <div className="flex-1 -mt-1">
                <h3 className={`text-sm font-medium transition-colors duration-300
                  ${isSelected ? 'text-blue-600' : 'text-gray-700 group-hover:text-gray-900'}`}
                >
                  {speaker.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{speaker.role}</p>
                
                {/* 标签云 */}
                <div className="flex flex-wrap gap-1">
                  {speaker.tags.map(tag => (
                    <span
                      key={tag}
                      className={`px-1.5 py-0.5 text-[10px] rounded
                        ${isSelected
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* 一句话总结 - 仅在选中时显示 */}
                {isSelected && (
                  <p className="mt-2 text-xs text-gray-600 italic line-clamp-2">
                    "{speaker.talk.one_liner}"
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
